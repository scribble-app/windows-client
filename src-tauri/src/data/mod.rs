use bincode::{deserialize, serialize};
use std::{
    env,
    fs::{create_dir, metadata, File},
    io::{BufRead, BufReader, ErrorKind, Write},
    ops::Deref,
    path::Path,
};
use tauri::{command, State};

pub mod items;
pub mod settings;
use crate::{AppState, StateVariant};
use items::Item;
use settings::Settings;

const DATA_NAME: &str = "data";
const SETTINGS_NAME: &str = "config";
const DATA_DIRECTORY_NAME: &str = "data-bin";
const LOCAL_DIRECTORY_NAME: &str = "scribble-data-temp";

pub struct Data;

impl Data {
    pub fn initialization() {
        match metadata(Path::new(&env::var("LOCALAPPDATA").unwrap()).join(LOCAL_DIRECTORY_NAME))
            .is_ok()
        {
            true => {
                Self::settings_file_initialization();
                Self::data_folder_initialization();
            }
            false => match create_dir(
                Path::new(&env::var("LOCALAPPDATA").unwrap()).join(LOCAL_DIRECTORY_NAME),
            ) {
                Ok(_) => {
                    Self::settings_file_initialization();
                    Self::data_folder_initialization();
                }
                Err(error) => panic!("Problem creating the directory: {:?}", error),
            },
        }
    }

    fn settings_file_initialization() {
        match File::open(
            Path::new(&env::var("LOCALAPPDATA").unwrap())
                .join(LOCAL_DIRECTORY_NAME)
                .join(SETTINGS_NAME),
        ) {
            Ok(_) => println!("File exist"),
            Err(error) => match error.kind() {
                ErrorKind::NotFound => {
                    match File::create(
                        Path::new(&env::var("LOCALAPPDATA").unwrap())
                            .join(LOCAL_DIRECTORY_NAME)
                            .join(SETTINGS_NAME),
                    ) {
                        Ok(mut file) => {
                            let data: Settings = Settings::new();
                            let serialized_data = serialize(&data).unwrap();
                            let buf = serialized_data.as_slice();

                            file.write_all(buf).unwrap();
                        }
                        Err(error) => panic!("Problem creating the file: {:?}", error),
                    }
                }
                other_error => {
                    panic!("Problem opening the file: {:?}", other_error);
                }
            },
        }
    }

    fn data_folder_initialization() {
        match metadata(
            Path::new(&env::var("LOCALAPPDATA").unwrap())
                .join(LOCAL_DIRECTORY_NAME)
                .join(DATA_DIRECTORY_NAME),
        )
        .is_ok()
        {
            true => Self::data_file_initialization(),
            false => match create_dir(
                Path::new(&env::var("LOCALAPPDATA").unwrap())
                    .join(LOCAL_DIRECTORY_NAME)
                    .join(DATA_DIRECTORY_NAME),
            ) {
                Ok(_) => Self::data_file_initialization(),
                Err(error) => panic!("Problem creating the directory: {:?}", error),
            },
        }
    }

    fn data_file_initialization() {
        match File::open(
            Path::new(&env::var("LOCALAPPDATA").unwrap())
                .join(LOCAL_DIRECTORY_NAME)
                .join(DATA_DIRECTORY_NAME)
                .join(DATA_NAME),
        ) {
            Ok(_) => println!("File exist"),
            Err(error) => match error.kind() {
                ErrorKind::NotFound => {
                    match File::create(
                        Path::new(&env::var("LOCALAPPDATA").unwrap())
                            .join(LOCAL_DIRECTORY_NAME)
                            .join(DATA_DIRECTORY_NAME)
                            .join(DATA_NAME),
                    ) {
                        Ok(mut file) => {
                            let data: Vec<Item> = Vec::new();
                            let serialized_data = serialize(&data).unwrap();
                            let buf = serialized_data.as_slice();

                            file.write_all(buf).unwrap();
                        }
                        Err(error) => panic!("Problem creating the file: {:?}", error),
                    }
                }
                other_error => {
                    panic!("Problem opening the file: {:?}", other_error);
                }
            },
        }
    }

    pub fn write(data: Vec<Item>) {
        let mut file = File::options()
            .write(true)
            .open(
                Path::new(&env::var("LOCALAPPDATA").unwrap())
                    .join(LOCAL_DIRECTORY_NAME)
                    .join(DATA_DIRECTORY_NAME)
                    .join(DATA_NAME),
            )
            .expect("File not found");
        let serialized_data = serialize(&data).unwrap();
        let buf = serialized_data.as_slice();

        file.write_all(buf).unwrap();
    }

    pub fn read() -> Vec<Item> {
        let file = File::open(
            Path::new(&env::var("LOCALAPPDATA").unwrap())
                .join(LOCAL_DIRECTORY_NAME)
                .join(DATA_DIRECTORY_NAME)
                .join(DATA_NAME),
        )
        .expect("File not found");
        let mut reader = BufReader::new(file);
        let buf = reader.fill_buf().unwrap();
        let data: Vec<Item> = deserialize(buf).unwrap();

        data
    }
}

#[command]
pub fn get_items() -> Vec<Item> {
    Data::read()
}

#[command]
pub fn get_state(state: State<AppState>) -> StateVariant {
    match state.state.lock().unwrap().deref() {
        StateVariant::None => StateVariant::None,
        StateVariant::Directory(dir) => StateVariant::Directory(dir.to_string()),
        StateVariant::Document(doc) => StateVariant::Document(doc.to_string()),
    }
}
