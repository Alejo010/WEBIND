/**
 * Created by WebIND on 12/10/2018.
 */

//funciona ok
// async function findAntPrenatalByID (idAntPrenatPac) {
//   let ant = await AntPrenatal.find({"id" : idAntPrenatPac});
//   return ant;
// }

async function findAntPrenatalByID (idAntPrenatPac) {
  return await AntPrenatal.find({_id: idAntPrenatPac});
}

// async function findAntFamiliarPorPaciente(idPaciente,idPrenatal) {
//
//   let antPrenatal = await AntPrenatal.find().populate('antecedente').populate('paciente').populate('movimientoFetal');
//   antPrenatal = antPrenatal.filter(item=>item.antecedente.antPrenatal).populate('paciente')
//   // antPrenatal= antPrenatal.filter(item => item.medico.especialidad === idEspecialidad)
// }


module.exports = {
  findAntPrenatalByID,
  //findAntFamiliarPorPaciente,
};

// async function findconsultasPorPaciente (idPaciente,idEspecialidad) {
//
//   let consultas = await Consulta.find().populate('medico').populate('paciente').populate('mnt');
//   consultas = consultas.filter(item => item.paciente === idPaciente);
//   consultas = consultas.filter(item => item.medico.especialidad === idEspecialidad);
//   return consultas;
// }

