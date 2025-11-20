import { EventEmitter } from "node:events";

class GameEmitter extends EventEmitter {
    numberToGuess = 0;

    attempts = 0;

    level = "";

    levelTable = {
        1: "Easy",
        2: "Medium",
        3: "Hard"
    };

    attemptTable = {
        1: 10,
        2: 5,
        3: 3
    };

    tries = 0;

    setNumberToGuess() {
        this.numberToGuess = Math.floor(Math.random() * 100);
    };

    setLevelAndAttempts(value) {
        const v = Number(value);
        if (this.attemptTable[v] !== undefined) {
            this.attempts = this.attemptTable[v];
            this.level = this.levelTable[v];
        }
    };
    
    getLevel = () => this.level;

    getAttempts = () => this.attempts;

    getNumberToGuess = () => this.numberToGuess;
};

const gameEmitter = new GameEmitter();

gameEmitter.on("menu", () => {
    process.stdout.write(`
        Welcome to the Number Guessing Game!
        I'm thinking of a number between 1 and 100.
        Please select the difficulty level:
        1. Easy (10 chances)
        2. Medium (5 chances)
        3. Hard (3 chances)
        Or type 'q' to quit
        \n`
    );
});

gameEmitter.on("win", () => {
    process.stdout.write(` 
        Congrats!! \n
        You've guessed the right number in ${gameEmitter.tries} attempts! \n 
        ${gameEmitter.numberToGuess} is correct! \n
        Great game!! 
        \n`
    );
    process.exit();
});

gameEmitter.on("lose", () => {
    process.stdout.write(` 
        Ahh, that's too bad!! 
        You've lost! 
        The expected number was ${gameEmitter.numberToGuess} !
        See you next time! 
        \n`
    );
    process.exit();
});

gameEmitter.on("quit", () => {
    process.stdout.write("Alright, see you next time \n");
    process.exit();
});

gameEmitter.on("game", () => {
    process.stdout.write(`Alright, you're playing at ${gameEmitter.level} \n
    You have ${gameEmitter.attempts} attempts for your guess \n
    Now enter your guess! \n`);
});

gameEmitter.on("error", () => {
    process.stdout.write("Please enter a valid input \n");
});

const startGame = () => {
    gameEmitter.emit("menu");
    process.stdin.setEncoding("utf-8");
    process.stdin.resume();
    process.stdin.on("data", (data) => {
        const input = data.trim();
        if (input.toLowerCase() === "q") {
            return;
        } 
        if  (gameEmitter.level === "") {
            if (!/^[1-3]$/.test(input)) {
                gameEmitter.emit("error");
                return;
            }
            gameEmitter.setLevelAndAttempts(input);
            gameEmitter.setNumberToGuess();
            gameEmitter.emit("game");
            return;
        } 

        const guess = Number(input);
        if (gameEmitter.attempts === 1) {
            gameEmitter.emit("lose");
        }
        if (Number.isNaN(guess)) {
            process.stdout.write("Enter a number between 1 and 100");
            return;
        } else {
            gameEmitter.attempts--;
            gameEmitter.tries++;
            if (guess === gameEmitter.numberToGuess) {
                gameEmitter.emit("win");
            } else if (guess < gameEmitter.numberToGuess) {
                process.stdout.write(`the expected number is higher than ${guess} \n`);
            } else if (guess > gameEmitter.numberToGuess) {
                process.stdout.write(`the expected number is lower than ${guess} \n`);
            }
        }
    });
};

startGame();