const QUESTION_DESCRIPTIONS = [
    { title: "Question 1 of 6", description: "Select the machine that has the highest output at some point while the question is answerable. if multiple machines are fluctuating between the highest output, choose one of them. " },
    { title: "Question 2 of 6", description: "Select the machine that has the lowest output at some point while the question is answerable. if multiple machines are fluctuating between the lowest output, choose one of them. " },
    { title: "Question 3 of 6", description: "Select a machine that has an increasing output at some point wihle the question is answerable. If multiple machines are increasing, choose one of them. If no machine is increasing, pick the one that appears closest to increasing. " },
    { title: "Question 4 of 6", description: "Select a machine that as a descending output at some point while the question is answerable. If multiple machines are descreasing, choose one of them. If no machine is decreasing, pick the one that appears closest to decreasing. " },
    { title: "Question 5 of 6", description: "Select a machine where the current output is below 30 or above 70 at any time while the questions is answerable. Ever if the machine moves to an acceptable range, if it was out of range at any time during the question, the answer is correct. " },
    { title: "Question 6 of 6", description: "Select a machine where the output at any point is below 30 or above 70 at any time while the question is answerable. Even if the machine moves to an acceptable range or the out-of-range points move out of view, if it was out of range at any time during the question, the answer is correct." },
];

document.addEventListener('DOMContentLoaded', function () {
    const pageIndex = parseInt(sessionStorage.getItem('trainingPageIndex'));
    const desc = QUESTION_DESCRIPTIONS[pageIndex];

    document.getElementById('design-title').textContent = desc.title;
    document.getElementById('design-description').textContent = desc.description;

    document.getElementById('continueButton').addEventListener('click', function () {
        window.location.href = `trainingSetup${pageIndex + 1}.html`;
    });
});