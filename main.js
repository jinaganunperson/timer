
document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-link');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

            tab.classList.add('active');
            document.getElementById(tab.dataset.tab).classList.add('active');
        });
    });

    // Timer
    const hoursInput = document.getElementById('hours');
    const minutesInput = document.getElementById('minutes');
    const secondsInput = document.getElementById('seconds');
    const startTimerBtn = document.getElementById('start-timer');
    const pauseTimerBtn = document.getElementById('pause-timer');
    const resetTimerBtn = document.getElementById('reset-timer');

    let timerInterval;
    let timerSeconds = 0;

    startTimerBtn.addEventListener('click', () => {
        timerSeconds = parseInt(hoursInput.value) * 3600 + parseInt(minutesInput.value) * 60 + parseInt(secondsInput.value);
        if (timerSeconds > 0) {
            startTimer();
        }
    });

    pauseTimerBtn.addEventListener('click', () => {
        clearInterval(timerInterval);
    });

    resetTimerBtn.addEventListener('click', () => {
        clearInterval(timerInterval);
        hoursInput.value = '0';
        minutesInput.value = '10';
        secondsInput.value = '0';
    });

    function startTimer() {
        timerInterval = setInterval(() => {
            timerSeconds--;
            updateTimerDisplay();
            if (timerSeconds <= 0) {
                clearInterval(timerInterval);
            }
        }, 1000);
    }

    function updateTimerDisplay() {
        const h = Math.floor(timerSeconds / 3600);
        const m = Math.floor((timerSeconds % 3600) / 60);
        const s = timerSeconds % 60;
        hoursInput.value = h.toString().padStart(2, '0');
        minutesInput.value = m.toString().padStart(2, '0');
        secondsInput.value = s.toString().padStart(2, '0');
    }

    // Stopwatch
    const stopwatchDisplay = document.querySelector('.stopwatch-display');
    const startStopwatchBtn = document.getElementById('start-stopwatch');
    const pauseStopwatchBtn = document.getElementById('pause-stopwatch');
    const resetStopwatchBtn = document.getElementById('reset-stopwatch');

    let stopwatchInterval;
    let startTime;
    let pausedTime = 0;

    startStopwatchBtn.addEventListener('click', () => {
        if (!stopwatchInterval) {
            startTime = Date.now() - pausedTime;
            stopwatchInterval = setInterval(updateStopwatch, 10);
        }
    });

    pauseStopwatchBtn.addEventListener('click', () => {
        clearInterval(stopwatchInterval);
        stopwatchInterval = null;
        pausedTime = Date.now() - startTime;
    });

    resetStopwatchBtn.addEventListener('click', () => {
        clearInterval(stopwatchInterval);
        stopwatchInterval = null;
        pausedTime = 0;
        stopwatchDisplay.textContent = '00:00:00.000';
    });

    function updateStopwatch() {
        const elapsedTime = Date.now() - startTime;
        const h = Math.floor(elapsedTime / 3600000);
        const m = Math.floor((elapsedTime % 3600000) / 60000);
        const s = Math.floor((elapsedTime % 60000) / 1000);
        const ms = elapsedTime % 1000;

        stopwatchDisplay.textContent = 
            `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
    }
});
