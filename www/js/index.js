/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	// Cordova is now initialized. Have fun!

	console.log("Running cordova-" + cordova.platformId + "@" + cordova.version);
	// document.getElementById('deviceready').classList.add('ready');
}

// Get the DOM elements
const pointsElement = document.getElementById('pointsValue');
const roundElement = document.getElementById('roundValue');
const timerElement = document.getElementById('timerValue');


// CONTAINERS
const homeContainer = document.getElementById("home-container");
const difficultiesContainer = document.getElementById("difficulties-container");
const instructionContainer = document.getElementById("instruction-main-container");
const easyContainer = document.getElementById('easy-container');
const intermediateContainer = document.getElementById('intermediate-container');
const hardContainer = document.getElementById('hard-container');


// BUTTONS
const playButton = document.getElementById("play-button");
const backButton = document.querySelector('.back-button');
const instructionButton = document.getElementById('instruction-button');
const easyButton = document.getElementById('easy-button');
const intermediateButton = document.getElementById('intermediate-button');
const hardButton = document.getElementById('hard-button');


//SHOWS DIFFICULTY SECTION, HIDES HOME SECTION
playButton.addEventListener("click", function() {
  homeContainer.style.display = "none";
  difficultiesContainer.style.display = "flex";
});


// SHOWS HOME SECTION, HIDES DIFFICULTY SECTION
backButton.addEventListener('click', () => {
  homeContainer.style.display = 'flex';
  difficultiesContainer.style.display = 'none';
});

//SHOWS HOW TO SECTION, HIDES HOME SECTION
instructionButton.addEventListener("click", function(){
  instructionContainer.style.display = 'block';
  homeContainer.style.display = 'none';
});

// SHOWS EASY CONTAINER, HIDES DIFFICULTY CONTAINER
easyButton.addEventListener("click", function(){
  easyContainer.style.display = "flex";
  difficultiesContainer.style.display = "none";
});


// SHOWS INTERMEDIATE CONTAINER, HIDES DIFFICULTY CONTAINER
intermediateButton.addEventListener("click", function(){
  intermediateContainer.style.display = "flex";
  difficultiesContainer.style.display = "none";
});


// SHOWS HARD CONTAINER, HIDES DIFFICULTY CONTAINER
hardButton.addEventListener("click", function(){
  hardContainer.style.display = "flex";
  difficultiesContainer.style.display = "none";
});

// SET INITIAL VALUES
let points = 0;
let round = 1;
let timeLeft = 60;

// UPDATE THE POINTS DISPLAY
function updatePoints(value) {
  points = value;
  pointsElement.textContent = points;
}

// UPDATE THE ROUND DISPLAY 
function updateRound(value) {
  round = value;
  roundElement.textContent = round;
}

// UPDATE THE TIMER DISPLAY 
function updateTimer(value) {
  timeLeft = value;
  
  const minutes = Math.floor(timeLeft / 60); // CALCULATE MINUTES
  const seconds = timeLeft % 60; // CALCULATE SECONDS
  
  // Format the minutes and seconds with leading zeros if necessary
  const formattedMinutes = String(minutes).padStart(1, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');
  
  timerElement.textContent = `${formattedMinutes}:${formattedSeconds}`;
}

// Get all the how-to step containers
const instructionContainers = document.querySelectorAll('.instruction-container');
const previousButtons = document.querySelectorAll('.previous-button');
const nextButtons = document.querySelectorAll('.next-button');

var currentStep = 0;

// Function to show the current step
function showStep(stepIndex) {
  // Hide all the step containers
  instructionContainers.forEach((container) => {
    container.classList.remove('active');
  });

  // Show the current step container
  instructionContainers[stepIndex].classList.add('active');

  // Disable/enable previous and next buttons based on the current step
  if (stepIndex === 0) {
    previousButtons.forEach((button) => {
      button.disabled = true;
    });
  } else {
    previousButtons.forEach((button) => {
      button.disabled = false;
    });
  }

  if (stepIndex === instructionContainers.length - 1) {
    nextButtons.forEach((button) => {
      button.disabled = true;
    });
  } else {
    nextButtons.forEach((button) => {
      button.disabled = false;
    });
  }
}

// Show the initial step
showStep(currentStep);

// Event listeners for the previous buttons
previousButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (currentStep > 0) {
      currentStep--;
      showStep(currentStep);
    }
  });
});

// Event listeners for the next buttons
nextButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (currentStep < instructionContainers.length - 1) {
      currentStep++;
      showStep(currentStep);
    }
  });
});