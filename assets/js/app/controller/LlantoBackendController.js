/**
 * Created by WebIND on 17/1/2019.
 */


myApp.controller("LlantoIndexController",
  function ($scope, LlantoResource) {
    $scope.entityName = 'Llanto';
    $scope.resource = LlantoResource;
  }
)
  .controller("LlantoNewController",
    function ($scope, LlantoResource) {
      $scope.entityName = 'Llanto';
      $scope.resource = LlantoResource;
    }
  )
  .controller("LlantoEditController",
    function ($scope, LlantoResource) {
      $scope.entityName = 'Llanto';
      $scope.resource = LlantoResource;
    }
  )
  .controller("LlantoPartoShowController",
    function ($scope, LlantoResource) {
      $scope.entityName = 'Llanto';
      $scope.resource = LlantoResource;
    }
  );
