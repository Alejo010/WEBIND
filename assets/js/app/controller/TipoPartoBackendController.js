/**
 * Created by Felipe Rodriguez Arias <ucifarias@gmail.com> on 28/11/2017.
 */

myApp.controller("TipoPartoIndexController",
  function ($scope, TipoPartoResource) {
    $scope.entityName = 'Tipo Parto';
    $scope.resource = TipoPartoResource;
  }
)
  .controller("TipoPartoNewController",
    function ($scope, TipoPartoResource) {
      $scope.entityName = 'Tipo Parto';
      $scope.resource = TipoPartoResource;
    }
  )
  .controller("TipoPartoEditController",
    function ($scope, TipoPartoResource) {
      $scope.entityName = 'Tipo Parto';
      $scope.resource = TipoPartoResource;
    }
  )
  .controller("TipoPartoShowController",
    function ($scope, TipoPartoResource) {
      $scope.entityName = 'Tipo Parto';
      $scope.resource = TipoPartoResource;
    }
  );
