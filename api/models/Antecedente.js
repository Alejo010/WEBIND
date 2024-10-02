/**
 * Antecedente.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    antPrenatal: {model: 'AntPrenatal', columnName: 'ant_prenatal', required: true},
    antPerinatal: {model: 'AntPerinatal', columnName: 'ant_perinatal', required: true},
    antPostnatal: {model: 'AntPostnatal', columnName: 'ant_postnatal', required: true},
    antPersonal: {model: 'AntPersonal', columnName: 'ant_personal'}
  },

  findPopulatedForEdit: async function (id) {
    if (!id) {
      throw new Error('id: undefined');
    }

    let antecedente = await Antecedente.findOne(id).populate('antPostnatal').populate('antPersonal').populate('antPrenatal').populate('antPerinatal');

    // antecedente.antPrenatal = await AntPrenatal.findFullyPopulated(antecedente.antPrenatal);
    // antecedente.antPerinatal = await AntPerinatal.findFullyPopulated(antecedente.antPerinatal);

    return antecedente;

  },
  findFullyPopulated: async function (id) {
    if (!id) {
      throw new Error('id: undefined');
    }
    let antecedente = await Antecedente.findOne(id).populate('antPersonal').populate('antPrenatal').populate('antPerinatal');
    antecedente.antPrenatal = await AntPrenatal.findFullyPopulated(antecedente.antPrenatal);
    antecedente.antPerinatal = await AntPerinatal.findFullyPopulated(antecedente.antPerinatal);
    antecedente.antPostnatal = await AntPostnatal.findFullyPopulated(antecedente.antPostnatal);
    return antecedente;
  }
};

