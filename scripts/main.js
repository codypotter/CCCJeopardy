(function(window){
  'use strict';
  var App = window.App;
  var QuestionBuilder = App.QuestionBuilder;
  var FirebaseHandler = App.FirebaseHandler;
  var $ = window.$;

  var config = {
    apiKey: "AIzaSyAhu6D66dYsiNFeizeaa2scqMEO_9fX0c8",
    authDomain: "cccjeopardy.firebaseapp.com",
    databaseURL: "https://cccjeopardy.firebaseio.com",
    projectId: "cccjeopardy",
    storageBucket: "",
    messagingSenderId: "1045575184638"
  };
  firebase.initializeApp(config);

  $('.continue-button').click(function(e){
    var loginContainer = $('.login-container')
    loginContainer.remove();
    $('.intro-sidebar').width('200px');
  });

  var demoRef = firebase.database().ref('demo');
  demoRef.on('value', function(snapshot) {
    $('.firebase-demo-h3').html(snapshot.child("text").val());
  });

  $('.firebase-demo-button').click(function(e){
    demoRef.set({
      text: $('.firebase-demo-textarea').val()
    });
    demoRef.stop();

  });
})(window);
