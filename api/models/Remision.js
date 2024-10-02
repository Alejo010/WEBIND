/**
 * Remision.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var _ = require('lodash');

module.exports = {

  attributes: {
    fecha: {type: "date", required: false,},
    consulta: {model: 'Consulta', required: true},
    motivo: {type: "string", required: true, unique: false, size: 400,},
    especialidad_destino: {model: 'Especialidad', required: true},
    atendido: {type: 'boolean', defaultsTo: false}
  },
//devuelve un arreglo de remisiones realizadas por una especialidad
  remisionesDeEspecialidad: async function (idEspecialidad) {
    let consultas = await Consulta.findAllPopulated();
    let remisiones = consultas.map(c => {
      let especialidad = c.medico.especialidad;
      if (idEspecialidad == especialidad.id) {
        Remision.agregarPacienteARemisiones(c.listaRemisiones, c.paciente);
        return c.listaRemisiones;
      }
      return [];
    });
    remisiones = _.flatten(remisiones);
    return remisiones;
  },

  agregarPacienteARemisiones: function (remisiones, paciente) {
    for (let i = 0; i < remisiones.length; i++) {
      remisiones[i].paciente = paciente;
    }
  }
};

