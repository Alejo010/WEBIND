/**
 * Created by Felipe Rodriguez Arias <ucifarias@gmail.com> on 23/11/2017.
 */

myApp.controller("DrogaIndexController",
  function ($scope, DrogaResource) {
    $scope.entityName = 'Droga';
    $scope.resource = DrogaResource;
  }
)
  .controller("DrogaNewController",
    function ($scope, DrogaResource) {
      $scope.entityName = 'Droga';
      $scope.resource = DrogaResource;
    }
  )
  .controller("DrogaEditController",
    function ($scope, DrogaResource) {
      $scope.entityName = 'Droga';
      $scope.resource = DrogaResource;
    }
  )
  .controller("DrogaShowController",
    function ($scope, DrogaResource) {
      $scope.entityName = 'Droga';
      $scope.resource = DrogaResource;
    }
  );
