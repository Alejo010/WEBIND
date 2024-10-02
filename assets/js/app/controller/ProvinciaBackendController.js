/**
 * Created by Felipe Rodriguez Arias <ucifarias@gmail.com> on 23/11/2017.
 */

myApp.controller("ProvinciaIndexController",
  function ($scope, ProvinciaResource) {
    $scope.entityName = 'Provincia';
    $scope.resource = ProvinciaResource;
  }
)
  .controller("ProvinciaNewController",
    function ($scope, ProvinciaResource) {
      $scope.entityName = 'Provincia';
      $scope.resource = ProvinciaResource;
    }
  )
  .controller("ProvinciaEditController",
    function ($scope, ProvinciaResource) {
      $scope.entityName = 'Provincia';
      $scope.resource = ProvinciaResource;
    }
  )
  .controller("ProvinciaShowController",
    function ($scope, ProvinciaResource) {
      $scope.entityName = 'Provincia';
      $scope.resource = ProvinciaResource;
    }
  );
