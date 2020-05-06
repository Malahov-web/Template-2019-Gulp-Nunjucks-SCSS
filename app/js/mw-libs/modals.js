
/*
 * . Modal показать/скрыть 
 * ----------------------------------------------------------------- 
 */	

 // jQuery(document).ready(function() {


 	function modals(argument) {		


		$('.js-modal-open').click(function( event ) {
			event.preventDefault();

		});

		// var overlay = $('.overlay');
		var overlay = $('#overlay');

		$('.js-modal-open').on( 'click', function(){ 
	  
			var target_id = $(this).attr('data-target'); 
			
			overlay.fadeIn(600);
			
			// $('#'+target_id+'').slideDown(600);
			$('#'+target_id+'').fadeIn(800);

// alert(target_id);	
// console.log('target_id: ' + target_id);		
// console.log('overlay: ' + overlay);		
			
		});
		
		
		jQuery('.js-modal-close').on( 'click', function(){ 
	  
			target_id = jQuery(this).attr('data-target'); 
			overlay.fadeOut(600);
			//jQuery('#'+target_id+':visible').slideUp(600);	
			// jQuery(this).closest('.js-modal').slideUp(600);
			jQuery(this).closest('.js-modal').fadeOut(800);
			
		});	
		
		
		// Скрываем
		// jQuery(document).mouseup(function (e){ // событие клика по веб-документу

		overlay.on( 'click', function(e){ 
		
			var modal = overlay.find('.js-modal'); // тут указываем ID элемента
			if (!modal.is(e.target) && modal.has(e.target).length === 0) { // если клик был не по нашему блоку // и не по его дочерним элементам
			
				//div.hide(); // скрываем его 					
				overlay.fadeOut(600);	
				modal.fadeOut(800);				
			}
			
		}); 
		



 	}
  
// });