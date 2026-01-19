// =======================
// VARIABLES
// =======================
let currentItem = null;
let roundFinished = false;
let currentRound = 0;       // track the round
const totalRounds = 3;      // max rounds


// DOM elements
const tipText = document.getElementById("tipText");
const errorText = document.getElementById("errorText");
const errorBox = document.getElementById("errorBox");
const joker = document.querySelector(".joker");
const inputField = document.querySelector(".input-field");

// export the items lists
const items = [
  { name: "Water", price: 1.00, image: "img/water.png" },
  { name: "notebook", price: 5.00, image: "img/notebook.png" },
  { name: "penset", price: 8.00, image: "img/penset.png" },
  { name: "backpack", price: 50.00, image: "img/backpack.png" },
  { name: "bicycle", price: 180.00, image: "img/bicycle.png" },
  { name: "blueteeth speaker", price: 40.00, image: "img/blueteeth speaker.png" },
  { name: "camera", price: 175.00, image: "img/camera.png" },
  { name: "coffee mug", price: 12.00, image: "img/coffee mug.png" },
  { name: "headphone", price: 25.00, image: "img/headphone.png" },
  { name: "jacket", price: 100.00, image: "img/jacket.png" },
  { name: "keyboard", price: 130.00, image: "img/keyboard.png" },
  { name: "laptop", price: 160.00, image: "img/laptop.png" },
  { name: "monitor", price: 170.00, image: "img/monitor.png" },
  { name: "blueteeth speaker", price: 40.00, image: "img/blueteeth speaker.png" },
  { name: "smartphone", price: 155.00, image: "img/smartphone.png" },
  { name: "smartwatch", price: 80.00, image: "img/smartwatch.png" },
  { name: "sneaker", price: 65.00, image: "img/sneakers.png" },
  { name: "tablet", price: 120.00, image: "img/tablet.png" },
  { name: "tshirt", price: 15.00, image: "img/tshirt.png" },
  { name: "wireless earbuds", price: 90.00, image: "img/wireless earbuds.png" }

  
  
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
    joker.style.left = "-5%";
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

    if (difference <= 5) {
        message += " Great job!";
    } else if(difference > 18) {
        message += " The Joker fell off!";
        joker.style.left = "150%"
    }
    else {
        message += " Not bad or good";
        
    }

    tipText.innerText = `Round ${currentRound + 1}: ${message}`;
}

// =======================
// MOVE JOKER
// =======================
function moveJoker(guess) {
    const realPrice = currentItem.price;
    const difference = Math.abs(guess - realPrice);

    let percent; // Joker horizontal position in %

    if (difference > 18) {
        // Joker falls off the screen if too far off
        percent = 150; // way off screen
        joker.src = "img/joker_scared.png"; // change to fall image
        playFallSound();
    } else {
        // Map guess (0–max price) to 0–100% of screen
        const maxPrice = 180; // highest possible price in your items
        percent = (guess / maxPrice) * 100;

        // Change expression based on closeness
        if (difference === 0) {
            joker.src = "img/joker_happy.png";
        } else if (difference <= 5) {
            joker.src = "img/joker_walk.png";
        } else {
            joker.src = "img/joker_scared.png";
        }
    }

    // Move Joker
    joker.style.left = `${percent + 20}%`;
    joker.style.transform = 'translateX(-50%)'; // keep centered
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
    } else if(inputValue < 0 || inputValue > 180){
        showError("Error: Number is not in range (0-180)");
        return;
    } 

    hideError();
    roundFinished = true;

    showStatus(inputValue, currentItem.price);
    moveJoker(inputValue); // pass only the guess
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
// thank you for your checking!