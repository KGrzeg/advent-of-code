use std::io::{self, BufRead};

fn main() {
  let stdin = io::stdin();
  let mut score = 0;

  for line in stdin.lock().lines() {
    let str = line.unwrap();
    let movements = str.split(" ").collect::<Vec<&str>>();

    if movements[1] == "X" {
      score += 1;
      if movements[0] == "A" {score += 3;}
      if movements[0] == "B" {score += 0;}
      if movements[0] == "C" {score += 6;}
    }
    if movements[1] == "Y" {
      score += 2;
      if movements[0] == "A" {score += 6;}
      if movements[0] == "B" {score += 3;}
      if movements[0] == "C" {score += 0;}
    }
    if movements[1] == "Z" {
      score += 3;
      if movements[0] == "A" {score += 0;}
      if movements[0] == "B" {score += 6;}
      if movements[0] == "C" {score += 3;}
    }
  }

  println!("Your score {}", score);
}
