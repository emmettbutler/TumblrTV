<?php ?>
<html>
  <head>
    <title>Tumblr TV</title>
    <link rel="stylesheet" href="styles.css" />
    <link rel="stylesheet" type="text/css" href="css/jquery.gritter.css" />
    <script type="text/javascript" 
      src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js">
    </script>
    <script type="text/javascript" 
      src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.2/jquery-ui.min.js">
    </script>
    <script type="text/javascript" src="jquery.gritter.min.js"></script>
    <script type="text/javascript" src="businesstime.js"></script>
    <script type="text/javascript" src="boxee-control.js"></script>
  </head>
  <body>    
    <div id="frame">
    </div>
    <section id="login">
      <form action="#" id="loginform">
        <h1>Sign in to Tumblr.</h1>
        <input type="text" name="user" id="user" placeholder="Email" />
        <input type="password" name="pass" id="pass" placeholder="Password" />
        <input type="submit" id="go" value="Log in" />
      </form>
    </section>
    
    <section id="menu" class="hidden">
    </section>
	<div id="cover" class="hidden">
	</div>
    <section id="player" class="hidden">
    </section>

  </body>
</html>
