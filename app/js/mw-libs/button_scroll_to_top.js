/*
 * 6. Button Scroll To Top
 * ----------------------------------------------------------------- 
 */	

/*
Add scrolling to top on click on button ".scroll-top"
args: pointOffset - top screen offset [px] when button is visible 
 */

// jQuery(document).ready(function(){


    function buttonScrollToTop (pointOffset) {        // body... 

        var pointOffsetDefault = 200;
        pointOffset = pointOffset || pointOffsetDefault;

        jQuery(window).on("scroll", function() {
            var scroll_from_top = jQuery(document).scrollTop();
            //jQuery(".scroll-top").toggleClass("fixed", (scroll_from_top > 200));
                //jQuery(".scroll-top").fadeToggle( 300, (scroll_from_top > 200));
                
                if (scroll_from_top > 200) {
                    jQuery(".scroll-top").fadeIn(300);
                }
                else  {
                    jQuery(".scroll-top").fadeOut(300);
                }		

        });


        jQuery('.scroll-top').click(

        function() {
          jQuery('body,html').animate({
            scrollTop: 0
          }, 800);
          
        });

    }
// });
