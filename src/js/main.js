import { greedyColoring, backtrackingColoring } from './graphColoring.js';

const classForm = document.querySelector('#class-form');
const courseNameInput = document.querySelector('#course-name');
const daySelect = document.querySelector('#day');
const startTimeInput = document.querySelector('#start-time');
const endTimeInput = document.querySelector('#end-time');

let classes = [];

classForm.addEventListener('submit', (e) => {
    e.preventDefault();
  
    // Validate form input
    const courseName = courseNameInput.value.trim();
    const day = daySelect.value;
    const startTime = startTimeInput.value;
    const endTime = endTimeInput.value;
  
    if (!courseName || !day || !startTime || !endTime) {
      // Display an error message or take appropriate action
      return;
    }
  
    // Create a class object
    const newClass = {
      courseName,
      day,
      startTime,
      endTime
    };
  
    // Add the class to the classes array
    classes.push(newClass);
  
    // Clear the form inputs
    courseNameInput.value = '';
    daySelect.value = '';
    startTimeInput.value = '';
    endTimeInput.value = '';
  
    // Display the updated classes or perform any other necessary actions
    console.log(classes);
  });