// random integer helper function
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// keyboard letter button component
Vue.component("letter-button", {
    props: ["letter", "gameOver", "twoPlayers"],
    template: "<button class='keyboard-row-letter' :id='letter' :disabled='disabled' @click='clicked()'>{{ letter }}</button>",
    data: function() {
        return { 
            disabled: false 
        };
    },
    // disable button on click, send 'check' event to run check() in main vue instance
    methods: {
        clicked: function() {
            this.disabled = true;
            this.$emit("check");
        }
    },
    watch: {
        gameOver: function(newValue) {
            this.disabled = newValue;
        },
        twoPlayers: function(newValue) {
            this.disabled = false;
        }
    }
})

// main vue instance
var app = new Vue({
    el: "#app", 
    data: {
        letters: [
            ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
            ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
            ["Z", "X", "C", "V", "B", "N", "M"]
        ],
        words: [
            "BUTTERCUP",
            "TANSY",
            "PIGEON",
            "REPTILE",
            "GAWK",
            "CHARITY",
            "DELICATE",
            "OFFICIAL",
            "ALIMONY",
            "GRANOLA",
            "IMPERATIVE",
            "DENOTE",
            "ANTICIPATION",
            "EVERGREEN",
            "INTRINSIC",
            "STERILE",
            "INTESTINE",
            "AMPLIFIER"
        ],

        //currentWord will be set to random word from list above
        currentWord: "",
        // each element in this array is a letter in the word
        wordDivs: [],
        guesses: 0,
        gameOver: false,
        lose: false,
        twoPlayers: false,
        // will be set to the canvas elemend in mounted()
        canvas: "",
        // will be set to the canvas 2d context
        ctx: ""
    },//data

    methods: {
        // draws the gallows
        drawGallows: function(ctx) {
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            ctx.fillStyle = "black";
            ctx.strokeStyle = "black";
            ctx.beginPath();

            // left side
            ctx.moveTo(this.canvas.width / 10, this.canvas.height / 10);
            ctx.lineTo(this.canvas.width / 10, this.canvas.height * 0.95);
            
            // bottom
            ctx.lineTo(this.canvas.width * 0.8, this.canvas.height * 0.95);
            
            // top 
            ctx.moveTo(this.canvas.width / 10, this.canvas.height / 10);
            ctx.lineTo(this.canvas.width * 0.4, this.canvas.height / 10);

            // hanging notch
            ctx.lineTo(this.canvas.width * 0.4, this.canvas.height / 5);
            ctx.stroke();
            ctx.closePath();
        }, // draw gallows


        // fill this.wordDivs with empy strings to create orange blanks
        makeBlanks: function() {
            for (var i = 0; i < this.currentWord.length; i++) {
                this.wordDivs.push("");
            }
        },


        // draws the part of the hanging man and/or 'game over'
        updateCanvas: function(ctx) {
            // this.drawGallows(ctx);
            // draw head
            if (this.guesses === 0) {
                ctx.beginPath();
                ctx.arc(this.canvas.width * 0.4, (this.canvas.height / 5) + 20, 20, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.closePath();
            }
            //draw torso
            else if (this.guesses === 1) {
                ctx.beginPath();
                ctx.moveTo(this.canvas.width * 0.4, (this.canvas.height / 5) + 40);
                ctx.lineTo(this.canvas.width * 0.4, this.canvas.height / 2);
                ctx.stroke();
                ctx.closePath();
            }

            //draw right leg
            else if (this.guesses === 2) {
                ctx.beginPath();
                ctx.moveTo(this.canvas.width * 0.4, this.canvas.height / 2);
                ctx.lineTo((this.canvas.width * 0.4) + 30, this.canvas.height * 0.7);
                ctx.stroke();
                ctx.closePath();
            }

            //draw left leg
            else if (this.guesses === 3) {
                ctx.beginPath();
                ctx.moveTo(this.canvas.width * 0.4, (this.canvas.height / 2));
                ctx.lineTo((this.canvas.width * 0.4) - 30, this.canvas.height * 0.7);
                ctx.stroke();
                ctx.closePath();
            }

            //draw right arm
            else if (this.guesses === 4) {
                ctx.beginPath();
                ctx.moveTo(this.canvas.width * 0.4, (this.canvas.height / 5) + 55);
                ctx.lineTo((this.canvas.width * 0.4) + 35, (this.canvas.height / 2) + 10);
                ctx.stroke();
                ctx.closePath();
            }

            //draw left arm and handle game over
            else if (this.guesses === 5) {
                ctx.beginPath();
                ctx.moveTo(this.canvas.width * 0.4, (this.canvas.height / 5) + 55);
                ctx.lineTo((this.canvas.width * 0.4) - 35, (this.canvas.height / 2) + 10);
                ctx.stroke();
                ctx.closePath();

                // game over
                ctx.font = "24px Trirong, sans-serif";
                ctx.fillText("Game Over", this.canvas.width * 0.4 - 30, this.canvas.height * 0.9);
                this.gameOver = true;
                this.lose = true;

                //fill in the word with answer
                for (var i = 0; i < this.currentWord.length; i++) {
                    Vue.set(this.wordDivs, i, this.currentWord[i]);
                }
            }
            this.guesses++
        }, // updateCanvas


        check: function(letter) {
            if (!this.gameOver) {
                var guessCorrect = false;
                // check if letter is in word and fill in
                for (var i = 0; i < this.currentWord.length; i++) {
                    if (letter == this.currentWord[i]) {
                        Vue.set(this.wordDivs, i, letter);
                        guessCorrect = true;
                    }
                }

                // if no more blanks, game won
                if (!this.wordDivs.some(function(value) { return value == ""})) {
                    this.gameOver = true;
                    this.ctx.font = "24px Trirong, sans-serif";
                    this.ctx.fillText("You Win!", this.canvas.width * 0.4 - 30, this.canvas.height * 0.9);
                }

                // if wrong guess, draw man
                if (!guessCorrect) { this.updateCanvas(this.ctx); }
            }
        }, // check


        // restart game
        restart: function() {
            this.gameOver = false;
            this.lose = false;
            this.guesses = 0;
            this.wordDivs.splice(0);
            this.drawGallows(this.ctx);
            this.makeBlanks();
        }, // restart


        // resets game to one player mode and chooses word
        onePlayer: function() {
            if (this.twoPlayers) {
                this.twoPlayers = false;
                this.currentWord = this.words[randomInteger(0, this.words.length - 1)];
                this.restart();
            }
        },


        // starts 2 player mode and prompts user for word
        twoPlayer: function() {
            if (!this.twoPlayers) {
                this.gameOver = true;
                this.twoPlayers = true;
                this.wordDivs.splice(0);
                try {
                    this.currentWord = prompt("Enter a word:").toUpperCase();
                }
                catch(e) {
                    this.onePlayer();
                    return;
                }
                var letters = /^[A-Za-z]+$/;
                while (!letters.test(this.currentWord)) {
                    try {
                        this.currentWord = prompt("Only letters please. Enter a word:").toUpperCase();
                    }
                    catch(e) {
                        this.onePlayer();
                        return;
                    }
                }
                this.restart();
            }
        }, // twoPlayer


        // chooses new word and resets game
        playAgain: function() {
            if (this.twoPlayers) {
                try {
                    this.currentWord = prompt("Enter a word:").toUpperCase();
                }
                catch(e) {
                    this.onePlayer();
                    return;
                }
                var letters = /^[A-Za-z]+$/;
                while (!letters.test(this.currentWord)) {
                    try {
                        this.currentWord = prompt("Only letters please. Enter a word:").toUpperCase();
                    }
                    catch(e) {
                        this.onePlayer();
                        return;
                    }
                }
            }
            else {
                this.currentWord = this.words[randomInteger(0, this.words.length - 1)];
            }
            this.restart();
        } // play again
    }, //methods


    // identify the canvas element and initialize it, draw gallows, choose word, and draw blanks
    mounted: function() {
        this.canvas = document.getElementById("board-canvas");
        this.canvas.width = document.getElementById("board").offsetWidth;
        this.canvas.height = document.getElementById("board").offsetHeight;
        this.ctx = this.canvas.getContext("2d");
        this.ctx.lineWidth = 2;
        this.drawGallows(this.ctx);
        this.currentWord = this.words[randomInteger(0, this.words.length - 1)];
        this.makeBlanks();
    }
});
