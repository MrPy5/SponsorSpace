//Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
//https://www.youtube.com/watch?v=9kRgVxULbag

document.addEventListener("DOMContentLoaded", event => {

    const app = firebase.app();
    console.log(app);
    
    var loginButton = document.getElementById('login-button');
    var nameDisplay = document.getElementById('name');
    var signoutContainer = document.getElementById('signout-container');
    if (localStorage.getItem("SessionUserEmail") == null) {
        signoutContainer.style.display = "none";
    }
    else {
        loginButton.style.display = "none";
        nameDisplay.innerHTML = localStorage.getItem("SessionUserName");
    }
})

function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(result => {
        const user = result.user;
        localStorage.setItem("SessionUserEmail", user.email);
        localStorage.setItem("SessionUserName", user.displayName);
        window.location.replace("/index.html");
        console.log(user);
    })
}

function signout() {
    localStorage.clear();
    window.location.replace("/index.html");
}