/**
 * Created by Felipe Rodriguez Arias <ucifarias@gmail.com> on 08/11/2017.
 */

myApp.controller('PacientesPorEspecialidadReporteController',
  ['$scope', 'ApiService', 'API_ROUTE', 'EspecialidadResource',
    function ($scope, ApiService, API_ROUTE, EspecialidadResource) {

      $scope.pacientes = [];
      $scope.especialidad = {};
      $scope.especialidades = EspecialidadResource.query();
      $scope.loading = false;

      $scope.search = () => {
        if (!$scope.especialidad.hasOwnProperty('id')) {
          alert('Seleccione una especialidad de la lista');
          return;
        }

        $scope.loading = true;
        ApiService.post(API_ROUTE.REPORTE_PACIENTES_ESPECIALIDAD, {idEspecialidad: $scope.especialidad.id})
        .then(function (response) {
          console.log(response);
          const {pacientes} = response.data;
          $scope.pacientes = pacientes;
          $scope.loading = false;
        });
    };

      $scope.onSelect = () => {
        //alert('En construcción');
      };
    }
  ]
);
