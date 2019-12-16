
// helpers.js
// var handlebars  = require('handlebars');
// var handlebars = require('gulp-compile-handlebars');

// var compile_handlebars = require('gulp-compile-handlebars');
// var handlebars = require('gulp-compile-handlebars');



/*
module.exports = {

    // var handlebars = require('gulp-compile-handlebars');

    handlebars.registerHelper('upper', function(str){
       return str.toUpperCase();
    });


    handlebars.registerHelper('capitals', function(str){

        // alert(4);
        return '12345';
    });


    handlebars.registerHelper('fullName', function(news) {

        alert('fullName');
        // return person.firstName + " " + person.lastName;
        return;

    });


    handlebars.registerHelper('services_class_helper', function(index) {

            var realIndex = index + 1;
            var itemCSSClass = 'mv_12 tb_6 tb_offset_2 ds_4 ds_offset_0';
            if ( realIndex % 3 == 1) {
                itemCSSClass = 'mv_12 tb_6 tb_offset_1 ds_4 ds_offset_0';
            }

            return itemCSSClass;                
    });

    handlebars.registerHelper('offers_class_helper', function(index) {

            var realIndex = index + 1;
            var itemCSSClass = 'mv_24 tb_10 tb_offset_1 ds_6 ds_offset_0';
            if ( realIndex % 2 == 0) {
                itemCSSClass = 'mv_24 tb_10 tb_offset_2 ds_6 ds_offset_0';
            }            

            return itemCSSClass;                
    }); 


}
*/
// module.exports = handlebars;




const helpers = {

            capitals : function capitalsFunction (str){
                return str.toUpperCase();
                // return "12345";
            },
            services_class_helper : function services_class_helperFunction(index) {

                var realIndex = index + 1;
                var itemCSSClass = 'mv_12 tb_6 tb_offset_2 ds_4 ds_offset_0';
                if ( realIndex % 3 == 1) {
                    itemCSSClass = 'mv_12 tb_6 tb_offset_1 ds_4 ds_offset_0';
                }

                return itemCSSClass;                
            },
            offers_class_helper : function offers_class_helperFunction (index) {

                var realIndex = index + 1;
                var itemCSSClass = 'mv_24 tb_10 tb_offset_1 ds_6 ds_offset_0';
                if ( realIndex % 2 == 0) {
                    itemCSSClass = 'mv_24 tb_10 tb_offset_2 ds_6 ds_offset_0';
                }            

                return itemCSSClass;                
            }            

        }


module.exports = helpers;


