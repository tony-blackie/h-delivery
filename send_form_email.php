<?php

if(!isset($_POST['name'])) {
    echo "error ";
}

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