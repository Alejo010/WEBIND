/**
 * ConsultaController
 *
 * @description :: Server-side logic for managing consultas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


const getConsultasPorPacientePorEspecialidad = async (req, res) => {
  const idPaciente = req.param('idPaciente');
  const idEspecialidad = req.param('idEspecialidad');
  const consultas = await ConsultaService.findconsultasPorPaciente(idPaciente, idEspecialidad);
  return res.json({consultas});
};

const create = async (req, res) => {

  var consulta = req.param('consulta');
  var examenesIndicados = req.param('examenes');
  var examenesPendientes = req.param('examenesPendientes');
  var idRemision = req.param('remision');
  var especialidades = req.param('remisiones');
  var motivoRemision = req.param('motivoRemision');

    // console.log('idRemision', idRemision);


  var examen = {
    resuelto: false,
    resultado: ''
  }

  if (examenesPendientes.length > 0) {

    for (let i = 0; i < examenesPendientes.length; i++) {

      let e = examenesPendientes[i];
      e.resultado = e.resultado.trim();

      if (e.resultado != "") {
        e.resuelto = true;

        await ExamenIndicado.update(e.id, e);
      }
    }
  }

  try {
    // var remision = consulta.remision;
    // //console.log("Antes del if: ", remision.especialidad_destino);
    // if (remision.especialidad_destino) {
    //   //console.log("Entro al if: ", remision.especialidad_destino);
    //   remision = await Remision.create(remision);
    //   consulta.remision = remision.id;
    // } else {
    //   delete consulta.remision;
    // }


    consulta.medico = consulta.medico.id;
    consulta.paciente = consulta.paciente.id;
    delete consulta.examenIndicado;
    nuevaConsulta = await Consulta.create(consulta);
    //console.log(examenesIndicados);
    for (e of examenesIndicados) {
      //console.log(e);
      examen.consulta = nuevaConsulta.id;
      examen.examen = e.id;
      await ExamenIndicado.create(examen);
    }
    if(idRemision){
      await Remision.update(idRemision, {atendido: true});
    }

    let r = {

        fecha: new Date(),
        consulta: nuevaConsulta.id,
        motivo: motivoRemision,
        especialidad_destino: null,
        atendido: false,
    }

    if(especialidades.length > 0){
      for(let i = 0; i < especialidades.length; i++)
      {
        let e = especialidades[i];
        r.especialidad_destino = e.id;
        await Remision.create(r);
      }
    }

    return res.json(nuevaConsulta);
  } catch (err) {
    console.log(err);

    return res.negotiate(err);
  }
}

const update = (req, res) => {
  return WorkService.update(req, res, Consulta);
};

const findByPacienteId = async (req, res) => {
  const idPaciente = req.param('idPaciente');
  try {
    let consultas = await Consulta.findPopulatedByPacienteId(idPaciente);
    return res.ok(consultas);
  } catch (error) {
    return res.negotiate(error);
  }

};

const getConsultaPorEspecialidad = async (req, res) => {
  const idEspecialidad = req.param('idEspecialidad');
  const consultas = await PacienteService.findByEspecialidad(idEspecialidad);
  return res.json({pacientes});
};

const getConsultaPorPaciente = async (req, res) => {
  const idPaciente = req.param('idPaciente');
  const consultas = await ConsultaService.consultasPorPaciente(idPaciente);
  return res.json({consultas});
};

const getMedicoByIdUser = async (req, res) => {
  const medico = await UsuarioService.consultasPorPaciente(idPaciente);
  return res.json({medico});
};

const findById = async (req, res) => {
  const id = req.param('id');
  try {
    const consulta = await Consulta.findPopulated(id);
    return res.ok(consulta);
  } catch (err) {
    return res.negotiate(err);
  }

};

module.exports = {
  getConsultasPorPacientePorEspecialidad,
  getConsultaPorPaciente,
  getMedicoByIdUser,
  create,
  findByPacienteId,
  findById,

};


