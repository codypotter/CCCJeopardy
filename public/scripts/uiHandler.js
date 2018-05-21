(function(window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;
  var firebaseHandler = window.firebaseHandler;
  var quizIDInUse;
  function UIHandler() {

  };

  UIHandler.prototype.login = function(quizIDs, quizNames) {
    $('.intro').hide();
    buildQuizList(quizIDs, quizNames);
  };

  UIHandler.prototype.presentBuzzer = function(quizID, userID) {
    quizIDInUse = quizID;
    $('.intro').hide();
    $('.quizListContainer').hide();

    var buzzerContainerHTML = `
      <div class="buzzer-container">
        <div class="name-change-container">
          Name:
          <textarea placeholder="My Name" class="student-name-textarea"></textarea>
          <div class="save done">Done</div>
        </div>
        <div class="buzzer">
          Push Me!
        </div>
      </div>
    `;

    $('.wrapper').append(buzzerContainerHTML);

    $('.done').click(function(e) {
      var path = "Quizzes/" + quizIDInUse + "/Students/" + userID;
      var studentName = $('.student-name-textarea').val();
      window.FirebaseHandler.uploadData(path, studentName);
    });

    $('.buzzer').click(function(e) {

    });
  }

  UIHandler.prototype.fillInPlayQuiz = function(quizData) {
    console.log(quizData);
    $('.quiz-container').css('display', 'flex');
    if (!quizData) {
      //TODO: make a message for No quiz exists.
      return;
    }
    var tableHTML = $('<table class="quiz-table play-table"></table>')
    for (var j = 0; j < 6; j++) {
      var tableRowHTML = $('<tr class="quiz-table-row"></tr>')
      for (var k = 0; k < 6; k++) {
        // access quizData at quizData.Whatever[k+((j-1)*6)]
        if (j == 0) {
          var blurbHTML = `
                  <td><div class="blurb category play">
                    `+ quizData.Categories[k] +`
                  </div></td>
                  `;
        } else {
          var blurbHTML = `
                  <td><div data-array-index="`+(k+((j-1)*6))+`"class="blurb play question">
                    ` + (j*100) + `
                  </div></td>
                  `;
        }

        tableRowHTML.append(blurbHTML);
        tableHTML.append(tableRowHTML);
      }
    }
    var quizContainer = $(".quiz-container");
    quizContainer.append(tableHTML);

    $('.question').click(function(e) {
      var dataIndex = $(e.target).attr("data-array-index");
      // get question data using quizData.Questions[dataIndex]
      var questionDisplayHTML = `
        <div class="question-display">
        </div>
      `;
      quizContainer.append(questionDisplayHTML);

      window.FirebaseHandler.listenAtBuzzer(quizIDInUse);

      showText(".question-display", quizData.Questions[dataIndex], 0, 200);
    });

    $("input[name='add-student']").click(function(e) {
      var qrCodeHTML = `
        <div class="add-student-form">
          <h1>Join Game</h1>
          <h2>Scan this QR Code</h2>
          <div id="qrcode"></div>
          <h2>Or follow this link</h2>
          <textarea readonly>https://grid-quiz-game.firebaseapp.com/?id=`+ quizIDInUse+`</textarea>
          <div class="save done">Done</div>
        </div>
      `;
      quizContainer.append(qrCodeHTML);
      new QRCode(document.getElementById("qrcode"), (`https://grid-quiz-game.firebaseapp.com/?id=`+ quizIDInUse));

      $('.done').click(function() {
        $('.add-student.form').remove();
      });
    });


  }

  UIHandler.prototype.fillInEditQuiz = function(quizData) {
    $('.quiz-container').css('display', 'flex');
    if (!quizData) {
      buildEmptyQuiz();
      return;
    }
    var tableHTML = $('<table class="quiz-table"></table>')
    for (var j = 0; j < 6; j++) {
      var tableRowHTML = $('<tr class="quiz-table-row"></tr>')
      for (var k = 0; k < 6; k++) {
        if (j == 0) {
          var blurbHTML = `
                  <td><div class="blurb category">
                    <div class="category-textarea-container">
                        <textarea wrap="hard" class="category-textarea" rows="2" cols="10" placeholder="Category ` + (k + 1) + `">` + quizData.Categories[k] + `</textarea>
                    </div>
                  </div></td>
                  `;
        } else {
          var blurbHTML = `
                  <td><div class="blurb">
                      <div class="question-textarea-container">
                          <textarea wrap="hard" class="question-textarea" rows="2" cols="10" placeholder="Question">` + quizData.Questions[k + ((j - 1) * 6)] + `</textarea>
                      </div>
                      <div class="answer-textarea-container">
                          <textarea wrap="hard" class="answer-textarea" rows="2" cols="10" placeholder="Answer">` + quizData.Answers[k + ((j - 1) * 6)] + `</textarea>
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
            <input type="image" name="play" src="images/play-button.png" class="action-button" />
            <input type="image" name="edit" src="images/edit-button.png" class="action-button" />
          </td>
        </tr>
      `;
      tbody.append(someHTML);
    }
    var quizContainer = $(".quiz-container");

    var playButton = $("input[name='play']").click(function(e) {
      var rowIndex = e.target.parentNode.parentNode.rowIndex - 1;
      e.target.style.backgroundColor = "#375f77";
      quizIDInUse = quizIDs[rowIndex];
      $('.quiz-list-container').hide();
      $('.quiz-container').show();

      window.FirebaseHandler.getQuizData(quizIDInUse, "play");

      var scoreBoardHTML = `
        <div class="top-bar">
          <input type="image" name="add-student" src="images/add-student.png" class="action-button" />
          <table class="scoreboard-table">
            <tr>
                <td class="team-1-score">Team 1: 0</td>
                <td class="team-2-score">Team 2: 0</td>
                <td class="team-3-score">Team 3: 0</td>
            </tr>
          </table>
        </div>
      `;
      quizContainer.append(scoreBoardHTML);
    });

    var editButton = $("input[name='edit']").click(function(e) {
      var rowIndex = e.target.parentNode.parentNode.rowIndex - 1;
      e.target.style.backgroundColor = "#375f77";
      quizIDInUse = quizIDs[rowIndex];

      $('.quiz-list-container').hide();
      $('.quiz-container').show();

      window.FirebaseHandler.getQuizData(quizIDInUse, "edit");

      var completionBarHTML = `
        <div class="bottom-bar">
            <textarea wrap="hard" placeholder="Quiz Title" cols="20" rows="1" class="save quiz-name-textarea" required>`+ quizNames[rowIndex] +`</textarea>
            <a><div class="save commit-button">Commit Changes</div></a>
            <a><div class="save discard-button">...or discard</div></a>
        </div>
      `;

      quizContainer.append(completionBarHTML);

      $('.commit-button').click(function(e) {
        var questionAnswerIndex = 0;
        window.FirebaseHandler.uploadData(('Users/' + firebase.auth().currentUser.uid + '/Quizzes/' + quizIDInUse), $('.quiz-name-textarea').val());
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
        quizContainer.hide();
        $('.quiz-list-container').show();
      });

      $('.discard-button').click(function(e) {
        quizContainer.empty();
        quizContainer.hide();
        $('.quiz-list-container').show();
      });
    });
  }

  function buildEmptyQuiz() {
    var tableHTML = $('<table class="quiz-table"></table>')
    for (var j = 0; j < 6; j++) {
      var tableRowHTML = $('<tr class="quiz-table-row"></tr>')
      for (var k = 0; k < 6; k++) {
        if (j == 0) {
          var blurbHTML = `
                  <td><div class="blurb category">
                    <div class="category-textarea-container">
                        <textarea wrap="hard" rows="2" cols="10" placeholder="Category ` + (k + 1) + `"></textarea>
                    </div>
                  </div></td>
                  `;
        } else {
          var blurbHTML = `
                  <td><div class="blurb">
                      <div class="question-textarea-container">
                          <textarea wrap="hard" rows="2" cols="10" placeholder="Question"></textarea>
                      </div>
                      <div class="answer-textarea-container">
                          <textarea wrap="hard" rows="2" cols="10" placeholder="Answer"></textarea>
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

  var showText = function (target, message, index, interval) {
  if (index < message.length) {
    $(target).append(message[index++]);
    setTimeout(function () { showText(target, message, index, interval); }, interval);
  }
}

  App.UIHandler = UIHandler;
  window.App = App;
})(window);
