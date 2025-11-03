let count = 0; // Counts in multiples of 3: 3, 6, 9, ..., 30
let isRunning = false;
let intervalId = null;

const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const statusMsg = document.getElementById('statusMsg');

const MAX_COUNT = 30; // Maximum count in multiples of 3
const MAX_TIME = 10000; // 10 seconds in milliseconds
let elapsedTime = 0; // Track actual elapsed time

startBtn.addEventListener('click', startStopwatch);
pauseBtn.addEventListener('click', pauseStopwatch);
resetBtn.addEventListener('click', resetStopwatch);

function startStopwatch() {
    if (isRunning) return;
    
    isRunning = true;
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    statusMsg.textContent = 'Running...';
    
    intervalId = setInterval(updateStopwatch, 10);
}

function updateStopwatch() {
    elapsedTime += 10;
    
    // Calculate progress: 0 to 1
    const progress = Math.min(elapsedTime / MAX_TIME, 1);
    
    // Calculate count in multiples of 3: 3, 6, 9, ..., 30
    count = Math.floor(progress * MAX_COUNT / 3) * 3;
    
    if (count === 0) count = 3; // Start from 3, not 0
    
    if (elapsedTime >= MAX_TIME) {
        count = MAX_COUNT;
        pauseStopwatch();
        statusMsg.textContent = '⏱️ Time\'s up! (Reached 30)';
    }
    
    updateDisplay();
}

function pauseStopwatch() {
    isRunning = false;
    clearInterval(intervalId);
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    statusMsg.textContent = 'Paused';
}

function resetStopwatch() {
    clearInterval(intervalId);
    count = 0;
    elapsedTime = 0;
    isRunning = false;
    
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    statusMsg.textContent = '';
    
    updateDisplay();
}

function updateDisplay() {
    // Display count as MM:SS.MS format
    const displayCount = String(count).padStart(2, '0');
    minutesDisplay.textContent = '0';
    secondsDisplay.textContent = displayCount;
    millisecondsDisplay.textContent = '0';
}