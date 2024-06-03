document.addEventListener('DOMContentLoaded', () => {
    const classForm = document.getElementById('classForm');
    const classList = document.getElementById('classes');
    const scheduleOutput = document.getElementById('schedule');
    const classes = [];

    classForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const courseName = document.getElementById('courseName').value;
        const day = document.getElementById('day').value;
        const startTime = document.getElementById('startTime').value;
        const endTime = document.getElementById('endTime').value;

        const newClass = { courseName, day, startTime, endTime };
        classes.push(newClass);
        updateClassList();
        classForm.reset();
    });

    function updateClassList() {
        classList.innerHTML = '';
        classes.forEach((c, index) => {
            const li = document.createElement('li');
            li.textContent = `${c.courseName} - ${c.day} - ${c.startTime} to ${c.endTime}`;
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', () => {
                classes.splice(index, 1);
                updateClassList();
            });
            li.appendChild(removeButton);
            classList.appendChild(li);
            console.log(classes);
        });
    }

    document.getElementById('greedy').addEventListener('click', () => {
        const schedule = greedyAlgorithm(classes);
        displaySchedule(schedule);
    });

    document.getElementById('backtracking').addEventListener('click', () => {
        const schedule = backtrackingAlgorithm(classes);
        displaySchedule(schedule);
    });

    function greedyAlgorithm(classes) {
        // Create an adjacency list to represent the graph
        const adjacencyList = createAdjacencyList(classes);

        // Initialize an array to store the colors assigned to each vertex
        const colors = new Array(classes.length).fill(null);

        // Iterate through each vertex (class)
        for (let i = 0; i < classes.length; i++) {
            // Find the minimum available color
            let minColor = 1;
            const adjacentVertices = adjacencyList[i];

            while (adjacentVertices.some(v => colors[v] === minColor)) {
            minColor++;
            }

            // Assign the minimum available color to the current vertex
            colors[i] = minColor;
        }

        // Return the assigned colors
        return colors;
    }

    function createAdjacencyList(classes) {
        // Create an adjacency list to represent the graph
        const adjacencyList = new Array(classes.length).fill().map(() => []);

        // Iterate through each pair of classes
        for (let i = 0; i < classes.length; i++) {
            for (let j = i + 1; j < classes.length; j++) {
            // Check if the classes have overlapping time slots
            if (hasOverlap(classes[i], classes[j])) {
                adjacencyList[i].push(j);
                adjacencyList[j].push(i);
            }
            }
        }

        return adjacencyList;
    }

    function hasOverlap(class1, class2) {
        // Check if the time slots of the two classes overlap
        return (
            class1.day === class2.day &&
            ((class1.startTime >= class2.startTime && class1.startTime < class2.endTime) ||
            (class1.endTime > class2.startTime && class1.endTime <= class2.endTime))
        );
    }

    function backtrackingAlgorithm(classes) {
        // Implement the backtracking algorithm
    }

    function displaySchedule(schedule) {
        scheduleOutput.innerHTML = '';
        if (!Array.isArray(schedule)) {
            console.error('Invalid schedule: Expected an array', schedule);
            return; // Exit the function if schedule is not an array
        }
        schedule.forEach((s) => {
            const li = document.createElement('li');
            li.textContent = `${s.courseName} - ${s.day} - ${s.startTime} to ${s.endTime}`;
            scheduleOutput.appendChild(li);
        });
    }
});
