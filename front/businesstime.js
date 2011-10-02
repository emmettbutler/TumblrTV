var user;
var pass;
var playlist;
var cur_pos = 0;
var stage = 0;
var selected = 0;
var items = ['#user', '#pass'];

function getNext() {
  if ((cur_pos + 1) < playlist.length)
    cur_pos++;
}

function getPrevious() {
  if (cur_pos > 0)
    cur_pos--;
}

function play() {
    $('#player').removeClass("hidden").html(playlist[cur_pos]['video-player']);
}

function login() {
  var authenticated = 'not yet';
  user = $('#user').val();
  pass = $('#pass').val();

  $.post('http://www.tumblr.com/api/dashboard/json?type=video', 
      {email: user, password: pass}, function(json) { 
    eval(json);
    playlist = tumblr_api_read.posts;
    play();
  });

  hide('#login', 100);  
  return false;
}

function hide(selector, ms) {
  $(selector).animate({opacity: 0}, ms, function() {
    $(selector).addClass("hidden");
  });
}

function show(selector, ms) {
  $(selector).removeClass("hidden").animate({opacity: 1}, ms);
}

function showLogin() {
  $('#player').addClass('hidden');
  show('#login', 100);
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
  if (stage == 0) {
    selected--;
    if (selected < 0)
      selected = 0;
    $(items[selected]).select();
  }
  else {
    getPrevious();
    play();
  }
}

function down() {
  if (stage == 0) {
    selected++;
    if (selected >= items.length)
      selected = items.length - 1;
    $(items[selected]).select();
  }
  else {
    getNext();
    play();
  }
}

function left() {
  if (stage == 1) {
    showLogin();
    stage = 0;
  }
}

function right() {
  if (stage == 0) {
    stage = 1;
    login();
  }
}

$(function() {
  $('#user').select();
  $('#submit').click(login);

  $(document).ajaxError(function() {
    stage = 0;
    showLogin();
  });

  $(document).keydown(function (eh) {
    var keycode = getKey(eh);
    if (keycode == 37) left();
    else if (keycode == 38) up();
    else if (keycode == 39) right();
    else if (keycode == 40) down();
  });

});
