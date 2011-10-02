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
<<<<<<< HEAD
    user = $('#user').val();
    pass = $('#pass').val();
    /*
      $.post('http://www.tumblr.com/api/dashboard/json?type=video', 
      {email: user, password: pass}, function(json) {
      if( json == null ) alert("null");
      else if( json == "" ) alert("empty");
      else alert("not");
      eval(json);
      alert("1");
      playlist = tumblr_api_read.posts;
      alert("2");
      play();
      });
    */
    $.ajax({
	type      : 'POST',
	//url       : 'www.tumblr.com/api/dashboard/json?type=video',
	url       : "www.twitter.com",
	data      : "email=emmett.butler321@gmail.com&password=April16!",
	success   : function(data) {

	    alert(data);
	},
	error     : function(msg) {
	    alert("error");
	}
    });
    
    
    hide('#login', 100);  
    return false;
=======
  var authenticated = 'not yet';
  user = $('#user').val();
  pass = $('#pass').val();
/*
  $.post('http://www.tumblr.com/api/dashboard/json?type=video&email=emmett.butler321@gmail.com&password=April16!', 
      {email: user, password: pass}, function(json) { 
    eval(json);
    playlist = tumblr_api_read.posts;
    play();
  });
  $.ajax({
    type : 'post',
    url  : "http://www.tumblr.com/api/dashboard/json?type=video&email=emmett.butler321@gmail.com&password=April16!",
    success : function(r) { alert(r); }
  });*/
  $.ajax({
    type : 'post',
    url  : "./get-bullshit.php",
    success : function(json) {
		eval(json);
		playlist = tumblr_api_read.posts;
		play();
	}
	}); 
}


  hide('#login', 100);  
  return false;
>>>>>>> afe54c0149295719558736a3665c6545ae5779bc
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
<<<<<<< HEAD
    if (stage == 1) {
	$('#player').addClass('hidden');
	show('#login', 100);
	cur_pos = 0;
	stage = 0;
    }
=======
  if (stage == 1) {
    showLogin();
    stage = 0;
  }
>>>>>>> afe54c0149295719558736a3665c6545ae5779bc
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

<<<<<<< HEAD
    $(document).keydown(function (eh) {
	var keycode = getKey(eh);
	if (keycode == 37) left();
	else if (keycode == 38) up();
	else if (keycode == 39) right();
	else if (keycode == 40) down();
    });
=======
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
>>>>>>> afe54c0149295719558736a3665c6545ae5779bc

});
