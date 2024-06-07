function displayRooms(rooms, selector) {
    const container = document.querySelector(selector);
    container.innerHTML = '';

    if (rooms.length === 0) {
        const noRoomDiv = document.createElement('div');
        noRoomDiv.className = 'no-room';
        noRoomDiv.innerText = 'There are no rooms.';
        container.appendChild(noRoomDiv);
    } else {
        rooms.forEach((room, index) => {
            const roomDiv = document.createElement('div');
            roomDiv.className = 'room';
            roomDiv.innerHTML = `<h2>Room ${index + 1}</h2>`;
            room.forEach(classItem => {
                const classDiv = document.createElement('div');
                classDiv.className = 'class-item';
                classDiv.innerText = `${classItem.name} (${classItem.start} - ${classItem.end})`;
                roomDiv.appendChild(classDiv);
            });
            container.appendChild(roomDiv);
        });
    }
}


function visualizeGraph(classes, selector, steps) {
    const margin = 20;
    const width = (window.innerWidth - 2 * margin) * 0.8;
    const height = (window.innerHeight - 2 * margin) * 0.6;

    const svg = d3.select(selector)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .style('margin', `${margin}px`);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const nodes = classes.map(d => ({ id: d.name }));
    const links = [];

    classes.forEach((c1, i) => {
        classes.forEach((c2, j) => {
            if (i < j && !(c1.end <= c2.start || c1.start >= c2.end)) {
                links.push({ source: c1.name, target: c2.name });
            }
        });
    });

    const simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink(links).id(d => d.id).distance(75))
        .force('charge', d3.forceManyBody().strength(-75))
        .force('center', d3.forceCenter(width / 2, height / 2));

    const link = svg.append('g')
        .attr('class', 'links')
        .selectAll('line')
        .data(links)
        .enter()
        .append('line')
        .attr('stroke-width', 2)
        .attr('stroke', '#999');

    const node = svg.append('g')
        .attr('class', 'nodes')
        .selectAll('circle')
        .data(nodes)
        .enter()
        .append('circle')
        .attr('r', 10)
        .attr('fill', '#ccc')
        .call(d3.drag()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended));

    const labels = svg.append('g')
        .attr('class', 'labels')
        .selectAll('text')
        .data(nodes)
        .enter()
        .append('text')
        .attr('dy', -10)
        .attr('dx', 10)
        .attr('font-size', '10px')
        .text(d => d.id);

    simulation
        .nodes(nodes)
        .on('tick', ticked);

    simulation.force('link')
        .links(links);

    function ticked() {
        link
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);

        node
            .attr('cx', d => d.x)
            .attr('cy', d => d.y);

        labels
            .attr('x', d => d.x)
            .attr('y', d => d.y);
    }

    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }

    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

    animateColoring(steps, selector);
}

function animateColoring(steps, selector) {
    const svg = d3.select(selector).select('svg');
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    let index = 0;

    function step() {
        if (index < steps.length) {
            const { classItem, roomIndex, action } = steps[index];
            svg.selectAll('circle')
                .filter(d => d.id === classItem.name)
                .transition()
                .duration(500)
                .attr('fill', () => {
                    if (action === 'place') return color(roomIndex);
                    if (action === 'remove' || action === 'skip') return '#ccc';
                });

            index++;
            setTimeout(step, 250);
        }
    }

    step();
}

function showFaledMessage() {
    alert('Failed to place all classes. Increase the maximum number of rooms.');
}