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
  var FirebaseHandler = App.FirebaseHandler;
  var firebaseHandler = new FirebaseHandler();

  function UIHandler() {

  };

  UIHandler.prototype.login = function(quizIDs, quizNames){
    var loginContainer = $('.login-container');
    loginContainer.remove();

    modifySidebar();
    buildQuizList(quizIDs, quizNames);
  };


  function modifySidebar() {
    $('.intro').width('0');
  }

  function buildQuizList(quizIDs, quizNames) {
    var tbody = $('.table-body');
    for (var i = 0; i < quizIDs.length; i++) {
      var someHTML = `
        <tr>
          <td>${quizNames[i]}</td>
          <td class="status-cell">&#9679; Ready</td>
          <td class="action-cell">
            <input type="image" name="play" src="images/play-button.png" class="action-button">
            <input type="image" name="edit" src="images/edit-button.png" class="action-button">
          </td>
        </tr>
      `;
      tbody.append(someHTML);
    }
    var playButton = $("input[name='play']").click(function(e) {
      console.log(e);
      e.target.style.backgroundColor = "#375f77";
      var quizListContainer = $('.quiz-list-container').empty();
      quizListContainer.width('0');
    });
    var editButton = $("input[name='edit']").click(function(e) {
      var rowIndex = e.target.parentNode.parentNode.rowIndex - 1;
      e.target.style.backgroundColor = "#375f77";
      var quizListContainer = $('.quiz-list-container').empty();
      quizListContainer.width('0');
      var questions = firebaseHandler.getQuestions(quizIDs[rowIndex]);
    });
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
