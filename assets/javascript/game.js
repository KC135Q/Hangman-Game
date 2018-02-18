// Global Variables
var wordId = document.getElementById("word");
var messageId = document.getElementById("message");
var lettersId = document.getElementById("letters");
var winsId = document.getElementById("wins");
var lossesId = document.getElementById("losses");
var pressId = document.getElementById("press");
var guessesRemainingId = document.getElementById("remaining");
var skeletonId = document.getElementById("skeleton");

var doorOpening = new Audio("./assets/sounds/door_creak_closing.wav"); // buffers automatically when created
var ghost = new Audio("./assets/sounds/ghost01.wav");
var wickedWitch = new Audio("./assets/sounds/wickedwitchlaugh.wav");
var boo = new Audio("./assets/sounds/sfxboo.wav");
var happy = new Audio("./assets/sounds/happykids.wav");

// Object Definitions
var game = {
  // game properties
  alphabet: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
  bones: ["cranium", "mandible", "maxilla", "clavicle", "scapula", "humerus", "radius", "ulna", "carpals", "metacarpals", "phalanges", "sternum", "ribs", "cervical", "thoracic", "lumbar", "sacrum", "coccyx", "ilium", "pubis", "ischium", "femur", "tibia", "fibula", "talus", "calcaneus", "tarsals", "metatarsals", "phalanges"],
  correctLetterCount: 0,
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
  addToGuessed: function () {
    // if keyPressed not in wordToGuesss and not in lettersGuessed then decrease guesses remaining
    if (this.wordToGuess.indexOf(this.keyPressed) < 0 && this.lettersGuessed.indexOf(this.keyPressed) < 0) {
      this.guessesRemaining--;
      skeletonId.src = "./assets/images/human-skeleton-" + this.guessesRemaining + ".gif";
    }
    // check to see if the letter was already guessed
    if (this.lettersGuessed.indexOf(this.keyPressed) == -1) {
      // Not guessed yet so add to array
      this.lettersGuessed.push(this.keyPressed);
    }
  },
  checkProgress: function () {
    // if guesses remaining < 1 then gameState = "lost"
    if (this.guessesRemaining < 1) {
      this.gameState = "lost";
      this.reset();
    }
    // if correctLetterCount = wordToGuess.length gameState = "won"
    if (this.correctLetterCount == this.wordToGuess.length) {
      this.gameState = "won";
      this.reset();
    }
    guessesRemainingId.textContent = this.guessesRemaining;
    this.showStats();
  },
  displayWord: function () {
    this.wordToDisplay = "";
    this.correctLetterCount = 0;
    for (var i = 0; i < this.wordToGuess.length; i++) {
      if (this.lettersGuessed.indexOf(this.wordToGuess[i]) > -1) {
        this.wordToDisplay += this.wordToGuess[i] + " ";
        this.correctLetterCount++;
      } else {
        this.wordToDisplay += "_ ";
      }
    }
    wordId.textContent = this.wordToDisplay;
  },
  displayLettersGuessed: function() {
    var lettersGuessedDisplay = "[";
    for (var i = 0; i < this.lettersGuessed.length; i++){
      lettersGuessedDisplay += " " + this.lettersGuessed[i];
    }
    lettersGuessedDisplay += " ]";
    lettersId.textContent = lettersGuessedDisplay;
  },
  getRandomWord: function () {
    this.wordToGuess = this.bones[Math.floor(Math.random() * this.bones.length)];
  },
  isLetter: function () {
    return (this.alphabet.indexOf(this.keyPressed.toLowerCase()) > -1);
  },
  reset: function () {
    this.guessesRemaining = this.defaultGuesses;
    if (this.gameState == "won") {
      // Won
      this.wins++;
      messageId.textContent = "It's a bone you lucky dog!";
      happy.play();
    } else {
      // Lost
      this.losses++;
      messageId.textContent = "Sorry, better luck  next time!";
      if (this.lettersGuessed.length % 2 == 0) {
        wickedWitch.play();
      } else {
        boo.play();
      }
    }
    this.lettersGuessed = [];
    pressId.textContent = "Press any key to play again";
    winsId.textContent = this.wins;
    lossesId.textContent = this.losses;
    this.gameState = "start";
  },
  showStats: function () {
    console.log("correctLetterCount " + this.correctLetterCount);
    console.log("defaultGuesses " + this.defaultGuesses);
    console.log("gameState " + this.gameState);
    console.log("guessesRemaining " + this.guessesRemaining);
    console.log("keyPressed " + this.keyPressed);
    console.log("lettersGuessed " + this.lettersGuessed);
    console.log("losses " + this.losses);
    console.log("wins " + this.wins);
    console.log("wordToDisplay " + this.wordToDisplay);
    console.log("wordToGuess " + this.wordToGuess);
  },
  start: function () {
    doorOpening.play();
    doorOpening.onended = function(){
      ghost.play();
    };
    
    this.gameState = 'playing';
    this.getRandomWord();
    console.log(game.wordToGuess);
    this.displayWord();
    messageId.textContent = "Break a Leg!";
  },
  turn: function() {
    this.addToGuessed();
    this.displayWord();
    this.displayLettersGuessed();
    this.checkProgress();
  }
};

// Method Calls
document.onkeyup = function (event) {
  game.keyPressed = event.key.toLowerCase();
  console.log(game.keyPressed);
  // Check to see if the key pressed is a letter
  if (game.isLetter()) {
    switch (game.gameState) {
      case "start":
        game.start();
        break;
      case "playing":
        game.turn();
        break;
      default:
        game.reset();
    }
  }
};