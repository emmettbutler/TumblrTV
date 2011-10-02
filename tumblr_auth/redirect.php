<?php

/* Start session and load library. */
session_start();
require_once('tumblroauth/tumblroauth.php');
require_once('config.php');

/* Build TumblrOAuth object with client credentials. */
$connection = new TumblrOAuth(CONSUMER_KEY, CONSUMER_SECRET);
 
/* Get temporary credentials. */
$request_token = $connection->getRequestToken(OAUTH_CALLBACK);

/* Save temporary credentials to session. */
$_SESSION['oauth_token'] = $token = $request_token['oauth_token'];
$_SESSION['oauth_token_secret'] = $request_token['oauth_token_secret'];
 
/* If last connection failed don't display authorization link. */
switch ($connection->http_code) {
  case 200:
    /* Build authorize URL and redirect user to Tumblr. */
    $url = $connection->getAuthorizeURL($token);
    header('Location: ' . $url); 
    break;
  default:
    /* Show notification if something went wrong. */
    echo 'Could not connect to Tumblr. Refresh the page or try again later.';
}
