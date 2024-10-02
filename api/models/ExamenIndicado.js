/**
 * Examenes_indicados.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var _ = require('lodash');

module.exports = {
  tableName: 'examen_indicado',
  attributes: {
    resuelto: {type: 'boolean', required: true,},
    resultado: {type: "text", required: false,},
    consulta: {model: 'Consulta', required: false,},
    examen: {model: 'Examen', required: false,},
    //otra_indicacion: {type: "text", required: false, },
  },

  getExamenesNoResueltosPorIdPaciente: async function (idPaciente) {
    let examenesCount = await ExamenIndicado.count();
    if (examenesCount == 0) {
      return new Array();
    }

    let examenes = await ExamenIndicado.find({resuelto:false}).populate('consulta').populate('examen');
    let examenesResueltos = _.filter(examenes, item => {
      // console.log('==========================================');
      // console.log(item);

      if (item.consulta.paciente == idPaciente) {
        return true;
      }
    });
    return examenesResueltos;
  }

};

