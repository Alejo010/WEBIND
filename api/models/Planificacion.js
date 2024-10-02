/**
 * Planificacion.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
      planificacion_fecha: {type: "date", required: false },
      consulta:{ model:'Consulta', unique: false },
      paciente:{ model:'Paciente', unique: false },  
    }
  };