// Puzzle Game Logic
const EMPTY_PIECE = 3;
const solution = [1, 2, 3, 4, 5, 6, 7, 8, 9];

let currentState = [...solution];
let tiles = [];
let moves = 0;
let timer = 0;
let timerInterval;
let isPlaying = false;
let currentDifficulty = 'medium';

const difficultySettings = {
    easy: 5,
    medium: 10,
    hard: 20
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    skipToGame();
});

function skipToGame() {
    const envelopeStage = document.getElementById('envelopeStage');
    
    // Hide envelope immediately, no animation
    envelopeStage.style.display = 'none';
    document.body.classList.add('show-modal');
    
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            document.getElementById('puzzleView').classList.add('visible');
            initPuzzle();
        });
    });
}

function initPuzzle() {
    stopTimer(); // Stop any existing timer first
    currentState = [...solution];
    moves = 0;
    timer = 0;
    isPlaying = true;
    document.getElementById('movesDisplay').textContent = '0';
    document.getElementById('timerDisplay').textContent = '0:00';
    
    scramblePuzzle();
    renderPuzzle();
    startTimer();
}

function scramblePuzzle() {
    const scrambles = difficultySettings[currentDifficulty];
    for (let i = 0; i < scrambles; i++) {
        const emptyIndex = currentState.indexOf(EMPTY_PIECE);
        const validMoves = getValidMoves(emptyIndex);
        const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)];
        [currentState[emptyIndex], currentState[randomMove]] = [currentState[randomMove], currentState[emptyIndex]];
    }
}

function getValidMoves(emptyIndex) {
    const validMoves = [];
    const row = Math.floor(emptyIndex / 3);
    const col = emptyIndex % 3;
    
    if (row > 0) validMoves.push(emptyIndex - 3);
    if (row < 2) validMoves.push(emptyIndex + 3);
    if (col > 0) validMoves.push(emptyIndex - 1);
    if (col < 2) validMoves.push(emptyIndex + 1);
    
    return validMoves;
}

function renderPuzzle() {
    const puzzleGrid = document.getElementById('puzzleGrid');
    puzzleGrid.innerHTML = '';
    tiles = [];
    
    currentState.forEach((piece, index) => {
        const tile = document.createElement('div');
        tile.className = 'puzzle-tile';
        
        if (piece === EMPTY_PIECE) {
            tile.classList.add('empty');
        } else {
            tile.style.backgroundImage = `url('assets/puzzle/tile-${piece}.png')`;
            tile.onclick = () => moveTile(index);
        }
        
        puzzleGrid.appendChild(tile);
        tiles.push(tile);
    });
}

function moveTile(index) {
    if (!isPlaying) return;
    
    const emptyIndex = currentState.indexOf(EMPTY_PIECE);
    const validMoves = getValidMoves(emptyIndex);
    
    if (validMoves.includes(index)) {
        [currentState[emptyIndex], currentState[index]] = [currentState[index], currentState[emptyIndex]];
        moves++;
        document.getElementById('movesDisplay').textContent = moves;
        renderPuzzle();
        
        if (isPuzzleSolved()) {
            stopTimer();
            setTimeout(onPuzzleSolved, 300);
        }
    }
}

function isPuzzleSolved() {
    return currentState.every((tile, index) => tile === solution[index]);
}

function onPuzzleSolved() {
    isPlaying = false;
    const puzzleContainer = document.getElementById('puzzleContainer');
    const puzzleGridWrap = document.getElementById('puzzleGridWrap');
    const puzzleRevealText = document.getElementById('puzzleRevealText');
    const puzzleFullImageOverlay = document.getElementById('puzzleFullImageOverlay');
    const puzzleGrid = document.getElementById('puzzleGrid');
    const emptyTile = puzzleGrid.querySelector('.puzzle-tile.empty');
    
    if (emptyTile) emptyTile.style.backgroundImage = "url('assets/puzzle/tile-3.png')";
    puzzleContainer.classList.add('completed');
    puzzleGrid.classList.add('merging');
    
    setTimeout(() => {
        puzzleFullImageOverlay.classList.add('show');
        setTimeout(() => {
            puzzleGridWrap.classList.add('revealing');
            puzzleRevealText.classList.add('show');
        }, 250);
    }, 280);
}

function startTimer() {
    timerInterval = setInterval(() => {
        timer++;
        updateTimerDisplay();
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    document.getElementById('timerDisplay').textContent = 
        `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function changeDifficulty() {
    if (isPlaying) {
        if (confirm('Changing difficulty will restart the game. Continue?')) {
            currentDifficulty = document.getElementById('difficultySelect').value;
            startNewGame();
        } else {
            document.getElementById('difficultySelect').value = currentDifficulty;
        }
    } else {
        currentDifficulty = document.getElementById('difficultySelect').value;
    }
}

function startNewGame() {
    stopTimer();
    initPuzzle();
}

function showSolution() {
    document.getElementById('solutionModal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeSolution() {
    document.getElementById('solutionModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Yes button handler
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const yesBtn = document.getElementById('yesBtn');
        if (yesBtn) {
            yesBtn.addEventListener('click', () => {
                stopTimer();
                runConfettiFor(10000);
                const container = document.querySelector('.container');
                const puzzleView = document.getElementById('puzzleView');
                const successView = document.getElementById('successView');
                
                container.classList.add('container--success');
                puzzleView.classList.remove('visible');
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => successView.classList.add('visible'));
                });
            });
        }
        
        const resetBtn = document.getElementById('resetBtn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                const container = document.querySelector('.container');
                const puzzleView = document.getElementById('puzzleView');
                const successView = document.getElementById('successView');
                const puzzleContainer = document.getElementById('puzzleContainer');
                const puzzleGrid = document.getElementById('puzzleGrid');
                const puzzleGridWrap = document.getElementById('puzzleGridWrap');
                const puzzleFullImageOverlay = document.getElementById('puzzleFullImageOverlay');
                const puzzleRevealText = document.getElementById('puzzleRevealText');
                
                // Reset all CSS classes from completed state
                puzzleContainer.classList.remove('completed');
                puzzleGrid.classList.remove('merging');
                puzzleGridWrap.classList.remove('revealing');
                puzzleFullImageOverlay.classList.remove('show');
                puzzleRevealText.classList.remove('show');
                
                // Hide success view and show puzzle view
                successView.classList.remove('visible');
                container.classList.remove('container--success');
                puzzleView.classList.add('visible');
                
                // Ensure isPlaying is set to true before starting
                isPlaying = true;
                
                // Restart the game properly (clears old timer first)
                startNewGame();
            });
        }
    }, 100);
});

function runConfettiFor(ms) {
    const end = Date.now() + ms;
    function tick() {
        if (Date.now() < end) {
            createConfetti();
            setTimeout(tick, 80);
        }
    }
    tick();
}

function createConfetti() {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.top = '-10px';
    confetti.style.background = ['#f093fb', '#f5576c', '#ffd700', '#4facfe', '#FFDAE9'][Math.floor(Math.random() * 5)];
    const duration = 2 + Math.random() * 2;
    confetti.style.animation = `confetti-fall ${duration}s linear`;
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), (duration + 0.5) * 1000);
}

// Close solution modal on outside click
window.addEventListener('click', function(event) {
    const modal = document.getElementById('solutionModal');
    if (event.target === modal) {
        closeSolution();
    }
});

// Go back to options
function goBack() {
    stopTimer();
    isPlaying = false;
    window.location.href = 'options.html';
}
