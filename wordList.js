//Contains each word object
var list = [];

//Constructor for the list of words to be used for the hangman game
var WordListItem = function(answer, hint) {

	this.answer = answer;
	this.hint = hint;

	//Pushes word object into list array for use by word.js
	this.addWord = function() {
		list.push({answer: answer, hint: hint});
	};

	this.addWord();
	
};

//Creates a new word object for each word made. The answer is passed first and the hint second.
var w1 = new WordListItem("Apple","Keeps the doctor away.");
var w2 = new WordListItem("Orange", "The word is a color.");
var w3 = new WordListItem("Tomato", "Rhymes with potato.");

//Picks a random word object from list and returns it
var randomWord = function() {
	return list[Math.floor((Math.random() * 3))];
};

//Exports only the list of words and the random word picking function to be used by other files
module.exports = {
	list: list,
	randomWord: randomWord
};