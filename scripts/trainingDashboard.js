const TRAINING_ANSWERS = [
    ["Mach. 5"], 
    ["Mach. 4", "Mach. 7"], 
    ["Mach. 3", "Mach. 5", "Mach. 7"], 
    ["Mach. 2", "Mach. 10", "Mach. 11"], 
    ["Mach. 4", "Mach. 5", "Mach. 7", "Mach. 8"], 
    ["Mach. 2", "Mach. 4", "Mach. 7", "Mach. 9", "Mach. 11", "Mach. 12"]
];

const DESIGN_CONFIGS = [
    {
        "setup": "setup1",
        "setup-length": 40,
        "question-time": 12,
        "question-min-spacing": 13,
        "no-questions": [],
        "num-rows": 4,
        "num-columns": 3,
        "anim-duration": 500,
        "anim-delay": 300,
        "num-points": 12,
        "rolling-avg": 5,
        "sound": [],
        "vis-showXAxisTicks": true,
        "vis-xAxisInverseStatic": false,
        "vis-useThresholdColors": true,
        "vis-showThresholdBand": true,
        "vis-backgroundEncoding": false,
        "vis-gridBackgroundMove": false,
        "vis-showVerticalBar": false,
        "vis-useRollingAverage": false,
        "vis-easeInOut": true,
        "vis-dynamicLabelSize": "none",
        "vis-labelPosition": "integrated"
    },
    {
        "setup": "setup2",
        "setup-length": 40,
        "question-time": 12,
        "question-min-spacing": 13,
        "no-questions": [],
        "num-rows": 4,
        "num-columns": 3,
        "anim-duration": 500,
        "anim-delay": 300,
        "num-points": 12,
        "rolling-avg": 5,
        "sound": [],
        "vis-showXAxisTicks": true,
        "vis-xAxisInverseStatic": false,
        "vis-useThresholdColors": true,
        "vis-showThresholdBand": true,
        "vis-backgroundEncoding": false,
        "vis-gridBackgroundMove": false,
        "vis-showVerticalBar": false,
        "vis-useRollingAverage": false,
        "vis-easeInOut": true,
        "vis-dynamicLabelSize": "none",
        "vis-labelPosition": "side"
    },
    {
        "setup": "setup3",
        "setup-length": 40,
        "question-time": 12,
        "question-min-spacing": 13,
        "no-questions": [],
        "num-rows": 4,
        "num-columns": 3,
        "anim-duration": 500,
        "anim-delay": 300,
        "num-points": 12,
        "rolling-avg": 5,
        "sound": [],
        "vis-showXAxisTicks": true,
        "vis-xAxisInverseStatic": false,
        "vis-useThresholdColors": true,
        "vis-showThresholdBand": true,
        "vis-backgroundEncoding": false,
        "vis-gridBackgroundMove": false,
        "vis-showVerticalBar": false,
        "vis-useRollingAverage": false,
        "vis-easeInOut": true,
        "vis-dynamicLabelSize": "linear",
        "vis-labelPosition": "integrated"
    },
    {
        "setup": "setup4",
        "setup-length": 40,
        "question-time": 12,
        "question-min-spacing": 13,
        "no-questions": [],
        "num-rows": 4,
        "num-columns": 3,
        "anim-duration": 500,
        "anim-delay": 300,
        "num-points": 12,
        "rolling-avg": 5,
        "sound": [],
        "vis-showXAxisTicks": true,
        "vis-xAxisInverseStatic": false,
        "vis-useThresholdColors": true,
        "vis-showThresholdBand": true,
        "vis-backgroundEncoding": false,
        "vis-gridBackgroundMove": false,
        "vis-showVerticalBar": false,
        "vis-useRollingAverage": false,
        "vis-easeInOut": true,
        "vis-dynamicLabelSize": "ushaped",
        "vis-labelPosition": "integrated"
    },
    {
        "setup": "setup5",
        "setup-length": 40,
        "question-time": 12,
        "question-min-spacing": 13,
        "no-questions": [],
        "num-rows": 4,
        "num-columns": 3,
        "anim-duration": 500,
        "anim-delay": 300,
        "num-points": 12,
        "rolling-avg": 5,
        "sound": [],
        "vis-showXAxisTicks": true,
        "vis-xAxisInverseStatic": false,
        "vis-useThresholdColors": true,
        "vis-showThresholdBand": true,
        "vis-backgroundEncoding": false,
        "vis-gridBackgroundMove": false,
        "vis-showVerticalBar": false,
        "vis-useRollingAverage": false,
        "vis-easeInOut": true,
        "vis-dynamicLabelSize": "linear",
        "vis-labelPosition": "side"
    },
    {
        "setup": "setup6",
        "setup-length": 40,
        "question-time": 12,
        "question-min-spacing": 13,
        "no-questions": [],
        "num-rows": 4,
        "num-columns": 3,
        "anim-duration": 500,
        "anim-delay": 300,
        "num-points": 12,
        "rolling-avg": 5,
        "sound": [],
        "vis-showXAxisTicks": true,
        "vis-xAxisInverseStatic": false,
        "vis-useThresholdColors": true,
        "vis-showThresholdBand": true,
        "vis-backgroundEncoding": false,
        "vis-gridBackgroundMove": false,
        "vis-showVerticalBar": false,
        "vis-useRollingAverage": false,
        "vis-easeInOut": true,
        "vis-dynamicLabelSize": "ushaped",
        "vis-labelPosition": "side"
    }
]

const ALL_QUESTIONS = [
    {
        "id": "q1",
        "prompt": "Find the machine that has the <b>highest</b> output right now."
    },
    {
        "id": "q2",
        "prompt": "Find the machine that has the <b>lowest</b> output right now."
    },
    {
        "id": "q3",
        "prompt": "Find 1 machine that has a visible output <b>increasing</b> over time."
    },
    {
        "id": "q4",
        "prompt": "Find 1 machine that has a visible output <b>decreasing</b> over time."
    },
    {
        "id": "q5",
        "prompt": "Find 1 machine that <b>is outside of the acceptable range</b> right now."
    },
    {
        "id": "q6",
        "prompt": "Find 1 machine that <b>has been outside of the acceptable range</b> in the visible time range."
    }
]

const MACHINE_OPTIONS = [
    "Mach. 1", "Mach. 2", "Mach. 3", "Mach. 4", "Mach. 5", "Mach. 6", "Mach. 7", "Mach. 8", "Mach. 9", "Mach. 10", "Mach. 11", "Mach. 12"
]

function getPageIndex() {
    const match = window.location.pathname.match(/trainingSetup(\d+)/);
    return match ? parseInt(match[1]) - 1 : 0;
}

let config;

(function () {
    const pageIndex = getPageIndex();
    const designIndex = parseInt(sessionStorage.getItem('designIndex'));
    config = DESIGN_CONFIGS[designIndex];

    const SETUP_LENGTH = config['setup-length'];
    const ROWS = config['num-rows'];
    const COLS = config['num-columns'];
    const ANIM_DURATION = config['anim-duration'];
    const ANIM_DELAY = config['anim-delay'];
    const POINTS = config['num-points'];
    const QUESTION_STEP = 15;
    const QUESTION_TIME = 12;

    const question = ALL_QUESTIONS[pageIndex];
    const validAnswers = TRAINING_ANSWERS[pageIndex];

    const NUM_MACHINES = ROWS * COLS;
    const selectedFiles = Array.from({length: 12}, (_, i) => `Set${pageIndex + 1}Machine${i + 1}.csv`);

    function goToNextPage() {
        if (pageIndex < 5) {
            sessionStorage.setItem('trainingPageIndex', String(pageIndex + 1));
            window.location.href = 'trainingDescription.html';
        } else {
            window.location.href = 'trainingTransition.html';
        }
    }

    let step = 1;
    let questionShown = false;
    let questionAnswered = false;
    let intervalId;

    const continueBtn = document.getElementById('continueButton');
    const note = document.getElementById('buttonAnnotation');
    const timerEl = document.getElementById('questionTimer');

    Promise.all(selectedFiles.map(file => d3.csv(`data/${file}`, d3.autoType))).then((datasets) => {
        const chartsContainer = d3.select("#chartsContainer")
            .style("grid-template-rows", `repeat(${ROWS}, 1fr)`)
            .style("grid-template-columns", `repeat(${COLS}, 1fr)`);

        const { width: gridWidth , height: gridHeight } = chartsContainer.node().getBoundingClientRect();
        const wrapperRatio = config["vis-labelPosition"] === "side" ? 1.0 : 0.85;
        const cellWidth = (gridWidth / COLS) * wrapperRatio;
        const cellHeight = gridHeight / ROWS;

        console.log(wrapperRatio);
        console.log(cellWidth);

        const wrapperClass = config["vis-labelPosition"] === "side"
            ? "chart-wrapper chart-wrapper-side"
            : "chart-wrapper chart-wrapper-integrated";

        const titles = Array.from({ length: NUM_MACHINES }, (_, i) => `Machine ${i + 1}`);

        const charts = chartsContainer.selectAll("div")
            .data(d3.zip(datasets, titles))
            .join("div")
            .attr("class", config["vis-labelPosition"] === "side" ? "chart-div-side" : "chart-div")
            .append("div")
            .attr("class", wrapperClass)
            .append(([data, title]) => generateChart(
                data, 
                title, 
                cellWidth, 
                cellHeight, 
                POINTS, 
                config['rolling-avg'],
                config['vis-showXAxisTicks'], 
                config['vis-useThresholdColors'], 
                config['vis-easeInOut'],
                config['vis-xAxisInverseStatic'], 
                config['vis-backgroundEncoding'], 
                config['vis-useRollingAverage'], 
                config['vis-gridBackgroundMove'], 
                config['vis-showThresholdBand'], 
                config['vis-showVerticalBar'], 
                config['vis-dynamicLabelSize'], 
                config['vis-labelPosition']
            ))
            .nodes();

        function start() { intervalId = setInterval(animate, ANIM_DURATION + ANIM_DELAY); }
        function stop() { clearInterval(intervalId); }

        function setRetry() {
            continueBtn.disabled = false;
            continueBtn.style.backgroundColor = '#e57373';
            continueBtn.textContent = 'Retry';
            continueBtn.onclick = resetToRetry;
        }

        function setNext() {
            continueBtn.disabled = false;
            continueBtn.style.backgroundColor = '#4CAF50';
            continueBtn.textContent = 'Next';
            continueBtn.onclick = () => goToNextPage();
        }

        function resetToRetry() {
            stop();
            document.getElementById('questionContainer').innerHTML = '';
            note.textContent = '';
            continueBtn.textContent = 'Next';
            continueBtn.disabled = true;
            continueBtn.style.backgroundColor = '';
            continueBtn.onclick = null;
            if (timerEl) timerEl.textContent = '';
            questionShown = false;
            questionAnswered = false;
            step = 0;
            start();
        }

        function animate() {
            step++;

            if (step === QUESTION_STEP && !questionShown) {
                questionShown = true;
                showQuestion();
            }

            if (QUESTION_STEP == step) {
				playSound();
			}

            if (questionShown && !questionAnswered) {
                const elapsed = step - QUESTION_STEP;
                const remaining = QUESTION_TIME - 1 - elapsed;

                if (timerEl) timerEl.textContent = Math.max(remaining, 0);

                if (remaining < 0) {
                    document.getElementById('questionContainer').innerHTML = '';
                    if (timerEl) timerEl.textContent = '';
                    note.innerHTML = "Time's up<br>Please try again.";
                    setRetry();
                    questionShown = false;
                }
            }

            for (const c of charts) c.update(step, ANIM_DURATION);
            if (step + POINTS - 1 >= SETUP_LENGTH) stop();
        }

        function showQuestion() {
            const container = document.getElementById('questionContainer');
            container.innerHTML = '';

            const div = document.createElement('div');
            div.className = 'question-item';
            div.innerHTML = `<div class="question-prompt">${question.prompt}</div>`;

            const grid = document.createElement('div');
            grid.className = 'question-options-container';
            grid.style.display = 'grid';
            grid.style.gridTemplateRows = `repeat(${ROWS}, 1fr)`;
            grid.style.gridTemplateColumns = `repeat(${COLS}, 1fr)`;
            grid.style.gap = '5px';

            MACHINE_OPTIONS.forEach(opt => {
                const label = document.createElement('label');
                label.className = 'question-grid-option';
                label.innerHTML = `<input type="radio" name="${question.id}" value="${opt}"><span>${opt}</span>`;
                grid.appendChild(label);
            });

            if (timerEl) timerEl.textContent = QUESTION_TIME - 1;

            const submitButton = document.createElement('button');
            submitButton.className = 'question-submit-button';
            submitButton.textContent = 'Submit';
            submitButton.disabled = true;

            grid.addEventListener('change', () => { submitButton.disabled = false; });

            submitButton.addEventListener('click', () => {
                const sel = grid.querySelector(`input[name="${question.id}"]:checked`);
                if (sel) {
                    questionAnswered = true;
                    if (timerEl) timerEl.textContent = '';
                    submitButton.disabled = true;
                    submitButton.textContent = 'Submitted';
                    grid.querySelectorAll('input').forEach(i => i.disabled = true);
                    checkAnswer(sel.value);
                }
            });

            div.appendChild(grid);
            div.appendChild(submitButton);
            container.appendChild(div);
        }

        function playSound() {
			const audio = new Audio('beep.mp3');
			audio.volume = 0.1;
			audio.play().catch(err => console.log('Audio play failed:', err));
		}

        function checkAnswer(answer) {
            if (validAnswers.includes(answer)) {
                note.textContent = 'Correct!';
                setNext();
            } else {
                note.textContent = 'Incorrect — please try again.';
                setRetry();
            }
        }

        start();
    });
})();