/**
 * Created by Felipe Rodriguez Arias <ucifarias@gmail.com> on 28/11/2017.
 */

myApp.controller("ParentezcoIndexController",
  function ($scope, ParentezcoResource) {
    $scope.entityName = 'Parentezco';
    $scope.resource = ParentezcoResource;
  }
)
  .controller("ParentezcoNewController",
    function ($scope, ParentezcoResource) {
      $scope.entityName = 'Parentezco';
      $scope.resource = ParentezcoResource;
    }
  )
  .controller("ParentezcoEditController",
    function ($scope, ParentezcoResource) {
      $scope.entityName = 'Parentezco';
      $scope.resource = ParentezcoResource;
    }
  )
  .controller("ParentezcoShowController",
    function ($scope, ParentezcoResource) {
      $scope.entityName = 'Parentezco';
      $scope.resource = ParentezcoResource;
    }
  );
