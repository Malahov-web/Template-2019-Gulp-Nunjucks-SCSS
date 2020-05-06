/*
 * 2. Меню скролла боковое
 * ----------------------------------------------------------------- 
 */ 




    // menuSideScroll();

    function menuSideScroll(argument) {

        var mssMenu = $('.mss-menu');
        var menuItems = {};
        var viewportHeight = 0;
        var activeEl = '';
        var animationTemp = 1000;

        getViewportHeight();

        setSectionsObject();

        // addDecorLine();


        // 1. Click
        mssMenu.find('a').on('click', function(event ) {

            // event.preventDefault();

            var targetElId = getTarget($(this));
            var targetEl = $('#' + targetElId + ''); // alert(targetEl.attr('id'));

            scrollToSection(targetEl);

            // stylizeMenu(targetElId); // НЕ нужно, т.к. эта ф-я сработает при запуске прокрутки


            // console.log( _getActiveElement(); );
            // activeEl = _getActiveElement();
            // // console.log('activeEl: '+ activeEl.position().top);

            // moveDecorLine(activeEl.position().top);

        });

        // 2. Scroll
        $(document).scroll( function (event) {

            // console.log('scroll');

            var pageScroll = $('html').scrollTop();  //alert(pageScroll); //+
   
            setTimeout(
                checkScroll(pageScroll),
                0
            );

        });
        

        function setSectionsObject(argument) {            

            // mssMenu.find('a').each( function (index, el) {
           $('[data-mss-setion]').each( function (index, el) {

                // alert($(el).attr('id'));

                // alert(el.attr('href'));            // alert($(el).attr('href'));
                var item = $(el); console.log(item);
                // var itemId = _getIdFromHref(item);
                var itemId = item.attr('id');

                menuItems[itemId] = item.offset().top;
                // console.log(menuItems);
            });

        } 


        function getViewportHeight(argument) {


            // $(window).resize(function() {

                viewportHeight = $(document).height(); // Высота всего документа)
                viewportHeight = $(window).height(); // Высота viewporta браузера

            // });
            

            // console.log(viewportHeight);
            return viewportHeight;
        }


        function checkScroll(pageScroll) {


            $(window).resize(function() {
                getViewportHeight();
            });

           
            for (menuItem in menuItems) {
                // console.log(menuItem);

                if ( pageScroll >= ( Math.floor(menuItems[menuItem]) - 1/2*viewportHeight) ) {
                    // console.log('Прокрутили до ' + menuItem);

                    stylizeMenu(menuItem);

                    // activeEl = _getActiveElement();
                    // console.log('activeEl: '+ activeEl.position().top);
                    // moveDecorLine(activeEl.position().top);                    
                }
            }

        }


        function getTarget(element) {

            // var targetEl = element.attr('data-mss-setion');
            var targetElId = element.attr('href');
            var targetElId = targetElId.slice(1);
            // var targetElId = _getIdFromHref(element);
            console.log(targetElId);

            return targetElId;

        }


        function scrollToSection(targetEl) {

            $('html').animate({
                scrollTop: targetEl.offset().top
            }, animationTemp);

        }


        function stylizeMenu(targetElId) {

            mssMenu.find('a').removeClass('active');
            mssMenu.find('[href="#' + targetElId + '"]').addClass('active');
        }


        function _getIdFromHref(el) {

            var IdFromHref = el.attr('href').slice(1);

            return IdFromHref;   
        }

        // tarogrand extend

        function _getActiveElement () {
            var activeEl = mssMenu.find('a.active');

            return activeEl;
        }

        // function _getActiveElementPositionTop () {
        //     activeEl  = _getActiveElement();

        //     return activeEl;
        // }

        function addDecorLine() {

            // _getActiveEl
            var activeEl = mssMenu.find('a.active');

            // _getActiveElCoords
            // activeElOffset = activeEl.offset();            
            var activeElPosition = activeEl.position();
            // activeElOffset.top
            // console.log('activeElOffset.top: ' + activeElOffset.top);
            console.log('activeElPosition.top: ' + activeElPosition.top);

            // _createDecorLine
            mssMenu.find('a.active').append('<span class="mss-decor-line"></span>');
            // activeEl.append('<span class="mss-decor-line"></span>');
        }

        function moveDecorLine(activeElPositionTop) {

            console.log('activeElPositionTop: ' + activeElPositionTop)    ;
            $('.mss-decor-line').animate({
                top: activeElPositionTop
            }, 1000);  

            // $('.mss-decor-line').css('top', activeElPositionTop);

        }

    }

// $( window ).resize(function() {

//     $( "body" ).prepend( "<div>" + $( window ).width() + "</div>" );
// });