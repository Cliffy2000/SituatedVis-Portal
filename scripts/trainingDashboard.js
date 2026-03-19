const TRAINING_ANSWERS = [
    ["Mach. 1"], 
    ["Mach. 1"], 
    ["Mach. 1", "Mach. 2", "Mach. 3"], 
    ["Mach. 1", "Mach. 2", "Mach. 3"], 
    ["Mach. 1", "Mach. 2", "Mach. 3"], 
    ["Mach. 1", "Mach. 2", "Mach. 3"]
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
        "prompt": "Find 1 machine that has a visible output <b>increasing</b> over time at the beginning of the question. There may be more, but please select only 1.",
        "type": "radio"
    },
    {
        "id": "q4",
        "prompt": "Find 1 machine that has a visible output <b>decreasing</b> over time at the beginning of the question. There may be more, but please select only 1."
    },
    {
        "id": "q5",
        "prompt": "Find 1 machine that <b>is outside of the acceptable range</b> right now."
    },
    {
        "id": "q6",
        "prompt": "Find 1 machine that <b>has been outside of the acceptable range in the visible time range</b> at the beginning of the question. There may be more, but please select only 1."
    }
]

const MACHINE_OPTIONS = [
    "Mach. 1", "Mach. 2", "Mach. 3", "Mach. 4", "Mach. 5", "Mach. 6", "Mach. 7", "Mach. 8", "Mach. 9", "Mach. 10", "Mach. 11", "Mach. 12"
]

const TRIAL_ORDERS = [
    [7, 3, 11, 1, 9, 5, 12, 4, 2, 10, 6, 8],   // trial 1
    [2, 10, 5, 8, 1, 12, 6, 3, 11, 7, 4, 9],   // trial 2
    [5, 12, 8, 3, 10, 2, 9, 1, 6, 11, 4, 7],   // trial 3
    [11, 4, 7, 9, 6, 1, 3, 8, 12, 2, 10, 5],   // trial 4
    [9, 6, 2, 12, 4, 8, 1, 11, 7, 3, 5, 10],   // trial 5
    [3, 8, 10, 6, 11, 7, 4, 9, 5, 1, 12, 2],   // trial 6
];

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
    const order = TRIAL_ORDERS[designIndex];
    const selectedFiles = order.map(n => `TrainingMachine${n}.csv`);

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

    const btn = document.getElementById('submitButton');
    const note = document.getElementById('buttonAnnotation');
    const timerEl = document.getElementById('questionTimer');

    Promise.all(selectedFiles.map(file => d3.csv(`data/${file}`, d3.autoType))).then((datasets) => {
        const chartsContainer = d3.select("#chartsContainer")
            .style("grid-template-rows", `repeat(${ROWS}, 1fr)`)
            .style("grid-template-columns", `repeat(${COLS}, 1fr)`);

        const { width: gridWidth , height: gridHeight } = chartsContainer.node().getBoundingClientRect();
        const wrapperRatio = config["vis-labelPosition"] === "side" ? 1.0 : 0.8;
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

        function resetToRetry() {
            stop();
            document.getElementById('questionContainer').innerHTML = '';
            note.textContent = '';
            btn.textContent = 'Submit';
            btn.disabled = true;
            btn.onclick = null;
            if (timerEl) timerEl.textContent = '';
            questionShown = false;
            questionAnswered = false;
            step = 0;
            start();
        }

        function animate() {
            step++;

            // Show question on the right step
            if (step === QUESTION_STEP && !questionShown) {
                questionShown = true;
                showQuestion();
            }

            // Timer countdown and time-up handling
            if (questionShown && !questionAnswered) {
                const elapsed = step - QUESTION_STEP;
                const remaining = QUESTION_TIME - 1 - elapsed;

                if (timerEl) timerEl.textContent = Math.max(remaining, 0);

                if (remaining < 0) {
                    // Time's up — clear question, treat as incorrect
                    document.getElementById('questionContainer').innerHTML = '';
                    if (timerEl) timerEl.textContent = '';
                    note.textContent = "Time's up — please try again.";
                    btn.textContent = 'Retry';
                    btn.disabled = false;
                    btn.onclick = resetToRetry;
                    questionShown = false; // prevent further timer updates
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
            grid.addEventListener('change', () => { btn.disabled = false; });

            div.appendChild(grid);
            container.appendChild(div);

            btn.onclick = function () {
                const sel = grid.querySelector(`input[name="${question.id}"]:checked`);
                if (sel) {
                    questionAnswered = true;
                    if (timerEl) timerEl.textContent = '';
                    checkAnswer(sel.value);
                }
            };
        }

        function checkAnswer(answer) {
            document.querySelectorAll(`input[name="${question.id}"]`).forEach(i => i.disabled = true);

            if (validAnswers.includes(answer)) {
                note.textContent = 'Correct!';
                btn.textContent = 'Next';
                btn.disabled = false;
                btn.onclick = () => goToNextPage();
            } else {
                note.textContent = 'Incorrect — please try again.';
                btn.textContent = 'Retry';
                btn.disabled = false;
                btn.onclick = resetToRetry;
            }
        }

        start();
    });
})();
