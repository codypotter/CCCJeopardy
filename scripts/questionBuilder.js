(function(window) {
  'use strict';
  var CLIENT_ID= '1045575184638-mgt4i5r9cv43bh7q0o6ft9377nvb345l.apps.googleusercontent.com';
  var API_KEY= 'AIzaSyB2bm1RUPQNlZjr_Z4LbRvhh6SaMx_1sCs';
  var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
  var SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";
  var App = window.App || {};
  var $ = window.jQuery;
  var spreadsheetID;
  var GoogleAuth;

  function QuestionBuilder(spreadsheetLink) {
    this.spreadsheetLink = spreadsheetLink;
    var linkParts = this.spreadsheetLink.split("/");
    var longestElement = linkParts.reduce(function(a, b) {
      return a.length > b.length ? a : b;
    });
    spreadsheetID = longestElement;
    handleClientLoad();
  };

  function handleClientLoad() {
    gapi.load('client:auth2', initClient);
  }

  function initClient() {
    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    }).then(function() {
      if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
        console.log("user is signed in");
        getData();
      } else {
        console.log("user is not signed in");
        try {
          gapi.auth2.getAuthInstance().signIn();
        }
        catch(error) {
          console.log("please allow popups");
        }
      }
    })
  }

  function getData() {
    gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetID, //This is the id of the user's spreadsheet
      range: 'Sheet1!A1:B1', //This defines where the data is coming from
    }).then(function(response) {
      var range = response.result;
      console.log(range);
    })
  }

  App.QuestionBuilder = QuestionBuilder;
  window.App = App;
})(window);
