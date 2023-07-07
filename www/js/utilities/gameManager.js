function gameEndedComplete()
{
    refreshLeaderboard();
    endSession();
}
function gameEndedIncomplete()
{
    refreshLeaderboard();
    endSession();
}
function gameStarted()
{
    addSession();
}