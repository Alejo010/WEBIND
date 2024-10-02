/**
 * Created by Felipe Rodriguez Arias <ucifarias@gmail.com> on 08/11/2017.
 */

myApp.controller("AreaSaludReporteController",
  ['$scope', 'ApiService', 'API_ROUTE',
    function ($scope, ApiService, API_ROUTE) {
      $scope.chartPacienteLabels = [];
      $scope.chartPacienteData = [];

      $scope.chartSexoLabels = [];
      $scope.chartSexoData = [];
      $scope.charSexoSeries = ['Femenino', 'Masculino'];

      $scope.chartRazaLabels = [];
      $scope.chartRazaData = [];
      $scope.charRazaSeries = ['Negro', 'Blanco', 'Mestizo'];

      ApiService.get(API_ROUTE.REPORTE_AREA_SALUD)
        .then(function (response) {
          console.log(response);
          const {dataPaciente, dataSexo, dataRaza} = response.data;
          dataPaciente.map((value) => {
            const {nombre, count} = value;
            $scope.chartPacienteLabels.push(nombre);
            $scope.chartPacienteData.push(count);
          });
          
          let femaleSerie = [], maleSerie = [];
          dataSexo.map((value) => {
            const {nombre, femaleCount, maleCount} = value;
            $scope.chartSexoLabels.push(nombre);
            femaleSerie.push(femaleCount);
            maleSerie.push(maleCount);
          });
          $scope.chartSexoData = [femaleSerie, maleSerie];
          
          let negroSerie = [], blancoSerie = [], mestizoSerie = [];
          dataRaza.map((value) => {
            const {nombre, negroCount, blancoCount, mestizoCount} = value;
            $scope.chartRazaLabels.push(nombre);
            negroSerie.push(negroCount);
            blancoSerie.push(blancoCount);
            mestizoSerie.push(mestizoCount);
          });
          $scope.chartRazaData = [negroSerie, blancoSerie, mestizoSerie];
        });
    }
  ]
);
