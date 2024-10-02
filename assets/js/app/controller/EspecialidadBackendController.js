/**
 * Created by Felipe Rodriguez Arias <ucifarias@gmail.com> on 27/11/2017.
 */

myApp.controller("EspecialidadIndexController",
  function ($scope, EspecialidadResource) {
    $scope.entityName = 'Especialidad';
    $scope.resource = EspecialidadResource;
  }
)
  .controller("EspecialidadNewController",
    function ($scope, EspecialidadResource) {
      $scope.entityName = 'Especialidad';
      $scope.resource = EspecialidadResource;
    }
  )
  .controller("EspecialidadEditController",
    function ($scope, EspecialidadResource) {
      $scope.entityName = 'Especialidad';
      $scope.resource = EspecialidadResource;
    }
  )
  .controller("EspecialidadShowController",
    function ($scope, EspecialidadResource) {
      $scope.entityName = 'Especialidad';
      $scope.resource = EspecialidadResource;
    }
  );
