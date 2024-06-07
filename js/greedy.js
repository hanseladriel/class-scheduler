document.addEventListener('DOMContentLoaded', () => {
    const classes = JSON.parse(localStorage.getItem('classes')) || [];
    const maxRoom = parseInt(localStorage.getItem('maxRoom'));
    const result = executeGreedy(classes, maxRoom);

    if (result.unplaced.length > 0) {
        showFaledMessage();
    }
    
    displayRooms(result.rooms, '#roomsGreedy');
    visualizeGraph(classes, '#chartGreedy', result.steps);
});

function executeGreedy(classes, maxRoom) {
    let rooms = [];
    let steps = [];
    let unplaced = [];

    function canPlace(classItem, room) {
        return room.every(c => c.end <= classItem.start || c.start >= classItem.end);
    }

    function recordStep(classItem, roomIndex, action) {
        steps.push({ classItem, roomIndex, action });
    }

    classes.sort((a, b) => a.start.localeCompare(b.start));
    
    classes.forEach(classItem => {
        let placed = false;
        for (let roomIndex in rooms) {
            recordStep(classItem, parseInt(roomIndex), 'place');
            if (canPlace(classItem, rooms[roomIndex])) {
                rooms[roomIndex].push(classItem);
                recordStep(classItem, parseInt(roomIndex), 'place');
                placed = true;
                break;
            }
        }
        if (!placed) {
            if (rooms.length < maxRoom) {
                let newRoom = [classItem];
                rooms.push(newRoom);
                recordStep(classItem, rooms.length - 1, 'place');
            } else {
                unplaced.push(classItem);
                recordStep(classItem, -1, 'skip');
            }
        }
    });

    return { rooms, steps, unplaced};
}