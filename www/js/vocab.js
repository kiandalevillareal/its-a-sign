// ADD TOGGLE SWITCH
function handleToggle() {
  const toggleSwitch = document.getElementById("toggle");
  const toggleSlider = document.querySelector(".toggle-slider");
  const toggleLabelLeft = document.querySelector(".toggle-label-left");
  const toggleLabelRight = document.querySelector(".toggle-label-right");
  const oneHandContainer = document.querySelector(".one-hand-container");
  const twoHandContainer = document.querySelector(".two-hand-container");
  const listSection = document.querySelector('.list-section');
  const listSection1 = document.querySelector('.list-section1');

  if (toggleSwitch.checked) {
    // Show Two-hand container, hide One-hand container
    oneHandContainer.style.display = "none";
    twoHandContainer.style.display = "flex";
    
    // Update slider position and label colors
    const sliderPosition = window.innerWidth <= 844 ? (window.innerWidth <= 390 ? "82%" : "85%") : "88%";
    toggleSlider.style.transform = `translateX(${sliderPosition})`;
    toggleLabelLeft.style.color = "#fff";
    toggleLabelRight.style.color = "#fff";
    
    // Reset currentIndex to 0 for Two-hand container
    currentIndex = 0;

    // Hide list sections when toggle switch is clicked
    listSection.style.display = 'none';
    listSection1.style.display = 'none';
  } else {
    // Show One-hand container, hide Two-hand container
    oneHandContainer.style.display = "flex";
    twoHandContainer.style.display = "none";
    
    // Reset slider position and label colors
    toggleSlider.style.transform = "translateX(0)";
    toggleLabelLeft.style.color = "#fff";
    toggleLabelRight.style.color = "#fff";
    
    // Reset currentIndex to 0 for One-hand container
    currentIndex = 0;

    // Hide list sections when toggle switch is clicked
    listSection.style.display = 'none';
    listSection1.style.display = 'none';
  }
  
  // Show the initial word section
  showWord(currentIndex);
}

function toggleList() {
  const listSection = document.querySelector('.list-section');
  const listSection1 = document.querySelector('.list-section1');
  const toggleSwitch = document.getElementById('toggle');

  if (toggleSwitch.checked) {
    // Two-hand container is active, show list-section1 and hide list-section
    if (listSection1.style.display === 'none') {
      listSection1.style.display = 'block';
    } else {
      listSection1.style.display = 'none';
    }
    listSection.style.display = 'none';
  } else {
    // One-hand container is active, show list-section and hide list-section1
    if (listSection.style.display === 'none') {
      listSection.style.display = 'block';
    } else {
      listSection.style.display = 'none';
    }
    listSection1.style.display = 'none';
  }
}

const words = ['ako', 'almusal', 'bukas', 'emergency', 'hapunan', 'hello', 'ikaw', 'inom', 'lola', 'lolo', 'naiintindihan', 'pakiusap', 'patawad', 'welcome'];
const words1 = ['bahay', 'excuseme', 'gamot', 'kumusta', 'magandanggabi', 'magandanghapon', 'magandangtanghali', 'magandangumaga', 'mamaya', 'natutuhan', 'ngayongaraw', 'oras', 'paaralan', 'pangalan', 'salamat', 'signlanguage', 'trabaho', 'tulong'];
let currentIndex = 0;

const oneHandContainer = document.querySelector('.one-hand-container');
const twoHandContainer = document.querySelector('.two-hand-container');
const previousButtonOneHand = document.querySelector('.one-hand-container .previous-button');
const nextButtonOneHand = document.querySelector('.one-hand-container .next-button');
const previousButtonTwoHand = document.querySelector('.two-hand-container .previous-button');
const nextButtonTwoHand = document.querySelector('.two-hand-container .next-button');
const listItems = document.querySelectorAll('.list-section li');
const listItems1 = document.querySelectorAll('.list-section1 li');


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

function handleListClick(event) {
  const selectedWord = event.target.textContent.toLowerCase().replace(/\s+/g, '');
  const wordIndex = words.findIndex((word) => word.toLowerCase().replace(/\s+/g, '') === selectedWord);
  const wordIndex1 = words1.findIndex((word) => word.toLowerCase().replace(/\s+/g, '') === selectedWord);

  const listSection = document.querySelector('.list-section');
  const listSection1 = document.querySelector('.list-section1');

  if (wordIndex !== -1) {
    currentIndex = wordIndex;
    showWord(currentIndex);

    // Remove 'selected' class from all list items
    listItems.forEach((item) => {
      item.classList.remove('selected');
    });

    // Add 'selected' class to the clicked list item
    event.target.classList.add('selected');

    // Hide the list-section after selecting a word
    listSection.style.display = 'none';
    listSection1.style.display = 'none';
  }

  if (wordIndex1 !== -1) {
    currentIndex = wordIndex1;
    showWord(currentIndex);

    // Remove 'selected' class from all list items
    listItems1.forEach((item) => {
      item.classList.remove('selected');
    });

    // Add 'selected' class to the clicked list item
    event.target.classList.add('selected');

    // Hide the list-section1 after selecting a word
    listSection.style.display = 'none';
    listSection1.style.display = 'none';
  }
}

// Add click event listeners to list items
const listItemsList = document.querySelectorAll('.list-section ul li');
listItemsList.forEach((item) => {
  item.addEventListener('click', handleListClick);
});

const listItemsList1 = document.querySelectorAll('.list-section1 ul li');
listItemsList1.forEach((item) => {
  item.addEventListener('click', handleListClick);
});


previousButtonOneHand.addEventListener('click', navigatePrevious);
nextButtonOneHand.addEventListener('click', navigateNext);
previousButtonTwoHand.addEventListener('click', navigatePrevious);
nextButtonTwoHand.addEventListener('click', navigateNext);

// Show the initial word section
showWord(currentIndex);
