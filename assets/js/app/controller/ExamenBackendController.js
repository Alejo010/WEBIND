/**
 * Created by Felipe Rodriguez Arias <ucifarias@gmail.com> on 27/11/2017.
 */

myApp.controller("ExamenIndexController",
  function ($scope, ExamenResource) {
    $scope.entityName = 'Examen';
    $scope.resource = ExamenResource;
  }
)
  .controller("ExamenNewController",
    function ($scope, ExamenResource) {
      $scope.entityName = 'Examen';
      $scope.resource = ExamenResource;
    }
  )
  .controller("ExamenEditController",
    function ($scope, ExamenResource) {
      $scope.entityName = 'Examen';
      $scope.resource = ExamenResource;
    }
  )
  .controller("ExamenShowController",
    function ($scope, ExamenResource) {
      $scope.entityName = 'Examen';
      $scope.resource = ExamenResource;
    }
  );
