export function greedyColoring(classes) {
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

export function backtrackingColoring(classes) {
  // Create an adjacency list to represent the graph
  const adjacencyList = createAdjacencyList(classes);

  // Initialize an array to store the colors assigned to each vertex
  const colors = new Array(classes.length).fill(null);

  // Initialize a set to keep track of the used colors
  const usedColors = new Set();

  // Call the recursive backtracking function
  const result = backtrack(adjacencyList, colors, 0, usedColors);

  // Return the assigned colors if a solution was found, otherwise return null
  return result ? colors : null;
}

function backtrack(adjacencyList, colors, vertex, usedColors) {
  // Base case: All vertices have been assigned colors
  if (vertex === adjacencyList.length) {
    return true;
  }

  // Iterate through all possible colors
  for (let color = 1; color <= adjacencyList.length; color++) {
    // Skip this color if it is already used by an adjacent vertex
    if (usedColors.has(color) || adjacencyList[vertex].some(v => colors[v] === color)) {
      continue;
    }

    // Assign the current color to the current vertex
    colors[vertex] = color;
    usedColors.add(color);

    // Recursively try to assign colors to the remaining vertices
    if (backtrack(adjacencyList, colors, vertex + 1, usedColors)) {
      return true;
    }

    // If the recursive call fails, backtrack and try a different color
    colors[vertex] = null;
    usedColors.delete(color);
  }

  // If no color assignment works, return false
  return false;
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