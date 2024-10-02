/**
 * TipoParto.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'tipo_parto',
  attributes: {
    nombre: {
      type: "string",
      required: true,
      unique: true,
      size: 250,
    },
    antPerinatales: {
      collection: 'AntPerinatal',
      via: 'tipoParto'
    },
    getCountAntPerinatales: function () {
      return this.antPerinatales ? this.antPerinatales.length : 0;
    }
  }
};

