import process from "node:process";

process.stdin.setEncoding("utf8");

let started = false;

const levels = {
    1: 10,
    2: 5,
    3: 3
};


const startScreen = () => {
    process.stdout.write("\n");
    process.stdout.write("Welcome to the Number Guessing Game! \n");
    process.stdout.write("I'm thinking of a number between 1 and 100. \n");
    process.stdout.write("You have 5 chances to guess the correct number. \n");
    process.stdout.write("Please select the difficulty level: \n")
    process.stdout.write("1. Easy (10 chances \n" );
    process.stdout.write("2. Medium (5 chances) \n")
    process.stdout.write("3. Hard (3 chances) \n")
    process.stdout.write("\n");
    process.stdout.write(" or type 'q' to quit \n");
};


const guessGame = (input) => {
    process.stdout.write("Great, let's start guessing! \n");

    const numToGuess = (Math.random() * 100).toFixed();
    for (let i = levels[input]; i === 0; i--) {
        process.stdin.on("data", (data) => {
            let guess = Number(data);
            if (guess=== numToGuess) {
                process.stdout.write("Congratulations!!! You've guessed ", numToGuess);
                process.exit();
            } else if (guess > numToGuess) {
                process.stdout.write("Sorry, but the number is lower than ", guess);
                process.stdout.write( i, " attempts left!");

            } else if (guess < numToGuess) {
                process.stdout.write("Sorry, but the number is bigger than", guess)
                process.stdout.write( i, " attempts left!");
            } 
        });
        if (i === 0) {
            process.stdout.write("the searched number was ", numToGuess, "\n");
            process.stdout.write("see you next time \n");
        }
    };
};

const startGame = () => {
    if (!started) {
        startScreen();
    } else {
        process.stdin.on("data", (data) => {
            const input = data.toString("utf-8").trim();
            if (input === "q"){
                process.stdout.write(" see you later \n");
                process.exit();
            } else if (Object.keys(levels).includes(input)) {
                started = true;
                guessGame(input);
            } else {
                process.stdout.write("invalid input, please try again or quit with 'q' \n");
            }
        });
    }
}

startGame();

