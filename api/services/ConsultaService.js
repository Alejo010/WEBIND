/**
 * Created by webind on 02/10/2017.
 */


//obtener todas consultas de un paciente de una especialidad
//parametros; idPaciente y idEspecialidad

async function findconsultasPorPaciente (idPaciente,idEspecialidad) {

  let consultas = await Consulta.find().populate('medico').populate('paciente').populate('mnt');
  consultas = consultas.filter(item => item.paciente === idPaciente);
  consultas = consultas.filter(item => item.medico.especialidad === idEspecialidad);
  return consultas;
}

async function consultasPorPaciente (idPaciente) {
  let consultas = await Consulta.find().populate('paciente');
  consultas = consultas.filter(item => item.paciente === idPaciente);
  return consultas;
}

async function findConsultaByIdMedico(idMedico) {
  let consultas = await Consulta.find().populate('medico');
  consultas = consultas.filter(item => item.medico === idMedico);
}

async function insertarConsulta(remision, medico, paciente, examenIndicado ) {
  let consultas = await Consulta.find().populate('medico');
  consultas = consultas.filter(item => item.medico === idMedico);
}

module.exports = {
  findconsultasPorPaciente,
  findConsultaByIdMedico,
  consultasPorPaciente,
};

