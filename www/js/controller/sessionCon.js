
function addSession()
{
    const formData = new FormData(loginForm);

    formData.append('user_id', jsonUserData.user_id);

    // Make a POST request with the form data
    fetch('https://itsasign.000webhostapp.com/API/addSession.php', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data =>
        {
            if (data == "session not added") 
            {
                console.log("Session Not Added!");
            }
            else
            {
                jsonUserData.session_id = data;
                console.log("Session Added with ID: " + jsonUserData.session_id);
            }

        })
        .catch(error =>
        {
            console.log('Error: ' + error.message);
        })
        .finally(() =>
        {
        });
}

function endSession()
{
    const formData = new FormData(loginForm);

    formData.append('session_id', jsonUserData.session_id);

    // Make a POST request with the form data
    fetch('https://itsasign.000webhostapp.com/API/endSession.php', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data =>
        {
            if (data == "session not ended") 
            {
                console.log("Session Not Ended!");
            }
            else
            {
                console.log("Session Ended with ID: " + jsonUserData.session_id);
            }

        })
        .catch(error =>
        {
            console.log('Error: ' + error.message);
        })
        .finally(() =>
        {
        });
}
