var user;
var pass;
var playlist;
var cur_id;

function login() {
  user = $('#user').val();
  pass = $('#pass').val();
  $.post('http://www.tumblr.com/api/dashboard/json?type=video', {email: user, password: pass}, function(json) {
    playlist = json;
    alert(playlist);
  });
  hide('#login', 100);
}

function hide(selector, ms) {
  $(selector).animate({opacity: 0}, ms, function() {
    $(selector).addClass("hidden");
  });
}



$(function() {
  $('#user').select();
  $('#submit').click(login);

  //$('#player').innerHTML = getNext()['video_player'];
});
