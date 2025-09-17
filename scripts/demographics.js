// demographics.js
document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.getElementById('submitButton');
    
    // Initially disable submit button
    submitButton.disabled = true;
    submitButton.style.backgroundColor = '#cccccc';
    submitButton.style.color = '#666666';
    
    // Check if all required fields are filled
    function checkCompletion() {
        const ageSelected = document.querySelector('input[name="age"]:checked');
        const genderSelected = document.querySelector('input[name="gender"]:checked');
        const raceSelected = document.querySelectorAll('input[name="race"]:checked').length > 0;
        const hispanicSelected = document.querySelector('input[name="hispanic"]:checked');
        const visionSelected = document.querySelector('input[name="vision"]:checked');
        
        // Check if "Other" vision is selected and has description
        let visionComplete = visionSelected;
        if (visionSelected && visionSelected.value === 'other') {
            const visionDescription = document.querySelector('#vision-description input').value.trim();
            visionComplete = visionDescription.length > 0;
        }
        
        const allComplete = ageSelected && genderSelected && raceSelected && hispanicSelected && visionComplete;
        
        if (allComplete) {
            submitButton.disabled = false;
            submitButton.style.backgroundColor = '#4CAF50';
            submitButton.style.color = 'white';
        } else {
            submitButton.disabled = true;
            submitButton.style.backgroundColor = '#cccccc';
            submitButton.style.color = '#666666';
        }
    }
    
    // Add event listeners to all inputs
    document.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(input => {
        input.addEventListener('change', checkCompletion);
    });
    
    // Also check when vision description is typed
    document.querySelector('#vision-description input')?.addEventListener('input', checkCompletion);
    
    submitButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Structure data to match Firebase saveUserData format
        const demographicsData = {
            metadata: {
                userName: sessionStorage.getItem('username') || 'Unknown',
                timestamp: new Date().toISOString(),
                type: 'demographics'
            },
            responses: {
                age: document.querySelector('input[name="age"]:checked')?.value || null,
                gender: document.querySelector('input[name="gender"]:checked')?.value || null,
                race: Array.from(document.querySelectorAll('input[name="race"]:checked')).map(cb => cb.value),
                hispanic: document.querySelector('input[name="hispanic"]:checked')?.value || null,
                vision: document.querySelector('input[name="vision"]:checked')?.value || null,
                visionDescription: document.querySelector('#vision-description input')?.value || null
            }
        };
        
        // Submit to Firebase
        saveUserData(demographicsData).then(success => {
            if (success) {
                console.log('Demographics saved to database');
            } else {
                console.log('Failed to save demographics');
            }

            window.location.href = 'completion.html';
        });
    });
});