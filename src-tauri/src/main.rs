#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod data;

use data::{
    get_items, get_state,
    items::{
        directory::{create_directory, get_directory, toggle_open_directory},
        document::{create_document, get_document, get_title, write_document},
        item_move, remove_current,
    },
    Data,
};
use serde::Serialize;
use std::sync::Mutex;
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
}

fn main() {
    Data::initialization();
    println!("{:#?}", Data::read());

    tauri::Builder::default()
        .setup(|app| {
            let window = app.get_window("main").unwrap();
            set_shadow(&window, true).unwrap();

            Ok(())
        })
        .manage(AppState {
            state: Mutex::new(StateVariant::None),
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
            toggle_open_directory,
            item_move,
            remove_current
        ])
        .run(generate_context!())
        .expect("error while running tauri application");
}
