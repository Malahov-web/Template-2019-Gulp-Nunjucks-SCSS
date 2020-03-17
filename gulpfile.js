// Gulpfile for Gulp v.4
/*
 * 1. Requires
 * 2. Config 
 * 3. Tasks 
 * 4. Calls 
 * 5. Utilites 
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

const data = require('gulp-data');

const fs = require('fs');

const pngquant = require('imagemin-pngquant');

// const rename = require('rename');

// const pug = require('gulp-pug');


// 2. Config 

// paths
const path_base = 'app/';
const path_libs = path_base + 'libs/';
const path_view_styles = 'app/view/**/*.+(scss|scss)';
const path_view_js     = 'app/view/**/*.+(js|js)';


// Updt: прим.: переписали пути в all:build
// /* пути к исходным файлам (src), к готовым файлам (build), а также к тем, за изменениями которых нужно наблюдать (watch) */
// // пути к исходным файлам (watch), к готовым (скомпилированным) файлам (src), и файлам в сборке (build)

let path = {

    watch: {
        html:    'app/view/**/*.html',
        js:      'app/js/**/*.js',
        css:     'app/sass/**/*.scss',
        img:     'app/images/**/*.*',
        uploads: 'app/uploads/**/*.*',
        fonts:   'app/fonts/**/*.*'
    },

    src: {
        html:    'assets/src/*.html',
        js:      'assets/src/js/main.js',
        style:   'assets/src/style/main.scss',
        img:     'assets/src/img/**/*.*',
        fonts:   'assets/src/fonts/**/*.*'
    },

    build: {
        html:    'dist/',
        js:      'dist/js/min',
        css:     'dist/css/',
        img:     'dist/img/',
        uploads: 'dist/uploads/',        
        fonts:   'dist/fonts/'
    },


    clean: './dist/*'
};


// autoprefixer settings
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
     *   3.8.3  pugRender - компиляция в HTML      
    */


    // 3.1  SCSS - компиляция  // UKResult demo // v. new
    gulp.task('scss', function(){
        // body...
        return gulp.src('app/sass/**/*.scss')

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
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())      // .pipe(sourcemaps.write('.')) // ('.') - Выводит в отдельный файл
        
        .pipe(gulp.dest('app/css')) 
        .pipe(bs.stream());       

    }) ;


    // 3.2  Static Server + autoreloading  // v. new
    gulp.task('bs-serve', function() {

        bs.init({
            server: "./app"
        });
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


    // 3.7  Clean - очистка директории /dist

    gulp.task('clean', function() {
        // return del.sync('dist'); // - NOT work // Удаляем папку dist перед сборкой
        return del('dist');         // + Work!  // Удаляем папку dist перед сборкой
    });

    // 3.8.2  NunjucksRender - 
    // Nunjucks.js
    let nunjucksOptions = {
        path: ['app/view/'],
        // data: infoData
    };

    gulp.task('nunjucksRender', function () {

        // return gulp.src('src/templates/*.html')
        return gulp.src('app/view/*.html')

            .pipe(data(function(file) {
                return JSON.parse(fs.readFileSync('./app/data/data.json'));
            }))            
            .pipe(nunjucksRender(nunjucksOptions))

            .pipe(gulp.dest('app/'))
            .pipe(bs.stream());
    });

    // 3.8.3 Pug to HTML
    // Pug.js
    let pugOptions = {
        path: ['app/view/'],
        // data: infoData
    };    

    gulp.task('pugRender', function () {

        return gulp.src('app/view/*.pug')
            .pipe(data(function(file) {
                return JSON.parse(fs.readFileSync('./app/data/data.json'));
            }))     
            .pipe(pug({
            // Your options in here.

            }))
            .pipe(gulp.dest('app/'))
            .pipe(bs.stream());
    });      


// 4. Calls

// gulp.task('watch', ['bs-serve', 'scss', 'nunjucksRender'], function() {
gulp.task('watch',  function() {
    // gulp.watch('app/sass/**/*.+(scss|scss)', [ 'scss']);     
    gulp.watch('app/sass/**/*.+(scss|scss)', gulp.parallel('scss'));  
    gulp.watch(['app/view/**/*.html', 'app/data/**/*.json'], gulp.parallel('nunjucksRender'));        
    gulp.watch(['app/js/*.js', path_view_js], gulp.parallel('js'));     
});

// gulp.task('watchjs', gulp.parallel('bs-serve', 'js'), function() {

//     gulp.watch('app/js/*.js', gulp.parallel('js'));
//     gulp.watch(['app/view/**/*.html', 'app/data/**/*.json'], gulp.parallel('nunjucksRender'));
// }); 
gulp.task('watchjs', function() {

    gulp.watch('app/js/*.js', gulp.parallel('js'));
    gulp.watch(['app/view/**/*.html', 'app/data/**/*.json'], gulp.parallel('nunjucksRender'));
}); 

gulp.task('makesvgfont', gulp.series('Svgmin', 'Iconfont'));


// gulp.task('default', gulp.parallel( 'watch', 'bs-serve', 'scss', 'nunjucksRender') );
gulp.task('default', gulp.parallel( 'watch', 'bs-serve', 'scss', 'nunjucksRender', 'js') );

gulp.task('defaultjs', gulp.parallel('watchjs', 'bs-serve', 'js', 'nunjucksRender') );

gulp.task('build3', gulp.series('clean'),  function () {

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
        .pipe(imagemin({ // Сжимаем с наилучшими настройками
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/images'))

    gulp.src('app/uploads/**/*')
        .pipe(imagemin({ // Сжимаем с наилучшими настройками
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/uploads'))    

});



// 3.X Tasks for build (:prod)

    gulp.task('html:prod', function () {

        return gulp.src('app/*.html')
            // .pipe(gulp.dest('dist')) 
            .pipe(gulp.dest(path.build.html)) 
    });
    gulp.task('styles:prod', function () {

        return gulp.src('app/css/**/*.css')
            .pipe(cleanCSS({compatibility: 'ie10'}))
            // .pipe(gulpResolveUrl())
            // .pipe(cssAdjustUrlPath(/(url\(['"]?)[/]?(assets)/g))

            // .pipe(rename({suffix: '.min'}))  // TODO: Не забыть изменить путь подключаемого файла в html
            // .pipe(gulp.dest('dist/css'))
            .pipe(gulp.dest(path.build.css)) 
    });
    gulp.task('js:prod', function () {
        return gulp.src('app/js/min/scripts.min.js')
            .pipe(uglify())    
            // .pipe(gulp.dest('dist/js/min'))
            .pipe(gulp.dest(path.build.js)) 
    });
    gulp.task('fonts:prod', function () {
        return gulp.src('app/fonts/**/*')
            // .pipe(gulp.dest('dist/fonts'))
            .pipe(gulp.dest(path.build.fonts))
    });

    gulp.task('images:prod', function () {
        return gulp.src('app/images/**/*')
            .pipe(imagemin({ // Сжимаем с наилучшими настройками
                interlaced: true,
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],
                use: [pngquant()]
            }))
            // .pipe(gulp.dest('dist/images'))
            .pipe(gulp.dest(path.build.images))
    }); 
    gulp.task('uploads:prod', function () {
        return gulp.src('app/uploads/**/*')
            .pipe(imagemin({ // Сжимаем с наилучшими настройками
                interlaced: true,
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],
                use: [pngquant()]
            }))
            // .pipe(gulp.dest('dist/uploads'))
            .pipe(gulp.dest(path.build.uploads))

    }); 

gulp.task('build', gulp.series(
    'clean', 
    'html:prod', 
    'styles:prod',
    'js:prod',
    'fonts:prod',
    'images:prod',
    'uploads:prod'
));








// 5. Utilites

let rename_target_folder ='./app/view/blocks/products/view';

    // 5.1  Rename files in folder
    gulp.task('rename', function(path) {
      return  gulp.src(
        
            // rename_target_folder + '/**/*.html'
            rename_target_folder + '/*.html'
        
        )
        // .pipe(concat('scripts.js'))
        // .pipe(uglify())
        // .pipe(rename('scripts.min.js'))
        // .pipe(gulp.dest('app/js/min/'));
        .pipe(rename(function (path) {
            // Updates the object in-place
            // path.dirname += "/ciao";
            path.basename = "_" + path.basename;
            // path.basename = path.basename.slice(1);
            // path.extname = ".md";
        }))

        // .pipe(
        //     rename( rename_target_folder + '/*.html' , function() {
        //         // return {suffix: '-debug'};
        //         return {extname: 'md'};
        //     })
        // )
        // .pipe( del.sync( rename_target_folder + '/**/*.html') ) // ++ Работает
        // .pipe( rename( rename_target_folder + '/*.html', {suffix: '-debug'})  ) // 
        // .pipe( rename( rename_target_folder + '/*.html', {suffix: '-debug'})  ) // 

        .pipe(gulp.dest(rename_target_folder))
        // .pipe(gulp.dest('./dist/'))

        // .pipe(gulp.dest(rename_target_folder + '/updated_files/'))
        // .pipe( del.sync( rename_target_folder + '/*.html') )

    }); 




// gulp.task('default', ['del'], function() {
//     // default task code here
// });

// gulp.task('default', gulp.series('del', function() { 
//     // default task code here
// }));


// // Doc 
// function css() {
//   return src('client/templates/*.less')
//     .pipe(less())
//     .pipe(minifyCSS())
//     .pipe(dest('build/css'))
// }