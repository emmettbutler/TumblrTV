<?php

/**
 * @file
 * A single location to store configuration.
 */
 
require_once('localtunnel_key.php');

define('CONSUMER_KEY', 'Ne3RcPKi5aNSGEvz4VYuohw1mAbQR3cnHjrSYjRZJvLDHkWuXD');
define('CONSUMER_SECRET', 'r2lTPG0xBNWkHvUXMdfFunOlFjMWWh5y4wiqSxK33XugXIn5r4');
define('OAUTH_CALLBACK', 'http://' . $localtunnel_key . '.localtunnel.com:8000/hackny/tumblr_auth/tumblroauth/callback.php');
