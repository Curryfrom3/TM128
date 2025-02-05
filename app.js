// Pokémon cards array (pairs of Pokémon)
const pokemonCards = [
  "pikachu", "pikachu",
  "bulbasaur", "bulbasaur",
  "charmander", "charmander",
  "squirtle", "squirtle",
  "eevee", "eevee",
  "jigglypuff", "jigglypuff"
];

// Function to shuffle the cards randomly using Fisher-Yates algorithm
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // Pick a random index
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
}

// Game state variables
let flippedCards = [];  // Stores the two flipped cards for comparison
let matchedPairs = 0;   // Keeps track of matched pairs
let lockBoard = false;  // Prevents multiple clicks while checking matches
let moves = 0;          // Move counter
const moveCounter = document.getElementById("move-counter"); // Selecting the move counter from HTML

// Function to initialize the game
function startGame() {
  moves = 0; // Reset moves at the beginning of each game
  document.getElementById("move-counter").textContent = "Moves: 0"; // Reset the move counter UI
  matchedPairs = 0; // Reset matched pairs
  shuffle(pokemonCards); // Shuffle the cards randomly

  const gameBoard = document.getElementById("game-board");
  gameBoard.innerHTML = ""; // Clear the board before reloading new cards

  // Loop through each Pokémon in the shuffled array and create a card
  pokemonCards.forEach((pokemon) => {
    const card = document.createElement("div"); // Create a new card div
    card.classList.add("card"); // Add the 'card' class for styling
    card.dataset.pokemon = pokemon; // Store Pokémon name as a dataset attribute

    // Create the front and back faces of the card
    card.innerHTML = `
      <div class="front"><img src="images/${pokemon}.png" alt="${pokemon}"></div>
      <div class="back"><img src="images/pokeball11.png" alt="Pokeball"></div>
    `;

    card.addEventListener("click", flipCard); // Add event listener for flipping
    gameBoard.appendChild(card); // Add card to the game board
  });
}

// Function to handle card flipping
function flipCard() {
  if (lockBoard) return; // Prevent clicking when board is locked (checking match)
  if (this.classList.contains("flipped")) return; // Prevent flipping the same card twice

  this.classList.add("flipped"); // Add the 'flipped' class for styling
  flippedCards.push(this); // Add this card to the flippedCards array

  if (flippedCards.length === 2) { // When two cards are flipped
    moves++; // Increase move count
    moveCounter.textContent = `Moves: ${moves}`; // Update the UI with the move count
    lockBoard = true; // Lock the board to prevent more clicks
    checkMatch(); // Call function to check if the cards match
  }
}

// Function to check if two flipped cards match
function checkMatch() {
  const [card1, card2] = flippedCards; // Destructure the two flipped cards

  if (card1.dataset.pokemon === card2.dataset.pokemon) {
    // If the Pokémon match, keep them flipped and remove click event
    card1.removeEventListener("click", flipCard);
    card2.removeEventListener("click", flipCard);
    matchedPairs++; // Increase the number of matched pairs

    // Check if all pairs are matched to end the game
    if (matchedPairs === pokemonCards.length / 2) {
      setTimeout(() => alert(`You win! Total moves: ${moves}`), 500);
    }

    resetBoard(); // Reset for the next turn
  } else {
    // If no match, flip the cards back after a short delay
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      resetBoard(); // Reset for the next turn
    }, 1000);
  }
}

// Function to reset the board state after a turn
function resetBoard() {
  flippedCards = []; // Clear the flipped cards array
  lockBoard = false; // Unlock the board to allow new clicks
}

function restartGame() {
  // Reset game state
  moves = 0;
  matchedPairs = 0;
  flippedCards = [];
  lockBoard = false;

  // Reset move counter UI
  document.getElementById("move-counter").textContent = "Moves: 0";

  // Start a new game
  startGame();
}


// Start the game when the page is fully loaded
document.addEventListener("DOMContentLoaded", startGame);
document.getElementById("restart-button").addEventListener("click", restartGame);

