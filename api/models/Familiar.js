/**
 * Datos_familiares.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    parentezco: {model: "Parentezco", required: true,},
    nombre: {type: "string", required: true, size: 250},
    apellidos: {type: "string", required: true, size: 250},
    telefono: {type: "string", required: true, size: 250},
    paciente: {model: "Paciente", required: true, unique:true},
   // nivelEscolaridad: {model: "NivelEscolaridad", required: true, columnName: 'nivel_escolaridad'},
  }
};

