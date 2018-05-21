(function(window) {
  'use strict';
  var App = window.App;
  var QuestionBuilder = App.QuestionBuilder;
  var FirebaseHandler = App.FirebaseHandler;
  var UIHandler = App.UIHandler;
  var $ = window.$;
  var firebaseHandler = new FirebaseHandler();
  var uiHandler = new UIHandler();

  if (isset($_GET['id']) {
    // user was redirected using a link, handle that.
    firebaseHandler.handleStudentRedirect($_GET['id']);
    
  }

  window.FirebaseHandler = firebaseHandler;
  window.UIHandler = uiHandler;
})(window);
