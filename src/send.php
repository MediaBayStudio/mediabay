<?php

  $text = "";

  $name = $_POST['user-name'];
  $mail = $_POST['user-email'];
  $phone = $_POST['user-phone'];

  $to  = "<keynikel@gmail.com>" ;
  $subject = "Письмо с сайта mediabay";
  $message = "<b>Имя обратившегося:</b>   " . $name . "<br>
        <b>Телефон:</b>   " . $phone . "<br>
        <b>E-mail:</b>   " . $mail . "<br>" . $text;
  $headers  = "Content-type: text/html; charset=utf8";
  $headers .= "From: <" . $mail . ">";
  if (mail($to, $subject, $message, $headers)) echo 1;
  else echo 0;
?>
