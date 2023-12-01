fn main() {
    let input = include_str!("./input1.txt");
    let output = process(input);
    dbg!(output);
}

fn get_number(line: &str, reverse: bool) -> Option<u32> {
    let words = vec![
        ("one", 1),
        ("two", 2),
        ("three", 3),
        ("four", 4),
        ("five", 5),
        ("six", 6),
        ("seven", 7),
        ("eight", 8),
        ("nine", 9),
        ("zero", 0),
    ];

    for i in 0..line.len() {
        let j = if reverse { line.len() - i - 1 } else { i };
        let char = line.chars().nth(j).unwrap_or('x');

        if char.is_digit(10) {
            return Some(char.to_digit(10).unwrap());
        }
        let mut line_vec = line.chars().collect::<Vec<char>>();
        if reverse {
            line_vec.reverse();
        }

        let chunk: String = line_vec[i..].into_iter().collect();
        for &(word, num) in words.iter() {
            let mut rword = word.to_string();
            if reverse {
                rword = rword.chars().rev().collect::<String>();
            }
            if chunk.starts_with(&rword) {
                return Some(num);
            }
        }
    }

    // It should never happen, but compiler is happier
    return None;
}

fn process(input: &str) -> String {
    let mut sum = 0;

    input.lines().for_each(|line| {
        let first_char = get_number(line, false).unwrap();
        let last_char = get_number(line, true).unwrap();

        sum += first_char * 10 + last_char
    });

    sum.to_string()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let result = process(
            "two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen",
        );
        assert_eq!(result, "281".to_string());
    }
}
