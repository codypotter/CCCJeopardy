(function(window) {
    'use strict';
    var App = window.App || {};
    var provider = new firebase.auth.GoogleAuthProvider();
    var userID;
    var authFlag = false;

    function FirebaseHandler() {
        if (firebase.apps.length === 0) {
            firebase.initializeApp(config);
        }
    };

    FirebaseHandler.prototype.getQuizData = function(quizID, action) {
        var quizRef = firebase.database().ref('Quizzes/' + quizID);

        quizRef.once('value').then(function(snapshot) {
            if (action == "play") {
                window.UIHandler.fillInPlayQuiz(snapshot.val());
            } else if (action == "edit") {
                window.UIHandler.fillInEditQuiz(snapshot.val());
            }

        });
    };

    FirebaseHandler.prototype.uploadData = function(path, data) {
        firebase.database().ref(path).set(data, function(error) {
            if (error) {
                console.log(error);
            } else {
                console.log('Upload was successful');
            }
        });
    };

    FirebaseHandler.prototype.pushData = function(path, data) {
        var newPathRef = firebase.database().ref(path).push();

        newPathRef.set(data);
        var key = newPathRef.key;
        return key;
    }

    FirebaseHandler.prototype.listenAtBuzzer = function(quizID, questionIndex) {
        // first set it as null, so we know if it's a new volunteer
        this.uploadData(('Quizzes/' + quizID + '/Buzzer/volunteer'), null);

        // start a listener at the buzzer
        var studentName;
        var studentID;
        firebase.database().ref('Quizzes/' + quizID + '/Buzzer/volunteer').on("value", function(snapshot) {
            // if it's null, then it's not a volunteer
            if (snapshot.val()) {
                // someone buzzed in
                studentID = snapshot.val();
                // turn the listener off
                firebase.database().ref('Quizzes/' + quizID + '/Buzzer/volunteer').off();
                // get the student name from firebase.
                var path = 'Quizzes/' + quizID + '/Students/' + snapshot.val();
                firebase.database().ref('Quizzes/' + quizID + '/Students/' + snapshot.val()).once('value').then(function(snap) {
                    studentName = snap.val();
                    // have UI handler deal with presenting student name on alert correct? yes/no
                    window.UIHandler.presentBuzzAlert(studentName, snapshot.val(), questionIndex);
                });
            }
        });


    };

    $('.anonymous-sign-in-link').on('click', function(e) {
        e.preventDefault();
        firebase.auth().signInAnonymously().catch(function(error) {
            //TODO: handle sign in error.
            //      If anonymous sign-in fails, firebase is messing up big-time
            console.log('Error code: ' + error.code);
            console.log('Error message: ' + error.message);
        });
        firebase.auth().onAuthStateChanged(function(user) {
            if (user && !authFlag) {
                // User is signed in.
                authFlag = true;
                userID = user.uid;
                window.UIHandler.presentBuzzer("", userID);
            } else {
                //TODO: handle user signed out somehow?
                window.location.reload(false);
            }
        });
    });

    FirebaseHandler.prototype.handleStudentRedirect = function(quizID) {
        firebase.auth().signInAnonymously().catch(function(error) {
            console.log('Error code: ' + error.code);
            console.log('Error message: ' + error.message);
        });
        firebase.auth().onAuthStateChanged(function(user) {
            if (user && !authFlag) {
                userID = user.uid;
                authFlag = true;
                window.UIHandler.presentBuzzer(quizID, userID);
            } else {
                window.location.reload(false);
            }
        });
    };

    $('.google-login-button').click(function(e) {
        $('.google-login-button').off('click');
        $('.anonymous-sign-in-link').off('click');
        firebase.auth().signInWithPopup(provider).then(function(result) {
            var token = result.credential.accessToken;
            var user = result.user;

            var quizIDRef = firebase.database().ref('Users/' + user.uid + '/Quizzes');

            quizIDRef.once('value').then(function(snapshot) {
                var playersQuizzes = snapshot.val();
                var quizIDs = [];
                var quizNames = [];

                // cycle through each property/key pair and put into own arrays
                for (var key in playersQuizzes) {
                    quizIDs.push(key);
                    quizNames.push(playersQuizzes[key]);
                }

                // build the buttons
                window.UIHandler.login(quizIDs, quizNames, user.uid);
            });

        }).catch(function(error) {
            //TODO: handle google sign in error.
            //      If google sign in fails, we need to display an error, and reload
            //      the page.
            console.log(error);
        });
    });

    App.FirebaseHandler = FirebaseHandler;
    window.App = App;
})(window);
