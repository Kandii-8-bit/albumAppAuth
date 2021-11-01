function authStateListener() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log("user");
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      // ...
    } else {
      // User is signed out
      // ...
      console.log("Logged Out.");
    }
  });
}

function login() {
  let email = $("#email").val();
  let password = $("#pw").val();
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      // ...
      console.log("login");
      $("#email").val("");
      $("#pw").val("");
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      // Somewhere in this function there needs to be a hide() to hide data
      //Makes is challenging due to my data being connected to a button... so hide the button all the albums maybe?
    });
}

function signOut() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
}

var _db;

function initFirebase() {
  _db = firebase.firestore();
}

$(".getData").click(function (e) {
  _db
    .collection("Albums")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let alName = doc.data().albumName;
        let arName = doc.data().artistName;
        let cvArt = doc.data().coverArt;
        let genre = doc.data().genre;
        $("#data").append(
          `<div><p><img src="${cvArt}" alt="Cover Art"></p><p>${alName}</p><p>${arName}</p><p>${genre}</p></div>`
        );
      });
    });
});

$(document).ready(function () {
  try {
    let app = firebase.app();
    initFirebase();
    initListeners();
    authStateListener();
  } catch {
    console.error(e);
  }
});
