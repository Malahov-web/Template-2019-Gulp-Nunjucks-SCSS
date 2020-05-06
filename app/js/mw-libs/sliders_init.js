/*
 * . Sliders
 * ----------------------------------------------------------------- 
 */ 

/*
Tempaltes for:

   1. Owl-carousel
   2. Swiper
   3. Slick
   
 */

/**
 * Init sliders plugins
 *
 * @param      {<type>}  argument  The argument
 * @return     {number}  { description_of_the_return_value }
 */

    function slidersInit() {


        // 1. Owl-carousel
        // Advantages
        $('.advantages').addClass('owl-carousel');

        $('.advantages.owl-carousel').owlCarousel({
            loop:true, //Зацикливаем слайдер
            margin: 0, //Отступ от картино если выводите больше 1
            // // nav:false, //Отключил навигацию
            nav:true, //Включили навигацию
            // navText: "next", //Включили навигацию
            // navText: ["Текст"],
            // navText: ["<img src='myprevimage.png' alt='left'>","<img src='mynextimage.png'>"] // Ошибка UglifyJS
            dots: true, //Включили навигацию
            // autoplay:true, //Автозапуск слайдера
            smartSpeed:1000, //Время движения слайда
            // autoplayTimeout:3000, //Время смены слайда

            mouseDrag : true,
            navSpeed : 1200,
            dotsSpeed : 1200,
            autoplaySpeed : 1200,            
          
            responsive:{ //Адаптация в зависимости от разрешения экрана
                0:{
                    items:1
                },
                576:{
                    items:1
                },            
                768:{
                    items:2
                },
                1024:{
                    items:3
                }
            }
        });

        // Add custom buttons (in specific place in template)
        // 
        // jQuery('.categories__slider-arrows .prev').on('click', function () {
        //     jQuery('.categories.owl-carousel .owl-prev').click();
        // });

        // jQuery('.categories__slider-arrows .next').on('click', function () {
        //     jQuery('.categories.owl-carousel .owl-next').click();
        // });
        // 
        // Reviews
        $('.reviews').addClass('owl-carousel');

        $('.reviews.owl-carousel').owlCarousel({
            loop:true, //Зацикливаем слайдер
            margin: 0, //Отступ от картино если выводите больше 1
            nav:true, //Включили навигацию
            // navText: "next", //Включили навигацию
            // navText: ["Текст"],
            // navText: ["<img src='myprevimage.png' alt='left'>","<img src='mynextimage.png'>"] // Ошибка UglifyJS
            dots: true, //Включили навигацию
            // autoplay:true, //Автозапуск слайдера
            smartSpeed:1000, //Время движения слайда
            // autoplayTimeout:3000, //Время смены слайда

            mouseDrag : true,
            navSpeed : 1200,
            dotsSpeed : 1200,
            autoplaySpeed : 1200,            
          
            responsive:{ //Адаптация в зависимости от разрешения экрана
                0:{
                    items:1
                },
                576:{
                    items:1
                },            
                768:{
                    items:2
                },
                1024:{
                    items:3
                }
            }
        });


        // 2. Swiper
        // Reviews Slider
        var reviewsSlider = new Swiper ('.slider-reviews.swiper-container', {
            centeredSlides: true,
            slidesPerView: 1,
            spaceBetween: 0,            
            // slidesPerView: 3,
            // spaceBetween: 30,
            // direction: 'horizontal',
            loop: true,
            autoplay: false,
            speed: 1000,
            // pagination: {
            //     el: '.swiper-pagination',
            //     type: 'bullets',
            // },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },            
            navigation: {
                nextEl: '.slider-reviews .swiper-button-next',
                prevEl: '.slider-reviews .swiper-button-prev',
            },  

            // Responsive breakpoints
            breakpoints: {
                // when window width is >= 576
                576: {
                    slidesPerView: 2
                },
                // when window width is >= 768
                768: {
                    slidesPerView: 2
                },
                // when window width is >= 1440
                1440: {
                    slidesPerView: 3
                }
            }
        });        

        // Add custom buttons (in specific place in template?)
        // 
        // jQuery('.reviews__slider-buttons .button-slider-arrow.prev').on('click', function (event) {
        //     event.preventDefault();
        //     jQuery('.slider-reviews .swiper-button-prev').click();
        // });

        // jQuery('.reviews__slider-buttons .button-slider-arrow.next').on('click', function () {
        //     event.preventDefault();
        //     jQuery('.slider-reviews .swiper-button-next').click();
        // }); 
        

        // 3. Slick
        // function productfullSliderInit() {


            // $('.productfull__slider-inner').slick({

            //     prevArrow: '<button type="button" class="slick-prev"></button>',
            //     nextArrow: '<button type="button" class="slick-next"></button>',

            // });  

            // $('.productfull__gallery-inner').slick({
            //         arrows: true,
            //         dots: false,
            //         vertical: true,
            //         slidesToShow: 3,
            //         slidesToScroll: 3,
            //         verticalSwiping: true,
            // });  


             $('.roomcard__slider').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                fade: true,
                dots: true,
                asNavFor: '.roomcard__gallery'
            });

        // }

        // function productfullGalleryInit() {
            $('.roomcard__gallery').slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                asNavFor: '.roomcard__slider',
                dots: true,
                // centerMode: true,
                focusOnSelect: true,

                arrows: false,  
                dots: false,
                vertical: true, 
                verticalSwiping: true,              
            });  
        // }  

    }

