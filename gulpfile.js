/*
 * 1. Requires
 * 2. Config 
 * 3. Tasks 
 * 4. Calls 
*/

// 1. Requires 


const gulp = require('gulp');

const   uglify = require('gulp-uglify');  // Подключаем Uglify

const   sass = require('gulp-sass');  // Подключаем Sass пакет  
    
// const   browserSync = require('browser-sync');  // Подключаем Browser Sync
    
const   concat = require('gulp-concat'); // Подключаем  Gulp Concat
    
const   sourcemaps = require('gulp-sourcemaps');  // Подключаем Gulp Sourcemaps  ( создает карту, чтобы в инспекторе браузера показывать строку стиля в sass-файле   )
    
const   glob = require('glob');

const   plumber = require('gulp-plumber');  // Преодхраняет остановку задачи из-за ошибки
    
const   autoprefixer = require('gulp-autoprefixer');

const iconfont = require('gulp-iconfont');

const runTimestamp = Math.round(Date.now()/1000); 

const async = require('async');

const consolidate = require('gulp-consolidate');

const svgmin = require('gulp-svgmin');

const rename = require('gulp-rename');

const del = require('del'); // Подключаем библиотеку для удаления файлов и папок

const cleanCSS = require('gulp-clean-css');

const imagemin = require('gulp-imagemin');

// 16.07
const bs = require('browser-sync').create();  // Подключаем Browser Sync

const notify = require("gulp-notify");  // Выводит сообщения

const debug = require("gulp-debug");

const gulpif = require('gulp-if');

const infoData = require('./app/data/data.json');

// const compile_handlebars = require('gulp-compile-handlebars');

// const handlebarsHelpers = require('./app/templates_hbs/helpers.js');

const nunjucksRender = require('gulp-nunjucks-render');  

    


// 2. Config 

// paths
const path = 'app/';
const path_libs = path + 'libs/';

// settings
const autoprefixerOptions = {
  browsers: ['last 10 versions', 'IE 10', 'IE 11']
};   
// assets
const fontName = 'ukresultflaticons';

const js_jquery = path_libs + '/jquery/dist/jquery.min.js';
const js_owl = path_libs + '/owl.carousel/dist/owl.carousel.min.js';
const js_fancybox = path_libs + '/fancybox/dist/jquery.fancybox.min.js';
const js_selectric = path_libs + '/jquery-selectric/public/jquery.selectric.min.js';   
const js_maskedinput = path_libs + '/jquery.maskedinput/dist/jquery.maskedinput.min.js';   



// 3. Tasks  
    /*
     * 3.1 scss  // SCSS - компиляция
     * 3.2 bs-serve  // Static Server + watching scss/html files
     * 3.3 Svgmin  // Svgmin - оптимизация svg
     * 3.4 Iconfont  // генерация шрифта
     * 3.5 svgSprite  // 
     * 3.6 js  // JS - сборка
     * 3.7 clean  // Clean - очистка директории для build
     * 3.8 html  // HTML - компиляция 
     *   3.8.1  Mustache/Handlebars - компиляция в HTML 
     *   3.8.2  nunjucksRender - компиляция в HTML 
    */

    // // 3.1  SCSS - компиляция
    // gulp.task('scss', function(){ // Создаем таск "scss"        
    //     return gulp.src('app/sass/**/*.scss')

    //     .pipe(sourcemaps.init())
    //     .pipe(plumber())
    //     // .pipe(postcss(processors, {syntax: syntax_scss}))
    //     .pipe(sass()) // Преобразуем scss в CSS посредством gulp-sass
    //     // .pipe(sass().on('error', sass.logError))
    //     .pipe(autoprefixer())
    //     .pipe(sourcemaps.write())
        
    //     .pipe(gulp.dest('app/css')) 
    //     .pipe(browserSync.reload({stream: true}))
    // }); 

    // 3.1  SCSS - компиляция  // UKResult demo // v. new
    gulp.task('scss', function(){ // Создаем таск "scss"        
        return gulp.src('app/sass/**/*.scss')

        // .pipe(debug({title: 'SRC'}))
        .pipe(sourcemaps.init())
        .pipe(plumber( {  
            errorHandler: notify.onError()
        } ))
        // .pipe(postcss(processors, {syntax: syntax_scss}))  // Lint
        // .pipe(
        //     gulpif(
        //         function (file) {
        //             return (file.relative === 'style.scss')                   
        //         },
        //         postcss(processors, {syntax: syntax_scss})
        //     )  
        // )
        .pipe(sass()) // Преобразуем scss в CSS посредством gulp-sass
        .pipe(debug({title: 'SASS'}))
        .pipe(autoprefixer())
        .pipe(debug({title: 'AUTOPREFIXER'}))
        .pipe(sourcemaps.write())      // .pipe(sourcemaps.write('.')) // ('.') - Выводит в отдельный файл
        
        .pipe(gulp.dest('app/css')) 
        .pipe(debug({title: 'DEST'}))
        .pipe(bs.stream());
    }); 


    // 3.2  Static Server + autoreloading  // v. new
    gulp.task('bs-serve', function() {

        bs.init({
            server: "./app"
        });

        // gulp.watch("app/scss/*.scss", ['sass']);
        // gulp.watch("app/*.html").on('change', browserSync.reload);
    });    
    
    
    // 3.3  Svgmin - оптимизация svg
    gulp.task('Svgmin', function () {
        return gulp.src('app/images/svg-icons/*')
            .pipe(svgmin({
                plugins: [
                    { removeDimensions: true },
                    { cleanupListOfValues: true },
                    { cleanupNumericValues: true }
                ]
            }))
            .pipe(rename(function (path) {
                path.basename = path.basename.replace(/\ /g, "")
            }))
            .pipe(gulp.dest('app/images/svg-min'));
    });


    // 3.4  Iconfont - генерация шрифта
    gulp.task('Iconfont', function (done) {
        const iconStream = gulp.src(['app/images/svg-min/*.svg'])
            .pipe(iconfont({
                fontName: fontName,
                formats: ['ttf', 'eot', 'woff', 'svg', 'woff2'],
                fixedWidth: true,
                centerHorizontally: true,
            }));
        async.parallel([
            function handleGlyphs(cb) {
                iconStream.on('glyphs', function (glyphs, options) {
                    // gulp.src('app/images/svgfontstyle/css.css')
                    gulp.src('app/images/svgfontstyle/svgfontstyle.scss')
                        .pipe(consolidate('lodash', {
                            glyphs: glyphs,
                            fontName: fontName,
                            fontPath: '../fonts/',
                            className: fontName,

                        }))
                        // .pipe(gulp.dest('app/css/'))
                        .pipe(gulp.dest('app/sass/'))
                        .on('finish', cb);
                });
            },
            function handleFonts(cb) {
                iconStream
                    .pipe(gulp.dest('app/fonts/'+fontName+'/'))
                    .on('finish', cb);
            }
        ], done);
    }); 


    // // JS - сборка
    // gulp.task('js', function() {
    //   return  gulp.src(
    //     [
    //         js_owl,
    //         js_selectric,
    //         'app/js/*.js'

    //         //, 'app/js/menu-responsive/js/menu-responsive.js'
    //     ]
    //     )
    //     .pipe(concat('scripts.js'))
    //     .pipe(uglify())
    //     .pipe(rename('scripts.min.js'))
    //     .pipe(gulp.dest('app/js/min/'));
    // });
    // 3.6  JS - сборка
    gulp.task('js', function() {
      return  gulp.src(
        [
            js_jquery,
            js_owl,
            js_fancybox,
            js_selectric,
            js_maskedinput,
            'app/js/*.js'
        ]
        )
        .pipe(concat('scripts.js'))
        // .pipe(uglify())
        .pipe(rename('scripts.min.js'))
        .pipe(gulp.dest('app/js/min/'));
    });     


    // Lint - stylelint
    const stylelint = require('stylelint');
    const postcss = require('gulp-postcss');
    const messages = require('postcss-browser-reporter');
    const syntax_scss = require('postcss-scss');

    const processors = [
        stylelint({
            reporters: [
                {formatter: 'string', console: true}
            ]
            // ,fix: true
        }),
        messages({
            selector: 'body:before'
        })
    ];

    // 3.7  Clean - очистка директории /dist
    gulp.task('clean', function() {
        return del.sync('dist'); // Удаляем папку dist перед сборкой
    });




    // 3.8.2  NunjucksRender - 
    // Nunjucks.js
    var nunjucksOptions = {
        path: ['app/view/'],
        data: infoData
        // data: {
        //     "mytitle": "TechnicA",
        //     "items": [
        //         { "itemTitle": "foo", id: 1 }, 
        //         { "itemTitle": "bar", id: 2}
        //     ],

        //     "news": [
        //         { 
        //             "item-title": "Going Green Is So Much Simpler Than Most People", 
        //             "item-image": "news-item-img-1.jpg",
        //             "item-date": "05.02.2019",
        //             "item-datetime": "2019-02-05",
        //             "item-text": "Создание приверженного покупателя усиливает охват аудитории, не считаясь с затратами",
        //             "item-text-long": "Нередки ситуации, когда заемщик обращается в банк за получением кредитной карты и ему выдают заветный пластик всего за 5 минут. Сотрудник кредитного учреждения предлагает заполнить короткую анкету, подписать ее, делает ксерокопию паспорта и выдает карту с ПИН-конвертом, в котором указывает код для доступа к средствам. ",
        //             "item-link": "#"
        //         },
        //         { 
        //             "item-title": "IT-компаниям могут предоставить налоговые льготы", 
        //             "item-image": "news-item-img-2.jpg",
        //             "item-date": "05.03.2019",
        //             "item-datetime": "2019-03-05",
        //             "item-text": "В Госдуме обсудили меры поддержки производителей отечественного программного обеспечения.",
        //             "item-text-long": "Как сообщает пресс-служба Госдумы, в частности, производители программного обеспечения говорили о высоком налоговом бремени и просили законодателей внести изменения в действующее законодательство – снизить для специализирующихся в этой сфере компаний НДС и налог на прибыль. ",
        //             "item-link": "#"
        //         }                       

        //     ]   
        // }
    };

    gulp.task('nunjucksRender', function () {

        // return gulp.src('src/templates/*.html')
        return gulp.src('app/view/*.html')

            .pipe(nunjucksRender(nunjucksOptions))
            
            .pipe(gulp.dest('app/'))
            .pipe(bs.stream());             
    });




// 4. Calls


// gulp.task('watch', ['browser-sync', 'scss'], function() {
gulp.task('watch', ['bs-serve', 'scss', 'nunjucksRender'], function() {

    // gulp.watch('app/sass/**/*.+(scss|scss)', [ 'scss']);

    // gulp.watch('app/sass/**/*.+(scss|scss)', [ 'scss', 'html']);  // будут выполнятся обе задачи []
    gulp.watch('app/sass/**/*.+(scss|scss)', [ 'scss']);     
    gulp.watch(['app/view/**/*.html', 'app/data/**/*.json'], [ 'nunjucksRender']);     
});





// gulp.task('watchjs', ['browser-sync', 'js'], function() {
gulp.task('watchjs', ['bs-serve', 'js'], function() {

    gulp.watch('app/js/*.js', ['js']);
    gulp.watch('app/templates_hbs/**/*.hbs', [ 'html']); 
}); 


gulp.task('makesvgfont', ['Svgmin', 'Iconfont']);

gulp.task('build', ['clean'],  function () {

    gulp.src('app/*.html')
        .pipe(gulp.dest('dist'))        

    gulp.src('app/css/**/*.css')
        .pipe(cleanCSS({compatibility: 'ie10'}))
        // .pipe(rename({suffix: '.min'}))  // TODO: Не забыть изменить путь подключаемого файла в html
        .pipe(gulp.dest('dist/css'))

    gulp.src('app/js/min/scripts.min.js')
        .pipe(uglify())    
        .pipe(gulp.dest('dist/js/min'))

    gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))

    gulp.src('app/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))

    gulp.src('app/uploads/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/uploads'))    
    
});

gulp.task('default', ['watch']);

