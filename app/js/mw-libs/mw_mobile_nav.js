/*
 * 2 (1). Мобильная навигация Mobile nav
 * ----------------------------------------------------------------- 
 */ 
 
/*
мобильные вкладки-табы
исп-ся в header, что удобно отображать телефон, меню, контакты и т.п.
см. malahov-web.com, mline  
*/


// jQuery(document).ready(function(){

    function mobileNav (argument) {


        jQuery('.js-mobile_nav__controls').find('.js-mobile_nav__controls__button').click(function(){ 
            
            //tab_index = alert(jQuery(this).index());
            tab_index = jQuery(this).index();
            
            //tabs_container = jQuery('.js-tabs_container');
            tabs_container = jQuery(this).closest('.js-mobile_nav').find('.js-mobile_nav__content');
            
            tab_active = tabs_container.find('.js-mobile_nav__content__item').eq(tab_index);        
            //tab_active = jQuery('.js-tab').eq(tab_index);
            
            if ( !tab_active.hasClass('active') ){ // Открываем
                //alert ('Эта вкладка НЕ активна');
            /* Обрабатываем контролы */
            jQuery('.js-mobile_nav__controls__button').removeClass('active');
            jQuery(this).addClass('active');
            
            /* Обрабатываем вкладки */
            tabs_container.find('.js-mobile_nav__content__item').hide();
            tabs_container.find('.js-mobile_nav__content__item').removeClass('active');
            tab_active.show();
            tab_active.addClass('active');          
            
            }
            else{ // Закрываем
            /* Обрабатываем контролы */
            jQuery('.js-mobile_nav__controls__button').removeClass('active');
            /* Обрабатываем вкладки */
            tabs_container.find('.js-mobile_nav__content__item').hide();
            tabs_container.find('.js-mobile_nav__content__item').removeClass('active');     

            }

        });

    }
// });
