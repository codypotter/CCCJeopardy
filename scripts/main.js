(function(window){
  var $ = window.$;
  var buttonGrid = $('.button-grid');
  var button = $('<div></div>').addClass('button');
  
  buttonGrid.height(window.innerHeight);

  for (var i = 0; i < 30; i++) {
    var butt = button.clone().appendTo(buttonGrid);
    if (i < 5) {
      var text = $('<h4></h4>').addClass('button-title').text("This is a test");
      butt.addClass('title-button');
    } else if (i < 10){
      var text = $('<h3></h3>').addClass('button-title').text("100");
    } else if (i < 15){
      var text = $('<h3></h3>').addClass('button-title').text("200");
    } else if (i < 20){
      var text = $('<h3></h3>').addClass('button-title').text("300");
    } else if (i < 25){
      var text = $('<h3></h3>').addClass('button-title').text("400");
    } else if (i < 30){
      var text = $('<h3></h3>').addClass('button-title').text("500");
    }
    butt.append(text);
  }
})(window);
