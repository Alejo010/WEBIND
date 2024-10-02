/**
 * Created by Felipe Rodriguez Arias <ucifarias@gmail.com> on 28/11/2017.
 */

myApp.controller("NivelEscolaridadIndexController",
  function ($scope, NivelEscolaridadResource) {
    $scope.entityName = 'Nivel Escolaridad';
    $scope.resource = NivelEscolaridadResource;
  }
)
  .controller("NivelEscolaridadNewController",
    function ($scope, NivelEscolaridadResource) {
      $scope.entityName = 'Nivel Escolaridad';
      $scope.resource = NivelEscolaridadResource;
    }
  )
  .controller("NivelEscolaridadEditController",
    function ($scope, NivelEscolaridadResource) {
      $scope.entityName = 'Nivel Escolaridad';
      $scope.resource = NivelEscolaridadResource;
    }
  )
  .controller("NivelEscolaridadShowController",
    function ($scope, NivelEscolaridadResource) {
      $scope.entityName = 'Nivel Escolaridad';
      $scope.resource = NivelEscolaridadResource;
    }
  );
