/* 

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "testem".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/

class GuessingGame {
	constructor() {
		this.winningNumber = generateNumber();
		this.pastGuesses = [];
		this.currentGuess = null;
		this.hints = [this.winningNumber];
	}

	difference() {
		return Math.abs(this.currentGuess - this.winningNumber);
	}

	isLower() {
		return this.currentGuess < this.winningNumber;
	}

	checkGuess() {
		if (this.currentGuess === this.winningNumber) {
			disableButtons();
			return `You win! The winning number was ${this.winningNumber}`;
		}

		if (this.pastGuesses.includes(this.currentGuess)) {
			return `You already guessed that`;
		}

		this.pastGuesses.push(this.currentGuess);
		this.updatePastGuesses();

		if (this.pastGuesses.length === 5) {
			disableButtons();
			return `You lose. The winning number was ${this.winningNumber}`;
		} else {
			let subtitleElement = document.getElementById('subtitle');
			let difference = this.difference();
			if (this.isLower()) {
				subtitleElement.textContent = 'Guess Higher';
			} else {
				subtitleElement.textContent = 'Guess Lower';
			}

			if (difference <= 10) {
				return `Off by 10 or less`;
			} else if (difference <= 25) {
				return `Off by 25 or less`;
			} else if (difference <= 50) {
				return `Off by 50 or less`;
			} else if (difference <= 75) {
				return `Off by 75 or less`;
			} else {
				return `Off by a lot`;
			}
		}
	}

	playerGuessSubmission(guess) {
		debugger;
		if (
			typeof guess !== 'number' ||
			guess < 1 ||
			guess > 100 ||
			isNaN(guess)
		) {
			return 'Invalid guess, please enter a number';
		}
		this.currentGuess = guess;
		return this.checkGuess();
	}

	updatePastGuesses() {
		let guessList = document.getElementById('guessed-nums');
		let nthChild = this.pastGuesses.length - 1;
		guessList.getElementsByTagName('li')[nthChild].textContent =
			this.currentGuess;
	}

	generateHint() {
		while (this.hints.length < 3) {
			let random = generateNumber();
			if (random !== this.winningNumber) {
				this.hints.push(random);
			}
		}
	}
}

function disableButtons() {
	let subtitleElement = document.getElementById('subtitle');
	let buttonID = ['submit', 'hint-request'];
	for (let i = 0; i < buttonID.length; i++) {
		let button = document.getElementById(buttonID[i]);
		button.disabled = true;
	}
	subtitleElement.textContent = 'Reset to play again';
}

function generateNumber() {
	return Math.floor(Math.random() * 100);
}

function submitGuess(game) {
	let inputElement = document.getElementById('player-input');
	let inputVal = inputElement.value;
	inputElement.value = '';
	let output = game.playerGuessSubmission(parseInt(inputVal));
	var titleElement = document.getElementById('title');
	titleElement.textContent = output;
}

function playGame() {
	const game = new GuessingGame();

	document.querySelector('#submit').addEventListener('click', function () {
		submitGuess(game);
	});

	document
		.querySelector('#hint-request')
		.addEventListener('click', function () {
			game.generateHint();
			let hintElement = document.getElementById('hint-list');

			for (let i = 0; i < game.hints.length; i++) {
				hintElement.getElementsByTagName('li')[i].textContent =
					game.hints[i];
			}

			let button = document.getElementById('hint-request');
			button.disabled = true;
		});

	document.querySelector('#reset').addEventListener('click', function () {
		location.reload();
	});
}

playGame();
