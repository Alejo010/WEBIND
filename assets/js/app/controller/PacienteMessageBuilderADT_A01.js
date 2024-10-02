// Filename: HL7MessageController.js
const NodeHL7Complete = require("node-hl7-24");// Importa la biblioteca Node-HL7-24
const hl7Converter = new NodeHL7Complete();

//A la etrcutra del mesnaje hay que agragarle EL segemnto OBX con el finde 
//Tarnsmitir los antecedentes Pre,pos,perinatales del paciente
//Ejemplo OBX tipo de antecedente y NTE-> todas los datos que este puede tener
/*
OBX|1|CE|169999^.^L||SPRCS|||||N|F|||19980728130600|BN
NTE|1|L|NOTA: Presentación de suero
NTE|2|L|tubo separador recomendado
NTE|3|L|para esta prueba. Gracias
NTE|4|L|por su colaboración si
NTE|5|L|ya lo están haciendo.
*/
// Función para formatear la fecha y hora en el formato HL7
function formatHL7DateLocal(date) {
  return date.getFullYear() + // Año
         ('0' + (date.getMonth() + 1)).slice(-2) + // Mes (con ceros a la izquierda)
         ('0' + date.getDate()).slice(-2) + // Día (con ceros a la izquierda)
         ('0' + date.getHours()).slice(-2) + // Hora (con ceros a la izquierda)
         ('0' + date.getMinutes()).slice(-2) + // Minutos (con ceros a la izquierda)
         ('0' + date.getSeconds()).slice(-2); // Segundos (con ceros a la izquierda)
}

// Función para estructurar el mensaje ADT_A01
function structureADT_A01(Datos) {
  const jsData = {
    ADT_A01: {
      MSH: {
        'MSH.1': '|', // Separador de campo
        'MSH.2': '^~\\&', // Caracteres de codificación
        'MSH.3': { 'HD.1': Datos.nombreSisEmisor }, // Nombre del sistema emisor
        'MSH.4': { 'HD.1': Datos.nombreConsultaEmisora }, // Nombre de la consulta emisora
        'MSH.5': { 'HD.1': Datos.nombreSisReceptor }, // Nombre del sistema receptor
        'MSH.6': { 'HD.1': Datos.nombreConsultaReceptora }, // Nombre de la consulta receptora
        'MSH.7': { 'TS.1': formatHL7DateLocal(new Date()) }, // Fecha y hora del mensaje
        'MSH.9': { 'MSG.1': 'ADT', 'MSG.2': 'A01' }, // Tipo de mensaje (ADT^A01)
        'MSH.10': Datos.id, // ID del mensaje
        'MSH.11': { 'PT.1': 'P' }, // Tipo de procesamiento (P para producción)
        'MSH.12': { 'VID.1': '2.5' }, // Versión del HL7
      },
      EVN: {
        'EVN.1': 'A01', // Código del evento (A01 para admisión de paciente)
        'EVN.2': formatHL7DateLocal(new Date()) // Fecha y hora del evento
      },
      PID: {
        'PID.1': '1', // Número de secuencia del segmento PID
        'PID.2': { 'CX.1': Datos.ci }, // Identificación del paciente (CI)
        'PID.3': { 'CX.1': Datos.hc }, // Historia clínica del paciente (HC)
        'PID.5': {
          'XPN.1': { 'FN.1': Datos.apellido }, // Apellido del paciente
          'XPN.2': Datos.nombre, // Nombre del paciente
        },
        'PID.7': { 'TS.1': Datos.fechaNacimiento }, // Fecha de nacimiento del paciente
        'PID.8': Datos.sexo, // Sexo del paciente
        'PID.10': {
          'CE.1': Datos.raza, // Raza del paciente
        },
        'PID.11': {
          'XAD.1': { 'SAD.1': Datos.direccion }, // Dirección del paciente
          'XAD.3': Datos.ciudad, // Ciudad del paciente
          'XAD.4': Datos.provincia, // Provincia del paciente
          'XAD.5': Datos.codigoPostal, // Código postal del paciente
          'XAD.6': Datos.pais, // País del paciente
        },
        'PID.13': {
          'XTN.1': Datos.telefono, // Teléfono del paciente
        },
      },
      PV1: {
        'PV1.1': '1', // Número de secuencia del segmento PV1
        'PV1.2': 'I', // Tipo de paciente (I para paciente interno)
        'PV1.3': {
          'PL.1': Datos.unidadAtencion, // Unidad de atención
          'PL.2': Datos.habitacion, // Habitación del paciente
          'PL.3': Datos.cama, // Cama del paciente
        },
        'PV1.7': {
          'XCN.1': Datos.idMedico, // ID del médico
          'XCN.2': {
            'FN.1': Datos.apellidoMedico, // Apellido del médico
            'XPN.2': Datos.nombreMedico, // Nombre del médico
          },
        },
        'PV1.44': { 'TS.1': formatHL7DateLocal(new Date()) }, // Fecha y hora de admisión
      },
      OBX: [
        {
          'OBX.1': '1', // Número de secuencia del segmento OBX
          'OBX.2': 'TX', // Tipo de dato (TX para texto)
          'OBX.4': 'Prenatal Historial Prenatal', // Tipo de antecedente (prenatal)
          'OBX.5': 'Todos los detalles de este antecedente en segmento de Notas', // Detalles del antecedente
          'OBX.11': 'F', // Estado del resultado de la observación (F para final)
        },
        {
          'OBX.1': '2', // Número de secuencia del segmento OBX
          'OBX.2': 'TX', // Tipo de dato (TX para texto)
          'OBX.4': 'Perinatal Historial Perinatal', // Tipo de antecedente (perinatal)
          'OBX.5': 'Todos los detalles de este antecedente en segmento de Notas', // Detalles del antecedente
          'OBX.11': 'F', // Estado del resultado de la observación (F para final)
        },
        {
          'OBX.1': '3', // Número de secuencia del segmento OBX
          'OBX.2': 'TX', // Tipo de dato (TX para texto)
          'OBX.4': 'Posnatal Historial Posnatal', // Tipo de antecedente (posnatal)
          'OBX.5': 'Todos los detalles de este antecedente en segmento de Notas', // Detalles del antecedente
          'OBX.11': 'F', // Estado del resultado de la observación (F para final)
        },
        {
          'OBX.1': '4', // Número de secuencia del segmento OBX
          'OBX.2': 'TX', // Tipo de dato (TX para texto)
          'OBX.4': 'Familial Historial Familiar', // Tipo de antecedente (familiar)
          'OBX.5': 'Todos los detalles de este antecedente en segmento de Notas', // Detalles del antecedente
          'OBX.11': 'F', // Estado del resultado de la observación (F para final)
        },
      ],
      NTE: [
        // Antecedentes Prenatales
        { 'NTE.1': '1', 'NTE.2': 'OBX-1', 'NTE.3': Datos.antecedentesPreNatales.habitosToxicos }, // Nota sobre hábitos tóxicos
        { 'NTE.1': '2', 'NTE.2': 'OBX-1', 'NTE.3': Datos.antecedentesPreNatales.edadMaterna }, // Nota sobre edad materna
        { 'NTE.1': '3', 'NTE.2': 'OBX-1', 'NTE.3': Datos.antecedentesPreNatales.movimientoFetal }, // Nota sobre movimiento fetal
        { 'NTE.1': '4', 'NTE.2': 'OBX-1', 'NTE.3': Datos.antecedentesPreNatales.enfermedadesMaternasAgudas }, // Nota sobre enfermedades maternas agudas
        { 'NTE.1': '5', 'NTE.2': 'OBX-1', 'NTE.3': Datos.antecedentesPreNatales.otros }, // Nota sobre otros antecedentes prenatales
        // Antecedentes Perinatales
        { 'NTE.1': '6', 'NTE.2': 'OBX-2', 'NTE.3': Datos.antecedentesPeriNatales.tipoParto }, // Nota sobre tipo de parto
        { 'NTE.1': '7', 'NTE.2': 'OBX-2', 'NTE.3': Datos.antecedentesPeriNatales.descripcionParto }, // Nota sobre descripción del parto
        { 'NTE.1': '8', 'NTE.2': 'OBX-2', 'NTE.3': Datos.antecedentesPeriNatales.observaciones }, // Nota sobre observaciones del parto
        { 'NTE.1': '9', 'NTE.2': 'OBX-2', 'NTE.3': Datos.antecedentesPeriNatales.horasTrabajoParto }, // Nota sobre horas de trabajo de parto
        { 'NTE.1': '10', 'NTE.2': 'OBX-2', 'NTE.3': Datos.antecedentesPeriNatales.complicacionesAlNacer }, // Nota sobre complicaciones al nacer
        { 'NTE.1': '11', 'NTE.2': 'OBX-2', 'NTE.3': Datos.antecedentesPeriNatales.edadGestacionalParto }, // Nota sobre edad gestacional al parto
        { 'NTE.1': '12', 'NTE.2': 'OBX-2', 'NTE.3': Datos.antecedentesPeriNatales.requirioUcin }, // Nota sobre si requirió UCIN
        { 'NTE.1': '13', 'NTE.2': 'OBX-2', 'NTE.3': Datos.antecedentesPeriNatales.tiempoHospitalizacion }, // Nota sobre tiempo de hospitalización
        { 'NTE.1': '14', 'NTE.2': 'OBX-2', 'NTE.3': Datos.antecedentesPeriNatales.otros }, // Nota sobre otros antecedentes perinatales
        // Antecedentes Posnatales
        { 'NTE.1': '15', 'NTE.2': 'OBX-3', 'NTE.3': Datos.antecedentesPosNatales.llanto }, // Nota sobre llanto
        { 'NTE.1': '16', 'NTE.2': 'OBX-3', 'NTE.3': Datos.antecedentesPosNatales.pesoAlNacer }, // Nota sobre peso al nacer
        { 'NTE.1': '17', 'NTE.2': 'OBX-3', 'NTE.3': Datos.antecedentesPosNatales.talla }, // Nota sobre talla
        { 'NTE.1': '18', 'NTE.2': 'OBX-3', 'NTE.3': Datos.antecedentesPosNatales.circunfCefalica }, // Nota sobre circunferencia cefálica
        { 'NTE.1': '19', 'NTE.2': 'OBX-3', 'NTE.3': Datos.antecedentesPosNatales.apgar }, // Nota sobre puntaje APGAR
        { 'NTE.1': '20', 'NTE.2': 'OBX-3', 'NTE.3': Datos.antecedentesPosNatales.infeccionesSnc }, // Nota sobre infecciones SNC
        { 'NTE.1': '21', 'NTE.2': 'OBX-3', 'NTE.3': Datos.antecedentesPosNatales.infeccionesSistemicas }, // Nota sobre infecciones sistémicas
        { 'NTE.1': '22', 'NTE.2': 'OBX-3', 'NTE.3': Datos.antecedentesPosNatales.traumatismosCraneales }, // Nota sobre traumatismos craneales
        { 'NTE.1': '23', 'NTE.2': 'OBX-3', 'NTE.3': Datos.antecedentesPosNatales.malFormaCongenitas }, // Nota sobre malformaciones congénitas
        { 'NTE.1': '24', 'NTE.2': 'OBX-3', 'NTE.3': Datos.antecedentesPosNatales.otros }, // Nota sobre otros antecedentes posnatales
        // Antecedentes Familiares
        { 'NTE.1': '25', 'NTE.2': 'OBX-4', 'NTE.3': Datos.antecedentesFamiliares.diabetes }, // Nota sobre diabetes
        { 'NTE.1': '26', 'NTE.2': 'OBX-4', 'NTE.3': Datos.antecedentesFamiliares.hipertension }, // Nota sobre hipertensión
        { 'NTE.1': '27', 'NTE.2': 'OBX-4', 'NTE.3': Datos.antecedentesFamiliares.cardiopatias }, // Nota sobre cardiopatías
        { 'NTE.1': '28', 'NTE.2': 'OBX-4', 'NTE.3': Datos.antecedentesFamiliares.enfermedadesGeneticas }, // Nota sobre enfermedades genéticas
        { 'NTE.1': '29', 'NTE.2': 'OBX-4', 'NTE.3': Datos.antecedentesFamiliares.otros }, // Nota sobre otros antecedentes familiares
      ],
    }
  };
  return jsData; // Retorna el objeto JavaScript con la estructura del mensaje HL7
}

// Función para convertir el objeto JavaScript a un mensaje HL7
function convertirJsAHL7(jsData) {
  return new Promise((resolve, reject) => {
    hl7Converter.jsToHl7('ADT_A01', jsData, (error, hl7Message) => {
      if (error) {
        reject('Error al convertir objeto JavaScript a mensaje HL7: ' + error); // Rechaza la promesa si hay un error
      } else {
        resolve(hl7Message); // Resuelve la promesa con el mensaje HL7
      }
    });
  });
}

module.exports = { structureADT_A01, convertirJsAHL7 }; // Exporta las funciones para su uso en otros archivos
/* 
function createADT_A01Message(patientData) {
  // Aquí se construye el mensaje HL7v2 ADT_A01
  const message = [
    ['MSH', '^~\\&', 'SendingApp', 'SendingFacility', 'ReceivingApp', 'ReceivingFacility', '202311250830', '', 'ADT^A01', '123456', 'P', '2.3'],
    ['EVN', 'A01', '202311250830'],
    ['PID', '', patientData.id, '', '', `${patientData.nombre}^${patientData.apellidos}`, '', patientData.fechaNacimiento, patientData.sexo, '', '', patientData.direccion],
    // Agrega más segmentos según sea necesario
  ];

  return hl7.serialize(message);
}

module.exports = {
  createADT_A01Message,
};
*/