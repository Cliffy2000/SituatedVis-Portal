const DESIGN_DESCRIPTIONS = [
    {
        title: "Design 1 of 6",
        description: "Placeholder description for design 1."
    },
    {
        title: "Design 2 of 6",
        description: "Placeholder description for design 2."
    },
    {
        title: "Design 3 of 6",
        description: "Placeholder description for design 3."
    },
    {
        title: "Design 4 of 6",
        description: "Placeholder description for design 4."
    },
    {
        title: "Design 5 of 6",
        description: "Placeholder description for design 5."
    },
    {
        title: "Design 6 of 6",
        description: "Placeholder description for design 6."
    }
];

document.addEventListener('DOMContentLoaded', function() {
    // Read which design we're about to show
    const designIndex = parseInt(sessionStorage.getItem('trainingDesignIndex') || '0');
    const design = DESIGN_DESCRIPTIONS[designIndex];

    document.getElementById('design-title').textContent = design.title;
    document.getElementById('design-description').textContent = design.description;

    document.getElementById('continueButton').addEventListener('click', function() {
        window.location.href = `trainingSetup${designIndex + 1}.html`;
    });
});