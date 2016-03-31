<?php

if(!isset($_POST['name'])) {
    echo "error ";
}

$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$message = $_POST['message'];

$to = "jim.casey321@gmail.com";

$headers = "From: $name \r\n";
$headers .= "Reply-To: $email \r\n";

$email_subject = "New customer mail!";
$email_body = $name . " $phone " . " $email " . " $message";

mail($to, $email_subject, $email_body, $headers);