(function(window){
  var $ = window.$;
  var buttonGrid = $('.button-grid');
  buttonGrid.height(window.innerHeight);
  var button = $('<div></div>').addClass('button');
  for (var i = 0; i < 30; i++) {
    var butt = button.clone().appendTo(buttonGrid);
    if (i < 5) {
      var text = $('<h4></h4>').addClass('button-title').text("This is a test");
      butt.append(text);
      butt.addClass('title-button');
    }
  }
})(window);
