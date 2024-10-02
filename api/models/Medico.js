/**
 * Medico.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    nombre: {type: "string", required: true, size: 250,},
    apellidos: {type: "string", required: true, size: 250,},
    ci: {type: "string", required: true, unique: true, size: 11,},
    
    numeroMedico: {type: "string", size: 250, columnName: 'numero_medico',required: true,},
    especialidad: {model: 'Especialidad', required: true, required: true,},
    consultas: {collection: 'Consulta', via: 'medico', required: false,},
    usuario_medico:{ model:'Usuario', unique: true },


    getCountConsultas: function () {
      return this.consultas ? this.consultas.length : 0;
    }
  }
};

