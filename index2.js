import { EventEmitter } from "node:events";


class GameEmitter extends EventEmitter {
    numberToGuess = 0;
    attempts = 0;
    level = 0;
    levelTable = {
        1: 10,
        2: 5,
        3: 3
    };
    
    setNumberToGuess() {
        this.numberToGuess = 20;//Math.floor(Math.random() * 100);
    };

    setLevelAndAttempts(value) {
        if (this.levelTable[value] !== undefined) {
            this.attempts = this.levelTable[value];
            this.level = value;
        } else {
            throw new Error("Invalid level");
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
        You have 5 chances to guess the correct number.
        Please select the difficulty level:
        1. Easy (10 chances)
        2. Medium (5 chances)
        3 . Hard (3 chances)
        Or type 'q' to quit
        \n`
    );
});

gameEmitter.on("win", () => {
    process.stdout.write(` 
        Congrats!! \n
        You've guessed the right number! \n 
        ${gameEmitter.numberToGuess} is correct! \n
        Great game!! 
        \n`
    );
    process.exit();
});

gameEmitter.on("lose", () => {
    process.stdout.write(` 
        Ahh, that's too bad!! 
        ${gameEmitter.numberToGuess} was the expected numbers!
        See you next time! 
        \n`
    );
    process.exit();
});

gameEmitter.once("quit", () => {
    process.stdout.write("See you next time");
    process.exit();
});

gameEmitter.on("game", () => {
    process.stdout.write(`Alright, you're playing at ${gameEmitter.level} \n`);
    process.stdout.write(`You have ${gameEmitter.attempts} attempts for your guess \n`);
});

const startGame = () => {
    gameEmitter.emit("menu");
    process.stdin.setEncoding("utf-8");
    process.stdin.resume();
    process.stdin.on("data", (data) => {
        const input = data.trim();
        if (input.toLowerCase() === "q") {
            gameEmitter.emit("quit");
        } 
        if (gameEmitter.level === 0){
            gameEmitter.setLevelAndAttempts(input);
            gameEmitter.setNumberToGuess();
            gameEmitter.emit("game");
        } else {
            const guess = Number(input);
            
        }
    });
};

startGame();