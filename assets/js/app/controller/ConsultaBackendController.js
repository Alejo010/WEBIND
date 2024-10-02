/**
 * Created by WebIND on 9/6/2018.
 */


//buscar
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
  })



//NUEVA CONSULTA

  .controller('ConsultaNewController',
    function ($scope, $location, ConsultaResource, PacienteResource, EspecialidadResource, UsuarioResource,
              $routeParams, MedicoResource, ExamenResource, ApiService, API_ROUTE, $http) {

      $scope.mostrarDiV = false;
      idRemision = $routeParams.remision;


      $scope.especialidad = {};
      EspecialidadResource.query()
        .$promise.then(result => {
        $scope.especialidades = result;
        $scope.especialidad = $scope.especialidades[0];
      });

      $scope.data = {
        selected_exam: null,
        examenPendiente: null,

        nuevaRemision: null,
        motivoNuevaRemision: null,
      };

      $http.get('/examen').then(result => {
        $scope.examenes = result.data;
        // $scope.consulta.examenIndicado.examen = $scope.examenes[0];
      }).catch(err => {
        console.log(err);
      });
      // $scope.otra_indicacion = '';


      idPaciente = $routeParams.idPaciente;
      idMedico = $routeParams.idMedico;

      let f = new Date();
      //f = (f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear());

      $scope.positivoOptions = [
        {
          value: false, label: 'Negativo'
        },
        {
          value: true, label: 'Positivo'
        }
      ];

      $scope.records_wav = {};
      $scope.permit_records = false;

      $scope.calcularEdadActual = (fecha) => {
        var hoy = new Date();
        var cumpleanos = new Date(fecha);
        console.log('cumpleanos', cumpleanos);

        console.log('hoy.getFullYear()', hoy.getFullYear());
        console.log('cumpleanos.getFullYear()', cumpleanos.getFullYear());
        $scope.edad = hoy.getFullYear() - cumpleanos.getFullYear();
        var m = hoy.getMonth() - cumpleanos.getMonth();
        if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
          $scope.edad--;
        }
        if ($scope.edad == 0) {
          var difMilisec = hoy.getTime() - cumpleanos.getTime();
          var cantDias = difMilisec / 1000 / 60 / 60 / 24;
          if (cantDias > 30) {
            var mes = Math.floor(cantDias / 30);
            $scope.edad = mes;
            if (mes == 1) {
              $scope.edad += ' mes';
            } else {
              $scope.edad += ' meses';
            }
          } else {
            $scope.edad = '' + Math.floor(cantDias) + ' días';
          }
        } else {
          $scope.edad += ($scope.edad == 1) ? ' año' : ' años';
        }
        console.log($scope.edad);
        return $scope.edad;
      }

      $scope.consulta = {
        fecha: f,
        motivo: '',
        impresionDiagnostica: '',
        diagosticoDef: '',
        examenFisico: '',
        tratamiento: '',
        evolucion: '',
        positivo: false,
        fechaProximaConsulta: '',
        mnt: '',

        fijacionVisual: 'No',
        seguimientoVisual: 'No',
        sonrisaSocial: 'No',
        gorjeo: 'No',
        sostenCefalico: 'No',
        manosALaLineaMedia: 'No',
        vocaliza: 'No',
        controlCefalico: 'No',
        agarreGrosero: 'No',
        transferenciaDeObjetos: 'No',
        roladoDePronoASupino: 'No',
        roladoDeSupinoAProno: 'No',
        sostenSentado: 'No',
        sedestacion: 'No',
        trompetillas: 'No',
        pinzaDigital: 'No',
        cuatroPuntos: 'No',
        monosilabos: 'No',
        gateoAlterno: 'No',
        seParaConAyuda: 'No',
        bipedestacionConApoyo: 'No',
        bipedestacionIndependiente: 'No',
        pasosSueltos: 'No',
        palabras4a6: 'No',
        respondePorSuNombre: 'No',
        cumpleOrdenesComplejas: 'No',
        respondeEstimuloSonoro: 'No',

        examenIndicado: {
          resuelto: false,
          resultado: '',
          // otra_indicacion: '',
          examen: '',
        },
      };

      var mostrarDesPscoMot = false;
      $http.get('/medico/' + idMedico).then(medicoResult => {
        $scope.consulta.medico = medicoResult.data;
        return $http.get('/paciente/' + idPaciente);
      }).then(pacienteResult => {
        $scope.consulta.paciente = pacienteResult.data;
        var consultaNombre = $scope.consulta.medico.especialidad.nombre;

        if (consultaNombre == 'Logopedia-Foneatría') {
          $scope.permit_records = true;
        }

        if (consultaNombre == 'Pediatría' || consultaNombre == 'Neonatología') {
          console.log('$scope.consulta.paciente.fechaNacimiento', $scope.consulta.paciente.fechaNacimiento);
          $scope.title =
            `Consulta Central de Neurodesarrollo y la Discapacidad Infantil 
            - (Especialidad:  ${$scope.consulta.medico.especialidad.nombre}). 
              - Paciente:  ${$scope.consulta.paciente.nombre} ${$scope.consulta.paciente.apellidos} \n
              - Edad actual: ${$scope.calcularEdadActual($scope.consulta.paciente.fechaNacimiento)}`;
          $scope.permit_records = true;
        }
        else {
          $scope.title =
            `Nueva Consulta de la Especialidad:  ${$scope.consulta.medico.especialidad.nombre}
         al paciente ${$scope.consulta.paciente.nombre} ${$scope.consulta.paciente.apellidos}`;
        }
      }).catch(err => console.log(err));

      $scope.examenesPendientes = [];

      $http.get('/examenindicado/getExamenesNoResueltosPorIdPaciente?id=' + idPaciente)
        .then(result => {
          $scope.examenesPendientes = result.data;
          console.log('examenesPendientes', $scope.examenesPendientes);
          console.log('result.data', result.data);
        }).catch(err => {
        console.log('error examenes resueltos', err);
      });
      $scope.examArray = [];
      $scope.remisionesArray = [];

      $scope.adicionar = function (dato, arreglo) {
        if (!dato) {
          return;
        }
        if (arreglo.indexOf(dato) != -1) {
          return;
        }
        arreglo.push(dato);
      };

      $scope.adicionarExamen = function () {
        $scope.adicionar($scope.data.selected_exam, $scope.examArray);
      };

      $scope.adicionarRemision = function () {
        $scope.adicionar($scope.data.nuevaRemision, $scope.remisionesArray);
      };

      /* $scope.adicionarRecord = function () {
       $scope.adicionar($scope.data.nuevaRemision, $scope.remisionesArray);
       };*/
//Se esta usando remisión para definir la creción de consultas de salas diferentes
      $scope.save = () => {
        $http.post('/consulta', {    //ORM
          consulta: $scope.consulta,
          examenes: $scope.examArray,    //ORU para resultados de examenes
          examenesPendientes: $scope.examenesPendientes,//ORM-O 01
          remision: idRemision,  
          //QBP para remisiones realizadas a una consulta específica
        // Criterio de consulta remision que se realizo de esta especialidad 
        //Remisión que llegó a esta especialidad
          remisiones: $scope.remisionesArray, 
          motivoRemision: $scope.data.motivoNuevaRemision,//REF Nueva Remisión de Pacientes
        }).then(result => {
          // console.log("Success: ");
          //console.log(result);
          window.location = '#!/backend/consulta/show/' + result.data.id;
        }).catch(err => {
          console.log(err);
          $scope.error = err;
        });
      };
    }
  )


//INDEX
myApp.controller('ConsultaIndexController',
  function ($scope, ConsultaResource, PacienteResource, $routeParams, $http) {

    idPaciente = $routeParams.idPaciente;

    $scope.consultas = [];
    console.log('idPaciente', $routeParams.idPaciente);

    $http.get('/consulta/findByPacienteId?idPaciente=' + idPaciente).then(result => {
      $scope.consultas = result.data;

      console.log('consultas del paciente ' + idPaciente, $scope.consultas);
      console.log('$scope.consultas.medico.especialidad', $scope.consultas.medico.especialidad);
    }).catch(err => {
      console.log('error en /consulta/findByPacienteId?idPacient', err.data);
    });
  }
)

//SHOW
  .controller('ConsultaShowController',
    function ($scope, $routeParams, ConsultaResource, $http) {
      idConsulta = $routeParams.idConsulta
      /*
       $scope.click = function() {
       var doc = new jsPDF();
       doc.text(20, 20, 'Hello world 222!');
       doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.');
       doc.addPage();
       doc.text(20, 20, 'Do you like that?');
       // Save the PDF
       doc.save('Test.pdf');
       };
       */
      $scope.HTMLclick = function () {

        console.log('vdsnvcdgcsdc');
        var divPDF = angular.element('HtmlData');

        var pdf = new jsPDF('p', 'pt', 'letter');

        // source can be HTML-formatted string, or a reference
        // to an actual DOM element from which the text will be scraped.

        var source = divPDF.data();
        console.log(source);

        var specialElementHandlers = {
          // element with id of "bypass" - jQuery style selector
          '#bypassme': function (element, renderer) {
            // true = "handled elsewhere, bypass text extraction"
            return true;
          }
        };

        var margins = {
          top: 80,
          bottom: 60,
          left: 40,
          width: 522
        };

        console.log("Building  HTML" + source);
        // all coords and widths are in jsPDF instance's declared units
        // 'inches' in this case
        pdf.fromHTML(
          source // HTML string or DOM elem ref.
          , margins.left // x coord
          , margins.top // y coord
          , {
            'width': margins.width // max width of content on PDF
            ,
            'elementHandlers': specialElementHandlers
          },
          function (dispose) {
            // dispose: object with X, Y of the last line add to the PDF
            //          this allow the insertion of new lines after html

            //Didn't work
            //   console.log("Saving HTMLclick");
            // pdf.save('Test.pdf');
          },
          margins
        );

        console.log("after from HTML.");
        // pdf.save('Test.pdf');

      };


      $http.get('/consulta/findById?id=' + $routeParams.id).then(result => {
        $scope.consulta = result.data;
        console.log('$scope.consulta', $scope.consulta);
        console.log($scope.consulta.listaRemisiones.especialidad_destino.nombre);
        /*
         $scope.paciente.municipio = $scope.paciente.areaSalud.municipio;
         $scope.paciente.fechaNacimiento = new Date($scope.paciente.fechaNacimiento);
         $scope.familiar = $scope.paciente.familiares[0];*/
      }).catch(err => {
        console.log(err);
        $scope.error = err.data.message;
      });
    }
  );


