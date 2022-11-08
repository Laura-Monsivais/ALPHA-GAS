<?php
//var_dump("Hola system");exit();
$uri = urldecode(
    parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH)
);

if ($uri !== '/' && file_exists(__DIR__.'/ionic/www'.$uri)) {
    return false;
}

require_once __DIR__.'/ionic/www/index.html';