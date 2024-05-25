use std::ops::Deref;

use super::{Item, ItemEvent};
use crate::{data::Data, AppState, StateVariant};
use serde::{Deserialize, Serialize};
use tauri::{command, State, Window};
use uuid::Uuid;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Directory {
    pub id: String,
    title: String,
    is_open: bool,
    pub childrens: Vec<Item>,
}

impl Directory {
    fn new() -> Self {
        Self {
            id: Uuid::new_v4().to_string(),
            title: "".into(),
            is_open: false,
            childrens: Vec::new(),
        }
    }
}

#[command]
pub fn create_directory(state: State<AppState>) -> String {
    let mut data = Data::read();
    let directory = Directory::new();
    let id = directory.id.clone();

    data.push(Item::Directory(directory));
    Data::write(data);

    *state.state.lock().unwrap() = StateVariant::Directory(id.clone());

    id
}

#[command]
pub fn get_directory(id: String, state: State<AppState>) -> Result<Directory, String> {
    let data = Data::read();

    fn find(childrens: &Vec<Item>, id: &str) -> Result<Directory, ()> {
        for child in childrens {
            if let Item::Directory(dir) = child {
                if dir.id == id {
                    return Ok(dir.clone());
                } else if let Ok(dir) = find(&dir.childrens, id) {
                    return Ok(dir);
                }
            }
        }
        Err(())
    }

    if let Ok(dir) = find(&data, &id) {
        *state.state.lock().unwrap() = StateVariant::Directory(id.to_string());
        Ok(dir)
    } else {
        Err("Not found".to_string())
    }
}

#[command]
pub fn toggle_open_directory(target_id: String, is_open: bool) -> Vec<Item> {
    let mut data = Data::read();

    fn change(childrens: &mut Vec<Item>, target_id: &str, is_open: bool) -> bool {
        for child in childrens {
            if let Item::Directory(dir) = child {
                if dir.id == target_id {
                    dir.is_open = is_open;
                    return true;
                } else {
                    if change(&mut dir.childrens, target_id, is_open) {
                        return true;
                    }
                }
            }
        }
        false
    }

    change(&mut data, &target_id, is_open);

    Data::write(data.clone());

    data
}

#[command]
pub fn set_title(title: String, state: State<AppState>, window: Window) -> Result<String, String> {
    if let StateVariant::Directory(id) = state.state.lock().unwrap().deref() {
        let mut data = Data::read();

        fn change(childrens: &mut Vec<Item>, id: &str, title: &str) -> bool {
            for child in childrens {
                if let Item::Directory(dir) = child {
                    if dir.id == id {
                        dir.title = title.to_string();
                        return true;
                    } else {
                        if change(&mut dir.childrens, id, title) {
                            return true;
                        }
                    }
                }
            }
            false
        }

        if change(&mut data, id, &title) {
            Data::write(data);
            window
                .emit(
                    "item",
                    ItemEvent {
                        status: "updated".to_string(),
                    },
                )
                .unwrap();
            return Ok(title);
        } else {
            return Err("Directory not found".to_string());
        }
    }
    Err("Incorrect state".to_string())
}
