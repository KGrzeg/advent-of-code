use std::cmp;

#[derive(Debug)]
struct Round {
    red: u32,
    green: u32,
    blue: u32,
}

impl Round {
    fn new(r: u32, g: u32, b: u32) -> Round {
        Round {
            red: r,
            green: g,
            blue: b,
        }
    }
    fn max(&self, other: &Round) -> Round {
        Round {
            red: cmp::max(self.red, other.red),
            green: cmp::max(self.green, other.green),
            blue: cmp::max(self.blue, other.blue),
        }
    }
}

#[derive(Debug)]
struct Game {
    id: u32,
    rounds: Vec<Round>,
}

impl Game {
    fn max_rounds(&self) -> Round {
        self.rounds
            .iter()
            .fold(Round::new(0, 0, 0), |acc, round| acc.max(round))
    }
}

fn main() {
    let input = include_str!("./input1.txt");
    let output = process(input);
    dbg!(output);
}

fn read_input(input: &str) -> Vec<Game> {
    let mut games: Vec<Game> = Vec::new();

    input.lines().for_each(|line| {
        if let Some((game_str, rounds_str)) = line.split_once(": ") {
            let mut game = Game {
                id: 0,
                rounds: Vec::new(),
            };
            game.id = game_str
                .split_once(' ')
                .unwrap()
                .1
                .to_string()
                .parse::<u32>()
                .unwrap();

            game.rounds = rounds_str
                .split("; ")
                .map(|round_str| {
                    let mut round = Round {
                        red: 0,
                        green: 0,
                        blue: 0,
                    };

                    round_str.split(", ").for_each(|single_str| {
                        if let Some((num, color)) = single_str.split_once(' ') {
                            match color {
                                "red" => round.red += num.parse::<u32>().unwrap(),
                                "green" => round.green += num.parse::<u32>().unwrap(),
                                "blue" => round.blue += num.parse::<u32>().unwrap(),
                                _ => (),
                            }
                        }
                    });

                    round
                })
                .collect();

            games.push(game);
        }
    });

    games
}

fn process(input: &str) -> String {
    let mut win_ids: Vec<u32> = Vec::new();

    let games = read_input(input);
    for game in games {
        let biggest = game.max_rounds();
        win_ids.push(biggest.red * biggest.green * biggest.blue);
    }

    win_ids.iter().sum::<u32>().to_string()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let result = process(
            "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
        );
        assert_eq!(result, "2286".to_string());
    }
}
