/* ----------------------------------------------------------------------------
	uiHandler.js will alter index.html if the user signs in. It will remove
the log in box, push the background to the left (making a side bar), and
reveals a lighter background where the current selected option will reside.
-----------------------------------------------------------------------------*/
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

    $('.intro-sidebar').append('<h1 class="app-title">Grid Quiz</h2>');
    // TODO: add accordions for edit/create, and buttons for play quiz
    // TODO: put current selected option into not sidebar part of wrapper
  };

  App.UIHandler = UIHandler;
  window.App = App;
})(window);

