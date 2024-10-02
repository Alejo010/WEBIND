
//Cambiar nombre de : myApp.controller('PacienteCreateController'
// Y poner igual que el nombre del archivo y la declaración de la ruta
myApp.controller('PacienteCreateController', function ($scope, $location, PacienteResource, HospitalResource,
    AreaSaludResource, MunicipioResource, SexoResource,
    ProvinciaResource, RazaResource, MovimientoFetalResource,
    TipoPartoResource, ParentezcoResource, NivelEscolaridadResource, LlantoResource,
    ApiService, API_ROUTE, $http) {

// Obtener el usuario logueado
$http.post('/usuario/getUserLogged').then(function (response) {
var user = response.data;
var idMedico = user.medicos[0].id;
var especialidad = user.medicos[0].especialidad.nombre;
var especialidadId = user.medicos[0].especialidad.id;

$scope.medico = { id: idMedico };
}).catch(err => {
console.log(err);
});

// Inicialización de variables y configuración
$scope.nombreInvalido = false;
$scope.apellidoInvalido = false;
$scope.datosValidos = false;
$scope.mostarCartelFecha = false;
$scope.ucinOptions = [
{ value: false, label: 'No' },
{ value: true, label: 'Si' }
];
$scope.title = 'Insertar un nuevo paciente.';
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
fechaNacimiento: '',
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

// Cargar recursos
NivelEscolaridadResource.query().$promise.then((result) => {
$scope.nivelesEscolares = result;
$scope.familiar.nivelEscolaridad = $scope.nivelesEscolares[0].id;
});
ParentezcoResource.query().$promise.then((result) => {
$scope.parentezcos = result;
$scope.familiar.parentezco = $scope.parentezcos[0].id;
$scope.antFamiliar.parentezco = $scope.parentezcos[0].id;
});
TipoPartoResource.query().$promise.then((result) => {
$scope.tiposParto = result;
$scope.paciente.antecedente.antPerinatal.tipoParto = $scope.tiposParto[0].id;
});
LlantoResource.query().$promise.then((result) => {
$scope.llantos = result;
$scope.paciente.antecedente.antPostnatal.llanto = $scope.llantos[0].id;
});
MovimientoFetalResource.query().$promise.then((result) => {
$scope.movimientosF = result;
$scope.paciente.antecedente.antPrenatal.movimientoFetal = $scope.movimientosF[0].id;
});
RazaResource.query().$promise.then((result) => {
$scope.razas = result;
$scope.paciente.raza = $scope.razas[0].id;
});
SexoResource.query().$promise.then((result) => {
$scope.sexos = result;
$scope.paciente.sexo = $scope.sexos[0].id;
});
HospitalResource.query().$promise.then((result) => {
$scope.hospitales = result;
$scope.paciente.hospital = $scope.hospitales[0].id;
});
ProvinciaResource.query().$promise.then((result) => {
$scope.provincias = result;
$scope.data.provincia = $scope.provincias[1];
console.log('$scope.provincias[1]', $scope.provincias[1]);
$scope.selProvincias();
});

// Funciones para seleccionar provincias y municipios
$scope.selProvincias = function () {
let idProvincia = $scope.data.provincia.id;
if (idProvincia) {
ApiService.post(API_ROUTE.MUNICIPIO_POR_PROVINCIA, { idProvincia }).then(function (response) {
  const { municipios } = response.data;
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
if (idMunicipio) {
ApiService.post(API_ROUTE.AREA_SALUD_POR_MUNICIPIO, { idMunicipio }).then(function (response) {
  const { areas } = response.data;
  $scope.areasSalud = areas;
  console.log('areas', areas);
  $scope.paciente.areaSalud = $scope.areasSalud[0];
});
}
};

// Calcular la edad del paciente
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

// Guardar el nuevo paciente
// La función save se declaro como asincorona porque no dejaba ejecutar await para convertir hacia HLv2
$scope.save = async () => {
$scope.error = '';
var idPac = '';

//A partir de aquí se implemnata la logica de craeción y envío del mensaje HL/v2
if ($scope.datosValidos) {
    try {
        // Crear el mensaje HL7v2
        // Generar ID dinámico
       const idDinamico = Date.now().toString() + Math.floor(Math.random() * 1000).toString();
      
      //Agrandar estructura de datos aquí y en el mensaje HL7v2
        const Datos = {
          nombreSisEmisor: 'Webind',
          nombreSisReceptor: 'Webind',
          nombreConsultaEmisora: 'Neonatología y Discapacidad Infantil',//Esto debe ser indentificado antes de asignarse
          nombreConsultaReceptora: 'Neonatología y Discapacidad Infantil',//Esto debe ser indentificado antes de asignarse
          ci: $scope.paciente.ci,
          hc: $scope.paciente.hc,
          nombre: $scope.paciente.nombre,
          apellido: $scope.paciente.apellidos,
          sexo: $scope.paciente.sexo,
          id: '1245' // Este ID debería generarse dinámicamente
          //id: idDinamico
        };
        const jsData = structureADT_A01(Datos);
        const hl7Message = await convertirJsAHL7(jsData);
      // Enviar el mensaje HL7v2 al servidor a la ruta /paciente
      $http.post('/paciente', {  
        hl7Message: hl7Message
      }).then(result => {
        idPac = result.data[1].id;
        console.log("idPac: ", idPac);//Cadena vacía que guarda id luego de guardar los datos del paciente
        console.log("Before redirecting...");
        window.location = '#!/backend/paciente/show/' + idPac;
      }).catch(err => {
        console.log(err);
        $scope.error = err;
      });
    } catch (error) {
      console.error(error);
      $scope.error = 'Error al generar el mensaje HL7v2';
    } } else {
        $scope.mostarCartelFecha = true;
      }
    };
});



//Parte que se cambió para agragar la lógica de generar mensaje HL7v2
/* $http.post('/paciente', {
  familiar: $scope.familiar,
  paciente: $scope.paciente,
  antFamiliar: $scope.antFamiliar,
}).then(result => {
  idPac = result.data[1].id;
  console.log("idPac: ", idPac);
  console.log("Before redirecting...");
  window.location = '#!/backend/paciente/show/' + idPac;
}).catch(err => {
  console.log(err);
  $scope.error = err;
});
} else {
$scope.mostarCartelFecha = true;
    }
  };
});*/



//Generar El codigo correspondiente para Búsqueda de PAciente Por CI o HC