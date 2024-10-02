/**
 * Especialidad.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    nombre: { type: "string",required: true, unique: true, size: 250,},
    medicos: { collection: 'Medico', via: 'especialidad' },
    remisiones: {collection: 'Remision', via: 'especialidad_destino', required: false},
    getCountMedicos: function () {
      return this.medicos ? this.medicos.length : 0;
    }
  }
};

