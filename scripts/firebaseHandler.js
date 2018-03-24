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

  function FirebaseHandler() {
    firebase.initializeApp(config);
  };

  App.FirebaseHandler = FirebaseHandler;
  window.App = App;
})(window);
