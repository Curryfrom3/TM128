// Pokémon cards array (pairs of Pokémon)
const pokemonCards = [
  "pikachu", "pikachu",
  "bulbasaur", "bulbasaur",
  "charmander", "charmander",
  "squirtle", "squirtle",
  "eevee", "eevee",
  "jigglypuff", "jigglypuff"
];

// Shuffle function using Fisher-Yates algorithm
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
}

// Initialize game
function startGame() {
  shuffle(pokemonCards);
  const gameBoard = document.getElementById("game-board");
  gameBoard.innerHTML = ""; // Clear previous game

  pokemonCards.forEach((pokemon) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.pokemon = pokemon;
    card.innerHTML = `<div class="front">${pokemon}</div><div class="back">?</div>`;
    
    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
  });
}

// Game state variables
let flippedCards = [];
let matchedPairs = 0;
let lockBoard = false;

// Handle card flip
function flipCard() {
  if (lockBoard) return; // Prevent clicking while cards are being checked
  if (this.classList.contains("flipped")) return; // Prevent flipping the same card twice

  this.classList.add("flipped");
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    lockBoard = true;
    checkMatch();
  }
}

// Check if two flipped cards match
function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.pokemon === card2.dataset.pokemon) {
    // Match found
    card1.removeEventListener("click", flipCard);
    card2.removeEventListener("click", flipCard);
    matchedPairs++;
    
    if (matchedPairs === pokemonCards.length / 2) {
      setTimeout(() => alert("You win!"), 500);
    }
    resetBoard();
  } else {
    // No match, flip back after a delay
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      resetBoard();
    }, 1000);
  }
}

// Reset game state after a pair is checked
function resetBoard() {
  flippedCards = [];
  lockBoard = false;
}

// Start the game on page load
document.addEventListener("DOMContentLoaded", startGame);
