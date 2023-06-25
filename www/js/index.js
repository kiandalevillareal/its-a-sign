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

// Set initial values
let points = 0;
let round = 1;
let timeLeft = 60;

// Update the points display
function updatePoints(value) {
  points = value;
  pointsElement.textContent = points;
}

// Update the round display
function updateRound(value) {
  round = value;
  roundElement.textContent = round;
}

// Update the timer display
function updateTimer(value) {
  timeLeft = value;
  
  const minutes = Math.floor(timeLeft / 60); // Calculate minutes
  const seconds = timeLeft % 60; // Calculate seconds
  
  // Format the minutes and seconds with leading zeros if necessary
  const formattedMinutes = String(minutes).padStart(1, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');
  
  timerElement.textContent = `${formattedMinutes}:${formattedSeconds}`;
}
/// for difficulties section
const playButton = document.getElementById("play-button");
const homeContainer = document.getElementById("home-container");
const difficultiesContainer = document.getElementById("difficulties-container");

playButton.addEventListener("click", function() {
  // Hide the home section
  homeContainer.style.display = "none";
  
  // Show the difficulties section
  difficultiesContainer.style.display = "flex";
});

//back button
const backButton = document.querySelector('.back-button');

backButton.addEventListener('click', () => {
  // Show the home container and hide the difficulties container
  const homeContainer = document.getElementById('home-container');
  const difficultiesContainer = document.getElementById('difficulties-container');
  
  homeContainer.style.display = 'flex';
  difficultiesContainer.style.display = 'none';
});
