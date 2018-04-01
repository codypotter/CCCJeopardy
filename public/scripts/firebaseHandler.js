(function(window) {
  var App = window.App || {};
  var provider = new firebase.auth.GoogleAuthProvider();

  function FirebaseHandler() {
    console.log("firebasehandler constructor called");
  };

  $('.google-login-button').click(function(e) {
    firebase.auth().signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
      console.log(user);
      var uh = new App.UIHandler();
      uh.login();
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



  App.FirebaseHandler = FirebaseHandler;
  window.App = App;
})(window);
