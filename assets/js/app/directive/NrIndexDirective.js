/**
 * Created by Felipe Rodriguez Arias <ucifarias@gmail.com> on 28/11/2017.
 */

myApp.directive('nrIndex',
  function (WorkService) {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'templates/directive/nr-index.html',
      link: function ($scope, $element, $attrs) {

        $scope.slug = WorkService.getSlug($scope.entityName);
        $scope.entities = [];
        $scope.entities = $scope.resource.query();

        $scope.remove = (entity) => {
          $scope.resource.delete({id: entity.id})
            .$promise
            .then(result => {
              if (result.error) {
                $scope.error = result.error;
              } else {
                $scope.error = '';
                $scope.entities = $scope.entities.filter(v => entity.id !== v.id);
              }
            })
            .catch(err => console.log(err));
        };
      }
    };
  }
);
