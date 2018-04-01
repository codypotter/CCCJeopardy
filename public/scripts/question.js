(function(window) {
  'use strict';
  var App = window.App || {};

  function Question(category, values, points) {
    this.category = category;
    this.question = values[0];
    this.answer = values[1];
    this.points = points;
  }

  App.Question = Question;
  window.App = App;
})(window);
