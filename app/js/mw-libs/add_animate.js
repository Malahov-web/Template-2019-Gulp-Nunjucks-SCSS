/*
 * Adding animation
 * ----------------------------------------------------------------- 
*/ 

/**
 * Adds animate.css classes to elements with ['data-animated'] attribute when page scrolled to element.
 *
 * @param      {<type>}  argument  The argument
 * @return     {number}  { description_of_the_return_value }
 */


function addAnimate(argument) {

    var elementsObject = [];

    var viewportHeight = getViewportHeight(); //alert(viewportHeight);

    function getViewportHeight(argument) {

        // $(window).resize(function() {

            viewportHeight = $(document).height(); // Высота всего документа)
            viewportHeight = $(window).height(); // Высота viewporta браузера

        // });        

        // console.log(viewportHeight);
        return viewportHeight;
    }    


    // $('[data-animated]').hide();

    $('[data-animated]').each(function(index, el) {


        var item = $(el);

        // v2
        var itemClassName = item.attr('class');  //alert(itemClassName);
        var itemAnimateClass = item.attr('data-animated');

        // v3
        // elementsObject[itemClassName] = {
        elementsObject[index] = {
            'offset': item.offset().top,
            'animateClass': itemAnimateClass,
            'elementClass': itemClassName
        };


        console.log(elementsObject);

        // TEST: add classes before scroll
        // Reason: in chrome android - we can see what element in first second is on his
        // own place, and after it animated start

        // $(el).addClass(elementsObject[index].animateClass);
        // $(el).addClass(elementsObject[index].animateClass + ' animated ');
        
        // added in Quartz
        // $(el).css("opacity", "0"); 
    });




    $(document).scroll( function (event) {

        var pageScroll = $('html').scrollTop();  //alert(pageScroll); //+

        $('[data-animated]').each(function(index, el) {
        // alert(index); // +

            if ( pageScroll  >= (elementsObject[index].offset - viewportHeight)) {
            // alert('прокрутили'); // +

                //TEST
                $(el).addClass(elementsObject[index].animateClass + ' animated ');
                // $(el).addClass( ' animated ');
            }
   

        }); 
    });



}


