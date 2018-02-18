// Global Variables
var wordId = document.getElementById("word");

// Object Definitions
var game = {
  // game properties
  alphabet: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
  ],
  bones: ["cranium", "mandible", "maxilla", "clavicle", "scapula", "humerus", "radius", "ulna", "carpals", "metacarpals", "phalanges", "sternum", "ribs", "cervical", "thoracic", "lumbar", "sacrum", "coccyx", "ilium", "pubis", "ischium", "femur", "tibia", "fibula", "talus", "calcaneus", "tarsals", "metatarsals", "phalanges"],
  defaultGuesses: 7,
  gameState: "start",
  guessesRemaining: 7,
  keyPressed: '',
  lettersGuessed: [],
  losses: 0,
  wins: 0,
  wordToDisplay: "",
  wordToGuess: "",
  // game methods
  addToGuessed: function() {
    // check to see if the letter was already guessed
    if (this.lettersGuessed.indexOf(this.keyPressed) == -1) {
      // Not guessed yet so add to array
      this.lettersGuessed.push(this.keyPressed);
    }
  },
  displayWord: function() {
    this.wordToDisplay = "";
    var correctLetterCount = 0;
    for(var i = 0; i < this.wordToGuess.length; i++){
      if (this.lettersGuessed.indexOf(this.wordToGuess[i]) > -1) {
        this.wordToDisplay += this.wordToGuess[i] + " ";
        correctLetterCount++;
      } else {
        this.wordToDisplay += "_ ";        
      }
    }
    if (correctLetterCount == this.wordToGuess.length) {
      this.gameState = 'won';
      console.log("Winner");
    }
    wordId.textContent = this.wordToDisplay;
  },
  getRandomWord: function() {
    this.wordToGuess = this.bones[Math.floor(Math.random() * this.bones.length)];
  },
  isLetter: function() {
    return (this.alphabet.indexOf(this.keyPressed.toLowerCase()) > -1);
  }


};

// Method Calls
game.getRandomWord();
console.log(game.wordToGuess);
document.onkeyup = function(event) {
  game.keyPressed = event.key.toLowerCase();
  if (game.isLetter()) {
    game.addToGuessed();
    // Valid letter, continue
    game.displayWord();
  } else {
    // Not a valid letter - do nothing
  }
};