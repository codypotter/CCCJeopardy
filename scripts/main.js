(function(window) {
  'use strict';
  var App = window.App;
  var QuestionBuilder = App.QuestionBuilder;
  var FirebaseHandler = new App.FirebaseHandler();
  var $ = window.$;
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().useDeviceLanguage();

  $('.continue-button').click(function(e) {
    var loginContainer = $('.login-container');
    loginContainer.remove();
    $('.intro-sidebar').width('200px');
  });

  $('.google-login-button').click(function(e) {
    firebase.auth().signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
      console.log(user);
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



  /*  Firebase Demo
  var demoRef = firebase.database().ref('demo');
  demoRef.on('value', function(snapshot) {
    $('.firebase-demo-h3').html(snapshot.child("text").val());
  });

  $('.firebase-demo-button').click(function(e){
    demoRef.set({
      text: $('.firebase-demo-textarea').val()
    });
  });
  */
})(window);
