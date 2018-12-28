<?php

  $text = "";

  $name = $_POST['user-name'];
  $mail = $_POST['user-email'];
  $phone = $_POST['user-phone'];

  $section = $_POST['section-name'];

  switch ($section) {
    case 'design':
      $text = "Нужна услуга: Дизайн и разработка сайта<br>";
      $development = $_POST['development-name'];
      switch ($development) {
        case 'new-site':
          $text .= "Состояние проекта: Создание нового сайта<br>";
          break;

        case 'old-site':
        $text .= "Состояние проекта: Доработка существующего сайта<br>";
        break;
          break;
      }
      break;
    case 'conversion':
      $text = "Нужна услуга: Увеличение конверсии<br>";
      $sales = $_POST['sales-name'];
      switch ($sales) {
        case 'analitics':
          $text .= "Что нужно: Аналитика каналов привлечения<br>";
          break;

        case 'ui-ux':
          $text .= "Что нужно: UI/UX анализ сайта<br>";
          break;
      }
      break;
    case 'marketing':
      $text = "Нужна услуга: Интернет-маркетинг<br>";
      $marketing = $_POST['marketing-name'];
      switch ($marketing) {
        case 'all-includes':
          $text .= "Инструменты: Комплекс услуг<br>";
          break;
        case 'smm':
          $text .= "Инструменты: SMM<br>";
          break;
        case 'seo':
          $text .= "Инструменты: SEO<br>";
          $seo = $_POST['seo-name'];
          switch ($seo) {
            case 'analisys':
              $text .= "Что будем делать: Аналитика<br>";
              break;
            case 'promotion':
              $text .= "Что будем делать: Продвижение<br>";
              break;
          }
          break;
        case 'sea':
          $text .= "Инструменты: SEА — контекстная реклама<br>";
          $sea = $_POST['system-name'];
          switch ($sea) {
            case 'yandex':
              $text .= "Поисковая система: Яндекс.Директ<br>";
              break;

            case 'google':
              $text .= "Поисковая система: Google AdWords<br>";
              break;
          }
          break;

      }
      break;
    case 'marketing':
      $text = "Нужна услуга: Текстовое наполнение<br>";
      break;
  }

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
