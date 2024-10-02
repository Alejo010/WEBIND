/**
 * Consulta.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    fecha: {type: "date", required: false,},
    motivo: {type: "text", required: false,},
    impresionDiagnostica: {type: "text", required: false, columnName: 'impresion_diagnostica',},
    diagosticoDef: {type: "text", columnName: 'diagostico_def', required: false,},
    examenFisico: {type: "text", required: false, columnName: 'examen_fisico',},
    tratamiento: {type: "text"},
    evolucion: {type: "text"},
    fechaProximaConsulta: {type: "date", required: false, columnName: 'fecha_proxima_consulta',},
    positivo: {type: "boolean"},
    mnt: {type: "text", required: false,},//Medicina Natural Tradicional, es para obtener cant pacientes que le mandan recibe este tipo de tratamiento (inf para el PAMI)

    remisiones: {collection: 'Remision', via: 'consulta'},
    medico: {model: 'Medico', required: false,},
    paciente: {model: 'Paciente', required: false,},
    examenIndicado: {collection: 'ExamenIndicado', via: 'consulta', required: false},

    //Desarrollo Psicomotor: si logra o no

    fijacionVisual: {type: "string"},
    seguimientoVisual: {type: "string"},
    sonrisaSocial: {type: "string"},
    gorjeo: {type: "string"},
    sostenCefalico: {type: "string"},
    manosALaLineaMedia: {type: "string"},
    vocaliza: {type: "string"},
    controlCefalico: {type: "string"},
    agarreGrosero: {type: "string"},
    transferenciaDeObjetos: {type: "string"},
    roladoDePronoASupino: {type: "string"},
    roladoDeSupinoAProno: {type: "string"},
    sostenSentado: {type: "string"},
    sedestacion: {type: "string"},
    trompetillas: {type: "string"},
    pinzaDigital: {type: "string"},
    cuatroPuntos: {type: "string"},
    monosilabos: {type: "string"},
    gateoAlterno: {type: "string"},
    seParaConAyuda: {type: "string"},
    bipedestacionConApoyo: {type: "string"},
    bipedestacionIndependiente: {type: "string"},
    pasosSueltos: {type: "string"},
    palabras4a6: {type: "string"},
    respondePorSuNombre: {type: "string"},
    cumpleOrdenesComplejas: {type: "string"},
    respondeEstimuloSonoro:{type: "string"},

    /* getCountExamenesIndicados: function () {
     return this.examenesIndicados ? this.examenesIndicados.length : 0;
     }*/

  },
  findPopulatedByPacienteId: async function (idPaciente) {
    var consultas = await Consulta.find({paciente: idPaciente}).populate('paciente');

    for (let i = 0; i < consultas.length; i++) {
      consultas[i] = await Consulta.findPopulated(consultas[i].id);
    }

    // console.log('consultas: ', consultas);
    return consultas;

    //paciente.areaSalud = await AreaSalud.findFullyPopulated(paciente.areaSalud);
  },
//busca la consulta por id
  findPopulated: async function (id) {

    var consulta = await Consulta.findOne(id).populate('paciente').populate('remisiones');
    consulta.listaRemisiones = [];
    if (consulta.remisiones.length > 0) {

      for (let i = 0; i < consulta.remisiones.length; i++) {
        var nuevaRemision = await Remision.findOne(consulta.remisiones[i].id)
          .populate('especialidad_destino');
        console.log('nuevaRemision',nuevaRemision);
        consulta.listaRemisiones.push(nuevaRemision);
      }
        console.log('consulta.listaRemisiones',consulta.listaRemisiones);
      // consulta.remision = await Remision.findOne(consulta.remision).populate('especialidad_destino');
    }
    consulta.medico = await Medico.findOne(consulta.medico).populate('especialidad');
     consulta.examenesIndicados = await ExamenIndicado.find({consulta: consulta.id}).populate('examen');
    return consulta;
  },

  findAllPopulated: async function(){
    let consultas = await Consulta.find();
    for (let i = 0; i < consultas.length; i++){
      consultas[i] = await Consulta.findPopulated(consultas[i].id);
    }
    return consultas;
  }

};


