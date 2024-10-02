/**
 * AntPostnatal.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'ant_postnatal',
  attributes: {
    llanto: {model: 'Llanto', columnName: 'llanto',},
    pesoAlNacer: {type: "float", required: true, columnName: 'peso_al_nacer',},
    talla: {type: "float", required: true},
    circunfCefalica: {type: "float", required: true, columnName: 'circunf_cefalica',},
    apgar: {type: "integer", required: true},
    infeccionesSnc: {type: "text", columnName: 'infecciones_snc'},
    infeccionesSistemicas: {type: "text", columnName: 'infecciones_sistemicas'},
    traumatismosCraneales: {type: "text", columnName: 'traumatismos_craneales'},
    malFormaCongenitas: {type: "text",},
    otros: {type: "text",},
  },

  findFullyPopulated: async function(id) {
    if (!id) {
      throw new Error('id: undefined');
    }

    let antPostnatal = await AntPostnatal.findOne(id).populate('llanto');
    return antPostnatal;
  }
};

