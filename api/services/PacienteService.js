/**
 * Created by Felipe Rodriguez Arias <ucifarias@gmail.com> on 28/05/2018.
 */
// Esta función busca pacientes por especialidad
async function findByEspecialidad (idEspecialidad) {

  // idEspecialidad = '5b0c507e22d01a8c22f7d75c';
  // Se obtienen todas las consultas y se populan los modelos 'medico' y 'paciente'
  let consultas = await Consulta.find().populate('medico').populate('paciente');
  // Se filtran las consultas para obtener solo aquellas del médico con la especialidad indicada
  consultas = consultas.filter(item => item.medico.especialidad === idEspecialidad);

  let pacientes = [];
  // Se recorren las consultas filtradas
  for (let item of consultas) {
    let exist = false;
    // Se verifica si el paciente ya ha sido agregado al array de pacientes
    for (let inner of pacientes) {
      if (inner.id === item.paciente.id) {
        exist = true;
        break;
      }
    }
     // Si el paciente no existe en el array, se busca y se agrega
    if (exist === false) {
      let p = await Paciente.find({id: item.paciente.id})
        .populate('areaSalud')
        .populate('raza')
        .populate('sexo')
        .populate('hospital')
        .limit(1);
      pacientes.push(p[0]);
    }
  }
 // Se retornan los pacientes encontrados
  return pacientes;
}

// Esta función marca como eliminado a un paciente
async function destroy (id) {
   // Se busca al paciente por su ID
  let entity = await Paciente.findOne(id);
   // Se marca al paciente como eliminado
  entity['eliminado'] = true;
  // Se actualiza la información del paciente en la base de datos
  let result = await Paciente.update(id, entity);
  console.log('Paciente Eliminado');
  return result;
}

// Esta función busca y retorna los pacientes no eliminados
async function find () {
  return await Paciente.find({eliminado: false});
}

// Esta función busca y retorna los pacientes marcados como eliminados
async function findEliminados () {
  return await Paciente.find({eliminado: true});
}

// Esta función busca y retorna un paciente por su número de historia clínica
async function findPacienteByHC (hcPaciente) {
  return await Paciente.find({hc: hcPaciente});
}

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
  findByEspecialidad,
  destroy,
  findEliminados,
  find,
  findPacienteByHC,
  findPacienteByCI,
};
