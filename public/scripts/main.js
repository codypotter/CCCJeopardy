(function(window) {
  'use strict';
  var App = window.App;
  var QuestionBuilder = App.QuestionBuilder;
  var FirebaseHandler = App.FirebaseHandler;
  var UIHandler = App.UIHandler;
  var $ = window.$;
  var firebaseHandler = new FirebaseHandler();
  var uiHandler = new UIHandler();

  window.FirebaseHandler = firebaseHandler;
  window.UIHandler = uiHandler;
})(window);
