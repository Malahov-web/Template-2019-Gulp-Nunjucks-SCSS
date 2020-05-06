/*
 *  3. Фильтр - портфолио 
 * ----------------------------------------------------------------- 
 */
 
/* Описание
  
структура html:
js-filter
  js-filter_control
    js-filter_control_button[data-filter-work_performance]
  js-filter_content
    js-filter_content_item[data-work_performance]
   
 
*/
 
 // jQuery(document).ready(function(){


    function mwFilter (argument) {
         // body... 


        //jQuery('.js-filter_control').find('.js-filter_control_button:not(.active)').click(function(e){ 
        jQuery('.js-filter_control').find('.js-filter_control_button').click(function(e){ 
            
            // Получаем значение фильтра
            filter_value = jQuery(this).attr('data-filter-work_performance'); //alert(filter_value);
            // Контейнер этого блока
            filter_container = jQuery(this).closest('.js-filter');

            /* Обрабатываем контролы */
            filter_container.find('.js-filter_control_button').removeClass('active');
            jQuery(this).addClass('active');
            
            // Находим элементы с соответствующим значением фильтра
            

            
            //elements = jQuery('[data-work_performance='+filter_value+']');
            //elements = jQuery(':not([data-work_performance='+filter_value+'])');
            elements_hide = filter_container.find('.js-filter_content_item:not([data-work_performance='+filter_value+'])');
            elements_hide.hide();       //elements_hide.fadeOut(800);
            
            
            elements_show = filter_container.find('[data-work_performance='+filter_value+']');      
            // Сборс фильтра - варант "Все"
            if ( filter_value == 'all' ){
                //elements_show = filter_container.find('[data-work_performance]');     
                elements_show = filter_container.find('.js-filter_content_item');       
            }
            //alert(elements_show.lenght());
            elements_show.show();       //elements_show.fadeIn(800);    


        });
 
    } 


// });