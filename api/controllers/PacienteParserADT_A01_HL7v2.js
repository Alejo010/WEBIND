//El modulo se nombra node-hl7-24 pero hace referencia a su archivo base interno node-hl7-complete
//La diferencia entre uno y otro es su actualizacion y posibilidad de instalcion mas facil
const NodeHL7Complete = require('node-hl7-24'); // Importa la librería para convertir mensajes HL7 a objetos JavaScript
const hl7Converter = new NodeHL7Complete(); // Crea una nueva instancia del convertidor HL7


function handleDatosAsignados(jsObject) { // Define una función para manejar y asignar datos del objeto JavaScript
  // Declara un objeto que contendrá la información extraída
  let Datos = {      
    nombreSisEmisor: jsObject.ADT_A01.MSH[0]['MSH.3'][0]['HD.1'][0], // Extrae el nombre del sistema emisor
    nombreSisReceptor: jsObject.ADT_A01.MSH[0]['MSH.5'][0]['HD.1'][0], // Extrae el nombre del sistema receptor
    nombreConsultaEmisora: jsObject.ADT_A01.MSH[0]['MSH.4'][0]['HD.1'][0], // Extrae el nombre de la consulta emisora
    nombreConsultaReceptora: jsObject.ADT_A01.MSH[0]['MSH.6'][0]['HD.1'][0], // Extrae el nombre de la consulta receptora
    id: jsObject.ADT_A01.MSH[0]['MSH.10'][0], // Extrae el ID del mensaje
    // Extrae y asigna valores del segmento PID del mensaje HL7 al objeto paciente
    paciente: { 
      id: jsObject.ADT_A01.PID[0]['PID.3'][0]['CX.1'][0], // Extrae el ID del paciente
      apellido: jsObject.ADT_A01.PID[0]['PID.5'][0]['XPN.1'][0]['FN.1'][0], // Extrae el apellido del paciente
      nombre: jsObject.ADT_A01.PID[0]['PID.5'][0]['XPN.2'][0], // Extrae el nombre del paciente
      fechaNacimiento: jsObject.ADT_A01.PID[0]['PID.7'][0], // Extrae la fecha de nacimiento del paciente
      sexo: jsObject.ADT_A01.PID[0]['PID.8'][0], // Extrae el sexo del paciente
      raza: jsObject.ADT_A01.PID[0]['PID.10'][0]['CE.1'][0], // Extrae la raza del paciente
      direccion: jsObject.ADT_A01.PID[0]['PID.11'][0]['XAD.1'][0]['SAD.1'][0], // Extrae la dirección del paciente
      ciudad: jsObject.ADT_A01.PID[0]['PID.11'][0]['XAD.3'][0], // Extrae la ciudad del paciente
      provincia: jsObject.ADT_A01.PID[0]['PID.11'][0]['XAD.4'][0], // Extrae la provincia del paciente
      codigoPostal: jsObject.ADT_A01.PID[0]['PID.11'][0]['XAD.5'][0], // Extrae el código postal del paciente
      pais: jsObject.ADT_A01.PID[0]['PID.11'][0]['XAD.6'][0], // Extrae el país del paciente
      telefono: jsObject.ADT_A01.PID[0]['PID.13'][0]['XTN.1'][0] // Extrae el teléfono del paciente
    },
    antPrenatales: [], // Inicializa un arreglo vacío para antecedentes prenatales
    antPerinatales: [], // Inicializa un arreglo vacío para antecedentes perinatales
    antPosnatales: [], // Inicializa un arreglo vacío para antecedentes posnatales
    antFamiliares: [] // Inicializa un arreglo vacío para antecedentes familiares
  };

  if (jsObject.ADT_A01.NTE) { // Comprueba si hay segmentos NTE en el mensaje HL7
    jsObject.ADT_A01.NTE.forEach(nte => { // Itera sobre cada segmento NTE
      const nota = nte['NTE.3'][0]; // Extrae la nota del segmento NTE
      const referencia = nte['NTE.2'][0]; // Extrae la referencia del segmento NTE
      switch (referencia) { // Según la referencia, añade la nota al arreglo correspondiente
        case 'OBX-1':
          Datos.antPrenatales.push(nota); // Añade la nota a los antecedentes prenatales
          break;
        case 'OBX-2':
          Datos.antPerinatales.push(nota); // Añade la nota a los antecedentes perinatales
          break;
        case 'OBX-3':
          Datos.antPosnatales.push(nota); // Añade la nota a los antecedentes posnatales
          break;
        case 'OBX-4':
          Datos.antFamiliares.push(nota); // Añade la nota a los antecedentes familiares
          break;
        default:
          console.warn(`Referencia desconocida: ${referencia}`); // Muestra una advertencia si la referencia es desconocida
      }
    });
  }
  return Datos; // Devuelve el objeto Datos con toda la información extraída
}
  
function procesarMensajeHL7(hl7Message) { // Define una función para procesar mensajes HL7
  return new Promise((resolve, reject) => { // Devuelve una promesa
    hl7Converter.hl7ToJs(hl7Message, (error, jsObject) => { // Intenta convertir el mensaje HL7 a un objeto JavaScript
      if (error) { // Si ocurre un error
        reject('Error al convertir mensaje HL7 a objeto JavaScript: ' + error); // Rechaza la promesa con un mensaje de error
      } else { // Si la conversión es exitosa
        const datos = handleDatosAsignados(jsObject); // Llama a handleDatosAsignados con el objeto JavaScript resultante
        resolve(datos); // Resuelve la promesa con los datos procesados
      }
    });
  });
}

module.exports = procesarMensajeHL7; // Exporta la función procesarMensajeHL7 para que pueda ser utilizada en otros módulos