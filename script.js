let count = 0; // Counts in multiples of 3: 0, 3, 6, 9, ..., 30
let isRunning = false;
let intervalId = null;

const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const statusMsg = document.getElementById('statusMsg');

const INCREMENT = 3; // Increment by 3 every second
const UPDATE_INTERVAL = 1000; // Update every 1 second
const MAX_COUNT = 30; // Maximum count

startBtn.addEventListener('click', startStopwatch);
pauseBtn.addEventListener('click', pauseStopwatch);
resetBtn.addEventListener('click', resetStopwatch);

function startStopwatch() {
    if (isRunning) return;
    
    isRunning = true;
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    statusMsg.textContent = 'Running...';
    
    intervalId = setInterval(updateStopwatch, UPDATE_INTERVAL);
}

function updateStopwatch() {
    // Increment by 3 every second
    count += INCREMENT;
    
    if (count >= MAX_COUNT) {
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
