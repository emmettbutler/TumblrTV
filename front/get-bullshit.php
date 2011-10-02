<?php

$email = $_POST[email];
$pass = $_POST[password];

$start = $_POST[start];

$url = "curl --data 'email={$email}&password={$pass}' http://www.tumblr.com/api/dashboard/json?type=video&num=50&start=" . $start;

echo shell_exec($url);
?>
