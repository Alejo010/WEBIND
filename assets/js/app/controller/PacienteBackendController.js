/**
 * Created by WebIND on 25/5/2018.
 */

// let faker = require('faker');// Comentado, no se usa en el código actual
// Controlador para la lista de pacientes
myApp.controller('PacienteIndexController',
  function ($scope, PacienteResource, $http) {
    $scope.pacientes = [];

    //$scope.pacientes = PacienteResource.query(); // Comentado, se usa otra forma de obtener los pacientes
    //console.log("$scope.pacientes", $scope.pacientes);

    // Obtener el usuario logueado
    $http.post('/usuario/getUserLogged').then(function (response) {
      var user = response.data;
      // console.log('response.data', response.data);
      var idMedico = user.medicos[0].id;
      var especialidad = user.medicos[0].especialidad.nombre;
      var especialidadId = user.medicos[0].especialidad.id;

      $scope.medico = {
        id: idMedico,
        // especialidad: med
      };
      // console.log('especialidad', especialidad);
   // Configurar el título y la ruta para obtener pacientes según la especialidad del médico
      if (especialidad == "Pediatría" || especialidad == "Neonatología") {
        $scope.mostrarEdic_Elim = true;
        $scope.title = 'Listado de Pacientes de la Consulta Provincial de Neurodesarrollo y la Discapacidad Infantil'; //+ especialidad+ ' ,total '+pacientes.length;
        return $http.get('/paciente/')
      }
      $scope.mostrarEdic_Elim = false;
      ruta = '/paciente/findPacientesByEspecialidad/?especialidadId=' + especialidadId;
      return $http.get(ruta);
    }).then(response => {
      $scope.pacientes = response.data;
    }).catch(err => {
      console.log(err);
      //$scope.error = err.data.message;
    });

// Función para eliminar un paciente
    $scope.remove = (paciente) => {
      PacienteResource.delete({id: paciente.id})
        .$promise
        .then(result => {
          //console.log(JSON.stringify(result));
          //console.log('dd');

          if (result.error) {
            $scope.error = result.error;
          } else {
            $scope.error = '';
            $scope.pacientes = $scope.pacientes.filter(v => paciente.id !== v.id);
          }
        })
        .catch(err => console.log(err));
    };

  }
)
//-------------------------------------------------------------------------------------------------
// Controlador para insertar un nuevo paciente
  .controller('PacienteNewController',
    function ($scope, $location, PacienteResource, HospitalResource,
              AreaSaludResource, MunicipioResource, SexoResource,
              ProvinciaResource, RazaResource, MovimientoFetalResource,
              TipoPartoResource, ParentezcoResource, NivelEscolaridadResource, LlantoResource,
              ApiService, API_ROUTE, $http) {


                

      $scope.nombreInvalido = false;
      $scope.apellidoInvalido = false;
      $scope.datosValidos = false;
      $scope.mostarCartelFecha = false;

      $scope.ucinOptions = [{
        value: false,
        label: 'No'
      },
        {
          value: true,
          label: 'Si'
        }
      ];
      $scope.title = 'Insertar un nuevo paciente.';
      // $scope.paciente = {
      //   hc: '',
      //   nombre: '',
      //   apellidos: '',
      //
      //   ci: '',
      //   direccion: '',
      //   hospital: '-1',
      //   municipio: {},
      //   areaSalud: {},
      //   raza: '-1',
      //   sexo: '-1',
      //   antecedente: {
      //     antPrenatal: {
      //       edadMaterna: '',
      //       habitosToxicosMadre: '',
      //       alteracionesEcosonograficas: '',
      //       antObstetricos: '',
      //       enfermedadesMaternasAgudas: '',
      //       antEnfCronicaMaterna: '',
      //       movimientoFetal: '-1',
      //       otros: '',
      //     },
      //     antPerinatal: {
      //       tipoParto: '-1',
      //       pesoAlNacer: '',
      //       talla: '',
      //       circunfCefalica: '',
      //       apgar: '',
      //       descripcionParto: '',
      //       observaciones: '',
      //       horasTrabajoParto: '',
      //       complicacionesAlNacer: '',
      //       edadGestacionalParto: '',
      //       requirioUcin: '',
      //       tiempoHospitalizacion: '',
      //       otros: '',
      //     },
      //     antPostnatal: {
      //       infeccionesSnc: '',
      //       infeccionesSistemicas: '',
      //       traumatismosCraneales: '',
      //       cardiopatia: '',
      //       otros: '',
      //     },
      //     antPersonal: {
      //       otros: ''
      //     },
      //   }
      // };
  // Inicializar objeto paciente con valores predeterminados
      $scope.paciente = {
        hc: '',
        nombre: '',
        apellidos: '',
        ci: '',
        direccion: '',
        provincia: {},
        municipio: {},
        areaSalud: {},
        raza: '-1',
        sexo: '-1',
        fechaNacimiento: '', // faker.date.recent(50),
        antecedente: {
          antPrenatal: {
            edadMaterna: '',
            habitosToxicosMadre: '',
            alteracionesEcosonograficas: '',
            antObstetricos: '',
            enfermedadesMaternasAgudas: '',
            antEnfCronicaMaterna: '',
            movimientoFetal: '-1',
            otros: '',
          },
          antPerinatal: {
            tipoParto: '-1',
            descripcionParto: '',
            observaciones: '',
            horasTrabajoParto: '',
            complicacionesAlNacer: '',
            edadGestacionalParto: '',
            requirioUcin: false,
            tiempoHospitalizacion: '',
            otros: '',
          },
          antPostnatal: {
            llanto: '-1',
            pesoAlNacer: '',
            talla: '',
            circunfCefalica: '',
            apgar: '',

            infeccionesSnc: '',
            infeccionesSistemicas: '',
            traumatismosCraneales: '',
            malFormaCongenitas: '',
            otros: '',
            edadAlta: '',
          },
          antPersonal: {
            otros: ''
          },
        }
      };

  // Inicializar objeto familiar con valores predeterminados
      $scope.antFamiliar = {
        padecimientos_cronicos_familiar: '',
        parentezco: '-1',
      };

      $scope.familiar = {
        parentezco: '-1',
        nombre: '',
        apellidos: '',
        telefono: '',
        nivelEscolaridad: '-1',
      };

      // $scope.provincias = ProvinciaResource.query();
  // Consultar y asignar recursos a las variables del scope
      NivelEscolaridadResource.query()
        .$promise
        .then((result) => {
          $scope.nivelesEscolares = result;
          $scope.familiar.nivelEscolaridad = $scope.nivelesEscolares[0].id;
        });

      ParentezcoResource.query()
        .$promise
        .then((result) => {
          $scope.parentezcos = result;
          $scope.familiar.parentezco = $scope.parentezcos[0].id;
          $scope.antFamiliar.parentezco = $scope.parentezcos[0].id;
        });

      TipoPartoResource.query()
        .$promise
        .then((result) => {
          $scope.tiposParto = result;
          $scope.paciente.antecedente.antPerinatal.tipoParto = $scope.tiposParto[0].id;
        });

      LlantoResource.query()
        .$promise
        .then((result) => {
          $scope.llantos = result;
          $scope.paciente.antecedente.antPostnatal.llanto = $scope.llantos[0].id;
        });

      MovimientoFetalResource.query()
        .$promise
        .then((result) => {
          $scope.movimientosF = result;
          $scope.paciente.antecedente.antPrenatal.movimientoFetal = $scope.movimientosF[0].id;
        });

      RazaResource.query()
        .$promise
        .then((result) => {
          $scope.razas = result;
          $scope.paciente.raza = $scope.razas[0].id;
        });

      SexoResource.query()
        .$promise
        .then((result) => {
          $scope.sexos = result;
          $scope.paciente.sexo = $scope.sexos[0].id;
        });

      HospitalResource.query()
        .$promise
        .then((result) => {
          $scope.hospitales = result;
          $scope.paciente.hospital = $scope.hospitales[0].id;
        });

      ProvinciaResource.query()
        .$promise
        .then((result) => {
          $scope.provincias = result;
          $scope.data.provincia = $scope.provincias[1];
          console.log('$scope.provincias[1]', $scope.provincias[1]);
          $scope.selProvincias();
        });
   // Función para seleccionar provincias y municipios
      $scope.selProvincias = function () {
        let idProvincia = $scope.data.provincia.id;

        if (idProvincia) {
          ApiService.post(API_ROUTE.MUNICIPIO_POR_PROVINCIA, {idProvincia})
            .then(function (response) {
              const {municipios} = response.data;
              console.log('Municipios', municipios);
              $scope.municipiosSel = municipios;
              $scope.paciente.municipio = $scope.municipiosSel[0];
              $scope.loading = false;
              $scope.selMunicipios();
            });
        }
      };

      $scope.selMunicipios = function () {
        let idMunicipio = $scope.paciente.municipio.id;
        // console.log('idMunicipio', idMunicipio);
        if (idMunicipio) {
          ApiService.post(API_ROUTE.AREA_SALUD_POR_MUNICIPIO, {idMunicipio})
            .then(function (response) {
              const {areas} = response.data;
              $scope.areasSalud = areas;
              console.log('areas', areas);
              $scope.paciente.areaSalud = $scope.areasSalud[0];
            });
        }
      };
    // Función para calcular la edad del paciente
      $scope.calcularEdad = () => {
        $scope.span = false;
        var hoy = new Date();
        var min = hoy.getFullYear() - 6;
        min = new Date('1/1/' + min);
        var max = hoy;

        if ($scope.paciente.fechaNacimiento >= max || $scope.paciente.fechaNacimiento < min) {
          $scope.edad = 'Fecha Incorrecta';
          $scope.datosValidos = false;
          $scope.span = true;
          return;
        }

        var cumpleanos = $scope.paciente.fechaNacimiento;
        $scope.edad = hoy.getFullYear() - cumpleanos.getFullYear();
        var m = hoy.getMonth() - cumpleanos.getMonth();

        if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
          $scope.edad--;
          $scope.datosValidos = true;
          console.log('$scope.datosValidos = true;', $scope.datosValidos);
        }
        if ($scope.edad == 0) {
          var difMilisec = hoy.getTime() - cumpleanos.getTime();
          var cantDias = difMilisec / 1000 / 60 / 60 / 24;
          if (cantDias > 30) {
            var mes = Math.floor(cantDias / 30);
            $scope.edad = mes;
            if (mes == 1) {
              $scope.edad += ' mes';
              $scope.datosValidos = true;
            } else {
              $scope.edad += ' meses';
              $scope.datosValidos = true;
            }
          } else {
            var dias0 = Math.floor(cantDias);
            if (dias0 == 0) {
              $scope.edad = 'Fecha Incorrecta';
              $scope.datosValidos = false;
              $scope.span = true;
            }
            $scope.edad = '' + Math.floor(cantDias) + ' días';
            $scope.datosValidos = true;
          }
        } else {
          $scope.edad += ($scope.edad == 1) ? ' año' : ' años';
          $scope.datosValidos = true;
        }
        $scope.paciente.edadAlta = $scope.edad;

      }

      //salvar
      // Función para guardar el paciente
      $scope.save = () => {
        $scope.error = '';
        var idPac = '';

        if ($scope.datosValidos) {
          $http.post('/paciente', {
            familiar: $scope.familiar,
            paciente: $scope.paciente,
            antFamiliar: $scope.antFamiliar,
          }).then(result => {
            idPac = result.data[1].id;
            console.log("idPac: ", idPac);
            console.log("Before redirecting...");
            window.location = '#!/backend/paciente/show/' + idPac;
            //window.location = '#!/backend/paciente/show/' + $scope.paciente.id;
            // window.location = '#!/backend/paciente/index';
          })
            .catch(err => {
              console.log(err);
              $scope.error = err;
            });
        } else {
          $scope.mostarCartelFecha = true;
        }

      };
    }
  )
  //---------------------------------------------------------------------------------------------------------------------
  // Controlador para editar un paciente
  .controller('PacienteEditController',
    function ($scope, $location, $routeParams, PacienteResource, HospitalResource,
              AreaSaludResource, MunicipioResource, SexoResource,
              ProvinciaResource, RazaResource, MovimientoFetalResource,
              TipoPartoResource, ParentezcoResource, NivelEscolaridadResource, /*AntecedenteResource,*/
              AntPrenatalResource, LlantoResource,
              ApiService, API_ROUTE, $http) {

      $scope.title = 'Editar datos del Paciente';
     
      $scope.datosValidos = true;
      
      
      $scope.paciente = {};


      $scope.ucinOptions = [{
        value: false,
        label: 'No'
      },
        {
          value: true,
          label: 'Si'
        }
      ];
      // $scope.familiar = {
      //   parentezco: '-1',
      //   nombre: 'Familiar',
      //   apellidos: 'Apellidos',
      //   ocupacion: 'Ocupación',
      //   nivelEscolaridad: '-1',
      // };

      $scope.see = () => {
        console.log('see1', $scope.paciente);
      };

    // Consultar y asignar recursos a las variables del scope
      $scope.provincias = ProvinciaResource.query();
      $scope.municipios = MunicipioResource.query();
      $scope.nivelesEscolares = NivelEscolaridadResource.query();
      $scope.parentezcos = ParentezcoResource.query();
      $scope.tiposParto = TipoPartoResource.query();
      $scope.llantos = LlantoResource.query();
      $scope.movimientosF = MovimientoFetalResource.query();
      $scope.razas = RazaResource.query();
      $scope.sexos = SexoResource.query();
      $scope.hospitales = HospitalResource.query();
    // Obtener datos del paciente para editar
      $http.get('/paciente/findPopulatedForEdit?id=' + $routeParams.id).then(result => {
        $scope.paciente = result.data;
        // console.log('result.data', result.data)
        areaSaludTemp = $scope.paciente.areaSalud;
        municipioTemp = $scope.paciente.areaSalud.municipio;
        provinciaTemp = $scope.paciente.areaSalud.municipio.provincia;
        $scope.paciente.municipio = $scope.paciente.areaSalud.municipio;
        // console.log($scope.paciente.municipio);
        $scope.paciente.fechaNacimiento = new Date($scope.paciente.fechaNacimiento);
        $scope.paciente.provincia = $scope.paciente.areaSalud.municipio.provincia;

        return $scope.selProvincias();
      }).then(next => {
        // console.log(areaSaludTemp);
        $scope.data.provincia = provinciaTemp;
        $scope.paciente.municipio = municipioTemp;
        return $scope.selMunicipios();
      }).then(next => {
        $scope.paciente.areaSalud = areaSaludTemp;
        $scope.familiar = $scope.paciente.familiares[0];
        $scope.antFamiliar = $scope.paciente.antFamiliar[0];
        // console.log($scope.antFamiliar);
        // console.log($scope.familiar);
      }).catch(err => {
        console.log(err);
        $scope.error = err.data.message;
      });
    // Función para seleccionar municipios y áreas de salud
      $scope.selMunicipios = function () {
        let idMunicipio = $scope.paciente.municipio.id;
        if (idMunicipio) {
          return ApiService.post(API_ROUTE.AREA_SALUD_POR_MUNICIPIO, {idMunicipio})
            .then(function (response) {
              // console.log('data', response.data);
              const {areas} = response.data;
              $scope.areasSalud = areas;
              $scope.paciente.areaSalud = $scope.areasSalud[0];
              $scope.loading = false;
            });
        }
      };

      $scope.selProvincias = function () {
        let idProvincia = $scope.paciente.provincia.id;
        if (idProvincia) {
          return ApiService.post(API_ROUTE.MUNICIPIO_POR_PROVINCIA, {idProvincia})
            .then(function (response) {
              //console.log('data', response.data);
              const {municipios} = response.data;
              $scope.municipiosSel = municipios;
              $scope.paciente.municipio = $scope.municipiosSel[0];
              $scope.loading = false;
              return $scope.selMunicipios();
            }).catch(err => {
              console.log(err);
            });
        }
      };
    // Función para calcular la edad del paciente
      $scope.calcularEdad = () => {
        $scope.span = false;
        var hoy = new Date();
        var min = hoy.getFullYear() - 6;
        min = new Date('1/1/' + min);
        var max = hoy;

        if ($scope.paciente.fechaNacimiento >= max || $scope.paciente.fechaNacimiento < min) {
          $scope.edad = 'Fecha Incorrecta';
          $scope.datosValidos = false;
          $scope.span = true;
          return;
        }

        var cumpleanos = $scope.paciente.fechaNacimiento;
        $scope.edad = hoy.getFullYear() - cumpleanos.getFullYear();
        var m = hoy.getMonth() - cumpleanos.getMonth();

        if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
          $scope.edad--;
          $scope.datosValidos = true;
          console.log('$scope.datosValidos = true;', $scope.datosValidos);
        }
        if ($scope.edad == 0) {
          var difMilisec = hoy.getTime() - cumpleanos.getTime();
          var cantDias = difMilisec / 1000 / 60 / 60 / 24;
          if (cantDias > 30) {
            var mes = Math.floor(cantDias / 30);
            $scope.edad = mes;
            if (mes == 1) {
              $scope.edad += ' mes';
              $scope.datosValidos = true;
            } else {
              $scope.edad += ' meses';
              $scope.datosValidos = true;
            }
          } else {
            var dias0 = Math.floor(cantDias);
            if (dias0 == 0) {
              $scope.edad = 'Fecha Incorrecta';
              $scope.datosValidos = false;
              $scope.span = true;
            }
            $scope.edad = '' + Math.floor(cantDias) + ' días';
            $scope.datosValidos = true;
          }
        } else {
          $scope.edad += ($scope.edad == 1) ? ' año' : ' años';
          $scope.datosValidos = true;
        }
        $scope.paciente.edadAlta = $scope.edad;

      }
    // Función para guardar los cambios del paciente
      $scope.save = () => {
        console.log($scope.paciente);
        console.log($scope.familiar);

        $http.put('/paciente/' + $scope.paciente.id, {
          paciente: $scope.paciente,
          familiar: $scope.familiar,
          antFamiliar: $scope.antFamiliar

        }).then(result => {

          $scope.error = '';
          console.log(result);
          window.location = '#!/backend/paciente/show/' + $scope.paciente.id;

        }).catch(err => {
          console.log(err);
          $scope.error = err
        });
      };
    }
  )
  

  //---------------------------------------------------------------------------------------------------------------------
  // Controlador para mostrar los detalles de un paciente
  .controller('PacienteShowController',
    function ($scope, $routeParams, ConsultaResource, PacienteResource, AntFamiliarResource, FamiliarResource, $http) {

      console.log('id del paciente', $routeParams.id); //id del paciente


      //-------------------------------------------
      let idPaciente = $routeParams.id;
      $scope.consultas = [];

    // Obtener consultas del paciente
      $http.get('/consulta/findByPacienteId?idPaciente=' + idPaciente).then(result => {
        $scope.consultas = result.data;
        console.log('$scope.consultas', $scope.consultas);
      }).catch(err => {
        console.log('error en /consulta/findByPacienteId?idPacient', err.data);
      });


      //-------------------------------------------
// Obtener detalles completos del paciente
      $http.get('/paciente/findfullypopulated?id=' + $routeParams.id).then(result => {

        $scope.CurrentDate = new Date();
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
      });


      $http.post('/usuario/getUserLogged').then(function (response) {
        var user = response.data;
        var idMedico = user.medicos[0].id;
        $scope.medico = {
          id: idMedico,
        };
        //console.log('idMedico', idMedico);
        //console.log('user.medicos[0]', user.medicos[0]);
      }).catch(err => {
        console.log(err);
        //$scope.error = err.data.message;
      });


    }
  )


  .controller('PacienteImprimirController',
    function ($scope, $routeParams, PacienteResource, ConsultaResource, AntFamiliarResource, FamiliarResource, $http) {

      let idPaciente = $routeParams.id;
      //console.log('id paciente', $routeParams.id);
      let nombrePan;

      $http.get('/paciente/findfullypopulated?id=' + $routeParams.id).then(result => {

        $scope.CurrentDate = new Date();
        $scope.paciente = result.data;
        nombrePan = $scope.paciente.nombre + ' ' + $scope.paciente.apellidos;

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
      });


      //-------------lo nuevo q pongo para obtener las cosultas de ese paciente--------------------------------------------

      $http.get('/consulta/findByPacienteId?idPaciente=' + idPaciente).then(result => {
        $scope.consultas = result.data;

        console.log('consultas del paciente ' + idPaciente, $scope.consultas);
        //console.log('$scope.consultas.medico.especialidad', $scope.consultas.medico.especialidad);
      }).catch(err => {
        console.log('error en /consulta/findByPacienteId?idPacient', err.data);
      });
      //---------------------------------------------------------

    // Obtener el usuario logueado
      $http.post('/usuario/getUserLogged').then(function (response) {
        var user = response.data;
        var idMedico = user.medicos[0].id;
        $scope.medico = {
          id: idMedico,
        };
        //console.log('idMedico', idMedico);
        //console.log('user.medicos[0]', user.medicos[0]);
      }).catch(err => {
        console.log(err);
        //$scope.error = err.data.message;
      });

      //-----------------GRABAR AUDIO CON ANGULARJS---------------------------------
      $scope.start_recording = function () {
        navigator.getUserMedia(session, function (mediaStream) {
          window.recordRTC = RecordRTC(MediaStream);
          recordRTC.startRecording();
        });
      };

      $scope.stop_recording = function () {
        navigator.getUserMedia({audio: true}, function (mediaStream) {
          window.recordRTC = RecordRTC(MediaStream);
          recordRTC.startRecording();
        });
      };

      //---------------FUNCION EXPORTAR A PDF con html2canvas y pdfMake------------------------------------------------

      $scope.ExportPDFMAKE_Canvas = function () {

        /* html2canvas(document.getElementById('divImprimirPDF'),
         {
         onrendered:function (canvas) {
         var img = canvas.toDataURL("image/png");
         var doc = new jsPDF();
         doc.addImage(img, 'jpg', 10,10);
         doc.save('test.pdf');
         }
         }
         );*/ //este codigo funciona pero corta el html

        html2canvas(document.getElementById('divImprimirPDF'), {

          onrendered: function (canvas) {
            var img = canvas.toDataURL("image/png");
            var doc = new jsPDF('p', 'pt', 'letter');

            // var imgWidth=300;
            // var pageHeight=295;
            var imgWidth = doc.internal.pageSize.getWidth();
            var pageHeight = doc.internal.pageSize.getHeight();

            var imgHeight = canvas.height * imgWidth / canvas.width;
            var heightLeft = imgHeight;
            console.log('canvas.height ', canvas.height);
            console.log('canvas.width ', canvas.width);


            var posicion = 6;

            doc.addImage(img, 'PNG', 6, posicion, imgWidth, imgHeight);
            console.log('pageHeight ', pageHeight);
            console.log('heightLeft ', heightLeft);
            heightLeft -= pageHeight;
            console.log('heightLeft -= pageHeight ', heightLeft);

            while (heightLeft >= 0) {
              posicion = heightLeft - imgHeight;
              console.log('posicion ', posicion);
              doc.addPage();
              doc.addImage(img, 'PNG', 5, posicion, imgWidth, imgHeight);
              heightLeft -= pageHeight;
            }
            doc.save("HC-Digital " + nombrePan + ".pdf");
            //pdfMake.createPdf(docDefi).download("HC-Digital " + nombrePan + ".pdf");*/
          }
        });

        /*
         var source = document.getElementById('divImprimirPDF');
         var hTML_Width = source.width();
         var hTML_Height = source.height();
         var topLeftMargin = 15;
         var pdfWidth = hTML_Width+(topLeftMargin*2);
         var pdfHeight = (pdfWidthf*1.5)+(topLeftMargin*2);
         var canvasIMG_W = hTML_Width;
         var canvasIMG_H = hTML_Height;

         var totalPDF_Pages = Math.ceil(hTML_Height/pdfHeight)-1;
         html2canvas(divImprimir, {
         canvas.getContext('2d');
         //errorrrrrrrr*/
      }
      //-----------------------OtroMAs------------------------------------------------------------------------


      $scope.Exporthtml2pdf = function () {

       /* var doc = new jsPDF();
        doc.text(20, 20, 'Hola mundo');
        doc.text(20, 30, 'Vamos a generar un pdf desde el lado del cliente');
// Add new page
        doc.addPage();
        doc.text(20, 20, 'Visita programacion.net');
// Save the PDF
        doc.save('documento.pdf');
        const elementoParaConvertir = document.getElementById('divImprimirPDF'); // <-- Aquí puedes elegir cualquier elemento del DOM
        var opt = {
          margin: 1,
          filename: 'myfile.pdf',
          image: {type: 'jpeg', quality: 0.98},
          html2canvas: {scale: 3, letterRendering: true},
          jsPDF: {unit: 'in', format: 'letter', orientation: 'portrait'}// landscape o portrait
        };

        html2pdf(elementoParaConvertir, opt);
*/


         var source = document.getElementById('divImprimirPDF');
         /*var hTML_Width = source.width();
         var hTML_Height = source.height();
         var topLeftMargin = 15;
         var pdfWidth = hTML_Width+(topLeftMargin*2);
         var pdfHeight = (pdfWidthf*1.5)+(topLeftMargin*2);
         var canvasIMG_W = hTML_Width;
         var canvasIMG_H = hTML_Height;

         var totalPDF_Pages = Math.ceil(hTML_Height/pdfHeight)-1;
         html2canvas(divImprimir, {
         canvas.getContext('2d');*/
        html2pdf().from(source).save();
      }

      //-----------------------OtroMAs------------------------------------------------------------------------
      $scope.OtroEjemploMAS = function () {
        var doc = new jsPDF();
        //doc.autoTable({html: 'tablaPdf'});
        var source = document.getElementById('tablaPdf');
        doc.autoTable(source);
        console.log('entro a funcion OtroEjemploMAS');
        doc.save('tabla.pdf');
      }
      //-----------------------OtroEjemplo------------------------------------------------------------------------
      $scope.OtroEjemplo = function () {
        var pdf = new jsPDF('p', 'pt', 'letter');
        var source = document.getElementById('divImprimirPDF');

        var specialElementHandlers = {}
        margins = {
          top: 80,
          bottom: 60,
          left: 40,
          width: 522
        };

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
            pdf.save('Test.pdf');
          },
          margins
        )

      }
      //---------------FUNCION EXPORTAR A PDF con ExportJSPDF------------------------------------------------
      $scope.ExportJSPDF = function () {
        console.log('entro a funcion imprimirExportJSPDF');

        var pdf = new jsPDF('p', 'pt', 'letter');

        var options = {
          format: 'JPEG',
          pagesplit: true,
          //"background": '#000'
        };

        var lolo = document.getElementById('divImprimirPDF');


        pdf.addHTML(lolo, options, function () {
          console.log('entro a pdf.addHTML');
          pdf.addPage()
          pdf.save('conchepin.pdf');
        });


        /*

         var miHandler = {};
         margins = {
         top: 10, bottom: 20, left: 20, width: 545
         };*/
        /*pdf.fromHTML(
         source,
         margins.left,
         margins.top,
         {
         'width': margins.width
         },
         function (dispose) {
         pdf.save('conchepin.pdf');
         }
         );*/
        // pdf.text(10,10,html); no funciona
        /*pdf.fromHTML(source, margins.left, margins.top, {'width': margins.width},
         function (dispose) {
         pdf.save('conchepin.pdf')
         }, margins
         );*/
        // pdf.html(10,10,html)

        //pdf.save('conchepin.pdf');
      }

      //-----------------------OtroMAs------------------------------------------------------------------------


      // pdf.fromHTML(source,10,10,500);

      //  pdf.save('lololo.pdf');
      /* specialElementHandlers = {
       '#bypassme': function(element, renderer){
       return true
       }
       }
       margins = {
       top: 10,
       left: 10,
       width: 500
       };
       pdf.fromHTML(
       source // HTML string or DOM elem ref.
       , margins.left // x coord
       , margins.top // y coord
       , {
       'width': margins.width // max width of content on PDF
       , 'elementHandlers': specialElementHandlers
       },
       function (dispose) {
       // dispose: object with X, Y of the last line add to the PDF
       //          this allow the insertion of new lines after html
       pdf.save('prueba1.pdf');
       }
       )*/

      //docc.text.getElementById('divImprimirPDF');
      // docc.save('a4.pdf');

      /*
       html2canvas(document.getElementById('divImprimirPDF'), {
       windowWidth:document.getElementById('divImprimirPDF').scrollWidth,
       windowHeight:document.getElementById('divImprimirPDF').scrollHeight,
       onrendered: function (canvas) {
       var data = canvas.toDataURL();
       var docDefi = {
       content: [{
       image: data,
       width: 500,
       pageSize: 'letter',
       // height:'1000',
       }],
       pageBreakBefore:function (currentNode, followingNodesOnPages, nodesOnNextPage, previousNodesOnPage) {
       return currentNode.headlineLevel === 1 && followingNodesOnPages.length ===0;
       }
       };
       pdfMake.createPdf(docDefi).download("HC-Digital " + nombrePan + ".pdf");
       }
       });*/

    }
  );
