const gameoverButton = document.getElementById('gameover-button');
const gameoverContainer = document.getElementById('gameover-container-bg');
const highscoreForm = document.getElementById("send-highscore-form");

let isGameOverOn = false;

// Add event listener to the form submission
highscoreForm.addEventListener("submit", submitHighscore);

gameoverButton.addEventListener('click', () =>
{
    isGameOverOn = !isGameOverOn;
    if (isGameOverOn) gameoverContainer.style.display = "flex";
    else gameoverContainer.style.display = "none";
});


function submitHighscore(event)
{
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(highscoreForm);

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
        });

    // Reset the form after submission
    // loginForm.reset();
    // usernameInput.focus();

}