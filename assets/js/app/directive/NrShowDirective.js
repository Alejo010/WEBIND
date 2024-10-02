/**
 * Created by Felipe Rodriguez Arias <ucifarias@gmail.com> on 28/11/2017.
 */

myApp.directive('nrShow',
  function ($routeParams, WorkService) {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'templates/directive/nr-show.html',
      link: function ($scope, $element, $attrs) {
        $scope.slug = WorkService.getSlug($scope.entityName);
        $scope.entity = $scope.resource.get({id: $routeParams.id});
      }
    };
  }
);
