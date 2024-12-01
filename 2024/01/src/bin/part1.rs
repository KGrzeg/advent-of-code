use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    let mut column1 = Vec::new();
    let mut column2 = Vec::new();
    let mut diffs = Vec::new();

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

    for (x1, x2) in column1.iter().zip(column2.iter()) {
        diffs.push((x1 - x2).abs());
    }

    // println!("Column 1: {:?}", column1);
    // println!("Column 2: {:?}", column2);
    // println!("Diffs: {:?}", diffs);
    println!("Sum: {}", diffs.iter().sum::<i32>());
}
