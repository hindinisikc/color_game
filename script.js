let score = 0;
let currentColor = "";
let countdown = 3;
let gameTime = 10; // Timer set to 10 seconds
let countdownInterval;
let colorTimeout;
let gameTimerInterval;
let boxMoveInterval; // To control box movement

function startGame() {
    document.getElementById("startButton").style.display = "none"; // Hide start button
    resetGame();
    startCountdown();
    moveColorBoxes(); // Start moving boxes
    boxMoveInterval = setInterval(moveColorBoxes, 300); // Faster box movement every 0.3s
    startGameTimer(); // Start the game timer
    boxMoveSpeed = 1000; // Reset speed when game starts
    updateBoxSpeed(); // Start moving boxes
}

function resetGame() {
    score = 0;
    gameTime = 10;
    document.getElementById("score").textContent = score;
    document.getElementById("gameTimer").textContent = gameTime;
}

function startCountdown() {
    let selectedBox = document.getElementById("selectedColorBox");
    selectedBox.style.backgroundColor = "white";
    countdown = 3;
    selectedBox.textContent = countdown;

    clearInterval(countdownInterval);
    countdownInterval = setInterval(() => {
        countdown--;
        selectedBox.textContent = countdown;

        if (countdown <= 0) {
            clearInterval(countdownInterval);
            callRandomColor();
        }
    }, 1000);
}

function callRandomColor() {
    const colors = ["red", "blue", "green"];
    currentColor = colors[Math.floor(Math.random() * colors.length)];

    let selectedBox = document.getElementById("selectedColorBox");
    selectedBox.textContent = ""; // Remove text
    selectedBox.style.backgroundColor = currentColor; // Change background to selected color

    // Reset color after 1 second if no click is made
    clearTimeout(colorTimeout);
    colorTimeout = setTimeout(() => {
        currentColor = "";
        selectedBox.style.backgroundColor = "white"; // Reset to white when no color is selected
        startCountdown();
    }, 1000);
}

// Function to handle player clicks and adjust box speed
function selectColor(color) {
    if (color === currentColor) {
        score++;
        document.getElementById("score").textContent = score;

        // Speed up box movement every 3 points (limit to 150ms min speed)
        if (score % 3 === 0 && boxMoveSpeed > 150) {
            boxMoveSpeed -= 100; // Increase speed
            updateBoxSpeed(); // Apply new speed
        }
    } else {
        score = Math.max(0, score - 1); // Apply penalty for wrong click
        document.getElementById("score").textContent = score;
    }
}

// Function to move color boxes randomly
function moveColorBoxes() {
    const boxes = document.querySelectorAll(".box");
    boxes.forEach((box) => {
        let x = Math.random() * (window.innerWidth - 100);
        let y = Math.random() * (window.innerHeight - 100);
        box.style.position = "absolute";
        box.style.left = `${x}px`;
        box.style.top = `${y}px`;
    });
}

// Function to update box movement speed dynamically
function updateBoxSpeed() {
    clearInterval(boxMoveInterval); // Clear previous interval

    // Set a new interval with an updated speed
    boxMoveInterval = setInterval(moveColorBoxes, boxMoveSpeed);
}


function startGameTimer() {
    clearInterval(gameTimerInterval);
    gameTimerInterval = setInterval(() => {
        if (gameTime > 0) {
            gameTime--;
            document.getElementById("gameTimer").textContent = gameTime;
        } else {
            clearInterval(gameTimerInterval);
            clearInterval(boxMoveInterval); // Stop moving boxes
            endGame();
        }
    }, 6000);
}

function endGame() {
    alert(`Game Over! Your final score is: ${score}`);
    document.getElementById("startButton").style.display = "block"; // Show start button again
}
