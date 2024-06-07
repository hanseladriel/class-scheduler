const scheduler = (() => {
    let classes = [];
    let maxRoom = 0;

    function saveMaxRoom() {
        const maxRoomInput = document.getElementById('maxRoom').value;
        if (maxRoomInput > 0) {
            maxRoom = parseInt(maxRoomInput);
            localStorage.setItem('maxRoom', maxRoom);
            alert(`Maximum number of rooms set to ${maxRoom}`);
        } else {
            alert("Please enter a valid number greater than 0");
        }
    }

    function chooseAlgorithm(algorithm) {
        localStorage.setItem('classes', JSON.stringify(classes));
        localStorage.setItem('maxRoom', maxRoom);
        if (maxRoom === 0) {
            alert("Please set the maximum number of rooms first.");
            return;
        }
        if (algorithm === 'greedy') {
            window.location.href = 'greedy.html';
        } else if (algorithm === 'backtracking') {
            window.location.href = 'backtracking.html';
        }
    }

    function addClass() {
        const className = document.getElementById('className').value;
        const startTime = document.getElementById('startTime').value;
        const endTime = document.getElementById('endTime').value;

        if (className && startTime && endTime) {
            if (startTime < endTime) {
                classes.push({ name: className, start: startTime, end: endTime });
                document.getElementById('className').value = '';
                document.getElementById('startTime').value = '';
                document.getElementById('endTime').value = '';
                displayClasses();
            } else {
                alert("Start time must be before end time.");
            }
        }
    }

    function addClass() {
        const className = document.getElementById('className').value;
        const startTime = document.getElementById('startTime').value;
        const endTime = document.getElementById('endTime').value;

        if (className && startTime && endTime) {
            if (startTime < endTime) {
                classes.push({ name: className, start: startTime, end: endTime });
                document.getElementById('className').value = '';
                document.getElementById('startTime').value = '';
                document.getElementById('endTime').value = '';
                displayClasses();
            } else {
                alert("Start time must be before end time.");
            }
        }
    }

    function addTemplate() {
        const templateClasses = [
            { name: 'Algoritma Pemrograman', start: '09:00', end: '10:00' },
            { name: 'Struktur Data', start: '09:00', end: '10:00' },
            { name: 'Matematika Diskrit', start: '09:30', end: '10:30' },
            { name: 'Basis Data', start: '09:30', end: '10:30' },
            { name: 'Pemrograman Lanjut', start: '09:45', end: '10:45' },
            { name: 'Jaringan Komputer', start: '10:00', end: '11:00' },
            { name: 'Sistem Operasi', start: '10:00', end: '11:00' },
            { name: 'Kecerdasan Buatan', start: '10:15', end: '11:15' },
            { name: 'Pemrograman Web', start: '10:30', end: '11:30' },
            { name: 'Pemrograman Mobile', start: '10:30', end: '11:30' },
            { name: 'Keamanan Komputer', start: '10:45', end: '11:45' },
            { name: 'Komputasi Awan', start: '11:00', end: '12:00' },
            { name: 'Interaksi Manusia dan Komputer', start: '11:15', end: '12:15' },
            { name: 'Pemrograman Paralel', start: '11:30', end: '12:30' },
            { name: 'Sistem Informasi', start: '11:45', end: '12:45' },
            { name: 'Teori Bahasa dan Automata', start: '12:00', end: '13:00' },
            { name: 'Pemrosesan Citra', start: '12:00', end: '13:00' },
            { name: 'Pembelajaran Mesin', start: '12:15', end: '13:15' },
            { name: 'Robotika', start: '12:30', end: '13:30' },
            { name: 'Pengenalan Pemrograman', start: '12:45', end: '13:45' },
            { name: 'Penambangan Data', start: '13:00', end: '14:00' },
            { name: 'Sistem Terdistribusi', start: '13:15', end: '14:15' },
            { name: 'Sistem Digital', start: '13:30', end: '14:30' },
            { name: 'Kalkulus', start: '13:45', end: '14:45' }
        ];
    
        classes = classes.concat(templateClasses);
        maxRoom = 6;
        displayClasses();
    }

    function clearClasses() {
        classes = [];
        displayClasses();
    }

    function displayClasses() {
        const classesList = document.getElementById('classesList');
        classesList.innerHTML = '<table><thead><tr><th>Class Name</th><th>Start Time</th><th>End Time</th></tr></thead><tbody>' + classes.map(c => `<tr><td>${c.name}</td><td>${c.start}</td><td>${c.end}</td></tr>`).join('') + '</tbody></table>';
    }

    return {
        addClass,
        addTemplate,
        saveMaxRoom,
        chooseAlgorithm,
        clearClasses
    };
})();
