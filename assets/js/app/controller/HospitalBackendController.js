/**
 * Created by Felipe Rodriguez Arias <ucifarias@gmail.com> on 28/11/2017.
 */

myApp.controller("HospitalIndexController",
  function ($scope, HospitalResource) {
    $scope.entityName = 'Hospital';
    $scope.resource = HospitalResource;
  }
)
  .controller("HospitalNewController",
    function ($scope, HospitalResource) {
      $scope.entityName = 'Hospital';
      $scope.resource = HospitalResource;
    }
  )
  .controller("HospitalEditController",
    function ($scope, HospitalResource) {
      $scope.entityName = 'Hospital';
      $scope.resource = HospitalResource;
    }
  )
  .controller("HospitalShowController",
    function ($scope, HospitalResource) {
      $scope.entityName = 'Hospital';
      $scope.resource = HospitalResource;
    }
  );
