const profileButton = document.getElementById('profile-button');
const profileContainer = document.getElementById('profile-container-bg');

const usernameProfile = document.getElementById('username-profile');

let isProfileOn = false;

profileButton.addEventListener('click', () =>
{
    isProfileOn = !isProfileOn;
    if (isProfileOn) profileContainer.style.display = "flex";
    else profileContainer.style.display = "none";
});

// Set the username on load. Called from  LoginCon
function setUsernameInProfile(username) 
{
    usernameProfile.textContent = username;
}