pub mod directory;
pub mod document;

use super::{Data, DATA_DIRECTORY_NAME, LOCAL_DIRECTORY_NAME};
use crate::{AppState, StateVariant};
use directory::Directory;
use document::Document;
use serde::{Deserialize, Serialize};
use std::{env, fs::remove_file, ops::Deref, path::Path};
use tauri::{command, State, Window};
use uuid::Uuid;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum Item {
    Directory(Directory),
    Document(Document),
}

#[derive(Clone, Serialize)]
struct ItemEvent {
    status: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
struct Tag {
    id: String,
    title: String,
    color: String,
    is_belong_column: bool,
}

impl Tag {
    fn new(title: String, color: String) -> Self {
        Self {
            id: Uuid::new_v4().to_string(),
            title,
            color,
            is_belong_column: false,
        }
    }

    fn new_with_id(id: String, title: String, color: String) -> Self {
        Self {
            id,
            title,
            color,
            is_belong_column: true,
        }
    }
}

#[command]
pub fn rearange_column(
    item_id: String,
    tag_id: String,
    target_id: String,
    color: String,
    title: String,
    state: State<AppState>,
) -> Result<Vec<Item>, String> {
    if let StateVariant::Directory(id) = state.state.lock().unwrap().deref() {
        let mut data = Data::read();

        fn recursive_rearange_column(
            childrens: &mut Vec<Item>,
            item_id: &str,
            tag_id: &str,
            dir_id: &str,
            color: &str,
            target_id: &str,
            title: &str,
        ) -> Result<Vec<Item>, String> {
            for child in childrens {
                if let Item::Directory(dir) = child {
                    if dir.id == dir_id {
                        for item in &mut dir.childrens {
                            if let Item::Document(doc) = item {
                                if doc.id == item_id {
                                    doc.tags.pop();

                                    let mut item = Item::Document(Document::new());

                                    let mut pos1 = None;
                                    let mut pos2 = None;

                                    if tag_id != "".to_string() {
                                        doc.tags.push(Tag::new_with_id(
                                            tag_id.to_string(),
                                            title.to_string(),
                                            color.to_string(),
                                        ));

                                        for (i, child) in dir.childrens.clone().iter().enumerate() {
                                            if let Item::Document(doc) = child {
                                                if doc.id == item_id {
                                                    item = child.clone();
                                                    pos1 = Some(i);
                                                }
                                                if doc.id == target_id {
                                                    pos2 = Some(i);
                                                }
                                            }
                                        }

                                        if let (Some(pos1), Some(pos2)) = (pos1, pos2) {
                                            println!("{:?}, {:?}", pos1, pos2);

                                            if pos1 < pos2 {
                                                dir.childrens.remove(pos1);
                                                dir.childrens.insert(pos2 - 1, item);
                                            } else if pos1 > pos2 {
                                                dir.childrens.remove(pos1);
                                                dir.childrens.insert(pos2, item);
                                            }
                                        } else if let Some(pos1) = pos1 {
                                            dir.childrens.remove(pos1);
                                            dir.childrens.push(item);
                                        }
                                    }

                                    return Ok(dir.childrens.clone());
                                }
                            }
                        }
                    } else if let Ok(result) = recursive_rearange_column(
                        &mut dir.childrens,
                        item_id,
                        tag_id,
                        dir_id,
                        color,
                        title,
                        target_id,
                    ) {
                        return Ok(result);
                    }
                }
            }
            Err("Directory not found".to_string())
        }

        return match recursive_rearange_column(
            &mut data, &item_id, &tag_id, &id, &color, &target_id, &title,
        ) {
            Ok(result) => {
                Data::write(data);
                Ok(result)
            }
            Err(error) => Err(error),
        };
    }

    Err("Incorrect state".to_string())
}

#[command]
pub fn get_title(id: String, state: State<AppState>) -> Result<String, String> {
    let data = Data::read();

    fn get(childrens: &Vec<Item>, id: &str) -> Result<String, String> {
        for child in childrens {
            match child {
                Item::Document(doc) => {
                    if doc.id == id {
                        return Ok(doc.title.clone());
                    }
                }
                Item::Directory(dir) => {
                    if dir.id == id {
                        return Ok(dir.title.clone());
                    } else if let Ok(title) = get(&dir.childrens, id) {
                        return Ok(title);
                    }
                }
            }
        }
        Err("Item not found".to_string())
    }

    if id == "" {
        match state.state.lock().unwrap().deref() {
            StateVariant::Directory(id) => match get(&data, &id) {
                Ok(title) => Ok(title),
                Err(error) => Err(error),
            },
            StateVariant::Document(id) => match get(&data, &id) {
                Ok(title) => Ok(title),
                Err(error) => Err(error),
            },
            StateVariant::None => Err("Incorrect state".to_string()),
        }
    } else {
        match get(&data, &id) {
            Ok(title) => Ok(title),
            Err(error) => Err(error),
        }
    }
}

#[command]
pub fn item_move(
    item_id: String,
    target_id: String,
    is_directory: bool,
    window: Window,
) -> Vec<Item> {
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

    window
        .emit(
            "removed",
            ItemEvent {
                status: "removed".to_string(),
            },
        )
        .unwrap();

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
