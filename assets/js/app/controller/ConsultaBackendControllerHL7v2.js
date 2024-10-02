// consultaBuscarController.js

myApp.controller('ConsultaBuscarController',
    function ($scope, $routeParams, ApiService, API_ROUTE, MedicoResource, $http) {
  
      $scope.title = 'Buscar el paciente a consultar, escriba la HC o por el la Tarjeta de menor';
      $scope.cartel = '';
      $scope.buscarpor = {
        hc: '',
        ci: '',
        nombre: '',
        mostrar: false,
      };
      $scope.camposVacios = false;
  
      $scope.medico = {};
  
      $http.post('/usuario/getUserLogged').then(function (response) {
        var user = response.data;
        var idMedico = user.medicos[0].id;
        $scope.medico.id = idMedico;
      }).catch(err => {
        console.log(err);
      });
//HL7v2
     // BUSCAR PACIENTE POR HC O CI
     $scope.buscar = async function () {
      $scope.paciente = {};
      const Datos = {
        nombreSisEmisor: 'Webind',
        nombreSisReceptor: 'Webind',
        nombreConsultaEmisora: 'Neonatología y Discapacidad Infantil',
        nombreConsultaReceptora: 'Neonatología y Discapacidad Infantil',
        hc: $scope.buscarpor.hc,
        ci: $scope.buscarpor.ci,
        nombre: $scope.buscarpor.nombre,
      };
  
      try {
        const jsData = structureQBP_Q21(Datos);
        const hl7Message = await convertirJsAHL7(jsData);
        // Enviar el mensaje HL7v2 al servidor
        const response = await ApiService.post(API_ROUTE.PACIENTE_POR_HL7, { hl7Message: hl7Message });
        const hl7Response = response.data.hl7Response;

        // Parsear la respuesta HL7v2 RSP_K22
       const parsedResponse = await parseHL7Response(hl7Response);
       const paciente = parsedResponse.paciente;
       
            if (paciente.hasOwnProperty('length') && paciente.length > 0) {
              $scope.paciente = paciente[0];
              $scope.buscarpor.hc = '';
              $scope.buscarpor.ci = '';
              $scope.cartel = '';
              $scope.buscarpor.mostrar = true;
            } else {
              $scope.cartel = 'No existe ningún paciente con ese No de HC o CI';
              $scope.buscarpor.hc = '';
              $scope.buscarpor.ci = '';
              $scope.buscarpor.mostrar = false;
            }
          } catch (error) {
            console.error(error);
            $scope.error = 'Error al generar el mensaje HL7v2';
          }
        };

     // Función para parsear la respuesta HL7v2 RSP_K22
     async function parseHL7Response(hl7Response) {
     // Implementar la lógica para parsear el mensaje HL7v2 RSP_K22
     // Esto puede incluir el uso de una biblioteca HL7 o la implementación manual del parseo de os datos
     // Ejemplo:
     //Falta implementación de extracción de datos quee si se aplico al controlador
     const parsedData = {}; // Parsear el mensaje y extraer los datos del paciente
     return parsedData;
  }
});
  
  /* Codigo del archivo para transmisión JS
      //BUSCAR PACIENTE POR HC
      $scope.buscar = function () {
        $scope.paciente = {};
        var hc;
        hc = $scope.buscarpor.hc;
  
        if (hc) {// $scope.paciente.hc===null || $scope.paciente.hc===""
          ApiService.post(API_ROUTE.PACIENTE_POR_HC, {hc})
            .then(function (response) {
              const paciente = response.data.paciente;
              if (paciente.hasOwnProperty('length') && paciente.length > 0) {
                $scope.paciente = paciente[0];
                $scope.buscarpor.hc = '';
                $scope.buscarpor.ci = '';
                $scope.cartel = '';
                $scope.buscarpor.mostrar = true;
  
              }
              else {
                $scope.cartel = 'No existe ningún paciente con ese No de HC';
                $scope.buscarpor.hc = '';
                $scope.buscarpor.ci = '';
                $scope.buscarpor.mostrar = false;
              }
            });
  
        }
        // BUSCAR PACIENTE POR CI
        else if ($scope.buscarpor.ci) {
          let ci;
          ci = $scope.buscarpor.ci;
          ApiService.post(API_ROUTE.PACIENTE_POR_CI, {ci})
            .then(function (response) {
              const paciente = response.data.paciente;
              if (paciente.hasOwnProperty('length') && paciente.length > 0) {
                $scope.paciente = paciente[0];
                $scope.buscarpor.hc = '';
                $scope.buscarpor.ci = '';
                $scope.buscarpor.mostrar = true;
                $scope.cartel = '';
              }
              else {
                $scope.cartel = 'No existe ningún paciente con ese No de TM';
                $scope.buscarpor.hc = '';
                $scope.buscarpor.ci = '';
                $scope.buscarpor.mostrar = false;
              }
            });
        }
        else {
          $scope.cartel = 'Introduzca algún criterio de búsqueda';
          $scope.buscarpor.mostrar = false;
        }
      };
    });
*/