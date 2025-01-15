// Balloon container and pump
const balloonContainer = document.getElementById("balloon-container");
const pump = document.getElementById("pump");

// Arrays for balloon graphics and alphabets
const balloonAlphabets = [
  "assets/Symbol 10001.png",
  "assets/Symbol 10002.png",
  "assets/Symbol 10003.png",
  "assets/Symbol 10004.png",
  "assets/Symbol 10005.png",
  "assets/Symbol 10006.png"
];
const balloonColors = [
  "assets/Symbol 100001.png",
  "assets/Symbol 100002.png",
  "assets/Symbol 100003.png",
  "assets/Symbol 100004.png",
  "assets/Symbol 100005.png",
  "assets/Symbol 100006.png"
];

// Function to generate a random integer between min and max
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to create a balloon
function createBalloon() {
  const balloon = document.createElement("div");
  balloon.classList.add("balloon");

  // Set initial position near the pump (slightly left of the middle of the pump)
  const pumpRect = pump.getBoundingClientRect();
  const size = getRandomInt(100, 150); // Balloon diameter
  const posX = pumpRect.left + pumpRect.width / 2 - size / 2 - 20; // Slightly left of the middle of the pump
  const posY = pumpRect.top + pumpRect.height / 2 - size / 2; // Vertically centered to the pump

  // Set balloon style
  balloon.style.width = `${size}px`;
  balloon.style.height = `${size}px`; // Make it a perfect circle
  balloon.style.left = `${posX}px`;
  balloon.style.top = `${posY}px`; // Balloon starts from the adjusted position

  // Add balloon graphic
  const balloonImg = document.createElement("img");
  const randomColor = balloonColors[getRandomInt(0, balloonColors.length - 1)];
  balloonImg.src = randomColor;
  balloonImg.alt = "Balloon";
  balloonImg.style.width = "100%";
  balloonImg.style.height = "100%";
  balloonImg.style.position = "absolute"; // Ensure it fills the balloon div

  // Add alphabet overlay
  const alphabetImg = document.createElement("img");
  const randomAlphabet = balloonAlphabets[getRandomInt(0, balloonAlphabets.length - 1)];
  alphabetImg.src = randomAlphabet;
  alphabetImg.alt = "Alphabet";
  alphabetImg.classList.add("alphabet");

  // Append images to balloon and add to container
  balloon.appendChild(balloonImg);
  balloon.appendChild(alphabetImg);
  balloonContainer.appendChild(balloon);

  // Animate balloon moving horizontally to the left
  setTimeout(() => {
    balloon.style.transition = "all 10s linear"; // Adjust the time to make it move slower
    balloon.style.left = `-100px`; // Move to the left off the screen
    balloon.style.top = `${getRandomInt(50, 150)}px`; // Random vertical position
  }, 100);

  // Add tap-to-burst functionality
  balloon.addEventListener("click", () => {
    balloon.remove(); // Remove balloon on click
    playPopSound(); // Play pop sound effect
  });
}

// Function to simulate balloon inflation on pump click
function inflateBalloons() {
  createBalloon(); // Add a balloon to the screen
}

// Add pump click event listener
pump.addEventListener("click", inflateBalloons);

// Optional: Play a pop sound when balloon is burst
function playPopSound() {
  const popSound = new Audio("assets/pop.mp3");
  popSound.currentTime = 0; // Reset sound to start
  popSound.play();
}
