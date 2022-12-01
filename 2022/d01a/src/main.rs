use std::cmp;
use std::io::{self, BufRead};

fn main(){
  let stdin = io::stdin();
  let mut most_calories = 0;
  let mut current_sum = 0;

  for line in stdin.lock().lines() {
    let str = line.unwrap();

    if str.len() == 0 {
      most_calories = cmp::max(most_calories, current_sum);
      current_sum = 0;
      continue;
    }

    current_sum += str.parse::<i32>().unwrap();
  }
  most_calories = cmp::max(most_calories, current_sum);

  println!("The most calories: {}", most_calories);
}
