// Importación del módulo NodeHL7Complete y creación de una instancia hl7Converter
//El modulo se nombra node-hl7-24 pero hace referencia a su archivo base interno node-hl7-complete
const NodeHL7Complete = require('node-hl7-24');
const hl7Converter = new NodeHL7Complete();

// Función para formatear la fecha en el formato requerido por HL7
function formatHL7DateLocal(date) {
    return date.getFullYear() +
           ('0' + (date.getMonth() + 1)).slice(-2) +
           ('0' + date.getDate()).slice(-2) +
           ('0' + date.getHours()).slice(-2) +
           ('0' + date.getMinutes()).slice(-2) +
           ('0' + date.getSeconds()).slice(-2);
}

// Función para generar un ACK a partir de un mensaje HL7v2 recibido
function generarAck(mensajeRecibido) {
    // Dividir el mensaje recibido en segmentos y encontrar el segmento MSH
    const mensajeRecibidoArray = mensajeRecibido.split('\r');
    const mshSegment = mensajeRecibidoArray.find(segment => segment.startsWith('MSH'));
    const mshValues = mshSegment.split('|');// Extraer los valores del segmento MSH
 // Crear la estructura de datos para el ACK
    const jsData = {
        ACK: {
            MSH: {
                'MSH.1': '|',
                'MSH.2': '^~\\&',
                'MSH.3': {
                    'HD.1': mshValues[3] // Nombre del sistema emisor del mensaje original
                },
                'MSH.4': {
                    'HD.1': mshValues[5] // Nombre de la consulta emisora del mensaje original
                },
                'MSH.5': {
                    'HD.1': mshValues[2] // Nombre del sistema receptor del mensaje original
                },
                'MSH.6': {
                    'HD.1': mshValues[4] // Nombre de la consulta receptora del mensaje original
                },
                'MSH.7': {
                    'TS.1': formatHL7DateLocal(new Date())
                },
                'MSH.9': {
                    'MSG.1': 'ACK',
                },
                'MSH.10': mshValues[9], // ID de control de mensaje original

                'MSH.11': {
                    'PT.1': mshValues[10]  // Usar el valor del campo entrante para MSH.11
                },
                'MSH.12': {     //Encontrar la forma de que extraiga la version del mesnaje analizado
                   'VID.1': '2.5',  // Usar el valor del campo entrante para MSH.12
                },
            },
            MSA: {
                'MSA.1': 'AA', // Indica que el mensaje fue aceptado
                'MSA.2': mshValues[9], // Mismo ID de control de mensaje original
            }
        }
    };

    // Devolver una promesa para manejar la conversión del ACK a mensaje HL7
        return new Promise((resolve, reject) => {
            hl7Converter.jsToHl7('ACK', jsData, (error, hl7Message) => {
                if (error) {
                    reject(error);// Rechazar la promesa en caso de error   
                } else {
                    resolve(hl7Message);// Resolver la promesa con el mensaje ACK generado
                }
            });
        });
    }

    // Exportar la función generarAck para su uso en otros archivos
    module.exports = generarAck;
