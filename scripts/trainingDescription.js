const QUESTION_DESCRIPTIONS = [
    {
        title: "Question 1 of 6",
        text: "Find the machine that has the <b>highest</b> output right now.",
        description: "Select the machine that has the highest output at some point while the question is answerable. If multiple machines are fluctuating between the highest output, choose one of them."
    },
    {
        title: "Question 2 of 6",
        text: "Find the machine that has the <b>lowest</b> output right now.",
        description: "Select the machine that has the lowest output at some point while the question is answerable. If multiple machines are fluctuating between the lowest output, choose one of them."
    },
    {
        title: "Question 3 of 6",
        text: "Find 1 machine that has a visible output <b>increasing</b> over time.",
        description: "Select a machine that has an increasing output at some point while the question is answerable. If multiple machines are increasing, choose one of them. If no machine is increasing, pick the one that appears closest to increasing."
    },
    {
        title: "Question 4 of 6",
        text: "Find 1 machine that has a visible output <b>decreasing</b> over time.",
        description: "Select a machine that has an decreasing output at some point while the question is answerable. If multiple machines are decreasing, choose one of them. If no machine is decreasing, pick the one that appears closest to decreasing."
    },
    {
        title: "Question 5 of 6",
        text: "Find 1 machine that <b>is outside of the acceptable range</b> right now.",
        description: "Select a machine where the current output is below 30 or above 70 at any time while the question was answerable. Even if the machine moves to an acceptable range, if it was out of range at any time during the question, the answer is correct."
    },
    {
        title: "Question 6 of 6",
        text: "Find 1 machine that <b>has been outside of the acceptable range</b> in the visible time range.",
        description: "Select a machine where the output at any point is below 30 or above 70 at any time while the question was answerable. Even if the machine moves to an acceptable range or the out-of-range points move out of view, if it was out of range at any time during the question, the answer is correct. If multiple machines have been outside of range, choose one of them."
    },
];

document.addEventListener('DOMContentLoaded', function () {
    const pageIndex = parseInt(sessionStorage.getItem('trainingPageIndex'));
    const desc = QUESTION_DESCRIPTIONS[pageIndex];

    document.getElementById('question-title').textContent = desc.title;
    document.getElementById('question-text').innerHTML = desc.text;
    document.getElementById('question-description').textContent = desc.description;

    document.getElementById('continueButton').addEventListener('click', function () {
        window.location.href = `trainingSetup${pageIndex + 1}.html`;
    });
});