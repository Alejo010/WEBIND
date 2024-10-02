/**
 * Created by WebIND on 5/12/2018.
 */
myApp.controller("AreaSaludIndexController",
  function ($scope, AreaSaludResource) {
    $scope.areas = [];
    $scope.areas = AreaSaludResource.query();


    $scope.remove = (area) => {
      AreaSaludResource.delete({id: area.id})
        .$promise
        .then(result => {
          if (result.error) {
            $scope.error = result.error;
          } else {
            $scope.error = '';
            $scope.areas = $scope.areas.filter(v => area.id !== v.id);
          }
        })
        .catch(err => console.log(err));
    };
  }
)

  .controller("AreaSaludShowController",
    function ($scope, $routeParams, AreaSaludResource) {
      $scope.area = AreaSaludResource.get({id: $routeParams.id});
    }
  );
