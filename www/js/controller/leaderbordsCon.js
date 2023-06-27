const gameoverButton = document.getElementById('gameover-button');
const sendScoreButton = document.getElementById('send-highscore-button');
const refreshScoreButton = document.getElementById('refresh-leaderboard-button');

const gameoverContainer = document.getElementById('gameover-container-bg');
const highscoreForm = document.getElementById("send-highscore-form");

const usernameText = document.getElementById("username-text");
const difficultyText = document.getElementById("difficulty-text");
const scoreText = document.getElementById("score-text");
const sentenceText = document.getElementById("sentence-text");

const loadingAnimationLeaderBoardRefresh =
    document.getElementById("loading-animation-leaderboard-refresh");
const loadingAnimationLeaderBoardSend =
    document.getElementById("loading-animation-leaderboard-send");


let isGameOverOn = false;

// Test Case
let user_id_test = 5;
let difficulty_test = 'hard';
let score_test = 3.23;
let sentence_test = "ano ikaw tao ba";

// Add event listener to the form submission
highscoreForm.addEventListener("submit", submitHighscore);

refreshScoreButton.addEventListener('click', function ()
{
    // Code to be executed when the button is clicked
    console.log('Button refresh clicked!');
});

gameoverButton.addEventListener('click', () =>
{
    isGameOverOn = !isGameOverOn;
    if (isGameOverOn)
    {
        gameoverContainer.style.display = "flex";
        gameIsOver();
    } else
    {
        gameoverContainer.style.display = "none";
    }
});

function gameIsOver()
{
    usernameText.textContent = user_id_test;
    difficultyText.textContent = difficulty_test;
    scoreText.textContent = score_test;
    sentenceText.textContent = sentence_test;
}


function submitHighscore(event)
{
    event.preventDefault(); // Prevent default form  submission

    sendScoreButton.style.display = "none";
    loadingAnimationLeaderBoardSend.style.display = "inline-block";

    const formData = new FormData(highscoreForm);

    formData.append('user_id', user_id_test);
    formData.append('difficulty', difficulty_test);
    formData.append('score', score_test);
    formData.append('word', sentence_test);

    consoleLogger("sending");

    // Convert FormData to JSON
    const jsonData = {};

    for (let [key, value] of formData.entries())
    {
        jsonData[key] = value;
    }

    // Log the form data in JSON format
    console.log(JSON.stringify(jsonData));

    // Make a POST request with the form data
    fetch('https://itsasign.000webhostapp.com/API/addScore.php', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data =>
        {
            if (data == "score added")
                consoleLogger("score added");
            else consoleLogger(data);
        })
        .catch(error =>
        {
            consoleLogger("Something went wrong. Please try again.");
        })
        .finally(() =>
        {
            sendScoreButton.style.display = "inline-block";
            loadingAnimationLeaderBoardSend.style.display = "none";
        });
}