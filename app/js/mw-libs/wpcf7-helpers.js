/*
 * . Дополнение к Contact Form 7
 * ----------------------------------------------------------------- 
 */ 
 
function wpcf7ResponseOutputClose() {

    jQuery('.wpcf7-response-output').click(function(){ 
        jQuery(this).fadeOut(400);
    
    });
        
    jQuery('.wpcf7-form-control').click(function(){ 
        // скрываем сообщение об обязательном заполнении
        jQuery(this).parent('.wpcf7-form-control-wrap').find('.wpcf7-not-valid-tip').fadeOut(300);
        // удаляем класс .wpcf7-not-valid поля
        jQuery(this).removeClass('wpcf7-not-valid');
    
    }); 

}    


// Custom specific code for adding values to hidden fields
function wpcf7AddHiddenFields() {

    // jQuery('.services .button-help').click(function(){ 


    //     // var serviceName = jQuery(this).val();
    //     var serviceName = jQuery(this).closest('.services__item-outer')
    //         .find('.services__item-flip-front .services__item-title')
    //         .text();
    //     // console.log('serviceName:' + serviceName);

    //     jQuery('#modal-order').find('[name=service_name]').val(serviceName);
    
    // });
    


}
