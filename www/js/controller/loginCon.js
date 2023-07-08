// Get the form element, logger element, and username input element
const loginForm = document.getElementById("login-form");
const logger = document.getElementById("logger");
const usernameInput = document.getElementById("username-input");
const createAccBg = document.getElementById("create-account-bg");
const continueButton = document.getElementById("continue-button");
const loadingAnimationCreateAcc = document.getElementById("loading-animation-createacc");
const avatarButton = document.getElementById('avatar-button');
const avatarsContainer = document.getElementById('user-avatar-bg');
const userAvatar = document.getElementById('user-avatar');

let jsonUserData = {
    avatar_id: '1'
};

window.onerror = function (message, source, lineno, colno, error)
{
    const errorWithLine = "TestErrors at line " + lineno + ": " + error;
    mobileLogger.textContent += "\n" + errorWithLine;
};

// Add event listener to the form submission
loginForm.addEventListener("submit", createAccount);
// window.addEventListener("load", checkStoredAccount);

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady()
{

    mobileLogger.textContent += "\n" + "DEVICE READY";
    checkStoredAccount();
}

// Create account event function
function createAccount(event)
{
    event.preventDefault(); // Prevent default form submission

    const usernameInput = document.getElementById("username-input");

    const username = usernameInput.value.trim();

    if (username.length < 8 ||
        username.length > 16 ||
        username.includes("\n"))
    {
        logger.textContent =
            "Username must have 8 to 16 characters and be one line only. ";
        return;
    }

    continueButton.style.display = "none";
    loadingAnimationCreateAcc.style.display = "inline-block";

    const formData = new FormData(loginForm);

    formData.append('avatar_id', jsonUserData.avatar_id);

    // Make a POST request with the form data
    fetch('https://itsasign.000webhostapp.com/API/createUser.php', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data =>
        {
            if (data == "user not created") 
            {
                logger.textContent =
                    "User not created. Please try again.";
            }
            else if (data == "username has taken") 
            {
                logger.textContent =
                    "Username has taken. Please try again.";
            }
            else
            {
                logger.textContent =
                    "User created.";
                storeUsernameData(data);
            }

        })
        .catch(error =>
        {
            // Handle any errors
            // logger.textContent = 'Error: ' + error.message;
            logger.textContent =
                "Something went wrong. Please try again.";
        })
        .finally(() =>
        {
            continueButton.style.display = "inline-block";
            loadingAnimationCreateAcc.style.display = "none";
        });
}

// Authorized access to start the game
function accessAuthorized()
{
    mobileLogger.textContent = mobileLogger.textContent + "\n" + "access auth";
    createAccBg.style.display = "none";

    profileButton.style.display = "flex";
    profileButton.setAttribute('src', "avatars/" + jsonUserData.avatar_id + ".png");
}

// Checks if the user has already created and store an account in the device
function checkStoredAccount()
{
    // Reading the JSON file contents
    readJSONFile()
        .then(jsonData =>
        {
            // console.log("Contents of JSON file:", jsonData);
            jsonUserData = JSON.parse(jsonData);
            mobileLogger.textContent = mobileLogger.textContent + "\n" + "TestErrrors: " + jsonUserData;
            accessAuthorized();
        })
        .catch(error =>
        {
            // console.log("Failed to read JSON file:", error);
            mobileLogger.textContent = mobileLogger.textContent + "\n" + "TestErrrors: " + error;
            createNewAccount();
        });
}

// Creates new account by showing the form
function createNewAccount()
{
    //Show modal
    createAccBg.style.display = "flex";
}

// Stores the created account to the persistent data path
function storeUsernameData(data)
{
    jsonUserData = data;
    // Writing JSON data to file
    writeJSONToFile(jsonUserData)
        .then(success =>
        {
            // console.log("Writing JSON data to file:", success);
            checkStoredAccount();
        })
        .catch(error =>
        {
            // console.log("Failed to write JSON data to file:", error);
        });
}

// Avatar selection
function selectAvatar(element, avatar)
{
    jsonUserData.avatar_id = avatar;
    userAvatar.setAttribute('src', "avatars/" + avatar + ".png");

    // Remove the green background from all items
    var items = document.getElementsByClassName("item");
    for (var i = 0; i < items.length; i++)
    {
        items[i].style.backgroundColor = "";
    }

    // Add the green background to the selected item
    var selectedItem = element.parentElement;
    selectedItem.style.backgroundColor = "green";
    setTimeout(function ()
    {
        avatarsContainer.style.display = "none";
    }, 400);
}

// User profile
avatarButton.addEventListener('click', function ()
{
    event.preventDefault();
    avatarsContainer.style.display = "flex";
});


getSessions(171);