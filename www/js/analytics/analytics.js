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

function getScoresByID(user_id)
{
    const formData = new FormData();
    formData.append('user_id', user_id);

    fetch('https://itsasign.000webhostapp.com/API/getScoresAnalyticsByID.php', {
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


    // "user_id": 173,
    // "easy_highest_score": 37,
    // "intermediate_highest_score": 45.150001525878906,
    // "hard_highest_score": 42.369998931884766,
    // "sentence": "[object Object]",
    // "occurrence": 10