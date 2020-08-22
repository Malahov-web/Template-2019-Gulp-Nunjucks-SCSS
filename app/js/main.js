/*
js/mw-libs: 
    sliders_init.js, 
    modals.js, 
    tabs.js, 
    trigger_show_hide.js, 
    open_close.js
    smooth-scroll.js, 
    menu-side-scroll.js 
    wpcf7-helpers.js,  
    dropdown_list.js, 
    add_animate.js,
    range_init.js, 
    accordeon_mobile.js,
    megamenu.js,
    menu-responsive.jquery.js, 
    search_mobile.js, 
    button_scroll_to_top.js, 
    mw-filter.js, 
    mw_mobile_nav.js
*/

/*
 *  
 * ----------------------------------------------------------------- 
*/

// jQuery v 3.3.1


jQuery(document).ready(function($) {

    var mobile_breakpoint = 768;   
    var viewportHeight = getViewportHeight(); //console.log(viewportHeight);
    var isCounterAllreadyStared = false;



    // $("input[type=tel]").mask("+7 (999) 999-9999");

    // slidersInit(); // +

    // modals(); // +

    // tabs(); // + 

    // triggerShowHide(); // + 
    
    // openClose(); // +

    // smoothScrollMenu(); // +    
    
    // menuSideScroll(); // +

    // dropdownList(); // +

    // addAnimate(); // +

    // accordeonMobile(); // +

    // copyToBuffer('code, .label', { showTooltip: 1 }); // +


    // Закрытие menu-top по клику по документу вне элемента    
    // $('html').on( 'click', function(e){ 


    //     var targetEl = e.target;
    //     // console.log(e.target);
    //     // console.log( $( ".menu-top-trigger" ).hasClass( "js-trigger" ) ); // true
    //     // console.log( $( targetEl ).hasClass( "js-trigger" ) ); // 
    //     // console.log(  targetEl.hasClass( "js-trigger" ) ); // Error

    //     var menu = $('#menu-top-outer'); // тут указываем ID элемента
    //     if (
    //         !menu.is(e.target) 
    //         && menu.has(e.target).length === 0
    //         // && !(targetEl.hasClass('js-trigger'))
    //         && !($( targetEl ).hasClass( "js-trigger" ))
    //         && !($( targetEl ).hasClass( "js-open" ))
    //         ) 

    //     { // если клик был не по нашему блоку // и не по его дочерним элементам
        
    //         // скрываем его
    //         // $('.js-trigger[data-target=menu-top-outer]').click();
    //         // menu.removeClass('active');
    //         // menu.toggleClass('active');
    //         // $('#menu-top-outer').toggleClass('active');
    //         // $('#menu-top-outer').removeClass('active');
    //         $('#menu-top-outer').removeClass( "active" );
    //         $('.menu-top-trigger').removeClass('active');
    //         $('.menu-top-close').removeClass('active');
            
    //     }
        
    // }); 


    if ( isMobileResolution(mobile_breakpoint) ) {

        // mobile only
    } else {
        // tablets, desktops
    }






    // var waypoint = new Waypoint({
    //     element: document.getElementById('section_prices'),
    //     handler: function(direction) {
    //         // console.log('Scrolled to waypoint!')

    //         if (!isCounterAllreadyStared ) {
    //             counterEffectLeafing(); 
    //             isCounterAllreadyStared = true;               
    //         }
    //     }
    // })
        

   


});


function isMobileResolution(mobile_breakpoint) {

    var container_width = jQuery(".container").innerWidth();
    var mobile_width = mobile_breakpoint;

    // console.log('isMobileResolution(): Hi, container_width: ' + container_width);
    return ( container_width < mobile_width );
}


function getViewportHeight(argument) {

    // $(window).resize(function() {
        viewportHeight = $(document).height(); // Высота всего документа)
        viewportHeight = $(window).height(); // Высота viewporta браузера
    // });        

    // console.log(viewportHeight);
    return viewportHeight;
} 