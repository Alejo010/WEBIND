/**
 * Area_salud.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'area_salud',
  attributes: {
    nombre: {
      type: "string",
      required: true,
      unique: true,
      size: 250,
    },
    municipio: {
      model: 'Municipio',
      required: true,
    },
    pacientes: {
      collection: 'Paciente',
      via: 'areaSalud'
    },
    getCountPacientes: function () {
      return this.pacientes ? this.pacientes.length : 0;
    }
  },

  findFullyPopulated: async function(id) {
    if(!id) {
      throw new Error('id: undefined');
    }

    let areaSalud = await AreaSalud.findOne(id);

    areaSalud.municipio = await Municipio.findFullyPopulated(areaSalud.municipio);
    return areaSalud;
  }
};

