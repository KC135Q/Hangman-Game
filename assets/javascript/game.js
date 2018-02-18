// Global Variables
var wordId = document.getElementById("word");

// Object Definitions
var game = {
  // game properties
  alphabet: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
  ],
  bones: ["cranium", "mandible", "maxilla", "clavicle", "scapula", "humerus", "radius", "ulna", "carpals", "metacarpals", "phalanges", "sternum", "ribs", "cervical", "thoracic", "lumbar", "sacrum", "coccyx", "ilium", "pubis", "ischium", "femur", "tibia", "fibula", "talus", "calcaneus", "tarsals", "metatarsals", "phalanges"],
  defaultGuesses: 7,
  guessesRemaining: 7,
  keyPressed: '',
  lettersGuessed: [],
  losses: 0,
  wins: 0,
  wordToDisplay: "",
  wordToGuess: "",
  // game methods
  displayWord: function() {
    var lcKey = this.keyPressed.toLowerCase();
    this.wordToDisplay = "";
    for(var i = 0; i < this.wordToGuess.length; i++){
      console.log("I: " + i + ", is " + this.wordToGuess[i]);
      if (this.wordToGuess[i].indexOf(lcKey) > -1) {
        console.log("In Word");
        this.wordToDisplay += lcKey + " ";
      } else {
        console.log("Not in word");
        this.wordToDisplay += "_ ";        
      }
    }
    wordId.textContent = this.wordToDisplay;
  },
  getRandomWord: function() {
    this.wordToGuess = this.bones[Math.floor(Math.random() * this.bones.length)];
  },
  isLetter: function() {
    return (this.alphabet.indexOf(this.keyPressed.toLowerCase()) > -1)
  }


};

// Method Calls
game.getRandomWord();
console.log(game.wordToGuess);
document.onkeyup = function(event) {
  game.keyPressed = event.key;
  if (game.isLetter()) {
    game.addToGuessed();
    console.log(game.keyPressed);
    // Valid letter, continue
    game.displayWord();
  } else {
    // Not a valid letter
  }
};