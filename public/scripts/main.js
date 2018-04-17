(function(window) {
  'use strict';
  var App = window.App || {};
  var QuestionBuilder = App.QuestionBuilder;
  var FirebaseHandler = App.FirebaseHandler;
  var UIHandler = App.UIHandler;
  var $ = window.$;
  var fh = new FirebaseHandler();
  window.FirebaseHandler = fh;
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
