let timer;
let timeLeft = 300; // Default to 5 minutes
let isPaused = true;
const timerDisplay = document.getElementById('timer');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const setBtn = document.getElementById('setBtn');
const minutesInput = document.getElementById('minutesInput');
const secondsInput = document.getElementById('secondsInput');
const alarmSound = document.getElementById('alarmSound');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function countdown() {
    if (!isPaused && timeLeft > 0) {
        timeLeft--;
        updateDisplay();
        if (timeLeft === 0) {
            alarmSound.play();
        }
    }
}

function startPauseTimer() {
    if (isPaused) {
        isPaused = false;
        startPauseBtn.textContent = 'Pause';
        timer = setInterval(countdown, 1000);
    } else {
        isPaused = true;
        startPauseBtn.textContent = 'Start';
        clearInterval(timer);
    }
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 300;
    isPaused = true;
    startPauseBtn.textContent = 'Start';
    updateDisplay();
}

function setTimer() {
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;
    if (!isNaN(minutes) && !isNaN(seconds) && seconds < 60) {
        clearInterval(timer);
        timeLeft = minutes * 60 + seconds;
        isPaused = true;
        startPauseBtn.textContent = 'Start';
        updateDisplay();
    }
}

startPauseBtn.addEventListener('click', startPauseTimer);
resetBtn.addEventListener('click', resetTimer);
setBtn.addEventListener('click', setTimer);

updateDisplay();
