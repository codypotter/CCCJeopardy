(function(window) {
    'use strict';
    var App = window.App;
    var QuestionBuilder = App.QuestionBuilder;
    var FirebaseHandler = App.FirebaseHandler;
    var UIHandler = App.UIHandler;
    var Get = App.Get;
    var $ = window.$;

    var firebaseHandler = new FirebaseHandler();
    var uiHandler = new UIHandler();
    var get = new Get();

    var id = get.$_GET('id');
    if (id != "") {
        // user was redirected using a link, handle that.
        firebaseHandler.handleStudentRedirect(id);
    }



    window.FirebaseHandler = firebaseHandler;
    window.UIHandler = uiHandler;
})(window);
