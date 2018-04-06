(function(window) {
  'use strict';
  var App = window.App || {};

  function Quiz(quizID, quizName) {
    this.quizID = quizID;
    this.quizName = quizName;
  };

  App.Quiz = Quiz;
  window.App = App;
})(window);
