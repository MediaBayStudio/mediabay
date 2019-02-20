svg4everybody(); // иницализация полифила для IE
(function($, window) {
  var _defaults = {
    x: 5, // number of tiles in x axis
    y: 7, // number of tiles in y axis
    random: true, // animate tiles in random order
    speed: 2000 // time to clear all times
  };

  function range(min, max, rand) {
    var arr = new Array(++max - min)
      .join(".")
      .split(".")
      .map(function(v, i) {
        return min + i;
      });
    return rand
      ? arr
          .map(function(v) {
            return [Math.random(), v];
          })
          .sort()
          .map(function(v) {
            return v[1];
          })
      : arr;
  }

  function randomInteger(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  }



  // Prevent css3 transitions on load
  $("body").addClass("css3-preload");
  $(window).load(function() {
    $("body").removeClass("css3-preload");
  });

  $.fn.sliced = function(options) {
    var o = $.extend({}, _defaults, options);
    return this.each(function() {
      var $container = $(this);

      /*---------------------------------
       * Make the tiles:
       ---------------------------------*/
      var $img = $container.find("img"),
        width = $img.width(),
        height = $img.height(),
        n_tiles = o.x * o.y,
        tiles = [],
        $tiles;

      for (var i = 0; i < n_tiles; i++) {
        tiles.push('<div class="tile"/>');
      }

      $tiles = $(tiles.join(""));
      $img.after($tiles);
      $tiles.css({
        width: width / o.x,
        height: width / o.x,
        backgroundColor: "rgba(255,255,255,0.5)"
      });

      var $dump = $tiles; //дамп нужен, чтобы посчитать позиционирование, не вырывая блок из потока
      var offset_x = 0;

      // Adjust position
      $dump.each(function(i) {
        var pos = $(this).position();
        if (i == 0) {
          offset_x = pos.top-height; // убираем погрешность между высотами
        }
        $(this).css("top", pos.top-height-offset_x + "px ");
        $(this).css("left", pos.left + "px ");
        $tiles[i] = $(this);
      });

      $tiles.each(function(i) {
        $(this).css("position", 'absolute');
      });


      /*---------------------------------
       * Animate the tiles:
       ---------------------------------*/
      // Public method
      $container.on("start_quot", function() {
        setInterval(function() {
          var i = randomInteger(0, n_tiles);
          var num = 0; // считаем, сколько квадратов у нас всего
          var elems = []; // сохраняем видимые квадраты
           for (var n = 0; n<n_tiles; n++) {
             if( $tiles[n].hasClass('tile-animated') ) {
               num = num+1;
               elems.push(n);
             }
           }
          if (num >= 10) {
            var rand = Math.floor(Math.random() * elems.length);
            $tiles.eq(elems[rand]).toggleClass("tile-animated");
          }
          else {
            $tiles.eq(i).toggleClass("tile-animated");
          }
        }, 1000);
      });
    });
  };
})(jQuery, window);

$(window).load(function() {
  var waitForFinalEvent = (function () {
    var timers = {};
    return function (callback, ms, uniqueId) {
      if (!uniqueId) {
        uniqueId = "Don't call this twice without a uniqueId";
      }
      if (timers[uniqueId]) {
        clearTimeout (timers[uniqueId]);
      }
      timers[uniqueId] = setTimeout(callback, ms);
    };
  })();

  $(window).resize(function () {
    waitForFinalEvent(function(){
      $("div.tile").remove();
      if ($(window).width() < '768') {
        $(".slider__sliced").sliced({ x: 8, y: 6, speed: 5500 });
        $('.activities__header').html('Что мы делаем');
      }
      else



        if (($(window).width() >= '768') && ($(window).width() < '1000')) {
          $(".slider__sliced").sliced({ x: 6, y: 8, speed: 5500 });
          $('.activities__header').html('Миссия');
        }
        else {
          if ( ($(window).width() >= '1000') && ($(window).width() < '1440') ) {
            $(".slider__sliced").sliced({ x: 5, y: 8, speed: 5500 });
            $('.activities__header').html('Миссия');
          }
          else {
            $(".slider__sliced").sliced({ x: 8, y: 12, speed: 5500 });
            $('.activities__header').html('Миссия');
          }
        }

      $(".slider__sliced").trigger("start_quot");
    }, 500);
  });

});

$(document).ready(function(){

  if ($(window).width() < '768') {
    $(".slider__sliced").sliced({ x: 8, y: 6, speed: 5500 });

  }
  else


    if (($(window).width() >= '768') && ($(window).width() < '1000')) {
      $(".slider__sliced").sliced({ x: 6, y: 8, speed: 5500 });
      $('.activities__header').html('Миссия');
    }
    else {
      if ( ($(window).width() >= '1000') && ($(window).width() < '1440') ) {
        $(".slider__sliced").sliced({ x: 5, y: 8, speed: 5500 });
        $('.activities__header').html('Миссия');
      }
      else {
        $(".slider__sliced").sliced({ x: 8, y: 12, speed: 5500 });
        $('.activities__header').html('Миссия');
      }
    }
  $(".slider__sliced").trigger("start_quot");

  //задаем анимацию фона для таблицы компетенций
  var tds = $('.competitions__table td');
  setInterval(function(){
    var rand = Math.floor(Math.random() * $('.competitions__table td').length);
     $('.competitions__table td').eq(rand).toggleClass('colored');
  }, 4000);


  $('.slider__promo').slick({
    infinite: true,
    arrows: true,
    mobileFirst: true,
    dots: true
  });

  $('.slider__projects').slick({
    infinite: true,
    arrows: true,
    mobileFirst: true,
    dots: true
  });

  $('.slider__comand').slick({
    infinite: true,
    arrows: true,
    mobileFirst: true,
    dots: false,
    responsive: [
        {
          breakpoint: 767,
          settings: {
            centerMode: false,
            focusOnSelect:true,
            slidesToShow: 2,
          }
        }
      ]

  });

  $("#agreeded").change(function() {
    if(this.checked) {
        $('#contacts').prop('disabled', false);
    }
    else {
      $('#contacts').prop('disabled', true);
    }
});



  $('.activities__text:not(:first)').hide();

  $('.activities__head').on ('click', function() {

    if ($(window).width() < '768') {
      $(this).toggleClass('activities__head--opened').next().slideToggle();
      $('.activities__head').not(this).removeClass('activities__head--opened').next().slideUp();
    }
    else {
      $(this).addClass('activities__head--opened').next().show('slow');
      $('.activities__head').not(this).removeClass('activities__head--opened').next().hide();
      $('.activities__header').html($(this).children().text());

    }
  })

  $('.form__step-one').on('change', function() {
    var type = $('input[name=section-name]:checked', '.form').val();
    var value = ".form__step-two--" + type;
    var header = '';
    var width = '25%';
    var class_name = '';

    switch (type) {
      case 'design':
        header = 'СОСТОЯНИЕ ПРОЕКТА';
        class_name = 'step-two';
        width = '75%';
      break;

      case 'conversion':
        header = 'Что нужно?';
        class_name = 'step-two';
        width = '75%';
      break;

      case 'marketing':
        header = 'Инструменты';
        class_name = 'step-two';
        width = '50%';
      break;

      case 'texts':
        header = 'Оставить заявку';
        class_name = 'step-four';
        width = '100%';
      break;
      default:

    }
    if (value == '.form__step-two--texts') value = ".form__step-four";
    $('.form__step-one').hide();
    $('#form__step-title').text(header);
    $('#progress .progress-bar').css('width', width);
    $('#progress').addClass(class_name);
    $('.forms__back').removeClass('forms__back--disabled');
    $(value).css('display', 'flex');
  })

  $('.form__step-two').on('change', function() {
    var value = $('input:checked', '.form__step-two').val();
    var header = '';
    var width = '50%';
    var class_name = '';

    if (value == 'seo' || value == 'sea') {
      switch (value) {
        case 'seo':
          header= 'ЧТО БУДЕМ ДЕЛАТЬ?';
          class_name = 'step-three';
          width = '75%';
        break;

        case 'sea':
          header= 'ПОИСКОВАЯ СИСТЕМА';
          class_name = 'step-three';
          width = '75%';
        break;
        default:
      }
      value = ".form__step-three--"+value;
    }
    else {
      width = '100%';
      header = 'Оставить заявку';
      value = ".form__step-four";
      class_name = 'step-four';
    }

    $('.form__step-two').hide();
    $('#form__step-title').text(header);
    $('#progress').removeClass('step-two').addClass(class_name);
    $('#progress .progress-bar').css('width', width);
    $(value).css('display', 'flex');
  })

  $('.form__step-three').on('change', function() {
    var width = '100%';
    $('.form__step-three').hide();
    $('#form__step-title').text('Оставить заявку');
    $('#progress').removeClass('step-three').addClass('step-four');
    $('#progress .progress-bar').css('width', width);
    $('.form__step-four').css('display', 'flex');
  })

  $('.forms__back').on('click', function() {
    var classList = $('#progress').attr("class").split(' ');
    switch (classList[1]) {
      case 'step-two':
        $('.form__step-two input[type=radio]').each(function(){
          $(this).prop( "checked", false );
        });
        $('.form__step-one input[type=radio]').each(function(){
          $(this).prop( "checked", false );
        });
        $('.form__step-two').hide();
        $('#form__step-title').text('Выберите услугу');
        $('#progress .progress-bar').css('width', '25%');
        $('#progress').removeClass('step-two');
        $('.forms__back').addClass('forms__back--disabled');
        $('.form__step-one').css('display', 'flex');
      break;

      case 'step-three':
        $('.form__step-three input[type=radio]').each(function(){
          $(this).prop( "checked", false );
        });
        $('.form__step-two input[type=radio]').each(function(){
          $(this).prop( "checked", false );
        });
        $('.form__step-three').hide();
        $('#form__step-title').text('Инструменты');
        $('#progress .progress-bar').css('width', '50%');
        $('#progress').removeClass('step-three').addClass('step-two');
        $('.form__step-two--marketing').css('display', 'flex');
      break;

      case 'step-four':
        var type = '';
        var category = '';
        var header = 'ВЫБЕРИТЕ УСЛУГУ';
        $('.form__step-three input[type=radio]').each(function(){ // если дошли до третьего шага мб только seo или sea
          if ($(this).prop("checked")) type = $(this).val();
          $(this).prop( "checked", false );
        });
        if (type) {
          switch (type) {
            case 'analisys':
              category = "--seo";
              header = 'Что будем делать?';
            break;
            case 'promotion':
              category = "--seo";
              header = 'Что будем делать?';
            break;
            case 'yandex':
              category = "--sea";
              header = 'Поисковая система';
            break;
            case 'google':
              category = "--sea";
              header = 'Поисковая система';
            break;
            default:
          }
          $('.form__step-four').hide();
          $('#progress .progress-bar').css('width', '75%');
          $('#progress').removeClass('step-four').addClass('step-three');
          $('.form__step-three'+category).css('display', 'flex');
        }
        else {
          $('.form__step-two input[type=radio]').each(function(){ // если перешли со второго шага
            if ($(this).prop("checked")) type = $(this).val();
            $(this).prop( "checked", false );
          });
          if (type) {
            switch (type) {
              case 'new-site':
                category = "--design";
                header = 'СОСТОЯНИЕ ПРОЕКТА';
              break;
              case 'old-site':
                category = "--design";
                header = 'СОСТОЯНИЕ ПРОЕКТА';
              break;
              case 'analitics':
                category = "--conversion";
                header = 'ЧТО НУЖНО?';
              break;
              case 'ui-ux':
                category = "--conversion";
                header = 'ЧТО НУЖНО?';
              break;
              case 'all-includes':
                category = "--marketing";
                header = 'ИНСТРУМЕНТЫ';
              break;
              case 'smm':
                category = "--marketing";
                header = 'ИНСТРУМЕНТЫ';
              break;
              default:
            }
            $('.form__step-four').hide();
            $('#progress .progress-bar').css('width', '50%');
            $('#progress').removeClass('step-four').addClass('step-two');
            $('.form__step-two'+category).css('display', 'flex');
          }
          else {
            $('.form__step-one input[type=radio]').each(function(){
              $(this).prop( "checked", false );
            })
            $('.form__step-four').hide();
            $('#progress .progress-bar').css('width', '25%');
            $('#progress').removeClass('step-four');
            $('.form__step-one').css('display', 'flex');
            $('.forms__back').addClass('forms__back--disabled');
          }
        }
        $('#form__step-title').text(header);
        $('.form__step-two input[type=radio]').each(function(){
          $(this).prop( "checked", false );
        });
        //$('.form__step-three').hide();
        //$('.form__step-two--marketing').css('display', 'flex');
      break;
      default:

    }
  })

  $('.competitions__table span').on('click', function() {
    // create the notification
    var notification = new NotificationFx({
      wrapper : document.getElementById("competitions"),
      message : "<h4 class='attache__header'>"+$(this).text()+"</h4><p class='attache__text'>"+$(this).next().text()+"</p>",
      layout : 'attached',
      effect : 'bouncyflip',
      type : 'notice', // notice, warning or error
      onClose : function() {
      }
    });

    // show the notification
    notification.show();
  })

  $('.form').submit(function(e) {
   var $form = $(this);
   $.ajax({
      type: 'POST',
      url: 'feedback.php',
      data: $form.serialize()
  }).done(function(result) {
      $('.modal-mask').addClass('modal-mask--visible');
      $('.modal__header').text('Заявка принята');
      $('.modal__text').text('Спасибо за ваш выбор! Здесь текс, который еще нужно придумать');
      document.getElementById('form1').reset();
    }).fail(function() {
      $('.modal-mask').addClass('modal-mask--visible');
      $('.modal__header').text('Ой, кажется что-то пошло не так');
      $('.modal__text').text('Позвоните нам или попробуйте отправить письмо позднее');
    });
   //отмена действия по умолчанию для кнопки submit
      e.preventDefault();
});

$('#form2').submit(function(e) {
 var $form = $(this);
 $.ajax({
    type: 'POST',
    url: 'send.php',
    data: $form.serialize()
  }).done(function(result) {
      $('.modal-mask').addClass('modal-mask--visible');
      $('.modal__header').text('Заявка принята');
      $('.modal__text').text('Спасибо за ваш выбор! Здесь текс, который еще нужно придумать');
      document.getElementById('form1').reset();
    }).fail(function() {
      $('.modal-mask').addClass('modal-mask--visible');
      $('.modal__header').text('Ой, кажется что-то пошло не так');
      $('.modal__text').text('Позвоните нам или попробуйте отправить письмо позднее');
    });
 //отмена действия по умолчанию для кнопки submit
    e.preventDefault();
});

$('.modal__close').on('click', function() {
  $('.modal-mask').removeClass('modal-mask--visible');
  document.getElementById('form1').reset();
  $('.form__step-four').hide();
  $('#form__step-title').text('Выберите услугу');
  $('#progress .progress-bar').css('width', '25%');
  $('#progress').removeClass('step-four');
  $('.forms__back').addClass('forms__back--disabled');
  $('.form__step-one').css('display', 'flex');
})



var x = 8;
var y = 15;
var lastScrollTop = 0;
var val = '';
var wh = $(document).height();
$(window).scroll(function(event){
  if ($('.activities').length) {
    if ($(window).width() >= '768') {
      var st = $(this).scrollTop();
      if (st > lastScrollTop){
        if ( st < 400 && ($(window).width() <= '1000')  && x < 38) {
          x = x+1.5;
          document.querySelector(".activities").style.backgroundSize = x + "% 100%";
        }

        if (($(window).width() >= '1000') && (st > 400) && (st < 1000) && ( x < 38 )) {
          x = x+1.5;
          document.querySelector(".activities").style.backgroundSize = x + "% 100%";
        }


        if (($(window).width() >= '768') && ($(window).width() < '1000') && (st > 3000) && (st < 3600) && ( y < 65)) {
          y = y+1.5;
          val = y + "% 400px";
          document.querySelector(".projects").style.backgroundSize = val;
        }

        if (($(window).width() >= '1000') && ($(window).width() < '1440') && (st > 2400) && (st < 3200) && ( y < 65)) {
          y = y+1.5;
          val = y + "% 494px";
          document.querySelector(".projects").style.backgroundSize = val;
        }

        if (($(window).width() >= '1440') && (st > 2900) && (st < 3600) && ( y < 55)) {
          y = y+1.5;
          val = y + "% 500px";
          document.querySelector(".projects").style.backgroundSize = val;
        }


      } else {

        if (st < 400 && ($(window).width() < '1000')  && x > 8) {
          x = x-1.5;
          document.querySelector(".activities").style.backgroundSize = x + "% 100%";
        }

        if (($(window).width() >= '1000') && (st > 400) && (st < 1000) && ( x > 8 )) {
          x = x-1.5;
          document.querySelector(".activities").style.backgroundSize = x + "% 100%";
        }

        if (($(window).width() >= '768') && ($(window).width() < '1000') && (st > 3000) && (st < 3600) && ( y > 15 )) {
          y = y-1.5;
          val = y + "% 400px";
          document.querySelector(".projects").style.backgroundSize = val;
        }

        if (($(window).width() >= '1000') && ($(window).width() < '1440') && (st > 2400) && (st < 3200) && ( y > 15 )) {
          y = y-1.5;
          val = y + "% 494px";
          document.querySelector(".projects").style.backgroundSize = val;
        }

        if (($(window).width() >= '1440') && (st > 2900) && (st < 3600) && ( y > 15 )) {
          y = y-1.5;
          val = y + "% 500px";
          document.querySelector(".projects").style.backgroundSize = val;
        }
      }
      lastScrollTop = st;
    }
  }

});


$(document).ready(function(){
  if ($(window).width() < '1024') {
    var photos = $('.comand__img');
    for (var i = 0; i<photos.length; i++) {
       var src = photos[i].src;
       photos[i].src = src.replace('.jpg', '__hoba.jpg');
    }
  }
  else {
    $('.comand__img').mouseover(function(){
      if ( $(window).width() >= '1024' ) {
        var src = $(this).prop('src');
        var substr = src.substr(-8,8);
        if (substr != 'hoba.jpg')
        $(this).prop('src',src.replace('.jpg', '__hoba.jpg'));
      }
    })

    $('.comand__img').mouseleave(function(){
      if ( $(window).width() >= '1024' ) {
        var src = $(this).prop('src');
        var substr = src.substr(-8,8);
        if (substr == 'hoba.jpg')
         $(this).prop('src',src.replace('__hoba.jpg', '.jpg'));
      }
    })
  }

})

$(window).resize(function(){
  var photos = $('.comand__img');

   if ($(window).width() < '1024') {
     for (var i = 0; i<photos.length; i++) {
       var src = photos[i].src;
       var substr = src.substr(-8,8);

       if (substr != 'hoba.jpg')
        photos[i].src = src.replace('.jpg', '__hoba.jpg');

     }

   }
   else {
     for (var i = 0; i<photos.length; i++) {
         var src = photos[i].src;
         var substr = src.substr(-8,8);
         if (substr == 'hoba.jpg')
          photos[i].src = src.replace('__hoba.jpg', '.jpg');
       }

       $('.comand__img').mouseover(function(){
         if ( $(window).width() >= '1024' ) {
           var src = $(this).prop('src');
           var substr = src.substr(-8,8);
           if (substr != 'hoba.jpg')
           $(this).prop('src',src.replace('.jpg', '__hoba.jpg'));
         }
       })

       $('.comand__img').mouseleave(function(){
         if ( $(window).width() >= '1024' ) {
           var src = $(this).prop('src');
           var substr = src.substr(-8,8);
           if (substr == 'hoba.jpg')
            $(this).prop('src',src.replace('__hoba.jpg', '.jpg'));
         }
       })
   }
})
});
