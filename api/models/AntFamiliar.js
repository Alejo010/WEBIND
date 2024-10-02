/**
 * AntPatFamiliar.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'ant_familiar',
  attributes: {
    //Enfermedades que padeció el familiar
    padecimientos_cronicos_familiar: {
      type: "text",
      required: false
    },
    // parentezco: {
    //   model: 'Parentezco',
    //   required: false
    // },
    paciente: {
      model: 'Paciente',
      required: true
    },
  }
};

