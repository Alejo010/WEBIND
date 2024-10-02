/**
 * Created by Felipe Rodriguez Arias <ucifarias@gmail.com> on 28/11/2017.
 */

myApp.directive('nrNew',
  function ($location, WorkService) {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'templates/directive/nr-form.html',
      link: function ($scope, $element, $attrs) {
        $scope.slug = WorkService.getSlug($scope.entityName);
        $scope.title = `Crear ${$scope.entityName}`;
        $scope.entity = {};

        $scope.save = () => {
          $scope.resource.save($scope.entity)
            .$promise
            .then((result) => {
              if (result.error) {
                $scope.error = result.error;
              } else {
                $scope.error = '';
                $location.path(`/backend/${$scope.slug}/index`);
              }
            })
            .catch(err => $scope.error = err);
        };
      }
    };
  }
);
