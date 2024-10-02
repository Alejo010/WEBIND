/**
 * AntPerinatal.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'ant_perinatal',
  attributes: {
    tipoParto: {model: 'TipoParto', columnName: 'tipo_parto',},
    descripcionParto: {type: "text", required: false, columnName: 'descripcion_parto',},
    observaciones: {type: "text", required: false},
    horasTrabajoParto: {type: "integer", required: false, columnName: 'horas_trabajo_parto',},
    complicacionesAlNacer: {type: "text", columnName: 'complicaciones_al_nacer',},
    edadGestacionalParto: {type: "float", required: true, columnName: 'edad_gestacional_parto',},
    requirioUcin: {type: "boolean", required: true, columnName: 'requirio_ucin',},
    tiempoHospitalizacion: {type: "integer", required: false, columnName: 'tiempo_hospitalizacion',},
    otros: {type: "text",},
  },

  findFullyPopulated: async function (id) {
    if (!id) {
      throw new Error('id: undefined');
    }

    let antPerinatal = await AntPerinatal.findOne(id).populate('tipoParto');

    return antPerinatal;
  }

};

