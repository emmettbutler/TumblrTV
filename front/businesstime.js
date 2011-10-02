var user;
var pass;
var playlist;
var cur_post;

function getFirst() {
  return playlist[0]; 
}

function login() {
  user = $('#user').val();
  pass = $('#pass').val();
  $.post('http://www.tumblr.com/api/dashboard/json?type=video', 
      {email: user, password: pass}, function(json) {
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

$(function() {
  $('#user').select();
  $('#submit').click(login);

  $(document).keydown(function (eh) {
    var keycode = getKey(eh);
    if (keycode == 37) alert("Left");
    else if (keycode == 38) alert("Up");
    else if (keycode == 39) alert("Right");
    else if (keycode == 40) alert("Down");
  });

});
