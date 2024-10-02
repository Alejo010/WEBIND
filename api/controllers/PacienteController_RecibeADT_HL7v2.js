// Importar el módulo necesario para procesar mensajes HL7
//El modulo se nombra node-hl7-24 pero hace referencia a su archivo base interno node-hl7-complete
//La diferencia entre uno y otro es su actualizacion y posibilidad de instalcion mas facil
const NodeHL7Complete = require('node-hl7-24');
const hl7Converter = new NodeHL7Complete();

const procesarMensajeHL7 = require('./PacienteParserADT_A01_HL7v2');
const generarAck = require('./AckServicio_HL7v2');

async function create(req, res) {
  // Extraer el mensaje HL7 del cuerpo de la solicitud
  const hl7Message = req.body;

  try {
    // Procesar el mensaje HL7 para extraer los datos del paciente
    // Esto no recibe datos del paciente recibe datos en general
    const datosPaciente = await procesarMensajeHL7(hl7Message);
    
    // Extraer datos del paciente y la familia del mensaje HL7 parseado
    /*****Es necesario ajusatr esto mi json devuelve tododos los datos,
     * Sim embargo nu usan estos nombre exactamente, por ejemplo usa cada antecedente */
    const { paciente, familiar, antFamiliar } = datosPaciente;

    // Extraer antecedentes de los datos del paciente
    const antPrenatal = paciente.antecedente.antPrenatal;
    const antPerinatal = paciente.antecedente.antPerinatal;
    const antPostnatal = paciente.antecedente.antPostnatal;
    const antPersonal = paciente.antecedente.antPersonal;

    // Crear registros de antecedentes en la base de datos
    const pre = await AntPrenatal.create(antPrenatal);
    const peri = await AntPerinatal.create(antPerinatal);
    const post = await AntPostnatal.create(antPostnatal);
    const per = await AntPersonal.create(antPersonal);

    // Construir el objeto de antecedentes con los IDs de los registros creados
    const antecedente = {
      antPrenatal: pre.id,
      antPerinatal: peri.id,
      antPostnatal: post.id,
      antPersonal: per.id,
    };
    try {
      // Crear el registro del paciente con el objeto de antecedentes
      paciente.antecedente = await Antecedente.create(antecedente);
      delete paciente.municipio;
  
      // Crear el registro de la familia y vincularlo al paciente
      familiar.paciente = await Paciente.create(paciente);
      antFamiliar.paciente = familiar.paciente.id;
      const antF = await AntFamiliar.create(antFamiliar);
      const fam = await Familiar.create(familiar);
  
            // Generar el ACK
            const ackMessage = await generarAck(hl7Message);
  
            // Incluir solo el ACK en la respuesta
            return res.ok({ ack: ackMessage });
          } catch (err) {
            console.log('Error al crear el paciente o la familia:', err);
            return res.status(500).json({ error: 'Error al crear el paciente o la familia' });
          }
        } catch (err) {
          console.log('Error al procesar el mensaje HL7 o al generar el ACK:', err);
          return res.status(500).json({ error: 'Error al procesar el mensaje HL7 o al generar el ACK' });
        }
      }
  
  // Exportar la función create
  module.exports = {
    create,
  };

  /**Esto es sin agregar logica de ack
 *  // Crear el registro de la familia y vincularlo al paciente
    familiar.paciente = await Paciente.create(paciente);
    antFamiliar.paciente = familiar.paciente.id;
    const antF = await AntFamiliar.create(antFamiliar);
    const fam = await Familiar.create(familiar);
    
// Devuelve una respuesta exitosa ( res.ok ) con un array que contiene el 
//Objeto  fam  (familia) y el objeto  familiar.paciente  (paciente). 
// Devolver una respuesta exitosa con los datos del familiar y el paciente    
    return res.ok([fam, familiar.paciente]);
  } catch (err) {
    console.log(err);
    return res.negotiate(err);
  } 
 * 
 * 
*/