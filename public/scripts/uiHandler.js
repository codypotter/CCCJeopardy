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

  App.UIHandler = UIHandler;
  window.App = App;
})(window);
