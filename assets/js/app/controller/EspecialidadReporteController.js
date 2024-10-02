/**
 * Created by Felipe Rodriguez Arias <ucifarias@gmail.com> on 08/11/2017.
 */

myApp.controller("EspecialidadReporteController",
  ['$scope', 'ApiService', 'API_ROUTE',
    function ($scope, ApiService, API_ROUTE) {
      $scope.chartMedicoLabels = [];
      $scope.chartMedicoData = [];

      $scope.chartConsultaLabels = [];
      $scope.chartConsultaData = [];

      $scope.chartConsultaMensualLabels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
      $scope.chartConsultaMensualSeries = [];
      $scope.chartConsultaMensualData = [];

      $scope.chartPositivoLabels = [];
      $scope.chartPositivoData = [];
      $scope.charPositivoSeries = ['Postivos'];

      ApiService.get(API_ROUTE.REPORTE_ESPECIALIDAD)
        .then(function (response) {
          console.log(response);
          const {dataMedico, dataConsulta, dataConsultaMensual, dataPertinencia} = response.data;
          dataMedico.map((value) => {
            const {nombre, count} = value;
            $scope.chartMedicoLabels.push(nombre);
            $scope.chartMedicoData.push(count);
          });
          
          dataConsulta.map((value) => {
            const {nombre, count} = value;
            $scope.chartConsultaLabels.push(nombre);
            $scope.chartConsultaData.push(count);
          });
          
          dataConsultaMensual.map((value) => {
            const {nombre, values} = value;
            $scope.chartConsultaMensualSeries.push(nombre);
            $scope.chartConsultaMensualData.push(values);
          });
          
          let positvoSerie = [];
          dataPertinencia.map((value) => {
            const {nombre, count} = value;
            $scope.chartPositivoLabels.push(nombre);
            positvoSerie.push(count);
          });
          $scope.chartPositivoData = [positvoSerie];
        })
        .catch(err => console.log(err));
    }
  ]
);
