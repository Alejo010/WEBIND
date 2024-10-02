/**
 * Parentezco.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    nombre: {
      type: "string",
      required: true,
      unique: true,
      size: 250,
    },
    // Add a reference to AntPatFamiliar
    // antFamiliares: {
    //   collection: 'AntFamiliar',
    //   via: 'parentezco'
    // },
    familiares: {
      collection: 'Familiar',
      via: 'parentezco'
    }
  }
};

