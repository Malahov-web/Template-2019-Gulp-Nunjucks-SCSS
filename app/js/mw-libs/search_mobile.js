/*
 * 5. Search
 * ----------------------------------------------------------------- 
 */ 

/*
Move  block ".search" to ".search-modal .container"
and animate open/close
on click on ".search-trigger" button
*/

    // searchMobile();

    function searchMobile() {

        var search_modal = $('.search-modal');
        var search = $('.search');

        $('.search-trigger').each(function() {

            $(this).click(function(){           
     
                search_modal.slideDown();
                search_modal.find('.container').prepend(search);
                search_modal.addClass('active');
                search.show();
            });

        });

        $('.search-modal-close').each(function() {

            $(this).click(function(){
             
                // search_modal.slideUp();                        
                search_modal.hide();                        
                search_modal.find('.search-trigger').parent().append(search);
                search_modal.removeClass('active'); 
                // search.hide();
            });

        });  

    }

