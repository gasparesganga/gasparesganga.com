<?php
// Some "very secure" check going on here...
echo (!isset($_POST['username']) || !isset($_POST['password']) || $_POST['username'] != 'user' || $_POST['password'] != 'secret') ? 0 : 1;
