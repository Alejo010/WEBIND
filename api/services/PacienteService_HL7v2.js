
// Esta función busca y retorna un paciente por su número de cédula de identidad
async function findPacienteByHC (hcPaciente) {
  return await Paciente.find({hc: hcPaciente});
}

// Esta función busca y retorna un paciente por su número de cédula de identidad
async function findPacienteByCI (ciPaciente) {
  return await Paciente.find({ci: ciPaciente});
}


// Se exportan las funciones del servicio para ser utilizadas en otros archivos
module.exports = {
//  findByEspecialidad,
  findPacienteByHC,
  findPacienteByCI,
};










/*
//const hl7 = require('simple-hl7');

function crearMensajeHL7SolicitudDatosPaciente(pacienteId) {
  var msg = new hl7.Message(
    "SistemaEnvio", // Sistema de envío
    "SistemaReceptor", // Sistema receptor
    new Date(), // Fecha y hora del mensaje
    [], // Opciones adicionales
    "QRY", // Tipo de mensaje: QRY para consulta
    "Q01", // Trigger event
    "P", // Processing ID
    "2.5" // Versión HL7
  );

  // Segmento QRD: Datos de la solicitud
  msg.addSegment("QRD",
    new Date(), // Fecha y hora de la consulta
    "R", // Tipo de respuesta esperada (R = Real time)
    "I", // Formato de la consulta (I = Informativa)
    "1", // ID de la consulta
    "", // Quién realiza la consulta (vacío si no es aplicable)
    "T", // Nivel de detalle de la respuesta (T = Tabular)
    "", // Cantidad de información solicitada (vacío si no es aplicable)
    "DEM", // Ámbito de la consulta (DEM = Demográficos del paciente)
    "", // Condición de la consulta (vacío si no es aplicable)
    pacienteId // ID del paciente
  );

  return msg;
}

*/



/*
module.exports = {
    crearMensajeHL7: function(paciente) {
      
    // Aquí iría la lógica para crear el mensaje HL7 v2.5
      // utilizando la librería nodo-hl7-completo
      // Por ejemplo:
      var mensajeHL7 = "MSH|^~\\&|..."; // Construye el mensaje HL7 aquí
      
      
      return mensajeHL7;
    }
  };*/
/*// Función asíncrona para crear un paciente con detalles adicionales como antecedentes y familiares
  const createPacienteWithDetails = async (pacienteData, familiarData, antFData) => {
    try {
      // Extrae los antecedentes del objeto pacienteData
      const { antPrenatal, antPerinatal, antPostnatal, antPersonal } = pacienteData.antecedente;
       
      // Crea registros de antecedentes en la base de datos utilizando los modelos correspondientes
      const pre = await AntPrenatal.create(antPrenatal);
      const peri = await AntPerinatal.create(antPerinatal);
      const post = await AntPostnatal.create(antPostnatal);
      const per = await AntPersonal.create(antPersonal);
   
      // Agrupa los IDs de los antecedentes creados en un nuevo objeto
      const antecedente = {
        antPrenatal: pre.id,
        antPerinatal: peri.id,
        antPostnatal: post.id,
        antPersonal: per.id,
      };
  // Asocia los antecedentes al paciente y crea el registro del paciente en la base de datos
      pacienteData.antecedente = await Antecedente.create(antecedente);
      delete pacienteData.municipio;// Elimina el municipio del objeto pacienteData si no es necesario
  
      // Crea el registro del paciente y asocia el ID del paciente a familiarData
      familiarData.paciente = await Paciente.create(pacienteData);
      antFData.paciente = familiarData.paciente.id;
      // Crea registros de familiares y antecedentes familiares en la base de datos
      await AntFamiliar.create(antFData);
      const fam = await Familiar.create(familiarData);
  

// Genera el mensaje HL7 después de guardar los detalles del paciente
// Nota: La función generateHL7Message no está definida en este fragmento de código
    const hl7Message = generateHL7Message(pacienteData);
    console.log(hl7Message);


  // Retorna un arreglo con los objetos de familiar y paciente creados
      return [fam, familiarData.paciente];
    } catch (err) {
      console.error(err);
      // Maneja errores durante el proceso de creación e imprime el error en la consola
      throw new Error('Failed to create paciente with details');
    }
  };
  
  // Reemplaza el export previo con la función createPacienteWithDetails
  module.exports = { createPacienteWithDetails };*/