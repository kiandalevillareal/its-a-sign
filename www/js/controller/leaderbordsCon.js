
const sendScoreButton = document.getElementById('send-highscore-button');
const refreshScoreButton = document.getElementById('refresh-leaderboard-button');

const gameoverContainer = document.getElementById('gameover-container-bg');
const leaderboadCon = document.getElementById("leaderboard-container");
const leaderboadGroup1 = document.getElementById("leaderboard-avatar-group-1");
const leaderboadGroup2 = document.getElementById("leaderboard-avatar-group-2");
const leaderboadGroup3 = document.getElementById("leaderboard-avatar-group-3");
const leaderboadGroupCurrent = document.getElementById("leaderboard-avatar-group-current");

const usernameText = document.getElementById("username-text");
const difficultyText = document.getElementById("difficulty-text");
const scoreText = document.getElementById("score-text");
const sentenceText = document.getElementById("sentence-text");

const firstUsernameText = document.getElementById("first-place-username");
const firstScoreText = document.getElementById("first-place-score");
const firstSentenceText = document.getElementById("first-place-sentence");
const firstAvatar = document.getElementById("first-place-avatar");

const secondUsernameText = document.getElementById("second-place-username");
const secondScoreText = document.getElementById("second-place-score");
const secondSentenceText = document.getElementById("second-place-sentence");
const secondAvatar = document.getElementById("second-place-avatar");

const thirdUsernameText = document.getElementById("third-place-username");
const thirdScoreText = document.getElementById("third-place-score");
const thirdSentenceText = document.getElementById("third-place-sentence");
const thirdAvatar = document.getElementById("third-place-avatar");

const currentUsernameText = document.getElementById("current-place-username");
const currentScoreText = document.getElementById("current-place-score");
const currentSentenceText = document.getElementById("current-place-sentence");
const currentPositionText = document.getElementById("current-place-position");
const currentAvatar = document.getElementById("current-place-avatar");

const displayScore = document.getElementById("display-score");
const displaySentence = document.getElementById("display-sentence");

const difficultyDropdown = document.getElementById("difficulty-dropdown");

const loadingAnimationLeaderBoardRefresh =
    document.getElementById("loading-animation-leaderboard-refresh");
const loadingAnimationLeaderBoardSend =
    document.getElementById("loading-animation-leaderboard-send");


let isGameOverOn = false;

// Test Case
let difficulty_test = 'easy';
let score_test = 5.34;
let sentence_test = "ano ikaw tao ba";

// Add event listener to the form submission
sendScoreButton.addEventListener("click", submitHighscore);

refreshScoreButton.addEventListener('click', refreshLeaderboard);


function refreshLeaderboard()
{
    event.preventDefault();

    refreshScoreButton.style.display = "none";
    loadingAnimationLeaderBoardRefresh.style.display = "inline-block";

    const formData = new FormData();

    formData.append('user_id', jsonUserData.user_id);
    formData.append('difficulty', difficultyDropdown.value);
    // formData.append('user_id', 41);
    // formData.append('difficulty', difficultyDropdown.value);
    console.log(jsonUserData.user_id);

    let dataLB = null;

    // Make a POST request with the form data
    fetch('https://itsasign.000webhostapp.com/API/retrieveLeaderboard.php', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data =>
        {
            dataLB = data;

            resetLeaderboards();
            leaderboadCon.style.display = "inline-block";
            leaderboadGroup1.style.display = "none";
            leaderboadGroup2.style.display = "none";
            leaderboadGroup3.style.display = "none";
            leaderboadGroupCurrent.style.display = "none";

            firstUsernameText.textContent = dataLB[0].username;
            firstScoreText.textContent = dataLB[0].score;
            // firstSentenceText.textContent = dataLB[0].sentence;
            firstAvatar.setAttribute('src', "avatars/" + dataLB[0].avatar_id + ".png");
            leaderboadGroup1.style.display = "block";

            if (parseInt(dataLB[1].position) < 2) return;

            secondUsernameText.textContent = dataLB[1].username;
            secondScoreText.textContent = dataLB[1].score;
            // secondSentenceText.textContent = dataLB[1].sentence;
            secondAvatar.setAttribute('src', "avatars/" + dataLB[1].avatar_id + ".png");
            leaderboadGroup2.style.display = "block";

            if (parseInt(dataLB[2].position) < 3) return;

            thirdUsernameText.textContent = dataLB[2].username;
            thirdScoreText.textContent = dataLB[2].score;
            // thirdSentenceText.textContent = dataLB[2].sentence;
            thirdAvatar.setAttribute('src', "avatars/" + dataLB[2].avatar_id + ".png");
            leaderboadGroup3.style.display = "block";

            // If no 4th data
            if (dataLB[3] == null) return;

            // If 4th data exist before 4th data
            if (parseInt(dataLB[3].position) < 4) return;

            currentPositionText.textContent = dataLB[3].position.toString() + 'th';
            currentUsernameText.textContent = dataLB[3].username;
            currentScoreText.textContent = dataLB[3].score;
            // currentSentenceText.textContent = dataLB[3].sentence;
            currentAvatar.setAttribute('src', "avatars/" + dataLB[3].avatar_id + ".png");
            leaderboadGroupCurrent.style.display = "flex";

        })
        .catch(error =>
        {
            console.log("Something went wrong. Please try again.", error);
        })
        .finally(() =>
        {
            refreshScoreButton.style.display = "inline-block";
            loadingAnimationLeaderBoardRefresh.style.display = "none";
        });
}

function submitHighscore(event)
{
    // event.preventDefault();

    sendScoreButton.style.display = "none";
    loadingAnimationLeaderBoardSend.style.display = "inline-block";

    const formData = new FormData();

    formData.append('user_id', jsonUserData.user_id);
    formData.append('difficulty', currentDifficulty);
    formData.append('score', timeLeft);
    formData.append('sentence', bestSentence);

    // Make a POST request with the form data
    fetch('https://itsasign.000webhostapp.com/API/addScore.php', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data =>
        {
            if (data == "score added")
                console.log("score added");
            else console.log(data);
        })
        .catch(error =>
        {
            console.log("Something went wrong. Please try again.");
        })
        .finally(() =>
        {
            sendScoreButton.style.display = "inline-block";
            loadingAnimationLeaderBoardSend.style.display = "none";
        });
}

function resetLeaderboards()
{
    firstUsernameText.textContent = "";
    firstScoreText.textContent = "";
    firstAvatar.setAttribute('src', "avatars/default.png");

    secondUsernameText.textContent = "";
    secondScoreText.textContent = "";
    firstAvatar.setAttribute('src', "avatars/default.png");

    thirdUsernameText.textContent = "";
    thirdScoreText.textContent = "";
    firstAvatar.setAttribute('src', "avatars/default.png");

    currentUsernameText.textContent = "";
    currentScoreText.textContent = "";
    currentPositionText.textContent = "";
    currentAvatar.setAttribute('src', "avatars/default.png");
}