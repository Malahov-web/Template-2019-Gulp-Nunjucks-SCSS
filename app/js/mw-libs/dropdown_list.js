/*
 *  2. Левое Меню
 * ----------------------------------------------------------------- 
 */
 
 // jQuery(document).ready(function(){


 	function dropdownList(argument) {

 	
		$('.js-dropdown_list LI UL').hide();	

		$('.js-dropdown_list LI').has('UL').addClass('menu-item-has-children');
		$('.menu-item-has-children > a')
			.click(function( event ) {
				event.preventDefault();
			});
		

	  
	    $('.js-dropdown_list LI').click(function (e) {
		
			// Закрываем все другие, кроме нажатого
			$(this).siblings('LI').children('UL:visible').slideUp(400); 		
			child_menu =  $(this).children('ul');

			if ( !child_menu.is(e.target)  &&  child_menu.has(e.target).length === 0 ) {
			
				current_item = $(this);

				if ( current_item.children('ul') ) {
					// Если они закрыты		
					if ( !(current_item.children('ul').is(':visible'))  ) {
						current_item.children('ul').slideDown(400);
						current_item.addClass('open_item');
					}
					// Если они открыты
					else { 
						if ( current_item.children('ul').is(':visible') ) { 
							current_item.children('ul').slideUp(400); 
							current_item.removeClass('open_item');
						}
					}		  
				}
			}
	    }); 

 	}	


// });