/**
 * PacienteController
 *
 * @description :: Server-side logic for managing Paciente_Controller
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */



// Función para actualizar un paciente
const update = (req, res) => {
  return WorkService.update(req, res, Paciente);
};

// Función para marcar como eliminado a un paciente
const destroy = (req, res) => {
  // return WorkService.destroy(req, res, Paciente);
  let id = req.param('id');
  let result = PacienteService.destroy(id);
  return res.json({result});
};

// Función para buscar y devolver todos los pacientes
const find = async (req, res) => {
  let result = await PacienteService.find();
  return res.json(result);
};

// Función para buscar y devolver los pacientes marcados como eliminados
const findEliminados = async (req, res) => {
  let result = await PacienteService.findEliminados();
  return res.json(result);
};

// Función para buscar un paciente según diferentes criterios
const findPacient = (req, res) => {
// Se construye un objeto de búsqueda en base a los parámetros recibidos
  // Se realiza la búsqueda utilizando el servicio DatosPacienteService
  let searchQuery = {};

  if (req.param('HC')) {
    searchQuery.hc = req.param('HC');
  }

  if (req.param('CI')) {
    searchQuery.persona = {};
    searchQuery.persona.ci = req.param('CI');
  }

  if (req.param('name')) {
    if (!searchQuery.persona) {
      searchQuery.persona = {};
    }
    searchQuery.persona.name = req.param('name');
    searchQuery.persona.lastname = req.param('name');
  }

  if (req.param('fullname')) {
    if (!searchQuery.persona) {
      searchQuery.persona = {};
    }
    searchQuery.persona.fullname = req.param('fullname');
  }

  if (!searchQuery.persona && !searchQuery.hc) {
    return res.json({status: 'error', info: 'No hay información suficiente para realizar la búsqueda.'});
  }
  else {
    DatosPacienteService.searchQuery(searchQuery, function (err, result) {
      if (err) {
        return res.json({status: 'error', info: 'Hubo un error al realizar la búsqueda ' + result});
      }
      else {
        console.log(JSON.stringify(result));
        return res.json({status: 'ok', info: result});
      }
    });
  }
};

const findMorePacientInfo = (req, res) => {
  let pacientQuery = {};
  pacientQuery = req.param('pacient');
  console.log(JSON.stringify(pacientQuery));

  if (!pacientQuery || !pacientQuery.datos_paciente) {
    return res.json({status: 'error', info: 'No hay información suficiente para realizar la búsqueda.'});
  }
  else {
    DatosPacienteService.searchMoreQueryInfo(pacientQuery, function (err, result) {
      if (err) {
        return res.json({status: 'error', info: 'Hubo un error al realizar la búsqueda ' + result});
      }
      else {
        console.log(JSON.stringify(result));
        return res.json({status: 'ok', info: result});
      }
    });
  }
};

// Función para obtener pacientes por especialidad
const getPacientesPorEspecialidad = async (req, res) => {
  // Se obtiene el ID de la especialidad de la solicitud
  // Se busca y devuelve los pacientes por la especialidad utilizando el servicio PacienteService
  const idEspecialidad = req.param('idEspecialidad');
  const pacientes = await PacienteService.findByEspecialidad(idEspecialidad);
  return res.json({pacientes});
};

// Función para obtener un paciente por su número de historia clínica
// Se obtiene el número de historia clínica de la solicitud
// Se busca y devuelve el paciente por su número de historia clínica utilizando el servicio PacienteService
const getPacientesPorHC = async (req, res) => {
  const hc = req.param('hc');
  const paciente = await PacienteService.findPacienteByHC(hc);
  return res.json({paciente});
};

// Función para obtener un paciente por su número de cédula de identidad
// Se obtiene el número de cédula de identidad de la solicitud
// Se busca y devuelve el paciente por su número de cédula de identidad utilizando el servicio PacienteService
const getPacientesPorCI = async (req, res) => {
  const ci = req.param('ci');
  const paciente = await PacienteService.findPacienteByCI(ci);
  return res.json({paciente});
};

// Función para buscar pacientes por especialidad
const findPacientesByEspecialidad = async (req, res) => {
  const especialidadId = req.param('especialidadId');
// Se obtiene el ID de la especialidad de la solicitud
  try {
    pacientes = await Paciente.findPacientesByEspecialidad(especialidadId);
    return res.json(pacientes);
  } catch (err) {
    return res.negotiate(err);
  }

};


// Se exportan las funciones del controlador para ser utilizadas en otros archivos
module.exports = {
  find,
  destroy,
  findPacient,
  findMorePacientInfo,
  getPacientesPorEspecialidad,
  findEliminados,
  getPacientesPorHC,
  getPacientesPorCI,
  findPacientesByEspecialidad,
// Otras funciones relacionadas con la creación y actualización de pacientes
  findPopulatedForEdit: async function (req, res) {
    let id = req.param('id');

    try {
      let paciente = await Paciente.findPopulatedForEdit(id);
      // console.log(p);

      return res.json(paciente);
    } catch (err) {
      return res.negotiate(err);
    }
  },
//-------------------------------------------------------------------------------------------------------------------
 //recibe el id del paciente y devuelve el paciente populado con todo
  findFullyPopulated: async function (req, res) {
    let id = req.param('id');
    try {
      let paciente = await Paciente.findFullyPopulated(id);
      // console.log(p);
      return res.json(paciente);
    } catch (err) {
      return res.negotiate(err);
    }
  },
  //-------------------------------------------------------------------------------
    /* Esta función maneja la creación de un nuevo paciente.
    * Recibe datos del paciente y de la familia desde la solicitud, los procesa y los almacena en la base de datos.
    */
   create : async function(req, res) {
   
     // Extrayendo parámetros de la solicitud
    //hasta aqui llega bien paciente y familiar
     const familiar = req.param('familiar');
     const paciente = req.param('paciente');
     var antF = req.param('antFamiliar');
   
     // Extrayendo antecedentes de los datos del paciente

     // delete paciente.antecedente.antFamiliar;

     const antPrenatal = paciente.antecedente.antPrenatal;
     const antPerinatal = paciente.antecedente.antPerinatal;
     const antPostnatal = paciente.antecedente.antPostnatal;
     const antPersonal = paciente.antecedente.antPersonal;
   
     try {
       // Creando registros de antecedentes en la base de datos
       var pre = await AntPrenatal.create(antPrenatal);
       var peri = await AntPerinatal.create(antPerinatal);
       var post = await AntPostnatal.create(antPostnatal);
       var per = await AntPersonal.create(antPersonal);
   
     } catch (err) {
       console.log(err);
       return res.negotiate(err);
     }
   
     // Construyendo el objeto de antecedentes con los IDs de los registros creados
     const antecedente = {
       antPrenatal: pre.id,
       antPerinatal: peri.id,
       antPostnatal: post.id,
       antPersonal: per.id,
     };
   
     try {
       // Creando el registro del paciente con el objeto de antecedentes
       paciente.antecedente = await Antecedente.create(antecedente);
       delete paciente.municipio;
   
       // Creando el registro de la familia y vinculándolo al paciente
       familiar.paciente = await Paciente.create(paciente);
       antF.paciente = familiar.paciente.id;
       antF = await AntFamiliar.create(antF);
       var fam = await Familiar.create(familiar);
       return res.ok([fam, familiar.paciente]);
     } catch (err) {
       console.log(err);
       return res.negotiate(err);
     }
   },
   //-------------------------------------------------------------------------------
  update: async function (req, res) {
    var familiar = req.param('familiar');
    var paciente = req.param('paciente');
    var antFamiliar = req.param('antFamiliar');
    // console.log(familiar);
    // console.log(paciente);

    var antPrenatal = paciente.antecedente.antPrenatal;
    var antPerinatal = paciente.antecedente.antPerinatal;
    var antPostnatal = paciente.antecedente.antPostnatal;
    var antPersonal = paciente.antecedente.antPersonal;

    try {
      var pre = await AntPrenatal.update(antPrenatal.id, antPrenatal);
      var peri = await AntPerinatal.update(antPerinatal.id, antPerinatal);
      var post = await AntPostnatal.update(antPostnatal.id, antPostnatal);
      var per = await AntPersonal.update(antPersonal.id, antPersonal);
    } catch (err) {
      return res.negotiate(err);
    }

    var antecedente = {
      antPrenatal: pre.id,
      antPerinatal: peri.id,
      antPostnatal: post.id,
      antPersonal: per.id
    };

    delete paciente.municipio;
    paciente.areaSalud = paciente.areaSalud.id;
    paciente.antecedente = paciente.antecedente.id;
    delete paciente.familiares;
    delete paciente.antFamiliar;

    try {
      console.log(familiar);
      console.log(paciente);
      var f = await Familiar.update(familiar.id, familiar);
      var p = await Paciente.update(paciente.id, paciente);
      var af = await AntFamiliar.update(antFamiliar.id, antFamiliar);

      return res.ok([f,p,af]);
    } catch(err) {
      console.log(err);
      return res.negotiate(err);
    }


  }
};

