(function (window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;

  function QuestionBuilder(spreadsheetLink) {
    this.spreadsheetLink = spreadsheetLink;
    var linkParts = this.spreadsheetLink.split("/");
    var longestElement = linkParts.reduce(function (a, b) {
      return a.length > b.length ? a : b;
    });
    this.spreadsheetID = longestElement;
  };

  QuestionBuilder.prototype.retrieveQuestions = function () {
    var api = 'https://spreadsheets.google.com/feeds/cells/';
    var row = 1;
    var col = 1;
    var url = api + this.spreadsheetLink + '/default/public/basic/R' + row + 'C' + col + '?alt=json';
    $.getJson(url).done(function(data){
      //this is where the data is, we just have to traverse the rows and columns of the spreadsheet
    })
  };

  App.QuestionBuilder = QuestionBuilder;
  window.App = App;
})(window);
