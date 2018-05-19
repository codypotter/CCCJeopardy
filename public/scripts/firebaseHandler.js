(function(window) {
  'use strict';
  var App = window.App || {};
  var provider = new firebase.auth.GoogleAuthProvider();
  function FirebaseHandler() {
    var config = {
      apiKey: "AIzaSyDmwHF26leDx1UffZleWD4m7rFI1J_2xyM",
      authDomain: "grid-quiz-game.firebaseapp.com",
      databaseURL: "https://grid-quiz-game.firebaseio.com",
      projectId: "grid-quiz-game",
      storageBucket: "grid-quiz-game.appspot.com",
      messagingSenderId: "780090118711"
    };
    if (firebase.apps.length === 0) {
      firebase.initializeApp(config);
    }
  };

  FirebaseHandler.prototype.getQuizData = function(quizID) {
    var quizRef = firebase.database().ref('Quizzes/' + quizID);

    quizRef.once('value').then(function(snapshot) {
      window.UIHandler.fillInEditQuiz(snapshot.val());
    });
  };

  FirebaseHandler.prototype.uploadData = function(path, data) {
    firebase.database().ref(path).set(data);
  };

  $('.anonymous-sign-in-link').click(function(e) {
    e.preventDefault();
    firebase.auth().signInAnonymously().catch(function(error) {
      //TODO: handle sign in error.
      //      If anonymous sign-in fails, firebase is messing up big-time
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("an error occurred");
    });
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        console.log(uid);
        window.UIHandler.login();
      } else {
        //TODO: handle user signed out somehow?
        window.location.reload(false);
      }
    });
  });

  $('.google-login-button').click(function(e) {
    $('.google-login-button').off('click');
    $('.anonymous-sign-in-link').off('click');
    firebase.auth().signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;

      var quizIDRef = firebase.database().ref('users/' + user.uid + '/userQuizzes');

      quizIDRef.on('value', function(data) {
        // TODO: delete/rebuild buttons if needed
        var playersQuizzes = data.val();
        var quizIDs = [];
        var quizNames = [];

        // cycle through each property/key pair and put into own arrays
        for (var key in playersQuizzes) {
          quizIDs.push(key);
          quizNames.push(playersQuizzes[key]);
        }

        // build the buttons
        window.UIHandler.login(quizIDs, quizNames);
      });

    }).catch(function(error) {
      //TODO: handle google sign in error.
      //      If google sign in fails, we need to display an error, and reload
      //      the page.
      console.log(error);
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      console.log("Error code: " + errorCode);
      console.log("Error message: " + errorMessage);
      console.log("Error user email: " + email);
    });
  });

  App.FirebaseHandler = FirebaseHandler;
  window.App = App;
})(window);
