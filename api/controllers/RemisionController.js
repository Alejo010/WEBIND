/**
 * RemisionController
 *
 * @description :: Server-side logic for managing Remisions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  findRemisionesPopulated: async function (req, res) {
    var especialidadId = req.param('especialidad_destino');

    var atend = req.param('atendido');

    try {
      var remisiones = await Remision.find({
        especialidad_destino: especialidadId,
        atendido: atend,
      });

      for (var remision of remisiones) {
        // remision.consulta = await Consulta.findOne(remision.consulta_remision[0].id).populate('paciente');
        remision.consulta = await Consulta.findPopulated(remision.consulta);
        // remision.consulta.medico = await Medico.findOne(remision.consulta.medico).populate('especialidad');
        // remision.consulta_remision = "Hola";
        // delete remision.consulta_remision;
        // console.log("Remision: ", remision);
      }

       // console.log("Remisiones: ", remisiones);
      return res.ok(remisiones);
    } catch (err) {
      return res.negotiate(err);
    }
  },

  findRemisionesSalidaPopulated: async function (req, res) {
    let idEspecialidad = req.param('idEspecialidad');

    if(!idEspecialidad){
      return res.badRequest('Falta id de especialidad');
    }
    try {
      var remisiones = await Remision.remisionesDeEspecialidad(idEspecialidad);
      return res.json(remisiones);
    } catch (err) {
      return res.negotiate(err);
    }
  },


  getIncompleteRemissionCount : async function (req, res) {
    const espId = req.param('id');
    let result = await RemisionService.getIncompleteRemissionCount(espId);
    return res.json(result);
  },


};

