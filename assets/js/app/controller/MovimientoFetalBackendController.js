/**
 * Created by Felipe Rodriguez Arias <ucifarias@gmail.com> on 28/11/2017.
 */

myApp.controller("MovimientoFetalIndexController",
  function ($scope, MovimientoFetalResource) {
    $scope.entityName = 'Movimiento Fetal';
    $scope.resource = MovimientoFetalResource;
  }
)
  .controller("MovimientoFetalNewController",
    function ($scope, MovimientoFetalResource) {
      $scope.entityName = 'Movimiento Fetal';
      $scope.resource = MovimientoFetalResource;
    }
  )
  .controller("MovimientoFetalEditController",
    function ($scope, MovimientoFetalResource) {
      $scope.entityName = 'Movimiento Fetal';
      $scope.resource = MovimientoFetalResource;
    }
  )
  .controller("MovimientoFetalShowController",
    function ($scope, MovimientoFetalResource) {
      $scope.entityName = 'Movimiento Fetal';
      $scope.resource = MovimientoFetalResource;
    }
  );
