use std::io::{self, BufRead};
use std::collections::HashMap;

fn main() {
  let stdin = io::stdin();
  let mut score = 0;

  // make it global was harder xD
  let points = HashMap::from([
    ("A", 1), ("B", 2), ("C", 3),
    ("X", 1), ("Y", 2), ("Z", 3)
  ]);
  //yea, that can be possible done with a single Map ¯\_(ツ)_/¯
  let beaters = HashMap::from([
    ("A", "Y"), ("B", "Z"), ("C", "X"),
  ]);
  let victims = HashMap::from([
    ("A", "Z"), ("B", "X"), ("C", "Y"),
  ]);

  for line in stdin.lock().lines() {
    let str = line.unwrap();
    let movements = str.split(" ").collect::<Vec<&str>>();
    let enemy = movements[0];
    let me = movements[1];

    if me == "X" { score += points[victims[enemy]] + 0; }
    if me == "Y" { score += points[enemy] + 3; }
    if me == "Z" { score += points[beaters[enemy]] + 6; }
  }

  println!("Your score {}", score);
}
