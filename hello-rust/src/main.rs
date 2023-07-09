use std::io;

fn main() {
    let mut input_user = String::new();

    println!("Write a string ");

    match io::stdin().read_line(&mut input_user) {
        Ok(_) => {
            let vowel_count = count_vowels(&input_user);
            println!("Your string is {}. Your input has {} vowels.", input_user.trim(), vowel_count);
        },
        Err(e) => println!("Oops! Something went wrong: {}", e),
    }
}

fn count_vowels(input: &str) -> usize {
    let vowels = ['a', 'e', 'i', 'o', 'u'];
    let mut count = 0;

    for c in input.chars() {
        if vowels.contains(&c.to_ascii_lowercase()) {
            count += 1;
        }
    }

    count
}