var user;
var pass;
var playlist;
var cur_id;

function getFirst() {
  return playlist[0]; 
}

function login() {
  user = $('#user').val();
  pass = $('#pass').val();
  $.post('http://www.tumblr.com/api/dashboard/json?type=video', {email: user, password: pass}, function(json) {
    eval(json);
    playlist = tumblr_api_read.posts;
    $('#player').removeClass("hidden").html(getFirst().url);
    alert(getFirst().'video-player');
  });
  hide('#login', 100);  
  return false;
}

function hide(selector, ms) {
  $(selector).animate({opacity: 0}, ms, function() {
    $(selector).addClass("hidden");
  });
}

$(function() {
  $('#user').select();
  $('#submit').click(login);

});
