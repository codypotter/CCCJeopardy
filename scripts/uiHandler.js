(function(window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;

  function UIHandler() {

  };

  UIHandler.prototype.login = function(){
    var loginContainer = $('.login-container');
    loginContainer.remove();
    $('.intro-sidebar').width('200px');
  };

  UIHandler.prototype.restartQuiz = function() {
    console.log("restart performed");
  };

  UIHandler.prototype.resumeQuiz = function() {
    console.log("resume performed");
  };

  UIHandler.prototype.editQuiz = function() {
    console.log("edit performed");
  };

  App.UIHandler = UIHandler;
  window.App = App;
})(window);
