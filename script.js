const colors = ['green', 'red', 'yellow', 'blue'];
let gameSequence = [];
let playerSequence = [];
let level = 0;

const startGame = () => {
    gameSequence = [];
    playerSequence = [];
    level = 0;
    nextLevel();
};

const nextLevel = () => {
    playerSequence = [];
    level++;
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    gameSequence.push(randomColor);
    playSequence();
};

const playSequence = () => {
    let delay = 0;
    gameSequence.forEach((color, index) => {
        setTimeout(() => {
            playSound(color);
            animatePress(color);
        }, delay);
        delay += 600;
    });
};

const handlePlayerInput = (color) => {
    playSound(color);
    animatePress(color);
    playerSequence.push(color);
    checkPlayerMove();
};

const checkPlayerMove = () => {
    const lastPlayerMove = playerSequence[playerSequence.length - 1];
    const expectedMove = gameSequence[playerSequence.length - 1];
    
    if (lastPlayerMove !== expectedMove) {
        playErrorSound();
        displayMessage('Game Over! You reached level ' + level);
        startGame();
        return;
    }

    if (playerSequence.length === gameSequence.length) {
        setTimeout(nextLevel, 1000);
    }
};

const playSound = (color) => {
    const audio = new Audio(`sounds/${color}.mp3`);
    audio.play();
};

const playErrorSound = () => {
    const audio = new Audio('sounds/error.mp3');
    audio.play();
};

const animatePress = (color) => {
    const button = document.getElementById(color);
    button.classList.add('active');
    setTimeout(() => {
        button.classList.remove('active');
    }, 300);
};

const displayMessage = (message) => {
    const messageBox = document.getElementById('message');
    messageBox.innerText = message;
    messageBox.style.display = 'block';
    setTimeout(() => {
        messageBox.style.display = 'none';
    }, 3000);
};

document.getElementById('green').addEventListener('click', () => handlePlayerInput('green'));
document.getElementById('red').addEventListener('click', () => handlePlayerInput('red'));
document.getElementById('yellow').addEventListener('click', () => handlePlayerInput('yellow'));
document.getElementById('blue').addEventListener('click', () => handlePlayerInput('blue'));
document.getElementById('restart').addEventListener('click', startGame);

startGame();
