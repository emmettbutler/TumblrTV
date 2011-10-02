var user;
var pass;
var playlist = [];
var cur_pos = 0;
var stage = 0;
var selected = 0;
var items = ['#user', '#pass'];


function fetchVideos() {
  alert("fetching from " + playlist.length);
  $.post("get-bullshit.php?start=" + playlist.length, 
      {email: user, password: pass, start: playlist.length},  function(json) {
	eval(json);
	playlist = playlist.concat(tumblr_api_read.posts);
    play();
  });
}

function getNext() {
  cur_pos++;
  if (cur_pos == playlist.length)  
    fetchVideos();
  else
    play();
}

function getPrevious() {
  if (cur_pos > 0)
	cur_pos--;
  play();
}

function play() {
    $('#player').removeClass("hidden").html(playlist[cur_pos]['video-player']);
}

function login() {
    user = $('#user').val();
    pass = $('#pass').val();
    cur_pos = 0;
    playlist = [];

    fetchVideos();
	
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
    }
}

function left() {
    if (stage == 1) {
	$('#player').addClass('hidden');
	show('#login', 100);
	cur_pos = 0;
	stage = 0;
    }

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

    $(document).keyup(function (eh) {
	var keycode = getKey(eh);
	if (keycode == 37) left();
	else if (keycode == 38) up();
	else if (keycode == 39) right();
	else if (keycode == 40) down();
    });

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
