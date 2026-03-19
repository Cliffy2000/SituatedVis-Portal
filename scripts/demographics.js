document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.getElementById('submitButton');

    const designIndex = parseInt(sessionStorage.getItem('designIndex'));
    const designImg = document.querySelector('.designScreenshot img');
    if (designImg && !isNaN(designIndex)) {
        designImg.src = `design${designIndex + 1}.png`;
    }

    function checkCompletion() {
        const taskRatings = ['task-q1','task-q2','task-q3','task-q4','task-q5','task-q6']
            .every(name => document.querySelector(`input[name="${name}"]:checked`));
        const comparisonFilled = document.getElementById('task-comparison').value.trim().length > 0;
        const ageSelected = document.querySelector('input[name="age"]:checked');
        const genderSelected = document.querySelector('input[name="gender"]:checked');
        const raceSelected = document.querySelectorAll('input[name="race"]:checked').length > 0;
        const hispanicSelected = document.querySelector('input[name="hispanic"]:checked');
        const visionSelected = document.querySelector('input[name="vision"]:checked');

        let visionComplete = visionSelected;
        if (visionSelected && visionSelected.value === 'other') {
            visionComplete = document.querySelector('#vision-description input').value.trim().length > 0;
        }

        const allComplete = taskRatings && comparisonFilled && ageSelected && genderSelected
            && raceSelected && hispanicSelected && visionComplete;

        submitButton.disabled = !allComplete;
    }

    document.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(input => {
        input.addEventListener('change', checkCompletion);
    });
    document.getElementById('task-comparison').addEventListener('input', checkCompletion);
    document.querySelector('#vision-description input')?.addEventListener('input', checkCompletion);

    submitButton.addEventListener('click', function(e) {
        e.preventDefault();

        const data = {
            metadata: {
                prolificId: sessionStorage.getItem('username') || 'Unknown',
                timestamp: new Date().toISOString(),
                type: 'demographics'
            },
            responses: {
                taskRatings: {
                    q1: document.querySelector('input[name="task-q1"]:checked')?.value,
                    q2: document.querySelector('input[name="task-q2"]:checked')?.value,
                    q3: document.querySelector('input[name="task-q3"]:checked')?.value,
                    q4: document.querySelector('input[name="task-q4"]:checked')?.value,
                    q5: document.querySelector('input[name="task-q5"]:checked')?.value,
                    q6: document.querySelector('input[name="task-q6"]:checked')?.value,
                },
                taskComparison: document.getElementById('task-comparison').value.trim(),
                age: document.querySelector('input[name="age"]:checked')?.value,
                gender: document.querySelector('input[name="gender"]:checked')?.value,
                race: Array.from(document.querySelectorAll('input[name="race"]:checked')).map(cb => cb.value),
                hispanic: document.querySelector('input[name="hispanic"]:checked')?.value,
                vision: document.querySelector('input[name="vision"]:checked')?.value,
                visionDescription: document.querySelector('#vision-description input')?.value || null,
                additionalFeedback: document.getElementById('additional-feedback').value.trim() || null,
            }
        };

        saveUserData(data).then(success => {
            if (success) console.log('Demographics saved');
            else console.log('Failed to save demographics');
            window.location.href = 'https://app.prolific.com/submissions/complete?cc=CWB5852J';
        });
    });
});