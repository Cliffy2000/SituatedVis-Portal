const TEST_IDS = {};
for (let d = 0; d < 8; d++) {
    TEST_IDS[`secretcode-d${d + 1}`] = { design: d };
}

async function getAssignment(id) {

    // If statement to send a particular participant by ID to a given test
    if (TEST_IDS[id]) return TEST_IDS[id];

    // Grabbing the user reference from the firestore database under the config collection's assignments document for the
    // specific user based on id
    const userRef = db.collection('config').doc('assignments').collection('users').doc(id);
    
    // Getting the document associated with the user
    const doc = await userRef.get();

    // If a test already exists, provide the user with their previous test instead of generating a new one
    if (doc.exists) return doc.data();

    // Getting counter reference from the firestore database under the config collection's assignment control
    // Counter reference presumably refers to the number of times each design has been assigned to any participants
    const counterRef = db.collection('config').doc('assignmentCounter');

    
    const designIndex = await db.runTransaction(async (tx) => {
        

        const snap = await tx.get(counterRef);
        

        const val = snap.exists ? snap.data().value : 0;
        
        
        tx.set(counterRef, { value: val + 1 });
        

        return val % 8;
    });

    const result = {
        design: designIndex,
        timestamp: new Date().toISOString()
    };

    await userRef.set(result);
    return result;
}

async function getAssignmentCounterDoc(){
    // Getting counter reference from the firestore database under the config collection's assignment control
    // Counter reference presumably refers to the number of times each design has been assigned to any participants
    const counterRef = db.collection('config').doc('assignmentCounter');

    const assignmentCounterDoc = counterRef.get();

    const valSnap = await db.runTransaction(async (tx) => {
        const snap = await tx.get(counterRef);
        const val = snap.exists ? snap.data().value : 0;
        
        return [val, snap];
    
    })

    //     const snap = await tx.get(counterRef);
        

    //     const val = snap.exists ? snap.data().value : 0;
        
        
    //     tx.set(counterRef, { value: val + 1 });
        

    //     return val % 8;
    // });

    
    // const designIndex = await db.runTransaction(async (tx) => {
        

    //     const snap = await tx.get(counterRef);
        

    //     const val = snap.exists ? snap.data().value : 0;
        
        
    //     tx.set(counterRef, { value: val + 1 });
        

    //     return val % 8;
    // });

    // return designIndex;

    return [assignmentCounterDoc, valSnap];
}

document.addEventListener('DOMContentLoaded', function () {
    const checkboxes = document.querySelectorAll('.page1-checkbox');
    const input = document.getElementById('prolific-id');
    const btn = document.getElementById('continueToPage2');
    const qualityRadios = document.querySelectorAll('input[name="quality-commit"]');

    // Session storage is a node.js storage variable
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
            const designIndex = await getAssignmentCounterDoc();

            const indexChecker = document.createElement("div");
            indexChecker.innerHTML = designIndex;


            document.getElementsByClassName("articleContent").appendChild(designIndexOutput);

            const selectedRadio = document.querySelector('input[name="quality-commit"]:checked');
            sessionStorage.setItem('vis-commitmentQuality', selectedRadio.value);

            sessionStorage.setItem('username', id);
            sessionStorage.setItem('designIndex', String(assignment.design));
            sessionStorage.setItem('trainingPageIndex', 0);

            // window.location.href = 'training2.html';
        } catch (e) {
            console.error('Assignment failed:', e);
            btn.disabled = false;
            btn.textContent = 'Continue to Next Page';
            alert('Failed to connect to database. Please try again.');
        }
    });
});