//Constructor for letter objects
var Letter = function(letter) {

	this.letter = letter;
	//currentState is what will be printed out by word.js
	this.currentState = "_";

	//Checks if the passed guessed letter is equal to the letter of the current letter object. Changes the currentState to the letter if true.
	this.checkGuess = function(guess) {
		//Ignores case by setting the letter and guess to lowercase
		if(this.letter.toLowerCase() === guess) {
			this.currentState = this.letter;
		};
	};

};

//Exports letter constructor to be used for other files
module.exports = Letter;