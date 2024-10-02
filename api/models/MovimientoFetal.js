/**
 * MovimientoFetal.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'movimiento_fetal',
  attributes: {
    nombre: {
      type: "string",
      required: true,
      unique: true,
      size: 250,
    },
    antPrenatales: {
      collection: 'AntPrenatal',
      via: 'movimientoFetal'
    },
    getCountAntPrenatales: function () {
      return this.antPrenatales ? this.antPrenatales.length : 0;
    }
  }
};

