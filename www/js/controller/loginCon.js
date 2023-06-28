// Get the form element, logger element, and username input element
const loginForm = document.getElementById("login-form");
const logger = document.getElementById("logger");
const usernameInput = document.getElementById("username-input");
const createAccBg = document.getElementById("create-account-bg");
const continueButton = document.getElementById("continue-button");
const loadingAnimationCreateAcc =
    document.getElementById("loading-animation-createacc");
const avatarButton = document.getElementById('avatar-button');
const avatarsContainer = document.getElementById('user-avatar-bg');
const userAvatar = document.getElementById('user-avatar');

let userAvatarID = 1;

// Add event listener to the form submission
loginForm.addEventListener("submit", createAccount);
window.addEventListener("load", checkUsername);

avatarButton.addEventListener('click', function ()
{
    event.preventDefault();
    avatarsContainer.style.display = "flex";
});

function selectAvatar(element, avatar)
{
    userAvatarID = avatar;
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

// Define the createAccount function
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

    formData.append('avatar_id', userAvatarID);

    // Make a POST request with the form data
    fetch('https://itsasign.000webhostapp.com/API/createUser.php', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data =>
        {
            if (data == "user created") accessAuthorized(username);
            // Handle the response data
            logger.textContent = JSON.stringify(data);
            // Store data in persistent data path
            const fileData = JSON.stringify(data);
            writeFileUsername(userAvatarID);
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

function checkUsername()
{
    window.webkitRequestFileSystem(
        window.PERSISTENT,
        5 * 1024 * 1024, // 5MB storage space (change as needed)
        function (fileSystem)
        {
            fileSystem.root.getFile(
                "1112.txt",
                { create: false },
                function (fileEntry)
                {
                    fileEntry.file(function (file)
                    {
                        const reader = new FileReader();
                        reader.onloadend = function ()
                        {
                            console.log(
                                "Stored Username: " + reader.result);
                            accessAuthorized(reader.result);
                        };
                        reader.readAsText(file);
                    });
                },
                function ()
                {
                    console.log("Data not found in persistent path");
                    unAccessAuthorized();
                }
            );
        },
        function ()
        {
            console.log("Failed to access persistent path");
        }
    );
}

function writeFileUsername(fileData)
{
    window.webkitRequestFileSystem(
        window.PERSISTENT,
        5 * 1024 * 1024, // 5MB storage space (change as needed)
        function (fileSystem)
        {
            fileSystem.root.getFile(
                "1112.txt",
                { create: true },
                function (fileEntry)
                {
                    fileEntry.createWriter(
                        function (fileWriter)
                        {
                            fileWriter.onwriteend = function ()
                            {
                                console.log(
                                    "Data written to path: ", fileData);
                            };
                            fileWriter.onerror = function (e)
                            {
                                console.log(
                                    "Failed to write data to path: " + e);
                            };
                            const blob = new Blob(
                                [fileData], { type: "text/plain" });
                            fileWriter.write(blob);
                        },
                        function ()
                        {
                            console.log("Failed to create file writer");
                        }
                    );
                },
                function ()
                {
                    console.log("Failed to access the username file");
                }
            );
        },
        function ()
        {
            console.log("Failed to access the path");
        }
    );
}
function accessAuthorized(_username)
{
    setUsernameInProfile(_username);
    //Dont show modal
    createAccBg.style.display = "none";

    //Initialize profile button
    profileButton.style.display = "flex";
    profileButton.setAttribute('src', "avatars/" + userAvatarID + ".png");
}
function unAccessAuthorized()
{
    //Show modal
    createAccBg.style.display = "flex";
}