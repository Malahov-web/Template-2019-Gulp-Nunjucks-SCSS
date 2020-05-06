/*
 * 4. Menu Responsive
 * ----------------------------------------------------------------- 
 */ 


/*
Menu must have attr [data-js="menu-responsive"]
Script add last item and create dropdown menu with class ".dropdown"
when item width more than container and when page resizing

 */



    function menuResponsive() {

            var menu = jQuery('[data-js="menu-responsive"]');
            var menuWidth = menu.width(); // innerWidth

            var itemsInMenu;
            var itemsInDD;
            var itemsInMenuWidth = 0;


            // 1.
            var dD = createDD();
            var dDWidth = dD.innerWidth();
            var dDList = dD.children('ul');
            var dDListWidth = dDList.innerWidth();


            // 2.
            checkWidth();

            $( window ).on('resize', function() {

                setTimeout(checkWidth, 100 );
            });    


            function checkWidth(argument) {

                checkMenuWidth();

                itemsInMenuWidth = 0;

                // Считаем суммарную ширину
                menu.children('li').each(function() {
                    // console.log(this);
                    itemsInMenuWidth = itemsInMenuWidth + $(this).innerWidth();
                });

                if ( itemsInMenuWidth + dDWidth > menuWidth ) {

                    moveItemToDD();
                    showDD();

                    checkWidth();
                } 
            } 


            function checkMenuWidth(argument) {

                menuWidth = menu.width();
                dDListWidth = dDList.innerWidth();
            }


            function moveItemToDD (argument) {
                
                dDList.prepend(menu.children('li:last'));
            }


            function createDD (argument) {

                var hasDD =  menu.find('.dropdown');

                menu.append('<div class="dropdown" style=\"\"><ul class="dropdown__list js-dropdown_list"></ul></div>');   //append( $( "h2" ) ) .append( "<p>Test</p>" );  
                return  menu.find('.dropdown');
            }


            function showDD (argument) {

                dD.addClass('visible');
            }

    }

// });

