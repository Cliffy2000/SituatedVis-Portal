document.addEventListener('DOMContentLoaded', function() {
    const page1Checkboxes = document.querySelectorAll('.page1-requirement');
    const continueBtn = document.getElementById('continueToPage2');
    
    function checkPage1Conditions() {
        const allChecked = Array.from(page1Checkboxes).every(cb => cb.checked);
        continueBtn.disabled = !allChecked;
    }
    
    page1Checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', checkPage1Conditions);
    });
    
    continueBtn.addEventListener('click', function() {
        sessionStorage.setItem('page1Confirmed', 'true');
        console.log('Continuing to page 2...');
        window.location.href = 'training2.html';
    });
});