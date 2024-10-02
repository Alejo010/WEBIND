
myApp.controller("CalendarShowController",
function ($scope, $routeParams,  $http) {
 



}
)

.controller('CalendarShowController',
function ($scope, $routeParams,  $http) {
  
  /*  $http.get('/paciente/findfullypopulated?id=' + $routeParams.id).then(result => {
    $scope.paciente = result.data;
    areaSaludTemp = $scope.paciente.areaSalud;
    $scope.paciente.municipio = $scope.paciente.areaSalud.municipio;
    $scope.paciente.fechaNacimiento = new Date($scope.paciente.fechaNacimiento);
    //$scope.familiar = $scope.paciente.familiares[0];

    $scope.familiar = FamiliarResource.query({paciente: $scope.paciente.id});
    $scope.familiar.$promise.then(result => {
      $scope.familiar = result[0];
    }).catch(err => {
      console.log(err);
    });

    AntFamiliarResource.query({paciente: $scope.paciente.id}).$promise.then(result => {
      $scope.antFamiliar = result[0];
    }).catch(err => {
      console.log(err);
    });

  }).catch(err => {
    console.log(err);
    $scope.error = err.data.message;
  });*/
}
);