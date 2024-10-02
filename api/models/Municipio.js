/**
 * Municipio.js
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
    provincia: {
      model: 'Provincia',
      required: true,
    },
    areas: {
      collection: 'AreaSalud',
      via: 'municipio'
    },
    getCountAreas: function () {
      return this.areas ? this.areas.length : 0;
    }
  },

  findFullyPopulated: async function(id) {
    if(!id) {
      throw new Error('id: undifined');
    }

    let municipio = await Municipio.findOne(id).populate('provincia');

    return municipio;
  }
};

