(function(window){
  'use strict';
  var App = window.App;
  var QuestionBuilder = App.QuestionBuilder;
  var $ = window.$;

  $('.continue-button').click(function(e){
    var loginContainer = $('.login-container')
    loginContainer.remove();
    $('.intro-sidebar').width('200px');
  });
})(window);
