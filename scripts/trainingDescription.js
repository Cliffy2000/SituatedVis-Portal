const QUESTION_DESCRIPTIONS = [
    { title: "Question 1 of 6", description: "Placeholder description for question 1." },
    { title: "Question 2 of 6", description: "Placeholder description for question 2." },
    { title: "Question 3 of 6", description: "Placeholder description for question 3." },
    { title: "Question 4 of 6", description: "Placeholder description for question 4." },
    { title: "Question 5 of 6", description: "Placeholder description for question 5." },
    { title: "Question 6 of 6", description: "Placeholder description for question 6." },
];

document.addEventListener('DOMContentLoaded', function() {
    const pageIndex = parseInt(sessionStorage.getItem('trainingPageIndex'));
    const desc = QUESTION_DESCRIPTIONS[pageIndex];

    document.getElementById('design-title').textContent = desc.title;
    document.getElementById('design-description').textContent = desc.description;

    document.getElementById('continueButton').addEventListener('click', function() {
        window.location.href = `trainingSetup${pageIndex + 1}.html`;
    });
});