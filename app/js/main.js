jQuery(document).ready(function(){
  $('.bxslider').bxSlider({
  	    mode: 'fade',           // тип перехода между слайдами может быть 'horizontal', 'vertical', 'fade'
        captions: true,         // отображение title
        easing: 'easeInOutQuad',// анимация слайда
        controls: true,         // отображение стрелки - вперед, назад
        startSlide: 0,          // Показ начнется с заданного слайда
        infiniteLoop: true,     // показывать первый слайд за последним 
        pager: true,            // показ номера страницы
        auto: true,             // сделать автоматический переход            // включить видео
        pause: 4000,            // время между сменой слайдов в м-сек
        speed: 500,             // длительность перехода слайда в м-сек
        useCSS: false           // CSS переходы
  });

});