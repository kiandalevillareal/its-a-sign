function getSessions(user_id)
{
    const formData = new FormData();
    formData.append('user_id', user_id);

    fetch('https://itsasign.000webhostapp.com/API/getSessions.php', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data =>
        {
            if (data == "empty")
                console.log("the response is empty, no row retrieved");
            else console.log(data);
        })
        .catch(error =>
        {
            console.log("Something went wrong. Please try again.");
        });
}

// RESPONSE DATA EITHER:

// {
//     "user_id": 171,
//     "sessions_count": 10,
//     "average_session": "18.1000",
//     "total_sessions": "181",
//     "min_session": 0,
//     "max_session": 99
// }

// OR

// empty