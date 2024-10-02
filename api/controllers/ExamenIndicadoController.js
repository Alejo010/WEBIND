/**
 * Examenes_indicadosController
 *
 * @description :: Server-side logic for managing ExamenIndicadoController
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const create = async (req, res) => {

  var examen_indicado = req.param('examen_indicado');
  //console.log(JSON.stringify(examen_indicado));
  try {
    nuevo_examen_indicado = await ExamenIndicado.create(examen_indicado);
     return res.json([nuevo_examen_indicado]);
  } catch (err) {
    console.log(err);
    return res.badRequest(err);
  }
};

getExamenesNoResueltosPorIdPaciente = async function(req, res){
  var idPaciente = req.param('id');
  try {
    var resultadoExamenes  = await ExamenIndicado.getExamenesNoResueltosPorIdPaciente(idPaciente);
    return res.ok(resultadoExamenes);
  }
  catch (err){
    return res.negotiate(err);
  }

}


module.exports = {
  create,
  getExamenesNoResueltosPorIdPaciente,
};

