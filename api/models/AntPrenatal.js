/**
 * AntPrenatal.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
//Estos son los antecedentes propios de la madre del paciente
module.exports = {
  tableName: 'ant_prenatal',
  attributes: {
    edadMaterna: {type: "integer", columnName: 'edad_materna'},
    habitosToxicosMadre: {type: "text", columnName: 'habitos_toxicos_madre'},
    alteracionesEcosonograficas: {type: "text", columnName: 'alteraciones_ecosonograficas'},
    antObstetricos: {type: "text", columnName: 'ant_obstetricos'},
    antEnfCronicaMaterna: {type: "text", columnName: 'ant_enf_cronica_materna'},
    movimientoFetal: {model: 'MovimientoFetal', columnName: 'movimiento_fetal', required: true},
    enfermedadesMaternasAgudas: {type: "text", columnName: 'enf_Mat_Agudas'},
    otros: {type: "text",},

  },

  // findPopulatedForEdit: async function(id) {
  //   if (!id) {
  //     throw new Error('id: undefined');
  //   }
  //
  //   let antPrenatal = await AntPrenatal.findOne(id).populate('movimientoFetal');
  //
  //   return antPrenatal;
  // },
  findFullyPopulated: async function(id) {
    if (!id) {
      throw new Error('id: undefined');
    }

    let antPrenatal = await AntPrenatal.findOne(id).populate('movimientoFetal');

    return antPrenatal;
  },
};

