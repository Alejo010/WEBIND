const NodeHL7Complete = require("node-hl7-24");// Importa la biblioteca Node-HL7-24
const hl7Converter = new NodeHL7Complete();// Crea una instancia del convertidor HL7

// Función para formatear la fecha en el formato HL7
function formatHL7DateLocal(date) {
  return date.getFullYear() +
         ('0' + (date.getMonth() + 1)).slice(-2) +
         ('0' + date.getDate()).slice(-2) +
         ('0' + date.getHours()).slice(-2) +
         ('0' + date.getMinutes()).slice(-2) +
         ('0' + date.getSeconds()).slice(-2);
}

// Función para estructurar un mensaje QBP_Q21 basado en los datos proporcionados
function structureQBP_Q21(Datos) {
  const jsData = {
    QBP_Q21: {
      MSH: { // Segmento MSH (Message Header)
        'MSH.1': '|',
        'MSH.2': '^~\\&',
        'MSH.3': { 'HD.1': Datos.nombreSisEmisor },
        'MSH.4': { 'HD.1': Datos.nombreConsultaEmisora },
        'MSH.5': { 'HD.1': Datos.nombreSisReceptor },
        'MSH.6': { 'HD.1': Datos.nombreConsultaReceptora },
        'MSH.7': { 'TS.1': formatHL7DateLocal(new Date()) },
        'MSH.9': { 'MSG.1': 'QBP', 'MSG.2': 'Q21' },
        'MSH.10': 'ID',
        'MSH.11': { 'PT.1': 'P' },
        'MSH.12': { 'VID.1': '2.5' },
      },
      QPD: { // Segmento QPD (Query Parameter Definition)
        'QPD.1': '1',
        'QPD.2': { 'CX.1': 'NumeroConsulta' },
        //'QPD.3': { 'CX.1': 'CI' },//IdentificadoresAlternativos
      },
    },
  };

  // Condicionales para agregar parámetros opcionales al mensaje QBP_Q21
  if (Datos.numeroConsulta) {
    jsData.QBP_Q21.QPD['QPD.2'] = { 'CX.1': Datos.numeroConsulta };
  }
  if (Datos.ci) {
    jsData.QBP_Q21.QPD['QPD.3'] = { 'CX.1': Datos.ci };
  }
  if (Datos.hc) {
    jsData.QBP_Q21.QPD['QPD.4'] = { 'CX.1': Datos.hc };
  }
  if (Datos.nombre) {
    jsData.QBP_Q21.QPD['QPD.5'] = { 'XPN.2': Datos.nombre };
  }
  if (Datos.apellido) {
    jsData.QBP_Q21.QPD['QPD.5'] = jsData.QBP_Q21.QPD['QPD.5'] || {};
    jsData.QBP_Q21.QPD['QPD.5']['XPN.1'] = { 'FN.1': Datos.apellido };
  }
  if (Datos.fechaNacimiento) {
    jsData.QBP_Q21.QPD['QPD.7'] = { 'TS.1': Datos.fechaNacimiento };
  }
  if (Datos.sexo) {
    jsData.QBP_Q21.QPD['QPD.8'] = Datos.sexo;
  }

  return jsData;
}

// Función para convertir un objeto JavaScript a un mensaje HL7
function convertirJsAHL7(jsData) {
  return new Promise((resolve, reject) => {
    hl7Converter.jsToHl7('QBP_Q21', jsData, (error, hl7Message) => {
      if (error) {
        reject('Error al convertir objeto JavaScript a mensaje HL7: ' + error);
      } else {
        resolve(hl7Message);
      }
    });
  });
}

module.exports = { structureQBP_Q21, convertirJsAHL7 }; // Exporta las funciones para su uso en otros archivos