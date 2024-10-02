/**
 * Datos_paciente.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    hc: {type: 'string', required: true, unique: true, size: 11},
    nombre: {type: 'string', required: true, size: 250},
    apellidos: {type: 'string', required: true, size: 500},
    ci: {type: 'string', required: true, unique: true, size: 11},
    direccion: {type: 'text', required: true,},
    fechaNacimiento: {type: 'date', required: true, columnName: 'fecha_nacimiento'},
    areaSalud: {model: 'AreaSalud', columnName: 'area_salud', required: true},
    antecedente: {model: 'Antecedente', required: true},
    hospital: {model: 'Hospital', required: true},
    sexo: {model: 'Sexo', required: true},
    raza: {model: 'Raza', required: true},
    eliminado: {type: 'boolean', defaultsTo: false},
    edadAlta: {type: 'string', required: false},

    familiares: {
      collection: 'familiar',
      via: 'paciente'
    },
    consultas: {
      collection: 'Consulta',
      via: 'paciente'
    },
    antFamiliar: {
      collection: 'AntFamiliar',
      via: 'paciente'
    },

    getCountConsultas: function () {
      return this.consultas ? this.consultas.length : 0;
    }
  },

  findPopulatedForEdit: async function (id) {
    if (!id) {
      throw new Error('id: undefined');
    }

    let paciente = await Paciente.findOne(id).populate('familiares').populate('antFamiliar');
    // let paciente = await Paciente.findOne(id).populate('familiares');
    paciente.areaSalud = await AreaSalud.findFullyPopulated(paciente.areaSalud);
    paciente.antecedente = await Antecedente.findPopulatedForEdit(paciente.antecedente);
    return paciente;
  },
  //
  findFullyPopulated: async function (id) {
    if (!id) {
      throw new Error('id: undefined');
    }
    // let paciente = await Paciente.findOne(id).populate('familiares').populate('hospital').populate('sexo')
    //   .populate('raza').populate('antFamiliar').populate('consultas');
    console.log(id);
    let paciente = await Paciente.findOne(id).populate('familiares').populate('hospital').populate('sexo')
      .populate('raza').populate('consultas');
    console.log('Paciente', paciente);

    paciente.areaSalud = await AreaSalud.findFullyPopulated(paciente.areaSalud);
    paciente.antecedente = await Antecedente.findFullyPopulated(paciente.antecedente);
    return paciente;

  },

  findPacientesByEspecialidad: async function (id) {
    if (!id) {
      throw new Error('id: undefined');
    }
    let pacientes = await Paciente.find();
    for (let i = 0; i < pacientes.length; i++) {
      p = pacientes[i];
      p.consultasLista = await Consulta.findPopulatedByPacienteId(p.id);
    }

    // console.log("Before filter", pacientes);

    pacientes = pacientes.filter(item => {
      console.log(item);
      if (Paciente.pacienteTieneConsultaEspecialidad(item, id))
        return true;
      return false;
    });
    console.log("After filter", pacientes);

    return pacientes;


    /* .populate('raza').populate('antFamiliar');
     paciente.areaSalud = await AreaSalud.findFullyPopulated(paciente.areaSalud);
     paciente.antecedente = await Antecedente.findFullyPopulated(paciente.antecedente);
     return paciente;*/
  },

  pacienteTieneConsultaEspecialidad: function (paciente, especialidadId) {
    let consultas = paciente.consultasLista;

    for (let i = 0; i < consultas.length; i++) {
      var c = consultas[i];
      if (c.medico.especialidad.id == especialidadId)
        return true;
    }
    return false;
  }
};

