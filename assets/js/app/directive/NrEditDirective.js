/**
 * Created by Felipe Rodriguez Arias <ucifarias@gmail.com> on 28/11/2017.
 */

myApp.directive('nrEdit',
  function ($routeParams, $location, WorkService) {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'templates/directive/nr-form.html',
      link: function ($scope, $element, $attrs) {
        $scope.slug = WorkService.getSlug($scope.entityName);
        $scope.title = `Editar ${$scope.entityName}`;
        $scope.resource.get({id: $routeParams.id})
          .$promise
          .then(result => $scope.entity = result);

        $scope.save = () => {
          $scope.resource.save({id: $scope.entity.id}, $scope.entity)
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
