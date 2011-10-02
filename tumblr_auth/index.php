<?php
/**
 * @file
 * User has successfully authenticated with Tumblr. Access tokens saved to session and DB.
 */

/* Load required lib files. */
session_start();
require_once('tumblroauth/tumblroauth.php');
require_once('config.php');

/* If access tokens are not available redirect to connect page. */
if (empty($_SESSION['access_token']) || empty($_SESSION['access_token']['oauth_token']) || empty($_SESSION['access_token']['oauth_token_secret'])) {
    header('Location: ./clearsessions.php');
}
/* Get user access tokens out of the session. */
$access_token = $_SESSION['access_token'];

/* Create a TumblrOauth object with consumer/user tokens. */
$connection = new TumblrOAuth(CONSUMER_KEY, CONSUMER_SECRET, $access_token['oauth_token'], $access_token['oauth_token_secret']);

/* Include HTML to display on the page */
include('html.inc');

if(!isset($_GET['test'])){
	echo 'Once you&#8217;ve linked an account to Tumblr, <a href="?test=1">test to see if it works</a>.';
}
else{
	$user = $connection->authenticate();
	$user = simplexml_load_string($user);

	$name = (string)$user->tumblelog['name'];

	$params = array('start' => 0,
		'num' => 1);

	$read = $connection->read($name, $params);
	$read = simplexml_load_string($read);

	$url = (string)$read->posts->post[0]['url-with-slug'];

	if(!empty($name)){ echo '<strong>Connected. </strong><br />'; }
	else{ echo '<strong>Failed to connect.</strong><br />'; }
	echo '<strong>Connected via:</strong> ' . $name . '<br />';
	echo '<strong>Last post:</strong> <a href="' . $url . '">' . $url . '</a>';
}