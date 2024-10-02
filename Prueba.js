//Puede eliminar estos ejemplos de uso ser necesario

//const hl7Converter = require('./node_modules/node-hl7-complete/index');
const NodeHL7Complete = require('./node_modules/node-hl7-24/index');

// Create an instance of the module
const hl7Converter = new NodeHL7Complete();

function formatHL7DateLocal(date) {
  return date.getFullYear() +
         ('0' + (date.getMonth() + 1)).slice(-2) +
         ('0' + date.getDate()).slice(-2) +
         ('0' + date.getHours()).slice(-2) +
         ('0' + date.getMinutes()).slice(-2) +
         ('0' + date.getSeconds()).slice(-2);
}

var Datos = {
  nombreSisEmisor: 'Webind',
  nombreSisReceptor: 'Webind',
  nombreConsultaEmisora: 'Neonatología y Discapacidad Infantil',
  nombreConsultaReceptora: 'Neonatología y Discapacidad Infantil',
  ci: '123456',
  hc: '13025',
  nombre: 'John',
  apellido: 'Doe',
  sexo: 'M',
  antecedenteMadre: 'ninguno, toma',
  antecedentePadre: 'ninguno',
  sintomas: 'dolor',
  raza: 'Blanco',
  id: '1245'
  //PatientID: '25130'
};


// Objeto JSON de ejemplo con la estructura de un mensaje HL7
function Asignar(Datos) {
  const jsData = {
    ADT_A01: {
      MSH: {
        'MSH.1': '|',
        'MSH.2': '^~\\&',
        'MSH.3': { 'HD.1': Datos.nombreSisEmisor },
        'MSH.4': { 'HD.1': Datos.nombreConsultaEmisora },
        'MSH.5': { 'HD.1': Datos.nombreSisReceptor },
        'MSH.6': { 'HD.1': Datos.nombreConsultaReceptora },
        'MSH.7': { 'TS.1': formatHL7DateLocal(new Date()) },
        'MSH.9': { 'MSG.1': 'ADT', 'MSG.2': 'A01' },
        'MSH.10': Datos.id,
        'MSH.11': { 'PT.1': 'P' },
        'MSH.12': { 'VID.1': '2.5' },
      },
      PID: {
        'PID.1': '1',//Identifica el conjunto de datos dentro del mensaje. Logitud de 4 caracteres
        'PID.2': { 'CX.1': Datos.ci } ,//Numero de indentificación del paciente CI
        'PID.3': { 'CX.1': Datos.hc },//Identificadores alternativos HC u otros
        'PID.5': {
          'XPN.1': { 'FN.1': Datos.apellido }, // Apellido
          'XPN.2': Datos.nombre, // Nombre
        },
        'PID.6': {
          'XPN.1': { 'FN.1': 'pare' }, // Apellido para la madre
          'XPN.2': 'madre', // Nombre para la madre
        },
        'PID.7': { 'TS.1': '19800101' }, // Campo de fecha de nacimiento
        'PID.8': Datos.sexo, //Género del paciente
      
        "PID.10": {
          'CE.1': 'Blanco',                      // Descripción textual
          /*'CE.4': '01',                          // Identificador alternativo
          'CE.5': 'Caucásico',                   // Texto alternativo
          'CE.6': 'Sistema de codificación alternativo'*/ // Sistema de codificación alternativo
        },
        'PID.11': { 
          'XAD.1': { 'SAD.1': '123 Main St' }, //Calle o número de casa o apartamento
                    'XAD.3': 'Redmond', //Cuidad o localidad o Municipio
                    'XAD.4': 'WA', //Estado o Provincia
                    'XAD.5': '98052' }, //Codigo postal
        'PID.13': { 
          'XTN.1': '(425)555-1234'  // Número de teléfono
        },
      },
      'PV1': {
        'PV1.1': '1', // Set ID - PV1
        'PV1.2': 'I', // Patient Class
        'PV1.3': { 'PL.1': 'Emergency' }, // Assigned Patient Location
        'PV1.7': { 'XCN.1': 'Consulting doctor' }, // Attending Doctor
        'PV1.19': { 'CX.1': 'Admitting doctor' } // Admitting Doctor
      }
      /*IN1: {
        'IN1.1': '1',
        'IN1.3': 'InsuranceCompanyID',
        'IN1.4': 'InsuranceCompanyName',
        'IN1.13': 'PolicyNumber',
      },
      OBR: {
        'OBR.1': '1',
        'OBR.4': { 'CE.1': 'TestCode', 'CE.2': 'TestDescription' },
      },
      OBX: {
        'OBX.1': '1',
        'OBX.2': 'TX',
        'OBX.3': { 'CE.1': 'ObservationCode', 'CE.2': 'ObservationDescription' },
        'OBX.5': 'ObservationValue',
      }*/
    }
  };
  return jsData;
}
var jsData = Asignar(Datos);

// Convertir objeto JavaScript a mensaje HL7
hl7Converter.jsToHl7('ADT_A01', jsData, (error, hl7Message) => {
  if (error) {
    console.error('Error al convertir objeto JavaScript a mensaje HL7:', error);
  } else {
    console.log('Objeto JavaScript convertido a mensaje HL7:');
    console.log(hl7Message.split('\r').join('\n'));
  }
});