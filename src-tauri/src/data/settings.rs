use std::{
    env,
    fs::File,
    io::{BufRead, BufReader, Write},
    path::Path,
};

use bincode::{deserialize, serialize};
use serde::{Deserialize, Serialize};
use tauri::{command, PhysicalSize};

use super::{LOCAL_DIRECTORY_NAME, SETTINGS_NAME};

#[derive(Serialize, Deserialize)]
enum Theme {
    Dark,
    White,
    Purple,
    Transparent,
}

#[derive(Serialize, Deserialize)]
enum EditMode {
    Normal,
    Vim,
}

#[derive(Serialize, Deserialize)]
struct Window {
    size: PhysicalSize<u32>,
    menu_size: u32,
    split_size: f32,
}

#[derive(Serialize, Deserialize)]
pub struct Settings {
    theme: Theme,
    edit_mode: EditMode,
    window: Window,
}

impl Window {
    fn new() -> Self {
        Self {
            size: PhysicalSize {
                width: 1000,
                height: 600,
            },
            menu_size: 200,
            split_size: 50.,
        }
    }
}

impl Settings {
    pub fn new() -> Self {
        Self {
            theme: Theme::Dark,
            edit_mode: EditMode::Normal,
            window: Window::new(),
        }
    }

    pub fn write(data: Settings) {
        let mut file = File::options()
            .write(true)
            .open(
                Path::new(&env::var("LOCALAPPDATA").unwrap())
                    .join(LOCAL_DIRECTORY_NAME)
                    .join(SETTINGS_NAME),
            )
            .expect("File not found");
        let serialized_data = serialize(&data).unwrap();
        let buf = serialized_data.as_slice();

        file.write_all(buf).unwrap();
    }

    pub fn read() -> Settings {
        let file = File::open(
            Path::new(&env::var("LOCALAPPDATA").unwrap())
                .join(LOCAL_DIRECTORY_NAME)
                .join(SETTINGS_NAME),
        )
        .expect("File not found");
        let mut reader = BufReader::new(file);
        let buf = reader.fill_buf().unwrap();
        let data: Settings = deserialize(buf).unwrap();

        data
    }

    pub fn get_window_size() -> PhysicalSize<u32> {
        Self::read().window.size
    }

    pub fn set_window_size(size: &PhysicalSize<u32>) {
        let mut data = Self::read();
        data.window.size = *size;
        Self::write(data);
    }
}

#[command]
pub fn get_menu_size() -> u32 {
    Settings::read().window.menu_size
}

#[command]
pub fn set_menu_size(size: u32) {
    let mut data = Settings::read();
    data.window.menu_size = size;
    Settings::write(data);
}
