document.addEventListener('DOMContentLoaded', () => {
    const classes = JSON.parse(localStorage.getItem('classes')) || [];
    const maxRoom = parseInt(localStorage.getItem('maxRoom'));
    const result = executeBacktracking(classes, maxRoom);
    
    if (result.rooms.length === 0) {
        showFaledMessage();
    }
    
    displayRooms(result.rooms, '#roomsBacktracking');
    visualizeGraph(classes, '#chartBacktracking', result.steps);
});

function executeBacktracking(classes, maxRoom) {
    let rooms = [];
    let steps = [];

    function recordStep(classItem, roomIndex, action) {
        steps.push({ classItem, roomIndex, action });
    }

    function canPlace(classItem, room) {
        return room.every(c => c.end <= classItem.start || c.start >= classItem.end);
    }

    function placeClass(index) {
        if (index === classes.length) return true;
        for (let roomIndex in rooms) {
            recordStep(classes[index], parseInt(roomIndex), 'place');
            if (canPlace(classes[index], rooms[roomIndex])) {
                rooms[roomIndex].push(classes[index]);
                if (placeClass(index + 1)) return true;
                rooms[roomIndex].pop();
                recordStep(classes[index], parseInt(roomIndex), 'remove');
            }
        }
        if (rooms.length < maxRoom) {
            let newRoom = [classes[index]];
            rooms.push(newRoom);
            recordStep(classes[index], rooms.length - 1, 'place');
            if (placeClass(index + 1)) return true;
            rooms.pop();
            recordStep(classes[index], rooms.length - 1, 'remove');
        }
        recordStep(classes[index], rooms.length, 'remove');
        return false;
    }

    classes.sort((a, b) => a.start.localeCompare(b.start));
    placeClass(0);
    return { rooms, steps };
}

