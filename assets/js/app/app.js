/**
 * Created by webind on 10/05/2017.
 */
var myApp = angular.module("WebInd",
  [
    'myApp.config',
    'myApp.ApiRoutes',
    "ngResource",
    "ngRoute",
    "ngCookies",
    "ngAnimate",
    'mwl.calendar',
    'ui.bootstrap',
    "checklist-model",
    "pascalprecht.translate",
    "rzModule",
    'chart.js',
    'lumx',
    'timer',
    'angular-advanced-searchbox',
    '720kb.datepicker',
    'angularSpinners',
    'ui.select',
    'ngSanitize'
  ])
  .config(['calendarConfig', function (calendarConfig) {

    // View all available config
    // console.log(calendarConfig);

    // Change the month view template globally to a custom template

    // Use either moment or angular to format dates on the calendar. Default angular. Setting this will override any date formats you have already set.
    calendarConfig.dateFormatter = 'moment';

    // This will configure times on the day view to display in 24 hour format rather than the default of 12 hour
    calendarConfig.allDateFormats.moment.date.hour = 'HH:mm';

    // This will configure the day view title to be shorter
    calendarConfig.allDateFormats.moment.title.day = 'ddd D MMM';

    // This will set the week number hover label on the month view
    calendarConfig.i18nStrings.weekNumber = 'Week {week}';

    // This will display all events on a month view even if they're not in the current month. Default false.
    calendarConfig.displayAllMonthEvents = true;

    // Make the week view more like the day view, ***with the caveat that event end times are ignored***.
    calendarConfig.showTimesOnWeekView = true;

  }])
  .run(
    ["$rootScope", "$cookieStore", "$location", 'CONFIG', '$translate',
      function ($rootScope, $cookieStore, $location, CONFIG, $translate) {
        // $rootScope.urlBase = CONFIG.BASE_URL;

        // $rootScope.$on('$routeChangeStart', function (event, next) {
        //   $rootScope.transparent = $rootScope.relative =  $rootScope.fullwidth = true;
        //   $rootScope.align = "left";
        //   if (next.roles) {//&& !AuthService.usuario
        //     $location.path('/login'); //needs to login
        //   }
        //
        // });

        $rootScope.$on('$routeChangeStart', function (event, next) {
          $rootScope.transparent = $rootScope.relative = $rootScope.fullwidth = true;
          $rootScope.align = "left";
          if (!$rootScope.userAuthenticated) {
            // $location.path('/');
          }
        });

        //todo esta versión del tranlate es con promesas
        // $translate('seleccione')
        //   .then(translation => {
        //     $scope.cuidador.videoName = translation
        //   })

        $rootScope.trans = function(key) {
          return $translate.instant(key);
        };
      }
    ]
  );
