pub mod directory;
pub mod document;

use super::{Data, DATA_DIRECTORY_NAME, LOCAL_DIRECTORY_NAME};
use crate::{AppState, StateVariant};
use directory::Directory;
use document::Document;
use serde::{Deserialize, Serialize};
use std::{env, fs::remove_file, ops::Deref, path::Path};
use tauri::{command, State};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum Item {
    Directory(Directory),
    Document(Document),
}

#[command]
pub fn item_move(item_id: String, target_id: String, is_directory: bool) -> Vec<Item> {
    let mut data = Data::read();
    let mut item = Item::Document(Document::new());

    fn remove(childrens: &mut Vec<Item>, item_id: &str, item: &mut Item) -> bool {
        for i in 0..childrens.len() {
            match &mut childrens[i] {
                Item::Directory(dir) => {
                    if dir.id == item_id {
                        *item = Item::Directory(dir.clone());
                        childrens.remove(i);
                        return true;
                    } else if remove(&mut dir.childrens, item_id, item) {
                        return true;
                    }
                }
                Item::Document(doc) => {
                    if doc.id == item_id {
                        *item = Item::Document(doc.clone());
                        childrens.remove(i);
                        return true;
                    }
                }
            }
        }
        false
    }

    fn add(
        childrens: &mut Vec<Item>,
        target_id: &str,
        is_directory: bool,
        item: &mut Item,
    ) -> bool {
        for i in 0..childrens.len() {
            match &mut childrens[i] {
                Item::Directory(dir) => {
                    if dir.id == target_id {
                        if is_directory {
                            dir.childrens.push(item.clone());
                        } else {
                            childrens.insert(i, item.clone());
                        }
                        return true;
                    } else if add(&mut dir.childrens, target_id, is_directory, item) {
                        return true;
                    }
                }
                Item::Document(doc) => {
                    if doc.id == target_id {
                        childrens.insert(i, item.clone());
                        return true;
                    }
                }
            }
        }
        false
    }

    remove(&mut data, &item_id, &mut item);
    add(&mut data, &target_id, is_directory, &mut item);

    Data::write(data.clone());

    data
}

#[command]
pub fn remove_current(state: State<AppState>) {
    let mut data = Data::read();

    match state.state.lock().unwrap().deref() {
        StateVariant::None => return,
        StateVariant::Directory(id) => {
            fn recursive_remove(childrens: &Vec<Item>) {
                for child in childrens {
                    match child {
                        Item::Document(doc) => {
                            remove_file(
                                Path::new(&env::var("LOCALAPPDATA").unwrap())
                                    .join(LOCAL_DIRECTORY_NAME)
                                    .join(DATA_DIRECTORY_NAME)
                                    .join(&doc.id),
                            )
                            .unwrap();
                        }
                        Item::Directory(dir) => {
                            recursive_remove(&dir.childrens);
                        }
                    }
                }
            }

            fn remove(childrens: &mut Vec<Item>, item_id: &str) -> bool {
                for i in 0..childrens.len() {
                    if let Item::Directory(dir) = &mut childrens[i] {
                        if dir.id == item_id {
                            recursive_remove(&dir.childrens);
                            childrens.remove(i);
                            return true;
                        } else if remove(&mut dir.childrens, item_id) {
                            return true;
                        }
                    }
                }
                false
            }

            remove(&mut data, id);

            Data::write(data);
        }
        StateVariant::Document(id) => {
            fn remove(childrens: &mut Vec<Item>, item_id: &str) -> bool {
                for i in 0..childrens.len() {
                    match &mut childrens[i] {
                        Item::Directory(dir) => {
                            if dir.id == item_id {
                                childrens.remove(i);
                                return true;
                            } else if remove(&mut dir.childrens, item_id) {
                                return true;
                            }
                        }
                        Item::Document(doc) => {
                            if doc.id == item_id {
                                childrens.remove(i);
                                return true;
                            }
                        }
                    }
                }
                false
            }

            remove(&mut data, id);

            Data::write(data);

            remove_file(
                Path::new(&env::var("LOCALAPPDATA").unwrap())
                    .join(LOCAL_DIRECTORY_NAME)
                    .join(DATA_DIRECTORY_NAME)
                    .join(id),
            )
            .unwrap();
        }
    };
}
