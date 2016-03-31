<?php

if(!isset($_POST['submit'])) {
    echo "error ";
}

$name = $_POST['name'];
var_dump($_POST);