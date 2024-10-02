

myApp.controller("RolIndexController",
  function ($scope, RolResource) {
    $scope.entityName = 'Rol';
    $scope.resource = RolResource;
  }
)
  .controller("RolNewController",
    function ($scope, RolResource) {
      $scope.entityName = 'Rol';
      $scope.resource = RolResource;
    }
  )
  .controller("RolEditController",
    function ($scope, RolResource) {
      $scope.entityName = 'Rol';
      $scope.resource = RolResource;
    }
  )
  .controller("RolShowController",
    function ($scope, RolResource) {
      $scope.entityName = 'Rol';
      $scope.resource = RolResource;
    }
  );
