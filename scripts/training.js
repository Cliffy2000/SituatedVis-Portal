const TEST_IDS = {};
for (let d = 0; d < 6; d++) {
    TEST_IDS[`secretcode-d${d + 1}`] = { design: d };
}

async function getAssignment(id) {
    if (TEST_IDS[id]) return TEST_IDS[id];

    const userRef = db.collection('config').doc('assignments').collection('users').doc(id);
    const doc = await userRef.get();
    if (doc.exists) return doc.data();

    const counterRef = db.collection('config').doc('assignmentCounter');
    const designIndex = await db.runTransaction(async (tx) => {
        const snap = await tx.get(counterRef);
        const val = snap.exists ? snap.data().value : 0;
        tx.set(counterRef, { value: val + 1 });
        return val % 6;
    });

    const result = {
        design: Math.floor(designIndex / 6),
        timestamp: new Date().toISOString()
    };

    await userRef.set(result);
    return result;
}

document.addEventListener('DOMContentLoaded', function () {
    const checkboxes = document.querySelectorAll('.page1-checkbox');
    const input = document.getElementById('prolific-id');
    const btn = document.getElementById('continueToPage2');
    const qualityRadios = document.querySelectorAll('input[name="quality-commit"]');

    const saved = sessionStorage.getItem('username');
    if (saved) input.value = saved;

    function validate() {
        const allChecked = Array.from(checkboxes).every(cb => cb.checked);
        const radioSelected = document.querySelector('input[name="quality-commit"]:checked') !== null;
        btn.disabled = !(allChecked && input.value.trim() && radioSelected);
    }

    checkboxes.forEach(cb => cb.addEventListener('change', validate));
    qualityRadios.forEach(r => r.addEventListener('change', validate));
    input.addEventListener('input', validate);
    validate();

    btn.addEventListener('click', async function () {
        const id = input.value.trim();
        btn.disabled = true;
        btn.textContent = 'Loading...';

        try {
            const assignment = await getAssignment(id);

            const selectedRadio = document.querySelector('input[name="quality-commit"]:checked');
            sessionStorage.setItem('vis-commitmentQuality', selectedRadio.value);

            sessionStorage.setItem('username', id);
            sessionStorage.setItem('designIndex', String(assignment.design));
            sessionStorage.setItem('trainingPageIndex', 0);

            window.location.href = 'training2.html';
        } catch (e) {
            console.error('Assignment failed:', e);
            btn.disabled = false;
            btn.textContent = 'Continue to Next Page';
            alert('Failed to connect to database. Please try again.');
        }
    });
});