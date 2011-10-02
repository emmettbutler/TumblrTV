<?php
// pass $_GET[email] and $_GET[password]


$url = "curl --data 'email={$_[email]}&password={$_GET[password]}' http://www.tumblr.com/api/dashboard/json?type=video";

echo shell_exec($url);
?>
