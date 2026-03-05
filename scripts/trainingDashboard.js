// TRAINING_ANSWERS[design 0-5][question 0-5] — valid machine numbers
const TRAINING_ANSWERS = [
    [[1], [1], [1,2,3], [1,2,3], [1,2,3], [1,2,3]],  // design 1
    [[1], [1], [1,2,3], [1,2,3], [1,2,3], [1,2,3]],  // design 2
    [[1], [1], [1,2,3], [1,2,3], [1,2,3], [1,2,3]],  // design 3
    [[1], [1], [1,2,3], [1,2,3], [1,2,3], [1,2,3]],  // design 4
    [[1], [1], [1,2,3], [1,2,3], [1,2,3], [1,2,3]],  // design 5
    [[1], [1], [1,2,3], [1,2,3], [1,2,3], [1,2,3]],  // design 6
];

const ALL_QUESTIONS = [
    { id: "q1", prompt: "Find the machine that has the <b>highest</b> output right now." },
    { id: "q2", prompt: "Find the machine that has the <b>lowest</b> output right now." },
    { id: "q3", prompt: "Find 1 machine that has a visible output <b>increasing</b> over time at the beginning of the question. There may be more, but please select only 1." },
    { id: "q4", prompt: "Find 1 machine that has a visible output <b>decreasing</b> over time at the beginning of the question. There may be more, but please select only 1." },
    { id: "q5", prompt: "Find 1 machine that is outside of the acceptable range right now." },
    { id: "q6", prompt: "Find 1 machine that has been outside of the acceptable range in the visible time range at the beginning of the question. There may be more, but please select only 1." },
];

const MACHINE_OPTIONS = ["Mach. 1","Mach. 2","Mach. 3","Mach. 4","Mach. 5","Mach. 6","Mach. 7","Mach. 8","Mach. 9","Mach. 10","Mach. 11","Mach. 12"];

const DESIGN_CONFIGS = [
    { rows: 4, cols: 3, dynamicLabelSize: "none",    labelPosition: "integrated" },
    { rows: 4, cols: 3, dynamicLabelSize: "none",    labelPosition: "side" },
    { rows: 3, cols: 4, dynamicLabelSize: "linear",  labelPosition: "integrated" },
    { rows: 3, cols: 4, dynamicLabelSize: "ushaped", labelPosition: "integrated" },
    { rows: 4, cols: 3, dynamicLabelSize: "linear",  labelPosition: "side" },
    { rows: 4, cols: 3, dynamicLabelSize: "ushaped", labelPosition: "side" },
];

function getPageIndex() {
    const match = window.location.pathname.match(/trainingSetup(\d+)/);
    return match ? parseInt(match[1]) - 1 : 0;
}

(function() {
    const pageIndex = getPageIndex();
    const designIndex = parseInt(sessionStorage.getItem('designIndex'));
    const config = DESIGN_CONFIGS[designIndex];

    const ROWS = config.rows;
    const COLS = config.cols;
    const SETUP_LENGTH = 40;
    const ANIM_DURATION = 400;
    const ANIM_DELAY = 200;
    const POINTS = 10;
    const QUESTION_STEP = 16;
    const QUESTION_TIME = 15;

    const question = ALL_QUESTIONS[pageIndex];
    const validAnswers = TRAINING_ANSWERS[designIndex][pageIndex].map(n => `Mach. ${n}`);

    const NUM_MACHINES = ROWS * COLS;
    const selectedFiles = Array.from({ length: NUM_MACHINES }, (_, i) =>
        `Set${designIndex + 1}Machine${i + 1}.csv`
    );

    function goToNextPage() {
        if (pageIndex < 5) {
            sessionStorage.setItem('trainingPageIndex', String(pageIndex + 1));
            window.location.href = 'trainingDescription.html';
        } else {
            window.location.href = 'https://cliffy2000.github.io/SituatedVis-Survey/';
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

        const { width: gw, height: gh } = chartsContainer.node().getBoundingClientRect();
        const wrapperRatio = config.labelPosition === "side" ? 1.0 : 0.85;
        const cw = (gw / COLS) * wrapperRatio;
        const ch = gh / ROWS;

        const wrapperClass = config.labelPosition === "side"
            ? "chart-wrapper chart-wrapper-side"
            : "chart-wrapper chart-wrapper-integrated";

        const titles = Array.from({ length: NUM_MACHINES }, (_, i) => `Machine ${i + 1}`);

        const charts = chartsContainer.selectAll("div")
            .data(d3.zip(datasets, titles))
            .join("div")
                .attr("class", config.labelPosition === "side" ? "chart-div-side" : "chart-div")
            .append("div")
                .attr("class", wrapperClass)
            .append(([data, title]) => generateChart(
                data, title, cw, ch, POINTS, 5,
                true, true, true, false, false, false, false, true, false,
                config.dynamicLabelSize, config.labelPosition
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

            btn.onclick = function() {
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