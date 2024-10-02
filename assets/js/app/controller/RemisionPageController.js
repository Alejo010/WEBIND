/**
 * Created by Roberto on 10/30/2018.
 */
myApp.controller('RemisionPageController', ['$scope', '$http', 'EspecialidadResource', "API_ROUTE", "ApiService", "MedicoResource",
  function ($scope, $http, EspecialidadResource, UsuarioResource, ApiService, MedicoResource, API_ROUTE) {
    $scope.bandera = 1;
    $scope.remisiones = [];
    $scope.especialidad = {};
    $scope.especialidades = EspecialidadResource.query();
    $scope.loading = true;
    paramsG = {};

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
      console.log('idMedico', idMedico);
      $scope.title = 'Listado de pacientes remitidos a la especialidad ' + $scope.especialidad.nombre;

      var parameters = '?especialidad_destino=' + idEspecialidadLog + "&atendido=false";
      return $http.get('/remision/findRemisionesPopulated' + parameters);

    }).then(result => {
      $scope.remisiones = result.data;
      // delete $scope.remisiones[0].consulta_remision;
      //console.log('$scope.remisiones', $scope.remisiones);
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
])

