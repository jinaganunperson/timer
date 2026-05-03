
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
    const stopTimerBtn = document.getElementById('stop-timer');
    const resetTimerBtn = document.getElementById('reset-timer');

    let timerInterval;
    let timerSeconds = 0;

    function setInputsDisabled(disabled) {
        hoursInput.disabled = disabled;
        minutesInput.disabled = disabled;
        secondsInput.disabled = disabled;
    }

    startTimerBtn.addEventListener('click', () => {
        if (timerSeconds === 0) { // Only set from inputs if timer is not already running/paused
            timerSeconds = parseInt(hoursInput.value) * 3600 + parseInt(minutesInput.value) * 60 + parseInt(secondsInput.value);
        }

        if (timerSeconds > 0) {
            startTimer();
            setInputsDisabled(true);
        }
    });

    stopTimerBtn.addEventListener('click', () => {
        clearInterval(timerInterval);
        setInputsDisabled(false);
    });

    resetTimerBtn.addEventListener('click', () => {
        clearInterval(timerInterval);
        hoursInput.value = '0';
        minutesInput.value = '10';
        secondsInput.value = '0';
        timerSeconds = 0;
        setInputsDisabled(false);
    });

    function startTimer() {
        clearInterval(timerInterval); // Ensure no multiple intervals are running
        timerInterval = setInterval(() => {
            timerSeconds--;
            updateTimerDisplay();
            if (timerSeconds <= 0) {
                clearInterval(timerInterval);
                setInputsDisabled(false);
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
    const resetStopwatchBtn = document.getElementById('reset-stopwatch');

    let stopwatchInterval;
    let startTime;
    let pausedTime = 0;

    startStopwatchBtn.addEventListener('click', () => {
        if (stopwatchInterval) { // If running, stop it
            clearInterval(stopwatchInterval);
            stopwatchInterval = null;
            pausedTime = Date.now() - startTime;
            startStopwatchBtn.textContent = 'Start';
        } else { // If stopped, start it
            startTime = Date.now() - pausedTime;
            stopwatchInterval = setInterval(updateStopwatch, 10);
            startStopwatchBtn.textContent = 'Stop';
        }
    });

    resetStopwatchBtn.addEventListener('click', () => {
        clearInterval(stopwatchInterval);
        stopwatchInterval = null;
        pausedTime = 0;
        stopwatchDisplay.textContent = '00:00:00.00';
        startStopwatchBtn.textContent = 'Start';
    });

    function updateStopwatch() {
        const elapsedTime = Date.now() - startTime;
        const h = Math.floor(elapsedTime / 3600000);
        const m = Math.floor((elapsedTime % 3600000) / 60000);
        const s = Math.floor((elapsedTime % 60000) / 1000);
        const cs = Math.floor((elapsedTime % 1000) / 10);

        stopwatchDisplay.textContent = 
            `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${cs.toString().padStart(2, '0')}`;
    }
});
