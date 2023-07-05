// ADD TOGGLE SWITCH
function handleToggle() {
  const toggleSwitch = document.getElementById("toggle");
  const toggleSlider = document.querySelector(".toggle-slider");
  const toggleLabelLeft = document.querySelector(".toggle-label-left");
  const toggleLabelRight = document.querySelector(".toggle-label-right");
  const oneHandContainer = document.querySelector(".one-hand-container");
  const twoHandContainer = document.querySelector(".two-hand-container");

  if (toggleSwitch.checked) {
    // Show Two-hand container, hide One-hand container
    oneHandContainer.style.display = "none";
    twoHandContainer.style.display = "flex";
    
    // Update slider position and label colors
    const sliderPosition = window.innerWidth <= 768 ? "82%" : "88%";
    toggleSlider.style.transform = `translateX(${sliderPosition})`;
    toggleLabelLeft.style.color = "#e4e4e4";
    toggleLabelRight.style.color = "#e4e4e4";
    
    // Reset currentIndex to 0 for Two-hand container
    currentIndex = 0;
  } else {
    // Show One-hand container, hide Two-hand container
    oneHandContainer.style.display = "flex";
    twoHandContainer.style.display = "none";
    
    // Reset slider position and label colors
    toggleSlider.style.transform = "translateX(0)";
    toggleLabelLeft.style.color = "#e4e4e4";
    toggleLabelRight.style.color = "#e4e4e4";
    
    // Reset currentIndex to 0 for One-hand container
    currentIndex = 0;
  }
  
  // Show the initial word section
  showWord(currentIndex);
}



// function fetchSigns() {
//     fetch("js/data/signs.json") // Replace with the actual URL of the signs.json file
//         .then((response) => {
//             if (response.ok) {
//                 return response.json();
//             } else {
//                 throw new Error("Failed to fetch signs.json");
//             }
//         })
//         .then((signsData) => {
//             console.log(signsData);
//         })
//         .catch((error) => {
//             // Handle the error
//             console.error(error);
//         });
// }

// fetchSigns();

const words = ['ako', 'almusal', 'bukas', 'emergency', 'hapunan', 'hello', 'ikaw', 'inom', 'lola', 'lolo', 'naiintindihan', 'pakiusap', 'patawad', 'welcome'];
const words1 = ['bahay', 'excuseme', 'gamot', 'kumusta', 'magandanggabi', 'magandanghapon', 'magandangtanghali', 'magandangumaga', 'mamaya', 'natutuhan', 'ngayongaraw', 'pangalan', 'salamat', 'signlanguage', 'trabaho', 'tulong', 'oras', 'paaralan'];
let currentIndex = 0;

const oneHandContainer = document.querySelector('.one-hand-container');
const twoHandContainer = document.querySelector('.two-hand-container');
const previousButtonOneHand = document.querySelector('.one-hand-container .previous-button');
const nextButtonOneHand = document.querySelector('.one-hand-container .next-button');
const previousButtonTwoHand = document.querySelector('.two-hand-container .previous-button');
const nextButtonTwoHand = document.querySelector('.two-hand-container .next-button');

function showWord(index) {
  const oneHandSections = document.querySelectorAll('.one-hand-container .word');
  const twoHandSections = document.querySelectorAll('.two-hand-container .word1');

  oneHandSections.forEach((section, i) => {
    section.style.display = i === index ? 'flex' : 'none';
  });

  twoHandSections.forEach((section, i) => {
    section.style.display = i === index ? 'flex' : 'none';
  });

  // Show/hide previous and next buttons based on current index
  previousButtonOneHand.style.display = index === 0 ? 'none' : 'block';
  nextButtonOneHand.style.display = index === words.length - 1 ? 'none' : 'block';
  previousButtonTwoHand.style.display = index === 0 ? 'none' : 'block';
  nextButtonTwoHand.style.display = index === words1.length - 1 ? 'none' : 'block';

  // Show/hide button-container based on current index
  const buttonContainerOneHand = document.querySelector('.one-hand-container .button-container');
  const buttonContainerTwoHand = document.querySelector('.two-hand-container .button-container');

  if (index === words.length - 1 && index === words1.length -1) {
    buttonContainerOneHand.style.display = 'flex';
    buttonContainerTwoHand.style.display = 'none';
    nextButtonOneHand.style.display = 'none';
    nextButtonTwoHand.style.display = 'none';
  } else {
    buttonContainerOneHand.style.display = 'flex';
    buttonContainerTwoHand.style.display = 'flex';
  }
}



function navigatePrevious() {
  currentIndex = Math.max(currentIndex - 1, 0);
  showWord(currentIndex);
}

function navigateNext() {
  if (currentIndex < words.length - 1 && twoHandContainer.style.display === 'none') {
    currentIndex++;
  } else if (currentIndex < words1.length - 1 && oneHandContainer.style.display === 'none') {
    currentIndex++;
  }
  showWord(currentIndex);
}



previousButtonOneHand.addEventListener('click', navigatePrevious);
nextButtonOneHand.addEventListener('click', navigateNext);
previousButtonTwoHand.addEventListener('click', navigatePrevious);
nextButtonTwoHand.addEventListener('click', navigateNext);

// Show the initial word section
showWord(currentIndex);
