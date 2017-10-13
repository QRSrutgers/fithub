var config = {
    // Initialize Firebase
    apiKey: "AIzaSyCuL61Gvgdklq_-3v3cLoizlqkEtjAo4kg",
    authDomain: "fithub-d10cb.firebaseapp.com",
    databaseURL: "https://fithub-d10cb.firebaseio.com",
    projectId: "fithub-d10cb",
    storageBucket: "fithub-d10cb.appspot.com",
    messagingSenderId: "1015882541966"
  };
  firebase.initializeApp(config);

var database = firebase.database();
const auth = firebase.auth();


//Get elements from the html
const emailBox = document.getElementById("emailBox");
const passwordBox = document.getElementById("passwordBox");
const btnLogin = document.getElementById("btnLogin");
const btnSignUp = document.getElementById("btnSignUp");
const btnLogOut = document.getElementById("btnLogOut");

//Add login event
$("#btnLogin").on("click", e => {
    // get email and pass
    const email = emailBox.value;
    const pass = passwordBox.value;
    const auth = firebase.auth();

    //sign in existing User
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message))

    $("#emailBox").html(" ");
    $("#passwordBox").html(" ");


});

$("#btnLogOut").on("click", e => {
	firebase.auth().signOut();

});
// Add signup event
$("#btnSignUp").on("click", e => {
    // get email and pass
    // TODO check for real email - validation
    const email = emailBox.value;
    const pass = passwordBox.value;
    const auth = firebase.auth();

    //sign in existing User
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise
        .catch(e => console.log(e.message))
});

// Add a realtime listener
auth.onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log(firebaseUser);
        btnLogOut.classList.remove("hide");
        // window.location = "home.html";
    } else {
        console.log("Not logged in");
        btnLogOut.classList.add("hide");
    }
});