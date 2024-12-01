use std::collections::HashMap;
use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    let mut column1 = Vec::new();
    let mut column2 = Vec::new();
    let mut repeats: HashMap<i32, i32> = HashMap::new();
    let mut sum: i32 = 0;

    for line in stdin.lock().lines() {
        match line {
            Ok(l) => {
                let parts: Vec<&str> = l.split_whitespace().collect();
                if parts.len() == 2 {
                    if let (Ok(num1), Ok(num2)) = (parts[0].parse::<i32>(), parts[1].parse::<i32>())
                    {
                        column1.push(num1);
                        column2.push(num2);
                    }
                }
            }
            Err(e) => {
                eprintln!("Error reading line: {}", e);
                break;
            }
        }
    }

    column1.sort();
    column2.sort();

    for &num in &column2 {
        *repeats.entry(num).or_insert(0) += 1;
    }

    for num in column1 {
        sum += num * repeats.get(&num).unwrap_or(&0);
    }

    println!("Sum: {}", sum);
}
