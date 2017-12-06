//Gets exports from word.js to use here
var word = require("./word");

var hangman = {

	//Starts the game by choosing a random word from wordList.js in word.js
	startGame: function() {
		word.useWord();
	}

};

//Starts the game upon starting this application
hangman.startGame();