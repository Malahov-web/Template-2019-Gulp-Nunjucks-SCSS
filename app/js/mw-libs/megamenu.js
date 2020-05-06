/*
 * 3. Megamenu
 * ----------------------------------------------------------------- 
 */ 

/*
Add images to submenu items
Megamenu items must hava attr [data-image-url]
*/

    // megaMenu();

    function megaMenu(argument) {

        var megamenu = $('.megamenu');
        var imageTemplate = '<span class="submenu__item-image"><img src="images/product-cap.jpg"></span>';
        var itemsWithImages = megamenu.find('[data-image-url]');
        // console.log(itemsWithImages);

        itemsWithImages.each( function() {

            currentItemImageSrc = $(this).attr('data-image-url');
            $(this).append(imageTemplate);
            $(this).find('img').attr('src', currentItemImageSrc);

        });
    }
