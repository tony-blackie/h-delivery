<?php
//
//require 'PHPMailerAutoload.php';
//require 'class.phpmailer.php';
//require 'class.smtp.php';

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
//
////SMTP needs accurate times, and the PHP time zone MUST be set
////This should be done in your php.ini, but this is how to do it if you don't have access to that
//date_default_timezone_set('Etc/UTC');
//
////Create a new PHPMailer instance
//$mail = new PHPMailer;
////Tell PHPMailer to use SMTP
//$mail->isSMTP();
////Enable SMTP debugging
//// 0 = off (for production use)
//// 1 = client messages
//// 2 = client and server messages
//$mail->SMTPDebug = 2;
////Ask for HTML-friendly debug output
//$mail->Debugoutput = 'html';
////Set the hostname of the mail server
//$mail->Host = 'smtp.gmail.com';
//// use
// $mail->Host = gethostbyname('smtp.gmail.com');
//// if your network does not support SMTP over IPv6
////Set the SMTP port number - 587 for authenticated TLS, a.k.a. RFC4409 SMTP submission
//$mail->Port = 587;
////Set the encryption system to use - ssl (deprecated) or tls
//$mail->SMTPSecure = 'tls';
////Whether to use SMTP authentication
//$mail->SMTPAuth = true;
////Username to use for SMTP authentication - use full email address for gmail
//$mail->Username = "jim.casey321@gmail.com";
////Password to use for SMTP authentication
//$mail->Password = "123";
////Set who the message is to be sent from
//$mail->setFrom($email, $name);
////Set an alternative reply-to address
//$mail->addReplyTo('jim.casey321@gmail.com', 'Tony');
////Set who the message is to be sent to
//$mail->addAddress('jim.casey321@gmail.com', 'Tony Blackie');
////Set the subject line
//$mail->Subject = 'PHPMailer GMail SMTP test';
////Read an HTML message body from an external file, convert referenced images to embedded,
////convert HTML into a basic plain-text alternative body
//$mail->Body = '<p>Name:' . $name . '</p> <p>Phone: ' . $phone . '</p> <p>Mail: ' . $email . '</p> <p>Message: ' . $message . '</p>';
////Replace the plain text body with one created manually
////$mail->AltBody =
////Attach an image file
//$mail->addAttachment('images/phpmailer_mini.png');
////send the message, check for errors
//if (!$mail->send()) {
//    echo "Mailer Error: " . $mail->ErrorInfo;
//} else {
//    echo "Message sent!";
//}