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
    $('.intro-sidebar').append('<h1 class="app-title">Grid Quiz</h1>');

    // TODO: add accordions for edit/create, and buttons for play quiz
console.log("TODO: get these links to be the user's games");
    var playGameDropdown = `
      <div class="dropdown">
        <button class="dropbtn">Play a Game</button>
          <div class="dropdown-content">
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
          </div>
      </div>
    `;
    $('.intro-sidebar').append(playGameDropdown);

    var editGameDropdown = `
      <div class="dropdown">
        <button class="dropbtn">Edit a Game</button>
          <div class="dropdown-content">
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
          </div>
      </div>
    `;
    $('.intro-sidebar').append(editGameDropdown);

    var createGameDropdown = `
      <div class="dropdown">
        <button class="dropbtn">Create a Game</button>
          <div class="dropdown-content">
          </div>
      </div>
    `;
    $('.intro-sidebar').append(createGameDropdown);

    // TODO: put current selected option into not sidebar part of wrapper
  };

  App.UIHandler = UIHandler;
  window.App = App;
})(window);

