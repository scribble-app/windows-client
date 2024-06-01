use std::{
    collections::HashSet,
    fs::File,
    io::{BufRead, BufReader},
};

pub struct Dictionary;

impl Dictionary {
    pub fn new() -> HashSet<String> {
        let mut dictionary = HashSet::new();
        let file = File::open("./words_alpha.txt").expect("Failed to open dictionary file");
        let reader = BufReader::new(file);

        for line in reader.lines() {
            let word = line.expect("Could not read line");
            dictionary.insert(word);
        }

        dictionary
    }
}
