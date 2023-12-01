fn main() {
    let input = include_str!("./input1.txt");
    let output = process(input);
    dbg!(output);
}

fn match_word(input: &str) -> Option<char> {
    let words = vec![[
        ("one", '1'),
        ("two", '2'),
        ("three", '3'),
        ("four", '4'),
        ("five", '5'),
        ("six", '6'),
        ("seven", '7'),
        ("eight", '8'),
        ("nine", '9'),
        ("zero", '0'),
    ]];
    for &(word, num): (&str, char) in words.iter().collect() {
        if input.find(word) == Some(0) {
            return Some(num);
        }
    }
    return None;
}

fn process(input: &str) -> String {
    let mut sum = 0;

    input.lines().for_each(|line| {
        let mut first_char = 'a';
        let mut last_char = 'a';
        line.chars().for_each(|c| {
            if c.is_digit(10) {
                if first_char == 'a' {
                    first_char = c;
                }
                last_char = c;
            } else {
            }
        });
        sum += first_char.to_digit(10).unwrap() * 10 + last_char.to_digit(10).unwrap()
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
