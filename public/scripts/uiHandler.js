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


  UIHandler.prototype.login = function(quizIDs, quizNames){
    var loginContainer = $('.login-container');
    loginContainer.remove();

    modifySidebar(quizIDs, quizNames);
  };


  function modifySidebar(quizIDs, quizNames) {
    $('.intro').width('0');
  }

  function constructDropdown(quizIDs, quizNames, buttonTitle) {
    var theHtml = `
      <div class="dropdown">
        <button class="dropbtn"> ` + buttonTitle + `</button>
        <div class="dropdown-content">
    `;

    if (quizNames.length === 0) {
      theHtml += '<a href="#">No Games</a>';

    } else {
      for (var counter = 0; counter < quizNames.length; counter++) {
        theHtml += '<a href="#">' + quizNames[counter] + '</a>';
      }
    }

    theHtml += `
        </div>
      </div>
    `;

    $('.intro').append(theHtml);
  }


  App.UIHandler = UIHandler;
  window.App = App;
})(window);
