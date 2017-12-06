//inquirer package
var inquirer = require("inquirer");

//Gets exports from wordList.js and Letter.js to use in word.js
var wordList = require("./wordList");
var Letter = require("./letter");

//Constructor for each word object that is used for each round
var Word = function(randomWord) {

	//Number of guesses for each round
	this.guesses = 5;
	this.answer = randomWord.answer;
	this.hint = randomWord.hint;
	//guessedLetters array contains all the letters that were guessed
	this.guessedLetters = [];
	//allLetters array contains all the letter objects created from letter.js
	this.allLetters = [];

	//For using 'this' outside of scope
	var that = this;

	//Starts the round by showing the current word's hint, creating each letter object, and then prompting the user for a guess
	this.startRound = function() {
		console.log("-------------------------------");
		console.log("Hint: " + this.hint);
		this.createLetters();
		this.guess();
	};

	//Creates letter object from each letter in the word
	this.createLetters = function() {
		var letterArray = this.answer.split("");
		for(var i = 0; i < letterArray.length; i++) {
			var newLetter = new Letter(letterArray[i]);
			this.allLetters.push(newLetter);
		};
	};

	//This function is called every time the user can make a guess
	this.guess = function() {
		//Calls progress function to show current word progress
		this.progress();
		//Uses inquirer package to prompt user to guess a letter
		inquirer.prompt([
			{
				name: "guess",
				type: "input",
				message: "Guess a letter"
			}
		])
		.then(function(answer) {
			//Sets the guess to lowercase to ignore case
			var guess = answer.guess.toLowerCase();
			//Only allows entering 1 letter for the guess, runs guess prompt again
			if(guess.length > 1 || guess.length === 0) {
				console.log("Please enter only 1 letter.");
				that.guess();
			}
			//Only allows entering alphabet characters, runs guess prompt again
			else if((/[a-z]/i).test(guess) === false) {
				console.log("Please enter only letters.");
				that.guess();
			}
			//Checks if the guess has not been guessed yet
			else if(that.guessedLetters.indexOf(guess) === -1) {
				//Pushes guess to guessedLetters array for checking if future guesses have already been used
				that.guessedLetters.push(guess);

				//Compares all letter objects' letters to the guess, then changes or keeps their state to reflect all correct letters
				for(var i = 0; i < that.allLetters.length; i++) {
					that.allLetters[i].checkGuess(guess);
				};

				//If the guessed letter is in the word, shows 'correct' text
				if(that.answer.toLowerCase().indexOf(guess) > -1) {
					console.log("\nCORRECT!!!");
				}
				//If the guessed letter is not in the word, shows 'incorrect' text and lowers guesses remaining
				else {
					that.guesses--;
					console.log("\nINCORRECT!!!\nRemaining guesses left: " + that.guesses);
				};

				//Calls checkSolution function to check if there are remaining guesses left or if the user has guessed all the correct letters
				that.checkSolution();
			}
			//If letter has already been guessed, shows text and run guess prompt again
			else if(that.guessedLetters.indexOf(guess) > -1) {
				console.log("\nYou've already guessed that letter! Guess again.");
				that.guess();
			};
		});
	};

	//Shows current word progress by using currentState of each letter object to print a letter or '_'
	this.progress = function() {
		var text = "";
		for(var i = 0; i < this.allLetters.length; i++) {
			text += this.allLetters[i].currentState + " ";
		};
		console.log("\n" + text);
	};

	//Checks to see if the user has correctly guessed all letters or if the user has no more guesses remaining
	this.checkSolution = function() {
		//Sets all letters' current states into one word
		var text = "";
		for(var i = 0; i < this.allLetters.length; i++) {
			text += this.allLetters[i].currentState;
		};

		//If the remaining number of guesses is 0, shows 'Game Over' text and ends the current round
		if(this.guesses === 0) {
			console.log("\nGame Over\nYou ran out of guesses! The Answer was: " + this.answer);
			this.endGame();
		}
		//If the word is the same as the text variable with all the letters' current states, shows 'Win' text and ends current round
		else if(this.answer === text) {
			this.progress();
			console.log("You got it right! You Win!!!");
			this.endGame();
		}
		//If the user has not ran out of guesses or correctly guessed the word completely, run the guess a letter prompt again
		else {
			this.guess();
		};
	};

	//This is called when a round has ended and prompts the user if they want to play again
	this.endGame = function() {
		//Uses inquirer package to prompt user if they want to play again
		inquirer.prompt([
			{
				name: "again",
      			type: "list",
      			choices: ["Yes", "No"],
      			message: "Play Again?"
    		}
		])
		.then(function(answer) {
			//If the user wants to play again, another random word will be used. If they don't, the whole game will end.
			if(answer.again === "Yes") {
				useWord();
			};
		});
	}

};

//This is called when a random word is requested to be used
var useWord = function() {
	//Sets randomWord to a random word that is chosen from wordList.js's randomWord function
	var randomWord = wordList.randomWord();
	//Creates a new word object using the random word chosen before
	var currentWord = new Word(randomWord);
	//Starts the game round for the word
	currentWord.startRound();
};

//Only exports useWord function that chooses a random word. Function will be usable by other files.
module.exports = {
	useWord: useWord
};