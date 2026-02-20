const TRAINING_ANSWERS = [
    [[4],     [6],     [7],     [12],    [2],     [7]    ],  // q1
    [[8],     [3],     [1],     [4],     [12],    [12]   ],  // q2
    [[1,2,3], [1,2,3], [1,2,3], [1,2,3], [1,2,3], [1,2,3]], // q3
    [[1,2,3], [1,2,3], [1,2,3], [1,2,3], [1,2,3], [1,2,3]], // q4
    [[1],     [1],     [1],     [1],     [1],     [1]    ],  // q5
    [[1,2,3], [1,2,3], [1,2,3], [1,2,3], [1,2,3], [1,2,3]], // q6
];

// Questions definition (matches config.json)
const ALL_QUESTIONS = [
    {
        id: "q1",
        prompt: "Find the machine that has the highest output right now.",
        type: "radio",
        area: "machine",
        options: ["Mach. 1","Mach. 2","Mach. 3","Mach. 4","Mach. 5","Mach. 6","Mach. 7","Mach. 8","Mach. 9","Mach. 10","Mach. 11","Mach. 12"]
    },
    {
        id: "q2",
        prompt: "Find the machine that has the lowest output right now.",
        type: "radio",
        area: "machine",
        options: ["Mach. 1","Mach. 2","Mach. 3","Mach. 4","Mach. 5","Mach. 6","Mach. 7","Mach. 8","Mach. 9","Mach. 10","Mach. 11","Mach. 12"]
    },
    {
        id: "q3",
        prompt: "Find 3 machines that have an overall output increasing over time. There may be more, but please select only 3.",
        type: "checkbox",
        area: "machine",
        options: ["Mach. 1","Mach. 2","Mach. 3","Mach. 4","Mach. 5","Mach. 6","Mach. 7","Mach. 8","Mach. 9","Mach. 10","Mach. 11","Mach. 12"]
    },
    {
        id: "q4",
        prompt: "Find 3 machines that have an overall output decreasing over time. There may be more, but please select only 3.",
        type: "checkbox",
        area: "machine",
        options: ["Mach. 1","Mach. 2","Mach. 3","Mach. 4","Mach. 5","Mach. 6","Mach. 7","Mach. 8","Mach. 9","Mach. 10","Mach. 11","Mach. 12"]
    },
    {
        id: "q5",
        prompt: "Find 1 machine that is outside of the acceptable range right now.",
        type: "radio",
        area: "machine",
        options: ["Mach. 1","Mach. 2","Mach. 3","Mach. 4","Mach. 5","Mach. 6","Mach. 7","Mach. 8","Mach. 9","Mach. 10","Mach. 11","Mach. 12"]
    },
    {
        id: "q6",
        prompt: "Find 3 machines that have been outside of the acceptable output range in the last 15 minutes, i.e. the entire visible time range. There may be more, but please select only 3.",
        type: "checkbox",
        area: "machine",
        options: ["Mach. 1","Mach. 2","Mach. 3","Mach. 4","Mach. 5","Mach. 6","Mach. 7","Mach. 8","Mach. 9","Mach. 10","Mach. 11","Mach. 12"]
    }
];

// Setup configurations matching config.json setups
const SETUP_CONFIGS = [
    { rows: 4, cols: 3, dynamicLabelSize: "none",    labelPosition: "integrated" },
    { rows: 4, cols: 3, dynamicLabelSize: "none",    labelPosition: "side" },
    { rows: 3, cols: 4, dynamicLabelSize: "linear",  labelPosition: "integrated" },
    { rows: 3, cols: 4, dynamicLabelSize: "ushaped", labelPosition: "integrated" },
    { rows: 4, cols: 3, dynamicLabelSize: "linear",  labelPosition: "side" },
    { rows: 4, cols: 3, dynamicLabelSize: "ushaped", labelPosition: "side" },
];

// The current setup index is passed as a data attribute or inferred from the page filename
function getSetupIndex() {
    // Read from the page's script tag data attribute
    const scripts = document.querySelectorAll('script[data-setup-index]');
    if (scripts.length > 0) {
        return parseInt(scripts[0].getAttribute('data-setup-index'));
    }
    // Fallback: parse from URL
    const match = window.location.pathname.match(/trainingSetup(\d+)/);
    if (match) return parseInt(match[1]) - 1;
    return 0;
}

// Convert answer array to set of valid option strings
function answerToValidSet(answer) {
    return answer.map(n => `Mach. ${n}`);
}

(function() {
    const setupIndex = getSetupIndex();
    const qsetIndex = parseInt(sessionStorage.getItem('qsetIndex') || '0');
    const setupConfig = SETUP_CONFIGS[setupIndex];

    const ROWS = setupConfig.rows;
    const COLS = setupConfig.cols;
    const DYNAMIC_LABEL_SIZE = setupConfig.dynamicLabelSize;
    const LABEL_POSITION = setupConfig.labelPosition;

    // Shared config
    const SETUP_LENGTH = 60;
    const ANIM_DURATION = 400;
    const ANIM_DELAY = 200;
    const POINTS = 10;
    const ROLLING_AVG = 5;
    const SHOW_X_AXIS_TICKS = true;
    const X_AXIS_INVERSE_STATIC = false;
    const USE_THRESHOLD_COLORS = true;
    const SHOW_THRESHOLD_BAND = true;
    const BACKGROUND_ENCODING = false;
    const GRID_BACKGROUND_MOVE = false;
    const SHOW_VERTICAL_BAR = false;
    const USE_ROLLING_AVERAGE = false;
    const EASE_IN_OUT = true;

    // Question for this user
    const question = ALL_QUESTIONS[qsetIndex];
    const validAnswers = answerToValidSet(TRAINING_ANSWERS[qsetIndex][setupIndex]);

    // Data files: use Set{setupIndex+1}Machine{1..12}.csv
    const setNum = setupIndex + 1;
    const NUM_MACHINES = ROWS * COLS;
    const selectedFiles = Array.from({ length: NUM_MACHINES }, (_, i) => `Set${setNum}Machine${i + 1}.csv`);

    // Question appears at this step
    const QUESTION_STEP = 40;

    // Next page: go through description page for designs 2-6, or to survey after design 6
    function goToNextPage() {
        if (setupIndex < 5) {
            sessionStorage.setItem('trainingDesignIndex', String(setupIndex + 1));
            window.location.href = 'trainingDescription.html';
        } else {
            window.location.href = 'https://cliffy2000.github.io/SituatedVis-Survey/';
        }
    }

    let charts = [];
    let step = 1;
    let questionShown = false;
    let INTERVAL_ID;
    let startAnim, stopAnim;

    Promise.all(selectedFiles.map(file => d3.csv(`data/${file}`, d3.autoType))).then((datasets) => {
        const container = d3.select("#container");

        const chartsContainer = container.select("#chartsContainer")
            .style("grid-template-rows", `repeat(${ROWS}, 1fr)`)
            .style("grid-template-columns", `repeat(${COLS}, 1fr)`);

        let { width: gridWidth, height: gridHeight } = chartsContainer.node().getBoundingClientRect();
        let cellWidth = gridWidth / COLS;
        let cellHeight = gridHeight / ROWS;

        const titles = Array.from({ length: NUM_MACHINES }, (_, i) => `Machine ${i + 1}`);

        charts = chartsContainer.selectAll("div")
            .data(d3.zip(datasets, titles))
            .join("div")
                .attr("class", LABEL_POSITION === "side" ? "chart-div-side" : "chart-div")
            .append(([data, title]) => generateChart(
                data, title, cellWidth, cellHeight,
                POINTS, ROLLING_AVG,
                SHOW_X_AXIS_TICKS, USE_THRESHOLD_COLORS, EASE_IN_OUT,
                X_AXIS_INVERSE_STATIC, BACKGROUND_ENCODING, USE_ROLLING_AVERAGE,
                GRID_BACKGROUND_MOVE, SHOW_THRESHOLD_BAND, SHOW_VERTICAL_BAR,
                DYNAMIC_LABEL_SIZE, LABEL_POSITION
            ))
            .nodes();

        function startAnimation() {
            INTERVAL_ID = setInterval(animate, ANIM_DURATION + ANIM_DELAY);
        }

        function stopAnimation() {
            clearInterval(INTERVAL_ID);
        }

        startAnim = startAnimation;
        stopAnim = stopAnimation;

        function animate() {
            step++;

            if (step === QUESTION_STEP && !questionShown) {
                questionShown = true;
                showQuestion();
            }

            for (let chart of charts) {
                chart.update(step, ANIM_DURATION);
            }

            if (step + POINTS - 1 >= SETUP_LENGTH) {
                stopAnimation();
            }
        }

        function showQuestion() {
            const qContainer = document.getElementById('questionContainer');
            qContainer.innerHTML = '';

            const questionDiv = document.createElement('div');
            questionDiv.className = 'question-item';

            const prompt = document.createElement('div');
            prompt.className = 'question-prompt';
            prompt.textContent = question.prompt;
            questionDiv.appendChild(prompt);

            const optionsContainer = document.createElement('div');
            optionsContainer.className = 'question-options-container';

            // Use grid layout for machine questions with many options
            const useGrid = question.area === "machine" && question.options.length > 3;
            if (useGrid) {
                optionsContainer.style.display = 'grid';
                optionsContainer.style.gridTemplateRows = `repeat(${ROWS}, 1fr)`;
                optionsContainer.style.gridTemplateColumns = `repeat(${COLS}, 1fr)`;
                optionsContainer.style.gap = '5px';
            }

            const isCheckbox = question.type === 'checkbox';
            const checkboxes = [];

            question.options.forEach(option => {
                const label = document.createElement('label');
                label.className = useGrid ? 'question-grid-option' : 'question-vertical-option';

                const input = document.createElement('input');
                input.type = isCheckbox ? 'checkbox' : 'radio';
                input.name = question.id;
                input.value = option;

                const span = document.createElement('span');
                span.textContent = option;

                label.appendChild(input);
                label.appendChild(span);
                optionsContainer.appendChild(label);

                if (isCheckbox) checkboxes.push(input);
            });

            const submitButton = document.getElementById('submitButton');

            if (isCheckbox) {
                // For "find 3" questions: enable submit only when exactly 3 checked
                optionsContainer.addEventListener('change', () => {
                    const checkedCount = checkboxes.filter(cb => cb.checked).length;
                    if (checkedCount === 3) {
                        checkboxes.forEach(cb => { if (!cb.checked) cb.disabled = true; });
                        submitButton.disabled = false;
                    } else {
                        checkboxes.forEach(cb => cb.disabled = false);
                        submitButton.disabled = true;
                    }
                });
            } else {
                optionsContainer.addEventListener('change', () => {
                    submitButton.disabled = false;
                });
            }

            questionDiv.appendChild(optionsContainer);
            qContainer.appendChild(questionDiv);

            submitButton.onclick = function() {
                let userAnswer;
                if (isCheckbox) {
                    userAnswer = Array.from(
                        optionsContainer.querySelectorAll(`input[name="${question.id}"]:checked`)
                    ).map(cb => cb.value).sort();
                } else {
                    const selected = optionsContainer.querySelector(`input[name="${question.id}"]:checked`);
                    userAnswer = selected ? selected.value : null;
                }
                checkAnswer(userAnswer);
            };
        }

        function checkAnswer(userAnswer) {
            const submitButton = document.getElementById('submitButton');
            const buttonAnnotation = document.getElementById('buttonAnnotation');
            const allInputs = document.querySelectorAll(`input[name="${question.id}"]`);
            allInputs.forEach(input => input.disabled = true);

            let isCorrect;
            if (Array.isArray(userAnswer)) {
                isCorrect = userAnswer.length > 0 && userAnswer.every(v => validAnswers.includes(v));
            } else {
                isCorrect = validAnswers.includes(userAnswer);
            }

            if (isCorrect) {
                buttonAnnotation.textContent = 'Correct!';
                submitButton.textContent = 'Next';
                submitButton.disabled = false;
                submitButton.onclick = () => {
                    goToNextPage();
                };
            } else {
                buttonAnnotation.textContent = 'Incorrect — please try again.';
                submitButton.textContent = 'Retry';
                submitButton.disabled = false;
                submitButton.onclick = () => {
                    stopAnim();
                    document.getElementById('questionContainer').innerHTML = '';
                    buttonAnnotation.textContent = '';
                    submitButton.textContent = 'Submit';
                    submitButton.disabled = true;
                    questionShown = false;
                    step = 0;
                    startAnim();
                };
            }
        }

        startAnimation();
    });
})();