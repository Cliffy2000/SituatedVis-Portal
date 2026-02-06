// training.js

// Fixed config for this training page
const ROWS = 3;
const COLS = 3;
const SETUP_LENGTH = 30;
const MIN_SPACING = 10;
const NO_QUESTIONS = [[45, 55]];
const ANIM_DURATION = 400;
const ANIM_DELAY = 200;
const POINTS = 10;
const ROLLING_AVG = 5;
const SHOW_X_AXIS_TICKS = true;
const X_AXIS_INVERSE_STATIC = false;
const USE_THRESHOLD_COLORS = true;
const SHOW_THRESHOLD_BAND = false;
const BACKGROUND_ENCODING = false;
const GRID_BACKGROUND_MOVE = false;
const SHOW_VERTICAL_BAR = false;
const USE_ROLLING_AVERAGE = false;
const EASE_IN_OUT = true;
const DYNAMIC_LABEL_SIZE = "none";
const LABEL_POSITION = "integrated";

// Fixed question
const QUESTION = {
    id: "training-q1",
    prompt: "Which machine has the highest output right now?",
    step: 21,
    type: "radio",
    options: ["Machine 1", "Machine 2", "Machine 3", "Machine 4", "Machine 5", "Machine 6", "Machine 7", "Machine 8", "Machine 9"],
    correctAnswer: "Machine 9"
};

// Fixed files - using actual data files
const selectedFiles = [
    "Set1Machine1.csv",
    "Set1Machine2.csv",
    "Set1Machine3.csv",
    "Set1Machine4.csv",
    "Set1Machine5.csv",
    "Set1Machine6.csv",
    "Set1Machine7.csv",
    "Set1Machine8.csv",
    "Set1Machine9.csv"
];

let charts = [];
let step = 1;
let isPaused = false;
let questionShown = false;
let INTERVAL_ID;
let flag_running = true;
let start;
let stop;

Promise.all(selectedFiles.map(file => d3.csv(`data/${file}`, d3.autoType))).then((datasets) => {
    const container = d3.select("#container");
    
    const chartsContainer = container.select("#chartsContainer")
        .style("grid-template-rows", `repeat(${ROWS}, 1fr)`)
        .style("grid-template-columns", `repeat(${COLS}, 1fr)`);

    let { width: gridWidth, height: gridHeight } = chartsContainer.node().getBoundingClientRect();
    let cellWidth = gridWidth / COLS;
    let cellHeight = gridHeight / ROWS;

    const titles = Array.from({ length: selectedFiles.length }, (_, i) => `Machine ${i + 1}`);
    
    charts = chartsContainer.selectAll("div")
        .data(d3.zip(datasets, titles))
        .join("div")
            .attr("class", LABEL_POSITION === "side" ? "chart-div-side" : "chart-div")
        .append(([data, title]) => generateChart(
            data = data, 
            title = title, 
            width = cellWidth, 
            height = cellHeight,
            viewRange = POINTS, 
            rollingAverage = ROLLING_AVG,
            showXAxisTicks = SHOW_X_AXIS_TICKS, 
            useThresholdColors = USE_THRESHOLD_COLORS,
            easeInOut = EASE_IN_OUT,
            xAxisInverseStatic = X_AXIS_INVERSE_STATIC,
            backgroundEncoding = BACKGROUND_ENCODING,
            useRollingAverage = USE_ROLLING_AVERAGE,
            gridBackgroundMove = GRID_BACKGROUND_MOVE,
            showThresholdBand = SHOW_THRESHOLD_BAND,
            showVerticalBar = SHOW_VERTICAL_BAR,
            dynamicLabelSize = DYNAMIC_LABEL_SIZE,
            labelPosition = LABEL_POSITION
        ))
        .nodes();

    function startAnimation() {
        INTERVAL_ID = setInterval(animate, ANIM_DURATION + ANIM_DELAY);
    }

    function stopAnimation() {
        clearInterval(INTERVAL_ID);
    }

    start = startAnimation;
    stop = stopAnimation;

    function animate() {
        step++;
        
        // Check if should show question
        if (step === QUESTION.step && !questionShown) {
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
        const container = document.getElementById('questionContainer');
        container.innerHTML = '';
        
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question-item';
        
        const prompt = document.createElement('div');
        prompt.className = 'question-prompt';
        prompt.textContent = QUESTION.prompt;
        questionDiv.appendChild(prompt);
        
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'question-options-container';
        
        QUESTION.options.forEach(option => {
            const label = document.createElement('label');
            label.className = 'question-vertical-option';
            
            const input = document.createElement('input');
            input.type = QUESTION.type;
            input.name = QUESTION.id;
            input.value = option;
            input.onclick = () => {
                // Enable submit button when option selected
                document.getElementById('submitButton').disabled = false;
            };
            
            const span = document.createElement('span');
            span.textContent = option;
            
            label.appendChild(input);
            label.appendChild(span);
            optionsContainer.appendChild(label);
        });
        
        questionDiv.appendChild(optionsContainer);
        container.appendChild(questionDiv);
        
        // Set up submit button click handler
        document.getElementById('submitButton').onclick = handleSubmit;
    }


    startAnimation();
});


function handleSubmit() {
    const selectedOption = document.querySelector(`input[name="${QUESTION.id}"]:checked`);
    if (!selectedOption) return;
    
    checkAnswer(selectedOption.value);
}

function checkAnswer(answer) {
    const submitButton = document.getElementById('submitButton');
    const buttonAnnotation = document.getElementById('buttonAnnotation');
    const allInputs = document.querySelectorAll(`input[name="${QUESTION.id}"]`);
    allInputs.forEach(input => {
        input.disabled = true;
    });
    
    if (answer === QUESTION.correctAnswer) {
        // Correct
        buttonAnnotation.textContent = 'You are correct';
        submitButton.textContent = 'Next';
        submitButton.onclick = () => {
            window.location.href='demographics.html'
        };
    } else {
        // Incorrect
        buttonAnnotation.textContent = 'You are incorrect';
        submitButton.textContent = 'Retry';
        submitButton.onclick = () => {
            stop();
            
            // Clear the current question
            document.getElementById('questionContainer').innerHTML = '';
            // Clear button annotation and reset button
            buttonAnnotation.textContent = '';
            submitButton.textContent = 'Submit';
            submitButton.disabled = true;
            questionShown = false;
            
            step = 0;
            start();
        };
    }
}