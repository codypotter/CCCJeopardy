(function(window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;
  var firebaseHandler = window.firebaseHandler;
  function UIHandler() {

  };

  UIHandler.prototype.login = function(quizIDs, quizNames) {
    $('.intro').hide();
    buildQuizList(quizIDs, quizNames);
  };

  UIHandler.prototype.fillInEditQuiz = function(quizData) {
    if (!quizData) {
      buildEmptyQuiz();
      return;
    }
    var tableHTML = $('<table class="edit-quiz-table"></table>')
    for (var j = 0; j < 6; j++) {
      var tableRowHTML = $('<tr class="quiz-table-row"></tr>')
      for (var k = 0; k < 6; k++) {
        if (j == 0) {
          var blurbHTML = `
                  <td><div class="blurb category">
                    <div class="category-textarea-container">
                        <textarea rows="2" cols="10" placeholder="Category ` + (k + 1) + `">` + quizData.Categories[k] + `</textarea>
                    </div>
                  </div></td>
                  `;
        } else {
          var blurbHTML = `
                  <td><div class="blurb">
                      <div class="question-textarea-container">
                          <textarea rows="2" cols="10" placeholder="Question">` + quizData.Questions[k + ((j - 1) * 6)] + `</textarea>
                      </div>
                      <div class="answer-textarea-container">
                          <textarea rows="2" cols="10" placeholder="Answer">` + quizData.Answers[k + ((j - 1) * 6)] + `</textarea>
                      </div>
                  </div></td>
                  `;
        }

        tableRowHTML.append(blurbHTML);
        tableHTML.append(tableRowHTML);
      }
      var quizContainer = $(".quiz-container");
      quizContainer.append(tableHTML);
    }
  };

  function buildQuizList(quizIDs, quizNames) {
    var tbody = $('.quiz-list-table-body');
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
    var quizContainer = $(".quiz-container");

    var playButton = $("input[name='play']").click(function(e) {
      e.target.style.backgroundColor = "#375f77";
      $('.quiz-list-container').hide();
    });

    var editButton = $("input[name='edit']").click(function(e) {
      var rowIndex = e.target.parentNode.parentNode.rowIndex - 1;
      e.target.style.backgroundColor = "#375f77";

      $('.quiz-list-container').hide();
      $('.quiz-container').show();

      window.FirebaseHandler.getQuizData(quizIDs[rowIndex]);
      var quizIDInUse = quizIDs[rowIndex];

      var completionBarHTML = `
        <div class="bottom-bar">
            <a><div class="save commit-button">Commit Changes</div></a>
            <a><div class="save discard-button">...or discard</div></a>
        </div>
      `;

      quizContainer.append(completionBarHTML);

      $('.commit-button').click(function(e) {
        var questionAnswerIndex = 0;
        $("tr.quiz-table-row").each(function(rowNumber) {
          var $this = $(this);
          for (var colNumber = 0; colNumber < 6; colNumber++) {
            var blurb = $this.context.cells[colNumber].children[0];
            if ($(blurb).hasClass('category')) {
              window.FirebaseHandler.uploadData('Quizzes/' + quizIDInUse + '/Categories/' + colNumber, $(blurb).find('textarea').val());
            } else {
              $(blurb).find('textarea').each(function(index) {
                if (index == 0) {
                  window.FirebaseHandler.uploadData('Quizzes/' + quizIDInUse + '/Questions/' + questionAnswerIndex, $(this).val())
                } else {
                  window.FirebaseHandler.uploadData('Quizzes/' + quizIDInUse + '/Answers/' + questionAnswerIndex, $(this).val())
                }
              });
              questionAnswerIndex++;
            }
          }
        });
        quizContainer.empty();
        $('.quiz-list-container').show();
      });

      $('.discard-button').click(function(e) {
        quizContainer.empty();
        $('.quiz-list-container').show();
      });
    });
  }

  function buildEmptyQuiz() {
    var tableHTML = $('<table class="edit-quiz-table"></table>')
    for (var j = 0; j < 6; j++) {
      var tableRowHTML = $('<tr class="quiz-table-row"></tr>')
      for (var k = 0; k < 6; k++) {
        if (j == 0) {
          var blurbHTML = `
                  <td><div class="blurb category">
                    <div class="category-textarea-container">
                        <textarea rows="2" cols="10" placeholder="Category ` + (k + 1) + `"></textarea>
                    </div>
                  </div></td>
                  `;
        } else {
          var blurbHTML = `
                  <td><div class="blurb">
                      <div class="question-textarea-container">
                          <textarea rows="2" cols="10" placeholder="Question"></textarea>
                      </div>
                      <div class="answer-textarea-container">
                          <textarea rows="2" cols="10" placeholder="Answer"></textarea>
                      </div>
                  </div></td>
                  `;
        }

        tableRowHTML.append(blurbHTML);
        tableHTML.append(tableRowHTML);
      }
      var quizContainer = $(".quiz-container");
      quizContainer.append(tableHTML);
    }
  }

  App.UIHandler = UIHandler;
  window.App = App;
})(window);
