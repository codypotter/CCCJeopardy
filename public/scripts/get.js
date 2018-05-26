(function(window) {
    'use strict';
    var App = window.App || {};

    function Get() {
        // empty constructor
    };

    Get.prototype.$_GET = function(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) {
                return unescape(pair[1]);
            }
        }
        return false;
    };

    App.Get = Get;
    window.App = App;
})(window);
