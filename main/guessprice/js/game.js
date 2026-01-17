// =======================
// VARIABLES
// =======================
let currentItem = null;
let roundFinished = false;
let currentRound = 0;       // track the round
const totalRounds = 3;      // max rounds
let scaleMax = 5;

// DOM elements
const tipText = document.getElementById("tipText");
const errorText = document.getElementById("errorText");
const errorBox = document.getElementById("errorBox");
const joker = document.querySelector(".joker");
const inputField = document.querySelector(".input-field");


const items = [
  { name: "Water", price: 1.00, image: "img/water.png" },
  { name: "notebook", price: 5.00, image: "img/notebook.png" },
  { name: "penset", price: 8.00, image: "img/penset.png" }
];


// =======================
// START GAME
// =======================
window.onload = function () {
    startGame();
};

// =======================
// RANDOM ITEM SELECTION
// =======================
function selectOneItem() {
    let index = Math.floor(Math.random() * items.length);
    currentItem = items[index];
}

// =======================
// SHOW ITEM & TIP
// =======================
function showItem() {
    const img = document.querySelector(".item");
    img.src = currentItem.image;
    tipText.innerText = `Round ${currentRound + 1}: Guess the price of ${currentItem.name}`;
    inputField.value = "";
    resetJoker();
    roundFinished = false;
}

// =======================
// RESET JOKER
// =======================
function resetJoker() {
    joker.style.left = "0%";
    joker.src = "img/joker_walk.png";
}

// =======================
// ERROR BOX
// =======================
function showError(message) {
    errorBox.style.display = "flex";
    errorText.innerText = message;
    errorBox.classList.remove("shake");
    void errorBox.offsetWidth;
    errorBox.classList.add("shake");
}

function hideError() {
    errorBox.style.display = "none";
}

// =======================
// STATUS DISPLAY
// =======================
function showStatus(guess, realPrice) {
    const difference = Math.abs(guess - realPrice);
    let message = `Your guess: $${guess.toFixed(2)} | Real price: $${realPrice.toFixed(2)} | Diff: $${difference.toFixed(2)}.`;

    if (difference <= scaleMax) {
        message += " Great job!";
    } else {
        message += " The Joker fell off!";
    }

    tipText.innerText = `Round ${currentRound + 1}: ${message}`;
}

// =======================
// MOVE JOKER
// =======================
function moveJoker(guess, realPrice) {
    const difference = Math.abs(guess - realPrice);
    let percent = (difference / scaleMax) * 100;

    if (difference > scaleMax) {
        percent = 10;
        joker.src = "img/joker_scared.png";
        playFallSound();
    } else if (difference / scaleMax > 0.7) {
        joker.src = "img/joker_scared.png";
    } else {
        joker.src = "img/joker_walk.png";
    }

    joker.style.left = `${percent}%`;

    setTimeout(() => {
        if (difference <= scaleMax) {
            joker.src = "img/joker_happy.png";
        }
    }, 1000);
}

// =======================
// FALL SOUND
// =======================
function playFallSound() {
    const audio = new Audio("sound/fall.mp3");
    audio.play();
}

// =======================
// GO BUTTON
// =======================
function go_button() {
    const inputValue = parseFloat(inputField.value);

    if (isNaN(inputValue)) {
        showError("Error: Please enter a valid number!");
        return;
    }
    else if(inputValue < 0 || inputValue > 180){
        showError("Error: Number is not in ranged!(0-180)");
        return;
    } 

    hideError();
    roundFinished = true;

    showStatus(inputValue, currentItem.price);
    moveJoker(inputValue, currentItem.price);
}

// =======================
// NEXT BUTTON
// =======================
function next_round() {
    if (!roundFinished) {
        showError("You must make a valid guess before moving to next round!");
        return;
    }
    hideError();

    currentRound++;
    if (currentRound >= totalRounds) {
        tipText.innerText = "Game Over! Click Reset to play again.";
        return;
    }
    startRound();
}

// =======================
// RESET BUTTON
// =======================
function resetGame() {
    currentRound = 0;
    startGame();
    hideError();
}

// =======================
// START ROUND / GAME
// =======================
function startRound() {
    selectOneItem();
    showItem();
}

function startGame() {
    currentRound = 0;
    startRound();
}
