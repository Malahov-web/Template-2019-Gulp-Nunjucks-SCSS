/*
 * 5. Trigger Show-Hide
 * ----------------------------------------------------------------- 
 */ 

/*
Имеет несколько варинатов анимации:
    slide
    fade
    show/hide
    CSS-class .active

задаются через аттрибут  [data-animation-effect=""]

Html:
<a href="#" class="yourCSSClass js-trigger" data-target="menu-top-outer" data-animation-effect="css">
</a>
 */

    function triggerShowHide() {

        var animationTemp;
        var animationTempDefault = 400;
        var animationEffect;
        var animationEffectDefault = 'slide';

        $('.js-trigger').on('click', function () {

            animationTemp = parseInt($(this).attr('data-animation-temp'));
            animationTemp = animationTemp || animationTempDefault;

            // animationEffect = toString($(this).attr('data-animation-effect'));
            animationEffect = $(this).attr('data-animation-effect');
            animationEffectDefault = animationEffect || animationEffectDefault;     

            var target_id = $(this).attr('data-target'); 

            // Переключение
            // $('#'+target+'').toggle(animationTemp);
            $(this).toggleClass('active');


            // toggle_fade(target_id);
            // toggle_slide(target_id);

            switch (animationEffect) {
                case "slide":
                    console.log("toggle_slide");
                    toggle_slide(target_id);
                    break;
                case "fade":
                    console.log("toggle_fade");
                    toggle_fade(target_id);
                    break;
                case "show":
                    console.log("show");
                    break;
                case "none":
                    console.log("none");
                    break;
                case "css":
                    console.log("css");
                    toggle_class(target_id);
                    break;                    
                default:
                    console.log("default");
                    
            }

        });


        function toggle_fade(target_el) {
            // $(target_el).fadeIn(animationTemp);
            console.log('toggle_fade() go');
            // $('#'+target_el+'').fadeIn(animationTemp);
            // $('#'+target_el+'').slideToggle(animationTemp);
            $('#'+target_el+'').fadeToggle(animationTemp);
            // $(this).toggleClass('active');
        }

        function toggle_slide(target_el) {
            console.log('toggle_slide() go');
            $('#'+target_el+'').slideToggle(animationTemp);
            // $(this).toggleClass('active');
        }

        function toggle_class(target_el) {
            $('#'+target_el+'').toggleClass('active');
        } 
        

    }


