//Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
//https://www.youtube.com/watch?v=9kRgVxULbag
document.addEventListener("DOMContentLoaded", event => {

    const app = firebase.app();
    console.log(app);
})

function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(result => {
        const user = result.user;
        document.write(user.displayName);
        document.write(user.email);
        console.log(user);
    })
}