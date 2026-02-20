document.addEventListener('DOMContentLoaded', function() {
    const checkboxes = document.querySelectorAll('.page1-checkbox');
    const prolificInput = document.getElementById('prolific-id');
    const continueBtn = document.getElementById('continueToPage2');

    // Restore if already entered
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
    checkConditions();

    continueBtn.addEventListener('click', function() {
        const prolificId = prolificInput.value.trim();

        // Save Prolific ID
        sessionStorage.setItem('username', prolificId);

        // Compute question index from hex ID mod 6
        // Use BigInt to avoid overflow on long hex strings
        let idNum;
        try {
            idNum = BigInt('0x' + prolificId.replace(/[^0-9a-fA-F]/g, ''));
        } catch (e) {
            // Fallback: hash the string to a number
            let hash = 0;
            for (let i = 0; i < prolificId.length; i++) {
                hash = ((hash << 5) - hash) + prolificId.charCodeAt(i);
                hash = hash & hash; // Convert to 32bit int
            }
            idNum = BigInt(Math.abs(hash));
        }
        const qsetIndex = Number(idNum % 6n);

        sessionStorage.setItem('qsetIndex', String(qsetIndex));
        sessionStorage.setItem('page1Confirmed', 'true');

        console.log(`Prolific ID: ${prolificId}, qsetIndex: ${qsetIndex}`);
        window.location.href = 'training2.html';
    });
});