(function(window) {
  var App = window.App || {};
  var config = {
    apiKey: "AIzaSyDmwHF26leDx1UffZleWD4m7rFI1J_2xyM",
    authDomain: "grid-quiz-game.firebaseapp.com",
    databaseURL: "https://grid-quiz-game.firebaseio.com",
    projectId: "grid-quiz-game",
    storageBucket: "",
    messagingSenderId: "780090118711"
  };
  var provider = new firebase.auth.GoogleAuthProvider();

  var quizUIDList = [];
  var user = {};


  function FirebaseHandler() {
    firebase.initializeApp(config);
    console.log("firebasehandler constructor called");
  };

  $('.google-login-button').click(function(e) {
    firebase.auth().signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      user = result.user;
      console.log(user.uid);
      getUserQuizzes();

    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      console.log("Error code: " + errorCode);
      console.log("Error message: " + errorMessage);
      console.log("Error user email: " + email);
    });
  });

  function getUserQuizzes() {
    var quizListRef = firebase.database().ref('users/' + user.uid + '/userQuizzes');
    var i = 0;
    quizListRef.on('child_added', function(data) {
      quizUIDList[i] = data.key;
      i++;
    });
    var uiHandler = new App.UIHandler();
    uiHandler.login();
    console.log(quizUIDList);
  };

  App.FirebaseHandler = FirebaseHandler;
  window.App = App;
})(window);
