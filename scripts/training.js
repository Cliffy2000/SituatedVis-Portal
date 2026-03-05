const QUESTION_MAPPING = [
    [0, 1, 2, 3, 4, 5],
    [1, 2, 3, 4, 5, 0],
    [2, 3, 4, 5, 0, 1],
    [3, 4, 5, 0, 1, 2],
    [4, 5, 0, 1, 2, 3],
    [5, 0, 1, 2, 3, 4],
];

const TEST_IDS = {};
for (let d = 0; d < 6; d++) {
    for (let m = 0; m < 6; m++) {
        TEST_IDS[`secretcode-d${d + 1}m${m + 1}`] = { design: d, mapping: m };
    }
}

async function getAssignment(id) {
    if (TEST_IDS[id]) return TEST_IDS[id];

    const userRef = db.collection('config').doc('assignments').collection('users').doc(id);
    const doc = await userRef.get();
    if (doc.exists) return doc.data();

    const counterRef = db.collection('config').doc('assignmentCounter');
    const combo = await db.runTransaction(async (tx) => {
        const snap = await tx.get(counterRef);
        const val = snap.exists ? snap.data().value : 0;
        tx.set(counterRef, { value: val + 1 });
        return val % 36;
    });

    const result = {
        design: Math.floor(combo / 6),
        mapping: combo % 6,
        combo: combo,
        timestamp: new Date().toISOString()
    };

    await userRef.set(result);
    return result;
}

document.addEventListener('DOMContentLoaded', function () {
    const checkboxes = document.querySelectorAll('.page1-checkbox');
    const input = document.getElementById('prolific-id');
    const btn = document.getElementById('continueToPage2');

    const saved = sessionStorage.getItem('username');
    if (saved) input.value = saved;

    function validate() {
        const allChecked = Array.from(checkboxes).every(cb => cb.checked);
        btn.disabled = !(allChecked && input.value.trim());
    }

    checkboxes.forEach(cb => cb.addEventListener('change', validate));
    input.addEventListener('input', validate);
    validate();

    btn.addEventListener('click', async function () {
        const id = input.value.trim();
        btn.disabled = true;
        btn.textContent = 'Loading...';

        try {
            const assignment = await getAssignment(id);

            sessionStorage.setItem('username', id);
            sessionStorage.setItem('designIndex', String(assignment.design));
            sessionStorage.setItem('questionMapping', JSON.stringify(QUESTION_MAPPING[assignment.mapping]));

            window.location.href = 'training2.html';
        } catch (e) {
            console.error('Assignment failed:', e);
            btn.disabled = false;
            btn.textContent = 'Continue to Next Page';
            alert('Failed to connect to database. Please try again.');
        }
    });
});