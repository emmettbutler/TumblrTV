var user;
var pass;
var playlist;
var cur_post;
var stage = 0;
var selected = 0;
var numitems = 3;
var items = ['#user', '#pass', '#submit'];

function getFirst() {
  return playlist[0]; 
}

function login() {
  user = $('#user').val();
  pass = $('#pass').val();
  $.post('http://www.tumblr.com/api/dashboard/json?type=video', 
      {email: user, password: pass}, function(json) {
    stage = 1;
    eval(json);
    playlist = tumblr_api_read.posts;
    var post = getFirst();
    $('#player').removeClass("hidden").html(post['video-player']);
  });
  hide('#login', 100);  
  return false;
}

function hide(selector, ms) {
  $(selector).animate({opacity: 0}, ms, function() {
    $(selector).addClass("hidden");
  });
}

function getKey(key){
  if ( key == null ) {
    keycode = event.keyCode;
    // To Mozilla
  } else {
    keycode = key.keyCode;
  }
  // Return the key in lower case form
  return keycode;
}

function up() {

}

function down() {
  if (stage == 0) {
    selected = (selected + 1) % numitems;
    $(items[selected]).select();
  }
}

function left() {

}

function right() {

}

$(function() {
  $('#user').select();
  $('#submit').click(login);

  $(document).keydown(function (eh) {
    var keycode = getKey(eh);
    if (keycode == 37) left();
    else if (keycode == 38) up();
    else if (keycode == 39) right();
    else if (keycode == 40) down();
  });

});
