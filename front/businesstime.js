var user;
var pass;
var playlist = [];
var cur_pos = 0;
var stage = 0;
var selected = 0;
var items = ['#user', '#pass'];


function fetchVideos() {
  //alert("fetching from " + playlist.length);
  $.post("get-bullshit.php?start=" + playlist.length, 
      {email: user, password: pass, start: playlist.length},  function(json) {
	eval(json);
	playlist = playlist.concat(tumblr_api_read.posts);
    incrTillYouTube();
    play();
  });
}

/* adds autoplay and scales video to full size with js regex. hacky, but fuck it. */
function enable_fullscreen(embed_code) {
	if (/www.youtube.com/g.test(embed_code)) {
		embed_code = embed_code.replace("<\/param>","<\/param><param name=\"autoplay\" value=\"true\"><\/param><param name=\"controls\" value=\"0\"><\/param>");
		embed_code = embed_code.replace(/&amp;rel=0/g,"&amp;controls=0&amp;autoplay=1&amp;rel=0");
		embed_code = embed_code.replace("wmode=\"transparent\"","wmode=\"opaque\"");
		embed_code = embed_code.replace(/width=\"\d+\" height=\"\d+\"/g, "width=\"100%\" height=\"100%\" controls=\"0\" autoplay=\"true\"");	
	}
	return embed_code;
}

/* we only want youtube videos now, so only show youtube videos. */
function incrTillYouTube() {
  var reg = /www.youtube.com/g;
  while (!reg.test(playlist[cur_pos]['video-player']) && cur_pos + 1 < playlist.length) {
    cur_pos++;
  }
  if (!reg.test(playlist[cur_pos]['video-player']))
    decrTillYouTube();
}

function decrTillYouTube() {
  var reg = /www.youtube.com/g;
  while (!reg.test(playlist[cur_pos]['video-player']) && cur_pos > 0) {
    cur_pos--;
  }
  if (!reg.test(playlist[cur_pos]['video-player']))
    incrTillYouTube();
}

function getNext() {
  if (cur_pos + 1 < playlist.length) {
    cur_pos++;
    incrTillYouTube();
    play();
  }
}

function getPrevious() {
  if (cur_pos > 0) {
	cur_pos--;
    decrTillYouTube();
    play();
  }
}

function play() {
	$.gritter.add({
		// (string | mandatory) the heading of the notification
		title: playlist[cur_pos]['tumblelog']['title'],
		// (string | mandatory) the text inside the notification
		text: (playlist[cur_pos]['video-caption'] ? playlist[cur_pos]['video-caption'] : playlist[cur_pos]['date']),
		// (string | optional) the image to display on the left
		image: playlist[cur_pos]['tumblelog']['avatar_url_40'],
		// (bool | optional) if you want it to fade out on its own or just sit there
		sticky: false,
		// (int | optional) the time you want it to be alive for before fading out
		time: '7500'
	});		
   $('#player').removeClass("hidden").html(enable_fullscreen(playlist[cur_pos]['video-player']));
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
