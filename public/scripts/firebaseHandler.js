(function(window) {
  'use strict';
  var App = window.App || {};
  var provider = new firebase.auth.GoogleAuthProvider();
  var userID;
  function FirebaseHandler() {
    if (firebase.apps.length === 0) {
      firebase.initializeApp(config);
    }
  };

  FirebaseHandler.prototype.getQuizData = function(quizID, action) {
    var quizRef = firebase.database().ref('Quizzes/' + quizID);

    quizRef.once('value').then(function(snapshot) {
      if (action == "play") {
        window.UIHandler.fillInPlayQuiz(snapshot.val());
      } else if (action == "edit") {
        window.UIHandler.fillInEditQuiz(snapshot.val());
      }

    });
  };

  FirebaseHandler.prototype.uploadData = function(path, data) {
    firebase.database().ref(path).set(data);
  };

  FirebaseHandler.prototype.listenAtBuzzer = function(quizID) {
    firebase.database().ref('Quizzes/' + quizID + '/Buzzer/volunteer').on("value", function(snapshot) {
      console.log(snapshot.val());
    });
  };

  $('.anonymous-sign-in-link').click(function(e) {
    e.preventDefault();
    firebase.auth().signInAnonymously().catch(function(error) {
      //TODO: handle sign in error.
      //      If anonymous sign-in fails, firebase is messing up big-time
      console.log('Error code: ' + error.code);
      console.log('Error message: ' + error.message);
    });
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var isAnonymous = user.isAnonymous;
        userID = user.uid;
        window.UIHandler.presentBuzzer();
      } else {
        //TODO: handle user signed out somehow?
        window.location.reload(false);
      }
    });
  });

  FirebaseHandler.prototype.handleStudentRedirect = function(quizID) {
    firebase.auth().signInAnonymously().catch(function(error) {
      console.log('Error code: ' + error.code);
      console.log('Error message: ' + error.message);
    });
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        userID = user.uid;
        window.UIHandler.presentBuzzer(quizID, userID);
      } else {
        window.location.reload(false);
      }
    });
  };

  $('.google-login-button').click(function(e) {
    $('.google-login-button').off('click');
    $('.anonymous-sign-in-link').off('click');
    firebase.auth().signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;

      var quizIDRef = firebase.database().ref('Users/' + user.uid + '/Quizzes');

      quizIDRef.once('value').then(function(snapshot) {
        var playersQuizzes = snapshot.val();
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
