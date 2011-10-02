<?php

$email = $_POST[email];
$pass = $_POST[password];

$start = $_GET[start];

$url = "curl --data 'email={$email}&password={$pass}' http://www.tumblr.com/api/dashboard/json?type=video&start={$start}&num=50";

echo shell_exec($url);
?>
