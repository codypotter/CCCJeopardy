/* ----------------------------------------------------------------------------
	uiHandler.js will alter index.html if the user signs in. It will remove
the log in box, push the background to the left (making a side bar), and
reveals a lighter background where the current selected option will reside.
-----------------------------------------------------------------------------*/

// TODO: put current selected option into not sidebar part of wrapper

(function(window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;

  function UIHandler() {

  };

  UIHandler.prototype.login = function(quizList){
    var loginContainer = $('.login-container');
    loginContainer.remove();

    modifySidebar(quizList);
  };

  function modifySidebar(quizList) {
    $('.intro-sidebar').width('200px');
    $('.intro-sidebar').append('<h1 class="app-title">Grid Quiz</h1>');

console.log(quizList);

    // TODO: make the anchor a button
    constructDropdown(quizList, "Play a Game");

    constructDropdown(quizList, "Edit a Game");

    var createGameDropdown = `
      <div class="dropdown">
      <button class="dropbtn">Create a Game</button>
      </div>
    `;

    $('.intro-sidebar').append(createGameDropdown);
  }

  function constructDropdown(quizList, buttonTitle) {
    var theHtml = `
      <div class="dropdown">
        <button class="dropbtn"> ` + buttonTitle + `</button>
        <div class="dropdown-content">
    `;

    if (quizList.length === 0) {
      theHtml += '<a href="#">No Games</a>';

    } else {
      for (var counter = 0; counter < quizList.length; counter++) {
        theHtml += '<a href="#">' + quizList[counter].quizName + '</a>';
      }
    }

    theHtml += `
        </div>
      </div>
    `;

    $('.intro-sidebar').append(theHtml);
  }

  App.UIHandler = UIHandler;
  window.App = App;
})(window);

