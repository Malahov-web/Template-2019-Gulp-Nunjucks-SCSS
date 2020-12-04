/*
 * . Sticky element
 * ----------------------------------------------------------------- 
 */ 


/**
 *  Add css-class to 'js-sticky' elements when window scroll
 * 
 * @param
 * @return
 * 
 */


function stickyElement() {   


    // 0. Settings
    var cssFixedClass = 'is-fixed';


    // 1. Собираем д-е всех элементов с .js-sticky в объект
    var stickyElements = {};

    $('.js-sticky').each(function(index) {

        var ElCssClass = $(this).attr('class');
        var ElOffset = $(this).offset();
        var ElHeight = $(this).innerHeight();
        stickyElements[ElCssClass] = {};
        stickyElements[ElCssClass]['offsetTop'] = ElOffset.top;
        stickyElements[ElCssClass]['height'] = ElHeight;

        // Поставить ему data-fefault-class,
        // т.к. class будет менятся динамически
        $(this).attr('data-default-class', ElCssClass);         
        
    });


    // console.log(' stickyElements : ');
    // console.log( stickyElements);


    // 2. При прокрутке документа - доавблаяет/удаляет css-класс
    jQuery(window).scroll(function(){


        $('.js-sticky').each(function(index) {


            var currentElCssClass  = $(this).attr('data-default-class');
            // console.log(' currentElCssClass : ' + currentElCssClass); // dev
            var currentElOffsetTop = stickyElements[currentElCssClass]['offsetTop'];
            

            if (jQuery(window).scrollTop() >= currentElOffsetTop) {
                $(this).addClass(cssFixedClass);
            }
            else {
                $(this).removeClass(cssFixedClass);
            }   
                 

        });


    });



}