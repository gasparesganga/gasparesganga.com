<?php
if (!isset($_POST['username'])) || !isset($_POST['password']) || $_POST['username'] != 'user' || $_POST['password'] != 'secret') {
    header($_SERVER['SERVER_PROTOCOL'].' '.401, true, 401);
    exit('Wrong username or password');
}
