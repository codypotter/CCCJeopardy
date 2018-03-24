(function(window) {
  var App = window.App || {};
  var config = {
    apiKey: "AIzaSyAhu6D66dYsiNFeizeaa2scqMEO_9fX0c8",
    authDomain: "cccjeopardy.firebaseapp.com",
    databaseURL: "https://cccjeopardy.firebaseio.com",
    projectId: "cccjeopardy",
    storageBucket: "",
    messagingSenderId: "1045575184638"
  };

  function FirebaseHandler() {
    firebase.initializeApp(config);
  };

  App.FirebaseHandler = FirebaseHandler;
  window.App = App;
})(window);
