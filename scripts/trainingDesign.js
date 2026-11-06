const DESIGN_DESCRIPTIONS = [
    {
        title: "Introduction to the design",
        description: "For this graph, the label for each machine is above the individual readout. The range of output values is from 0 to 99. The readings of each machine output move from right to left, with the oldest reading on the left and the most recent output reading on the right. The machine's have an acceptable range for their output, which is from 30 to 70 parts per minute. If a machine's output is exactly 30 or 70 widgets per minute, the machine is inside of acceptable range. <br><br>The hovering label next to the rightmost point is the current output reading from the machine."
    },
    {
        title: "Introduction to the design",
        description: "For this graph, the label for each machine is above the individual readout. The range of output values is from 0 to 99. The readings of each machine output move from right to left, with the oldest reading on the left and the most recent output reading on the right. The machine's have an acceptable range for their output, which is from 30 to 70 parts per minute. Points are gray unless they're outside this acceptable range. If a machine's output is exactly 30 or 70 widgets per minute, the machine is inside of acceptable range. <br><br>The hovering label next to the rightmost point is the current output reading from the machine."
    },
    {
        title: "Introduction to the design",
        description: "For this graph, the label for each machine is above the individual readout. The range of output values is from 0 to 99. The readings of each machine output move from right to left, with the oldest reading on the left and the most recent output reading on the right. The machine's have an acceptable range for their output, which is from 30 to 70 parts per minute. If a machine's output is exactly 30 or 70 widgets per minute, the machine is inside of acceptable range. <br><br>The square label in the right position contains the current output reading from the machine."
    },
    {
        title: "Introduction to the design",
        description: "For this graph, the label for each machine is above the individual readout. The range of output values is from 0 to 99. The readings of each machine output move from right to left, with the oldest reading on the left and the most recent output reading on the right. The machine's have an acceptable range for their output, which is from 30 to 70 parts per minute. Points are gray unless they're outside this acceptable range. If a machine's output is exactly 30 or 70 widgets per minute, the machine is inside of acceptable range. <br><br>The square label in the right position contains the current output reading from the machine."
    },
    {
        title: "Introduction to the design",
        description: "For this graph, the label for each machine is above the individual readout. The range of output values is from 0 to 99. The readings of each machine output move from right to left, with the oldest reading on the left and the most recent output reading on the right. The machine's have an acceptable range for their output, which is from 30 to 70 parts per minute. If a machine's output is exactly 30 or 70 widgets per minute, the machine is inside of acceptable range. <br><br>The square label in the right position contains the the current output reading from the machine. The size of the label corresponds to the current output reading, where a smaller label corresponds a lower value and a larger label corresponds to a higher value."
    },
    {
        title: "Introduction to the design",
        description: "For this graph, the label for each machine is above the individual readout. The range of output values is from 0 to 99. The readings of each machine output move from right to left, with the oldest reading on the left and the most recent output reading on the right. The machine's have an acceptable range for their output, which is from 30 to 70 parts per minute. Points are gray unless they're outside this acceptable range. If a machine's output is exactly 30 or 70 widgets per minute, the machine is inside of acceptable range. <br><br>The square label in the right position contains the the current output reading from the machine. The size of the label corresponds to the current output reading, where a smaller label corresponds a lower value and a larger label corresponds to a higher value."
    },
    {
        title: "Introduction to the design",
        description: "For this graph, the label for each machine is above the individual readout. The range of output values is from 0 to 99. The readings of each machine output move from right to left, with the oldest reading on the left and the most recent output reading on the right. The machine's have an acceptable range for their output, which is from 30 to 70 parts per minute. If a machine's output is exactly 30 or 70 widgets per minute, the machine is inside of acceptable range. <br><br>The number label to the right of each machine’s graph is the current output reading from the machine. The size of the label corresponds to the current output reading, where a smaller label corresponds a lower value and a larger label corresponds to a higher value."
    },
    {
        title: "Introduction to the design",
        description: "For this graph, the label for each machine is above the individual readout. The range of output values is from 0 to 99. The readings of each machine output move from right to left, with the oldest reading on the left and the most recent output reading on the right. The machine's have an acceptable range for their output, which is from 30 to 70 parts per minute. Points are gray unless they're outside this acceptable range. If a machine's output is exactly 30 or 70 widgets per minute, the machine is inside of acceptable range. <br><br>The number label to the right of each machine’s graph is the current output reading from the machine. The size of the label corresponds to the current output reading, where a smaller label corresponds a lower value and a larger label corresponds to a higher value."
    },
];

(function () {
    const designIndex = parseInt(sessionStorage.getItem('designIndex'));
    const desc = DESIGN_DESCRIPTIONS[designIndex];

    document.getElementById('design-title').textContent = desc.title;
    document.getElementById('design-description').innerHTML = desc.description;
})();

