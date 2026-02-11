document.addEventListener('DOMContentLoaded', function() {
    const checkboxes = document.querySelectorAll('.page1-checkbox');
    const prolificInput = document.getElementById('prolific-id');
    const continueBtn = document.getElementById('continueToPage2');

    // Restore if already entered (e.g. user navigated back)
    const existing = sessionStorage.getItem('username');
    if (existing) {
        prolificInput.value = existing;
    }

    function checkConditions() {
        const allChecked = Array.from(checkboxes).every(cb => cb.checked);
        const idFilled = prolificInput.value.trim().length > 0;
        continueBtn.disabled = !(allChecked && idFilled);
    }

    checkboxes.forEach(cb => cb.addEventListener('change', checkConditions));
    prolificInput.addEventListener('input', checkConditions);

    // Run once on load in case values were restored
    checkConditions();

    continueBtn.addEventListener('click', function() {
        // Save Prolific ID to sessionStorage (keyed as 'username' for compatibility)
        sessionStorage.setItem('username', prolificInput.value.trim());
        sessionStorage.setItem('page1Confirmed', 'true');
        console.log('Continuing to page 2...');
        window.location.href = 'training2.html';
    });
});