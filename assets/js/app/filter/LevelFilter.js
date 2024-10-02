/*
 * File: ConocimientoIdiomaFilter.js
 * User: jariasf1
 * Date: 22-mar-2018
 * Time: 9:03:08
 */

myApp.filter('level',
  ['$rootScope',
    function ($rootScope) {
      return function (value) {
        try {
          value = parseInt(value, 10);
        } catch (e) {
          console.log(e);
        }
        switch (value) {
          case 0:
            value = $rootScope.trans('basico');
            break;
          case 1:
            value = $rootScope.trans('medio');
            break;
          case 2:
            value = $rootScope.trans('avanzado');
            break;
        }
        return value;
      };
    }
  ]
);

