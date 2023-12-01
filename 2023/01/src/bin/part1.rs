fn main() {
    let input = include_str!("./input1.txt");
    let output = process(input);
    dbg!(output);
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
            "1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet",
        );
        assert_eq!(result, "142".to_string());
    }
}
