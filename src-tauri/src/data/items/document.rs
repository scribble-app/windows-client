use super::{Item, ItemEvent, Tag};
use crate::{
    data::{Data, DATA_DIRECTORY_NAME, LOCAL_DIRECTORY_NAME},
    AppState, StateVariant,
};
use bincode::{deserialize, serialize};
use serde::{Deserialize, Serialize};
use std::{
    env,
    fs::File,
    io::{BufRead, BufReader, ErrorKind, Write},
    ops::Deref,
    path::Path,
    time::{SystemTime, UNIX_EPOCH},
};
use tauri::{command, State, Window};
use uuid::Uuid;

#[derive(Debug, Clone, Serialize, Deserialize)]
struct Progress {
    current: u32,
    maximum: u32,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Document {
    pub id: String,
    pub title: String,
    description: String,
    created_at: u64,
    updated_at: u64,
    progress: Progress,
    tags: Vec<Tag>,
}

trait NoteMethods {
    fn get_title(&self) -> String;
    fn get_description(&self) -> String;
    fn get_progress(&self) -> Progress;
}

impl NoteMethods for String {
    fn get_title(&self) -> String {
        let result = self
            .lines()
            .find(|line| line.starts_with("#"))
            .unwrap_or("");

        if result.len() > 2 {
            return result[2..].into();
        }

        "".into()
    }

    fn get_description(&self) -> String {
        let description = self
            .lines()
            .filter(|line| line.starts_with("#"))
            .next()
            .map_or_else(
                || self.replace("\n", " ").trim().to_string(),
                |line| {
                    let start = self.find(line).unwrap() + line.len();
                    self[start..].replace("\n", " ").trim().to_string()
                },
            );

        description.chars().take(50).collect()
    }

    fn get_progress(&self) -> Progress {
        let mut empty_brackeys = 0;
        let mut filled_brackeys = 0;

        for line in self.lines() {
            if line.starts_with("- [ ]") || line.starts_with("* [ ]") {
                empty_brackeys += 1;
            } else if line.starts_with("- [x]")
                || line.starts_with("- [X]")
                || line.starts_with("* [x]")
                || line.starts_with("* [X]")
            {
                filled_brackeys += 1;
            }
        }

        Progress {
            current: filled_brackeys,
            maximum: empty_brackeys + filled_brackeys,
        }
    }
}

impl Progress {
    fn new() -> Self {
        Self {
            current: 0,
            maximum: 0,
        }
    }
}

impl Document {
    pub fn new() -> Self {
        let time = SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .unwrap()
            .as_secs();

        Self {
            id: Uuid::new_v4().to_string(),
            title: "".into(),
            description: "".into(),
            created_at: time,
            updated_at: time,
            progress: Progress::new(),
            tags: Vec::new(),
        }
    }
}

#[command]
pub fn create_document() -> String {
    let mut data = Data::read();
    let document = Document::new();
    let id = document.id.clone();

    let mut file = File::create(
        Path::new(&env::var("LOCALAPPDATA").unwrap())
            .join(LOCAL_DIRECTORY_NAME)
            .join(DATA_DIRECTORY_NAME)
            .join(&document.id),
    )
    .unwrap();
    let serialized_content = serialize("# ").unwrap();
    let buf = serialized_content.as_slice();

    file.write_all(buf).unwrap();

    data.push(Item::Document(document));
    Data::write(data);

    id
}

#[command]
pub fn get_document(id: String, state: State<AppState>) -> String {
    match File::open(
        Path::new(&env::var("LOCALAPPDATA").unwrap())
            .join(LOCAL_DIRECTORY_NAME)
            .join(DATA_DIRECTORY_NAME)
            .join(&id),
    ) {
        Ok(file) => {
            let mut reader = BufReader::new(file);
            let buf = reader.fill_buf().unwrap();
            let data: String = deserialize(buf).unwrap();

            *state.state.lock().unwrap() = StateVariant::Document(id.clone());

            return data;
        }
        Err(error) => match error.kind() {
            ErrorKind::NotFound => return "none".into(),
            other_error => {
                panic!("Problem opening the file: {:?}", other_error);
            }
        },
    }
}

#[command]
pub fn write_document(content: String, state: State<AppState>, window: Window) -> String {
    if let StateVariant::Document(id) = state.state.lock().unwrap().deref() {
        let mut data = Data::read();

        fn update(items: &mut Vec<Item>, id: &str, content: &String) {
            for item in items.iter_mut() {
                match item {
                    Item::Document(doc) => {
                        if &doc.id == id {
                            doc.title = content.get_title();
                            doc.description = content.get_description();
                            doc.updated_at = SystemTime::now()
                                .duration_since(UNIX_EPOCH)
                                .unwrap()
                                .as_secs();
                            doc.progress = content.get_progress();
                            break;
                        }
                    }
                    Item::Directory(dir) => update(&mut dir.childrens, &id, &content),
                }
            }
        }

        update(&mut data, &id, &content);

        Data::write(data);

        let mut file = File::options()
            .write(true)
            .open(
                Path::new(&env::var("LOCALAPPDATA").unwrap())
                    .join(LOCAL_DIRECTORY_NAME)
                    .join(DATA_DIRECTORY_NAME)
                    .join(id),
            )
            .expect("File not found");
        let serialized_data = serialize(&content).unwrap();
        let buf = serialized_data.as_slice();

        file.write_all(buf).unwrap();

        window
            .emit(
                "item",
                ItemEvent {
                    status: "updated".to_string(),
                },
            )
            .unwrap();

        content
    } else {
        "none".into()
    }
}

pub fn create_example_md() {
    let mut data = Data::read();

    for item in &data {
        if let Item::Document(doc) = item {
            if doc.id == "test" {
                return;
            }
        }
    }

    let mut document = Document::new();

    document.id = "test".to_string();

    let mut file = File::create(
        Path::new(&env::var("LOCALAPPDATA").unwrap())
            .join(LOCAL_DIRECTORY_NAME)
            .join(DATA_DIRECTORY_NAME)
            .join(&document.id),
    )
    .unwrap();

    let content = "
# Title (Heading)

description description description

## Heading 2

### Heading 3

| table | table | table | table | table |
| ----- | ----- | ----- | ----- | ----- |
| 1     | 2     | 3     | 4     | 5     |
| 6     | 7     |       |       |       |
|       |       |       |       |       |

**wadahell**

_italicized text_

> blockquote

1. First item
2. Second item
3. Third item

- First item
- Second item
- Third item

```python
print(\"hello world!\")
```

---

[link](https://www.example.com)

- [x] Write the press release
- [ ] Update the website
- [ ] Contact the media

![](https://i.imgur.com/lUeDDae.jpg)
        "
    .to_string();

    document.title = content.get_title();
    document.description = content.get_description();
    document.progress = content.get_progress();

    let serialized_content = serialize(&content).unwrap();
    let buf = serialized_content.as_slice();

    file.write_all(buf).unwrap();

    data.push(Item::Document(document));
    Data::write(data);
}
