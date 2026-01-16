// Game Data - 20 Items with realistic prices
const items = [
  { id: 1, name: "Apple", price: 1.50, image: "1.png" },
  { id: 2, name: "Banana", price: 0.79, image: "2.png" },
  { id: 3, name: "Orange", price: 2.25, image: "3.png" },
  { id: 4, name: "Milk", price: 3.99, image: "1.png" },
  { id: 5, name: "Bread", price: 2.50, image: "2.png" },
  { id: 6, name: "Cheese", price: 4.99, image: "3.png" },
  { id: 7, name: "Eggs", price: 3.50, image: "1.png" },
  { id: 8, name: "Butter", price: 4.25, image: "2.png" },
  { id: 9, name: "Coffee", price: 7.99, image: "3.png" },
  { id: 10, name: "Tea", price: 5.50, image: "1.png" },
  { id: 11, name: "Chicken", price: 8.99, image: "2.png" },
  { id: 12, name: "Fish", price: 12.50, image: "3.png" },
  { id: 13, name: "Rice", price: 4.75, image: "1.png" },
  { id: 14, name: "Pasta", price: 1.99, image: "2.png" },
  { id: 15, name: "Olive Oil", price: 9.99, image: "3.png" },
  { id: 16, name: "Tomato", price: 2.99, image: "1.png" },
  { id: 17, name: "Lettuce", price: 3.25, image: "2.png" },
  { id: 18, name: "Carrot", price: 1.75, image: "3.png" },
  { id: 19, name: "Potato", price: 2.50, image: "1.png" },
  { id: 20, name: "Onion", price: 1.99, image: "2.png" }
];

// Game State
let gameState = {
  currentRound: 0,
  totalRounds: 3,
  selectedItems: [],
  currentItemIndex: 0,
  wins: 0,
  guesses: [],
  maxScale: 5
};

// DOM Elements
const priceInput = document.getElementById("priceInput");
const goBtn = document.getElementById("goBtn");
const nextBtn = document.getElementById("nextBtn");
const resetBtn = document.getElementById("resetBtn");
const itemImage = document.getElementById("itemImage");
const itemName = document.getElementById("itemName");
const statusMessage = document.getElementById("statusMessage");
const currentRoundSpan = document.getElementById("currentRound");
const winCountSpan = document.getElementById("winCount");
const joker = document.getElementById("joker");
const mouth = document.getElementById("mouth");
const scaleSelect = document.getElementById("scaleSelect");
const finalResult = document.getElementById("finalResult");
const finalMessage = document.getElementById("finalMessage");
const finalDetails = document.getElementById("finalDetails");

// Initialize Game
function initGame() {
  gameState.currentRound = 0;
  gameState.wins = 0;
  gameState.selectedItems = [];
  gameState.guesses = [];
  selectRandomItems();
  displayRound();
  speakItemInfo();
}

// Select 3 random items for the game
function selectRandomItems() {
  gameState.selectedItems = [];
  const shuffled = [...items].sort(() => Math.random() - 0.5);
  gameState.selectedItems = shuffled.slice(0, gameState.totalRounds);
}

// Display current round
function displayRound() {
  gameState.currentItemIndex = gameState.currentRound;
  
  if (gameState.currentRound < gameState.totalRounds) {
    const item = gameState.selectedItems[gameState.currentItemIndex];
    itemImage.src = `img/${item.image}`;
    itemName.textContent = item.name;
    
    // Reset UI
    priceInput.value = "";
    priceInput.disabled = false;
    goBtn.disabled = false;
    nextBtn.disabled = true;
    statusMessage.textContent = "";
    
    // Reset joker position
    resetJokerPosition();
    resetMouthExpression();
    
    // Update round counter
    currentRoundSpan.textContent = gameState.currentRound + 1;
  }
}

// Speak item name and price
function speakItemInfo() {
  const item = gameState.selectedItems[gameState.currentItemIndex];
  const text = `${item.name}. What is the price?`;
  
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1.2;
  window.speechSynthesis.speak(utterance);
}

// Handle GO button click
goBtn.addEventListener("click", handleGuess);

function handleGuess() {
  const guessedPrice = parseFloat(priceInput.value);
  
  if (isNaN(guessedPrice) || guessedPrice < 0) {
    statusMessage.textContent = "❌ Please enter a valid price!";
    return;
  }
  
  const item = gameState.selectedItems[gameState.currentItemIndex];
  const difference = Math.abs(guessedPrice - item.price);
  const isWithinRange = difference <= gameState.maxScale;
  
  // Store guess
  gameState.guesses.push({
    itemName: item.name,
    guessedPrice: guessedPrice.toFixed(2),
    actualPrice: item.price.toFixed(2),
    difference: difference.toFixed(2),
    won: isWithinRange
  });
  
  // Move joker
  moveJoker(difference);
  
  // Display status
  displayStatus(item, guessedPrice, difference, isWithinRange);
  
  // Update wins
  if (isWithinRange) {
    gameState.wins++;
    winCountSpan.textContent = gameState.wins;
    mouth.textContent = "😊";
  } else {
    joker.classList.add("falling");
    mouth.textContent = "😱";
  }
  
  // Disable input and go button
  priceInput.disabled = true;
  goBtn.disabled = true;
  nextBtn.disabled = false;
}

// Move joker based on price difference
function moveJoker(difference) {
  const rulerContainer = document.querySelector(".ruler-container");
  const containerWidth = rulerContainer.offsetWidth;
  const maxDistance = containerWidth * 0.85;
  
  // Clamp difference to max scale
  const scaledDifference = Math.min(difference, gameState.maxScale);
  const percentage = scaledDifference / gameState.maxScale;
  const leftPosition = maxDistance * percentage;
  
  // Add scared animation when close to falling
  if (scaledDifference > gameState.maxScale * 0.8) {
    joker.classList.add("scared");
    setTimeout(() => joker.classList.remove("scared"), 400);
  }
  
  joker.style.left = leftPosition + "px";
}

// Display status message
function displayStatus(item, guessedPrice, difference, isWithinRange) {
  const message = `
    <div style="line-height: 1.8;">
      💰 Guess: $${guessedPrice.toFixed(2)}<br>
      🏷️ Real: $${item.price.toFixed(2)}<br>
      📏 Difference: $${difference.toFixed(2)}<br>
      ${isWithinRange ? "✨ Great! Within range!" : "⚠️ Too far!"}
    </div>
  `;
  statusMessage.innerHTML = message;
}

// Reset joker position
function resetJokerPosition() {
  joker.style.left = "0px";
  joker.classList.remove("falling", "scared");
}

// Reset mouth expression
function resetMouthExpression() {
  mouth.textContent = "😐";
}

// Handle NEXT button click
nextBtn.addEventListener("click", () => {
  gameState.currentRound++;
  
  if (gameState.currentRound < gameState.totalRounds) {
    displayRound();
    speakItemInfo();
  } else {
    endGame();
  }
});

// Handle RESET button click
resetBtn.addEventListener("click", () => {
  finalResult.style.display = "none";
  initGame();
});

// End game and show final result
function endGame() {
  const allWins = gameState.wins === gameState.totalRounds;
  const message = allWins ? "🎉 YOU WIN! 🎉" : "Try again!";
  const details = `You won ${gameState.wins} out of ${gameState.totalRounds} rounds!`;
  
  finalMessage.textContent = message;
  finalDetails.textContent = details;
  finalResult.style.display = "block";
  
  // Speak final result
  const utterance = new SpeechSynthesisUtterance(message);
  window.speechSynthesis.speak(utterance);
}

// Scale selection
scaleSelect.addEventListener("change", (e) => {
  gameState.maxScale = parseInt(e.target.value);
  // Update price labels dynamically if needed
});

// Start game on page load
window.addEventListener("load", initGame);
