// Este código está destinado a recibir datos HL7v2 de una aplicación externa
//Se trabajan en un Primer momento la recepción de mensajes de creación de pacientes y 
//Y los mensajes de recpción de información de pacientes
// En caso de ser necesarió seguir la misma lógica implmentada en el formato para crear un nuevo paciente

//El modulo se nombra node-hl7-24 pero hace referencia a su archivo base interno node-hl7-complete
//La diferencia entre uno y otro es su actualizacion y posibilidad de instalcion mas facil
const NodeHL7Complete = require('node-hl7-24');
const hl7Converter = new NodeHL7Complete();
const PacienteService = require('../services/PacienteService_HL7v2');
const { structureRSP_K22, convertirJsAHL7 } = require('./PacienteCreaRSP_K22_HL7v2');


/******* Este es el ultimo codigo usado donde se organizó todo el código
 * Solo se a implementado el recibo y parseo de datos falta ajustar la respuesta
 * el acceso al objeto paciente por el RSP_K22
 *********/
const getPacientesPorHL7 = async (req, res) => {
  try {
    const hl7Message = req.body.hl7Message;
    const QBP_Datos = await parseQBP_Q21(hl7Message);
    const { hc, ci } = QBP_Datos;

    let paciente;
    if (hc) {
      paciente = await PacienteService.findPacienteByHC(hc);
    } else if (ci) {
      paciente = await PacienteService.findPacienteByCI(ci);
    } else {
      return res.status(400).json({ error: 'No se proporcionaron parámetros de búsqueda válidos (hc o ci).' });
    }
//Crear u objeto que contenga los valores de paciente + las del mensaje recibido
    const Datos = {
        ...paciente,
        nombreSisEmisor,
        nombreSisReceptor,
        nombreConsultaEmisora,
        nombreConsultaReceptora,
        id,
        tipoMensajeRecibido
      };
   //Respuesta con RSP_K22 con lainformación del paciente encontrado      
    //No se debe usar paciente en vez de datos?
    const jsData = structureRSP_K22(Datos.paciente);
    const hl7Response = await convertirJsAHL7(jsData);
    return res.json({ hl7Response });
  } catch (error) {
    console.error('Error al procesar el mensaje HL7v2:', error);
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

function parseQBP_Q21(hl7Message) {
  return new Promise((resolve, reject) => {
    hl7Converter.hl7ToJs(hl7Message, (error, jsObject) => {
      if (error) {
        reject('Error al convertir mensaje HL7 a objeto JavaScript: ' + error);
      } else {
        const QBP_Datos = {
          nombreSisEmisor: jsObject.QBP_Q21.MSH[0]['MSH.3'][0]['HD.1'][0],
          nombreSisReceptor: jsObject.QBP_Q21.MSH[0]['MSH.5'][0]['HD.1'][0],
          nombreConsultaEmisora: jsObject.QBP_Q21.MSH[0]['MSH.4'][0]['HD.1'][0],
          nombreConsultaReceptora: jsObject.QBP_Q21.MSH[0]['MSH.6'][0]['HD.1'][0],
          id: jsObject.QBP_Q21.MSH[0]['MSH.10'][0],
          ci: jsObject.QBP_Q21.QPD[0]['QPD.3'][0]['CX.1'][0], // Corregido para el segmento QPD
          hc: jsObject.QBP_Q21.QPD[0]['QPD.3'][0]['CX.1'][0], // Corregido para el segmento QPD
          apellido: jsObject.QBP_Q21.PID[0]['PID.5'][0]['XPN.1'][0]['FN.1'][0],
          nombre: jsObject.QBP_Q21.PID[0]['PID.5'][0]['XPN.2'][0],
          sexo: jsObject.QBP_Q21.PID[0]['PID.8'][0],
          telefono: jsObject.QBP_Q21.PID[0]['PID.13'][0]['XTN.1'][0]
        };
        resolve(QBP_Datos);
      }
    });
  });
}

module.exports = {
  getPacientesPorHL7,
};





/*
  // Función para obtener un paciente por su número de historia clínica
  // Se obtiene el número de historia clínica de la solicitud
  // Se busca y devuelve el paciente por su número de historia clínica utilizando el servicio PacienteService
  const getPacientesPorHC = async (req, res) => { 
    try{ 
    const hc = req.param('hc');
    const paciente = await PacienteService.findPacienteByHC(hc);

    if (paciente) {
      // Construir el mensaje HL7v2.5 utilizando los valores directamente
      const hl7Message = buildHL7Message(paciente);

      // Enviar el mensaje como respuesta
      res.json({ hl7Response: hl7Message });
  } else {
      // Manejar el caso cuando no se encuentra al paciente
      res.status(404).json({ error: 'Paciente no encontrado' });
  }
} catch (error) {
  // Manejar errores (por ejemplo, problemas con la base de datos)
  res.status(500).json({ error: 'Error al buscar paciente' });
 }
};
*/


/*
const PacienteHL7Service = require('../services/PacienteHL7Service');

module.exports = {
  create: async function(req, res) {
    try {
      var paciente = req.body; // Asume que el paciente viene en el cuerpo de la petición
      var mensajeHL7 = PacienteHL7Service.crearMensajeHL7(paciente);
      
      // Aquí podrías enviar el mensaje HL7 a donde sea necesario
      // Por ejemplo, a un sistema de información hospitalaria
      
      return res.json({ mensaje: 'Paciente creado y mensaje HL7 enviado.', mensajeHL7: mensajeHL7 });
    } catch (error) {
      return res.serverError(error);
    }
  }
};

const PacienteService = require('../services/PacienteService_HL7v2');

module.exports = {
  create: async function(req, res) {
    try {
      const familiar = req.param('familiar');
      const paciente = req.param('paciente');
      const antF = req.param('antFamiliar');
      const result = await PacienteService.createPacienteWithDetails(paciente, familiar, antF);

      // Aquí result incluiría el mensaje HL7, que podrías enviar a otro sistema
      // Por ejemplo, mediante una petición HTTP, un socket, etc.

      return res.ok(result);
    } catch (err) {
      console.error(err);
      return res.negotiate(err);
    }
  },
  // Otros métodos del controlador...
};*/