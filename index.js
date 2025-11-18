import process from 'node:process';

const levels = {
    1: 10,
    2: 5,
    3: 3
};

const startScreen = () => {
    process.stdout.write('\n');
    process.stdout.write('Welcome to the Number Guessing Game! \n');
    process.stdout.write('I\'m thinking of a number between 1 and 100. \n');
    process.stdout.write('You have 5 chances to guess the correct number. \n');
    process.stdout.write('Please select the difficulty level: \n');
    process.stdout.write('1. Easy (10 chances \n');
    process.stdout.write('2. Medium (5 chances) \n');
    process.stdout.write('3. Hard (3 chances) \n');
    process.stdout.write('\n');
    process.stdout.write(' or type \'q\' to quit \n');
};

const guess = (numToGuess) => {
    console.log('Number to guess is ', numToGuess);
    process.stdin.on('data', (data) => {
        let guess = data.toString('utf-8').trim();
        if (guess === numToGuess) {
            process.stdout.write(
                `Congratulations!!! You've guessed ${numToGuess} \n`
            );
            process.exit();
        } else if (guess > numToGuess) {
            process.stdout.write(`Sorry, but the number is lower than ${guess} \n`);
        } else if (guess < numToGuess) {
            process.stdout.write(`Sorry, but the number is bigger than ${guess} \n`);
        }
    });
};

const guessGame = (input) => {
    process.stdout.write('Great, let\'s start guessing! \n');

    const numToGuess = (Math.random() * 100).toFixed();

    let numberOfGuesses = levels[input];

    if (numberOfGuesses > 0) {
        process.stdout.write(`${numberOfGuesses}  attempts left \n`);
        guess(numToGuess);
        numberOfGuesses--;
    }
};

const startGame = () => {
    startScreen();
    process.stdin.on('data', (data) => {
        const input = data.toString('utf-8').trim();
        if (input === 'q') {
            process.stdout.write(' see you later \n');
            process.exit();
        } else if (Object.keys(levels).includes(input)) {
            guessGame(input);
        } else {
            process.stdout.write(
                'invalid input, please try again or quit with \'q\' \n'
            );
        }
    });
};

startGame();

// TRY WITH EVENT EMITTER!

// COULD BE INTERESTING!
