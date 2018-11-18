var gameWords = // Word list
    [{
            "name": "yoda",
            "image": "assets/images/yoda.jpg",
            "header": "Yoda",
            "description": "Yoda was a legendary Jedi Master and stronger than most in his connection with the Force. Small in size but wise and powerful, he trained Jedi for over 800 years, playing integral roles in the Clone Wars, the instruction of Luke Skywalker, and unlocking the path to immortality."
        },
        {
            "name": "skywalker",
            "image": "assets/images/skywalker.jpg",
            "header": "The Skywalker Family",
            "description": "The Skywalker family was a Force-sensitive Human bloodline whose first known member was Shmi Skywalker. The clan contributed members to both the Old and New Jedi Orders, as well as the ranks of Sith Lords. Through several generations, the Skywalker family remained extraordinarily prominent in galactic affairs, having a significant impact on major historical events for over 150 years."
        },
        {
            "name": "vader",
            "image": "assets/images/darth_vader.jpeg",
            "header": "Darth Vader",
            "description": "Anakin Skywalker was a Force-sensitive Human male who served the Galactic Republic as a Jedi Knight and later served the Galactic Empire as the Sith Lord Darth Vader."
        },
        {
            "name": "lightsaber",
            "image": "assets/images/lightsaber.png",
            "header": "Lightsaber",
            "description": "The lightsaber is the weapon of a Jedi, an elegant weapon of a more civilized age. It can be used to cut through blast doors or enemies alike. Using the Force, a Jedi can predict and deflect incoming blaster bolts, and reflect them."
        },
        {
            "name": "emperor",
            "image": "assets/images/emperor.png",
            "header": "Emperor",
            "description": "Scheming, powerful, and evil to the core, Darth Sidious restored the Sith and destroyed the Jedi Order. Living a double life, Sidious was in fact Palpatine, a Naboo Senator and phantom menace."
        },
        {
            "name": "tatooine",
            "image": "assets/images/tatooine.jpg",
            "header": "Tatooine",
            "description": "A harsh desert world orbiting twin suns in the galaxy’s Outer Rim, Tatooine is a lawless place ruled by Hutt gangsters. Many settlers scratch out a living on moisture farms, while spaceport cities such as Mos Eisley and Mos Espa serve as home base for smugglers, criminals, and other rogues."
        }
    ]

var guessedLetters = []; // Stores the letters the user guessed correctly
var guessedArray = [];
var currentWordArray = []; // Index of the current word in the array;
var lettersNotCorrect = []; // Stores the letters correctly guessed
var remainingGuesses = 15; // How many tries the player has left        
var wins = 0; // How many wins has the player racked up
var print = "";

$(document).ready(function () {


    function init() {
        const index = Math.floor(Math.random() * gameWords.length);
        currentWordArray = gameWords[index].name.split("")
        console.log(currentWordArray);
        renderWord();
    };

    function renderWord() {
        for (var i = 0; i < currentWordArray.length; i++) {
            guessedArray.push('_');
            $("#currentWord").text(guessedArray);
        };
    };

    function checkLetter(letter) {
        var letterCorrect;

        for (var i = 0; i < currentWordArray.length; i++) {
            if (letter === currentWordArray[i]) {
                guessedArray[i] = letter;
                letterCorrect = true;
                console.log(letterCorrect);
            } else if (letter !== currentWordArray[i]) {
                letterCorrect = false;
                console.log(letterCorrect);
            }
        };

        $("#currentWord").text(guessedArray.join("  "));

        if (!letterCorrect) {
            lettersNotCorrect.push(letter);
            remainingGuesses--;
            $("#remainingGuesses").text(remainingGuesses);
            $("#guessedLetters").text(lettersNotCorrect);
            console.log(guessedArray);
            console.log(currentWordArray);
        };
        winGame();
    };

    function winGame() {

        if (guessedArray.toString() === currentWordArray.toString()) {
            for (var i = 0; i < gameWords.length; i++) {
                console.log(guessedArray.join(""));
                if (guessedArray.join("") === gameWords[i].name) {
                    console.log(gameWords[i].name);
                    $("#results").html("<img class='resultsImage' src='" + gameWords[i].image + "'>");
                    $("#results").append("<h1>" + gameWords[i].header + "</h1>");
                    $("#results").append("<p>" + gameWords[i].description + "</p>");
                    wins++;
                    $("#totalWins").text("Wins: " + wins);
                    playAgain();
                };

            };

        } else if (remainingGuesses === 0) {
            $("#results").html("<h2>You don't know the power of the Dark Side!</h2>");
            playAgain();
        }
    };

    function playAgain() {
        $(".playAgain").append("<button type='button' class='btn btn-secondary' id='playAgain'>Play Again</button>");
        $(".playAgain").on("click", function () {
            $("#currentWord").empty("");
            $("#remainingGuesses").empty("");
            $("#guessedLetters").empty("");
            $("#results").empty();
            $(".playAgain").empty();
            remainingGuesses = 15;
            currentWordArray = [];
            guessedArray = [];
            lettersNotCorrect = [];
            init();
        });
    };

    init();
    $(document).keyup(function () {

        var guessedLetter = event.key;

        if (/[a-zA-Z]/.test(guessedLetter)) {
            console.log(guessedLetter);
            checkLetter(guessedLetter);
        } else {
            alert("Invalid character. Please press an alpha character!");
        }
    });
});