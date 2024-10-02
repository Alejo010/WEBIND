/**
 * Llanto.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'llanto',
  attributes: {
    nombre: {
      type: "string",
      required: false,
      //unique: true,
      size: 250,
    },
    antPerinatales: {
      collection: 'AntPostnatal',
      via: 'llanto'
    },/*
     getCountAntPerinatales: function () {
     return this.antPerinatales ? this.antPerinatales.length : 0;
     }*/
  }
};

