//Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
//https://www.youtube.com/watch?v=9kRgVxULbag


document.addEventListener("DOMContentLoaded", event => {
    
    

    const app = firebase.app();
    const db = firebase.firestore();
    const products = document.getElementById("sponsor");
    

    

    
    var loginButton = document.getElementById('login-button');
    var nameDisplay = document.getElementById('name');
    var signoutContainer = document.getElementById('signout-container');

    var creators = document.getElementById('creator');
    var sponsors = document.getElementById('sponsor');


    if (localStorage.getItem("SessionUserEmail") == null) {
        signoutContainer.style.display = "none";
    }
    else {
        loginButton.style.display = "none";
        nameDisplay.innerHTML = localStorage.getItem("SessionUserName");

        /*db.collection("Users").doc(localStorage.getItem("SessionUserEmail")).get().then((doc) => {
            if (doc.data().role == "creator") {
                creator.style.display = "none";
            }
            if (doc.data().role == "sponsor") {
                sponsor.style.display = "none";
            }
        });*/
    }

    db.collection("Sponsors").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data().user);
            sponsors.innerHTML += "<div class = 'option'><div class = 'option-header'>" + doc.id + "</div><br><div id = 'option-content'>" + doc.data().description + "</div></div>" + "<br>";
        });
    });

    db.collection("Creators").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data().user);
            creators.innerHTML += "<div class = 'option'><div class = 'option-header'>" + doc.id + "</div><br><div id = 'option-content'>" + doc.data().description + "</div></div>" + "<br>";
        });
    });




})

function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(result => {
        const user = result.user;
        localStorage.setItem("SessionUserEmail", user.email);
        localStorage.setItem("SessionUserName", user.displayName);

        const db = firebase.firestore();
        const userCollection = db.collection('Users').doc(user.email);
        userCollection.set({email: user.email, name: user.displayName, role: "creator"});

        console.log(user);
        
        

    })
}

function signout() {
    localStorage.clear();
    window.location.replace("/index.html");
}


function addSomething() {
    
    const db = firebase.firestore();
    db.collection("Users").doc(localStorage.getItem("SessionUserEmail")).get().then((doc) => {
        if (doc.data().role == "creator") {
            var creatorName = prompt("Name")
            var creatorDescription = prompt("Describe Yourself ")
            const product = db.collection('Creators').doc(creatorName);
            product.set({user: localStorage.getItem("SessionUserEmail"), description: creatorDescription});
        }
        if (doc.data().role == "sponsor") {
            var sponsorName = prompt("Name")
            var sponsorDescription = prompt("Describe Yourself ")
            const product = db.collection('Sponsors').doc(sponsorName);
            product.set({user: localStorage.getItem("SessionUserEmail"), description: sponsorDescription});
        }
    });
    
    
    //window.location.replace("/index.html");
    


}
  