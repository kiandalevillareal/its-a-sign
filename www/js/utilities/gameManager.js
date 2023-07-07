function gameEndedComplete()
{
    submitHighscore();
    refreshLeaderboard();
    endSession();
}
function gameEndedIncomplete()
{
    submitHighscore();
    refreshLeaderboard();
    endSession();
}
function gameStarted()
{
    addSession();
}