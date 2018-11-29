svg4everybody(); // иницализация полифила для IE
(function($, window) {
  var _defaults = {
    x: 2, // number of tiles in x axis
    y: 2, // number of tiles in y axis
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
          var i = randomInteger(0, 48);
          var num = 0; // считаем, сколько квадратов у нас всего
          var elems = []; // сохраняем видимые квадраты
           for (var n = 0; n<48; n++) {
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
      }
      else {
        $(".slider__sliced").sliced({ x: 6, y: 8, speed: 5500 });
      }

      $(".slider__sliced").trigger("start_quot");
    }, 500);
  });

  if ($(window).width() < '768') {
    $(".slider__sliced").sliced({ x: 8, y: 6, speed: 5500 });
  }
  else {
    $(".slider__sliced").sliced({ x: 6, y: 8, speed: 5500 });
  }


  //задаем анимацию фона для таблицы компетенций
  var tds = $('.competitions__table td');
  setInterval(function(){
    var rand = Math.floor(Math.random() * $('.competitions__table td').length);
     $('.competitions__table td').eq(rand).toggleClass('colored');
  }, 4000);

});


$(document).ready(function(){
  $('.slider__promo').slick({
    infinite: true,
    arrows: true,
    dots: true
  });

  $('.activities__text:not(:first)').hide();

  $('.activities__head').on ('click', function() {
    $(this).toggleClass('activities__head--opened').next().slideToggle();
    $('.activities__head').not(this).removeClass('activities__head--opened').next().slideUp();
  })



});
