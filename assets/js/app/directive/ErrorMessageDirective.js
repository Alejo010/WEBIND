/**
 * Created by Felipe Rodriguez Arias <ucifarias@gmail.com> on 26/11/2017.
 */

myApp.directive('errorMessage', function () {
  return {
    restrict: 'AEC',
    replace: true,
    templateUrl: 'templates/directive/error-message.html',
    link: function (scope, elem, attrs) {
      // scope.$watch('message', function (value) {
      //   console.log('Message Changed!');
      // });
      // scope.clearMessage = function () {
      //   scope.message = '';
      // };
      // elem.bind('mouseover', function () {
      //   elem.css('cursor', 'pointer');
      // });
    }
  };
});
