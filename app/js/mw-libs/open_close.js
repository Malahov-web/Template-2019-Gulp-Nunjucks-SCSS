/*
 * 5. openClose
 * ----------------------------------------------------------------- 
 */ 

/*
2 синхронизированных кнопки для открытия/закрытия элемента

Html:
<div class="menu-top-trigger js-open" data-target="menu-top-outer" data-animation-effect="css">
</div>

<a href="#" class="menu-top-close js-close" data-target="menu-top-outer" data-animation-effect="css">
</a>


 */

    function openClose() {

        var animationTemp;
        var animationTempDefault = 400;
        var animationEffect;
        var animationEffectDefault = 'slide';

        $('.js-open').on('click', function () {

            animationTemp = parseInt($(this).attr('data-animation-temp'));
            animationTemp = animationTemp || animationTempDefault;
            animationEffect = $(this).attr('data-animation-effect');
            animationEffectDefault = animationEffect || animationEffectDefault;     

            var target_id = $(this).attr('data-target');             

            $(this).addClass('active');

            $('.js-close[data-target=' + target_id +']').removeClass('active');

            $('#'+target_id+'').addClass('active');


        });

        $('.js-close').on('click', function () {

            animationTemp = parseInt($(this).attr('data-animation-temp'));
            animationTemp = animationTemp || animationTempDefault;
            animationEffect = $(this).attr('data-animation-effect');
            animationEffectDefault = animationEffect || animationEffectDefault;     

            var target_id = $(this).attr('data-target');             


            $(this).addClass('active'); // добавили  класс  самой кнопки

            $('.js-open[data-target=' + target_id +']').removeClass('active'); // удалили с обратной кнопки

            $('#'+target_id+'').removeClass('active'); // с целевого элемента


        });
 


    }