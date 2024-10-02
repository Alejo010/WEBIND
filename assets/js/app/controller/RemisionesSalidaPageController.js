/**
 * Created on 10/30/2018.
 */
myApp.controller('RemisionesSalidaPageController',
  function ($scope, $http, EspecialidadResource) {
    // $scope.bandera = 1;
    $scope.remisionesRealizadas = [];
    $scope.especialidad = {};
    $scope.especialidades = EspecialidadResource.query();
    $scope.loading = true;
    paramsG = {};
    console.log('entro');

    /*************************CODGO PARA CONOCER USUARIO LOGUEADO***********************************/
    //var UserId;//variable global que controla el id del usuario
    $http.post('/usuario/getUserLogged').then(function (response) {
      var user = response.data;
      var idMedico = user.medicos[0].id;
      $scope.medico = {
        id: idMedico,
      };

      $scope.user = response.data;
      $scope.especialidad = $scope.user.medicos[0].especialidad;
      var idEspecialidadLog = $scope.user.medicos[0].especialidad.id;
      $scope.title = 'Listado de remisiones realizadas por la especialidad ' + $scope.especialidad.nombre;
      var parameters = '?idEspecialidad=' + idEspecialidadLog;
      return $http.get('/remision/findRemisionesSalidaPopulated' + parameters);

    }).then(result => {
      $scope.remisiones = result.data;
      console.log('result.data', result.data);
      // delete $scope.remisiones[0].consulta_remision;

      if (!$scope.remisiones.length) {
        $scope.bandera = 0;
      }
    }).catch(err => {
      console.log(err);
      $scope.bandera = 0;
    }).finally(function () {
      $scope.loading = false;
    });
  }
)

