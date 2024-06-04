#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod data;

use data::{
    dictionary::Dictionary,
    get_items, get_state,
    items::{
        directory::{
            add_column, create_directory, get_directory, remove_column, set_title,
            toggle_open_directory,
        },
        document::{check_word, create_document, create_example_md, get_document, write_document},
        get_title, item_move, rearange_column, remove_current,
    },
    Data,
};
use serde::Serialize;
use std::{collections::HashSet, sync::Mutex};
use tauri::{generate_context, generate_handler, Manager};
use window_shadows::set_shadow;

#[derive(Serialize)]
enum StateVariant {
    None,
    Document(String),
    Directory(String),
}

struct AppState {
    state: Mutex<StateVariant>,
    dictionary: Mutex<HashSet<String>>,
}

fn main() {
    Data::initialization();
    create_example_md();
    println!("{:#?}", Data::read());

    tauri::Builder::default()
        .setup(|app| {
            let window = app.get_window("main").unwrap();
            set_shadow(&window, true).unwrap();

            Ok(())
        })
        .manage(AppState {
            state: Mutex::new(StateVariant::None),
            dictionary: Mutex::new(Dictionary::new()),
        })
        .invoke_handler(generate_handler![
            get_items,
            get_state,
            create_document,
            get_document,
            get_title,
            write_document,
            create_directory,
            get_directory,
            set_title,
            add_column,
            remove_column,
            toggle_open_directory,
            item_move,
            remove_current,
            check_word,
            rearange_column,
        ])
        .run(generate_context!())
        .expect("error while running tauri application");
}
