/**
 * grunt/pipeline.js
 *
 * The order in which your css, javascript, and template files should be
 * compiled and linked from your views and static HTML files.
 *
 * (Note that you can take advantage of Grunt-style wildcard/glob/splat expressions
 * for matching multiple files, and ! in front of an expression to ignore files.)
 *
 * For more information see:
 *   https://github.com/balderdashy/sails-docs/blob/master/anatomy/myApp/tasks/pipeline.js.md
 */


// CSS files to inject in order
//
// (if you're using LESS with the built-in default config, you'll want
//  to change `assets/styles/importer.less` instead.)
var cssFilesToInject = [
  'styles/css/bootstrap.css',
  'styles/css/font-alpona.css',
  'styles/css/prettify.css',
  'styles/css/responsive-tables.css',
  'styles/css/jquery.stepy.css',
  'styles/css/bootstrap-reset.css',
  'styles/exportstyle/bootstrap.min.css',
  'styles/css/responsive-tables.css',
  'styles/css/bootstrap-reset.css',
  'styles/exportstyle/angular-material.min.css',
  'styles/exportstyle/bootstrap-responsive.min.css',
  'styles/exportstyle/daterange/angular-datepicker.css',
  'styles/exportstyle/daterange/angular-datepicker.min.css',
  'styles/css/angular-bootstrap-calendar.min.css',
  'styles/css/colorpicker.min.css',
  'styles/exportstyle/font-awesome.min.css',
  'styles/exportstyle/chartcss/c3.min.css',
  'styles/exportstyle/exported/elegant-icons-style.css',
  'styles/exportstyle/exported/line-icons.css',
  'styles/exportstyle/exported/owl.carousel.css',
  'styles/exportstyle/exported/style-responsive.css',
  'styles/exportstyle/exported/widgets.css',
  'styles/exportstyle/exported/xcharts.min.css',
  'styles/exportstyle/bootstrap-theme.min.css',
  'styles/exportstyle/datepicker3.css',
  'styles/css/styles.css',
  'styles/mdi/css/materialdesignicons.css',
  'styles/css/datatables/dataTables.bootstrap.css',
  'js/lumx/dist/lumx.css',
  'styles/css/select/*.css'
];


// Client-side javascript files to inject in order
// (uses Grunt-style wildcard/glob/splat expressions)
var jsFilesToInject = [

  // Load sails.io before everything else
  'js/dependencies/sails.io.js',

  // '/js/dependencies/jquery.easing.min.js',
  // '/js/dependencies/jquery.scrollTo.min.js',

  'js/alponajs/jquery.js',
  'js/alponajs/respond.min.js',
  'js/alponajs/jquery-ui-1.10.3.custom.min.js',
  'js/alponajs/prettify.js',
  'js/alponajs/jquery.nicescroll.js',
  'js/alponajs/jquery.cookie.js',
  'js/alponajs/jquery.hoverIntent.minified.js',
  <!--jQuery leftbar navigation accordion -->
  'js/alponajs/jquery.dcjqaccordion.2.7.js',
  <!--jQuery Responsive Table -->
  'js/alponajs/responsive-tables.js',
  'js/alponajs/jquery.validate.js',
  'js/alponajs/jquery.stepy.js',
  'js/alponajs/common-script.js',

  //'/js/dependencies/exportedjs/jquery-1.10.1.min.js',
  // '/js/dependencies/jquery-ui.custom.js',
  'js/dependencies/exportedjs/bootstrap.min.js',

  'js/dependencies/exportedjs/angular.min.js',
  '/js/dependencies/exportedjs/angular-animate.min.js',
  '/js/dependencies/exportedjs/angular-cookies.min.js',
  '/js/dependencies/exportedjs/angular-datepicker.min.js',
  '/js/dependencies/exportedjs/angular-resource.min.js',
  '/js/dependencies/exportedjs/angular-route.min.js',
  '/js/dependencies/exportedjs/angular-translate.min.js',
  '/js/dependencies/exportedjs/angular-locale_es-cu.js',
  'js/dependencies/exportedjs/ui-bootstrap-tpls.min.js',
  'js/dependencies/exportedjs/*',
  'js/dependencies/*.js',
  'js/select/*.js',


  <!-- Google JS API -->
  <!-- Theme common script -->

  'js/chartjs/Chart.min.js',
  'js/chartjs/angular-chart.min.js',
  'js/angulartimer/angular-timer.min.js',
  'js/angulartimer/angular-timer-all.min.js',
  'js/advacedsearch/angular-advanced-searchbox-tpls.min.js',

  //'js/daterange/moment.js',
  //'js/daterange/daterangepicker.js',
  'js/daterange/angular-datepicker.js',

  //LUMX
  'js/velocity/velocity.js',
  'js/velocity/velocity.ui.js',
  'js/lumx/dist/lumx.js',
  'js/datatables/*.js',

  // Dependencies like jQuery, or Angular are brought in here
  //  'js/bootstrapdependencies/jquery.nicescroll.min.js',
  //  'js/bootstrapdependencies/jquery.flot.js',
  //  'js/bootstrapdependencies/jquery.flot.resize.js',
  //  'js/bootstrapdependencies/jquery.flot.pie.js',
  //  'js/bootstrapdependencies/jquery.flot.stack.js',
  //  'js/bootstrapdependencies/jquery.flot.crosshair.js',
  //  'js/bootstrapdependencies/jquery.flot.tooltip.min.js',
  //  'js/bootstrapdependencies/jquery.sparkline.min.js',
  // 'js/bootstrapdependencies/**/*.js',
  'js/scripts.js',

  // All of the rest of your client-side js files
  // will be injected here in no particular order.
  'js/config/config.js',
  'js/app/app.js',
  'js/app/language/*.js',
  'js/app/service/*.js',
  'js/app/directive/*.js',
  'js/app/factory/*.js',
  'js/app/filter/*.js',
  'js/app/controller/*.js',
  // 'js/app/calendar/*.js', Esto está dando bateo, sucede q se necesita un transpiler o una tarea de grunt que lo transforme a es5
  'js/app/api-routes.js',
  'js/app/routing/*.js',
  'js/app/*.js',

];


// Client-side HTML templates are injected using the sources below
// The ordering of these templates shouldn't matter.
// (uses Grunt-style wildcard/glob/splat expressions)
//
// By default, Sails uses JST templates and precompiles them into
// functions for you.  If you want to use jade, handlebars, dust, etc.,
// with the linker, no problem-- you'll just want to make sure the precompiled
// templates get spit out to the same file.  Be sure and check out `tasks/README.md`
// for information on customizing and installing new tasks.
var templateFilesToInject = [
  'templates/**/*.html'
];


// Default path for public folder (see documentation for more information)
var tmpPath = '.tmp/public/';

// Prefix relative paths to source files so they point to the proper locations
// (i.e. where the other Grunt tasks spit them out, or in some cases, where
// they reside in the first place)
module.exports.cssFilesToInject = cssFilesToInject.map(function (cssPath) {
  // If we're ignoring the file, make sure the ! is at the beginning of the path
  if (cssPath[0] === '!') {
    return require('path').join('!.tmp/public/', cssPath.substr(1));
  }
  return require('path').join('.tmp/public/', cssPath);
});
module.exports.jsFilesToInject = jsFilesToInject.map(function (jsPath) {
  // If we're ignoring the file, make sure the ! is at the beginning of the path
  if (jsPath[0] === '!') {
    return require('path').join('!.tmp/public/', jsPath.substr(1));
  }
  return require('path').join('.tmp/public/', jsPath);
});
module.exports.templateFilesToInject = templateFilesToInject.map(function (tplPath) {
  // If we're ignoring the file, make sure the ! is at the beginning of the path
  if (tplPath[0] === '!') {
    return require('path').join('!assets/', tplPath.substr(1));
  }
  return require('path').join('assets/', tplPath);
});


