use std::io::{self, BufRead};

// The best algorithm: keep only the most 3 and sum them in the end
// My dumb algorithm: keep all the numbers and sort them in the end
// That is not memory optimal, but easier to do in rust, for me...

fn main(){
  let stdin = io::stdin();
  let mut sums: Vec<i32> = Vec::new();
  let mut current_sum = 0;

  for line in stdin.lock().lines() {
    let str = line.unwrap();

    if str.len() == 0 {
      sums.push(current_sum);
      current_sum = 0;
      continue;
    }
    
    current_sum += str.parse::<i32>().unwrap();
    }
  sums.push(current_sum);

  sums.sort(); // How to reveres sort with single call?
  sums.reverse();

  let calories = sums[0] + sums[1] + sums[2]; // yea, we can assume that indexes 0..2 exist!

  println!("The most calories: {}", calories);
}
