<?php

error_reporting(-1);
ini_set('display_errors', 'On');
set_error_handler("var_dump");


if(!isset($_POST['name'])) {
    echo "error ";
}
//
//foreach($_POST as $key => $value)
//{
//    echo $key." has ". $value;
//}

$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$message = $_POST['message'];

$form_data = $name . "\r\n" . $phone . "\r\n" . $email . "\r\n" . $message;

$to = "jim.casey321@gmail.com";
$email_subject = "New customer mail!";

$headers = "From: $name \r\n";
$headers .= "Reply-To: $email \r\n";

mail($to, $email_subject, $form_data, $headers);
