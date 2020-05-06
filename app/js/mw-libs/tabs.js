/*
 *  1. Вкладки-табы
 * ----------------------------------------------------------------- 
*/


	function tabs(argument) {

		var temp = 400;
        var animationTempDefault = 400;

		// Скрываем контент вкладок
		// $('.js-tabs__content-item:not(active)').hide();
		$('.js-tabs__controls').find('a').click(function(e) {
			e.preventDefault();
		});


		$('.js-tabs__controls').find('[data-target]').on('click', function(){

			var tabs = 	$(this).closest('.js-tabs');
			var target = $(this).attr('data-target');

            // animationTemp = parseInt($(this).closest('.js-tabs').attr('data-animation-temp'));
            // animationTemp = animationTemp || animationTempDefault;

            $(this).closest('.js-tabs__controls').find('[data-target]').removeClass('active');
            $(this).addClass('active');

            // tabs.find(target).addClass('active');

            tabs.find('.js-tabs__content-item').removeClass('active');
            tabs.find(target).addClass('active');


            // alert($(target).attr('id'));

		});

	}


