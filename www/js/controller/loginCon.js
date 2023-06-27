// Get the form element, logger element, and username input element
const loginForm = document.getElementById("login-form");
const logger = document.getElementById("logger");
const usernameInput = document.getElementById("username-input");
const createAccBg = document.getElementById("create-acc-bg");
const continueButton = document.getElementById("continue-button");
const loadingAnimationCreateAcc =
    document.getElementById("loading-animation-createacc");

// Add event listener to the form submission
loginForm.addEventListener("submit", createAccount);
window.addEventListener("load", checkUsername);


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
            writeFileUsername(username);
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
                "usernameData5.txt",
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
                "usernameData5.txt",
                { create: true },
                function (fileEntry)
                {
                    fileEntry.createWriter(
                        function (fileWriter)
                        {
                            fileWriter.onwriteend = function ()
                            {
                                console.log(
                                    "Data written to path");
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
}
function unAccessAuthorized()
{
    //Show modal
    createAccBg.style.display = "flex";
}