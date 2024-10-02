/**
 * AreaSaludController
 *
 * @description :: Server-side logic for managing Area_saluds
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const getReporte = async(req, res) => {
  // let dataPaciente = [], dataSexo = [], dataRaza = [];
  // AreaSaludService.findReportePaciente()
  //   .then(data => dataPaciente = data)
  //   .then(() => AreaSaludService.findReportePacienteSexo())
  //   .then(data => dataSexo = data)
  //   .then(() => AreaSaludService.findReportePacienteRaza())
  //   .then(data => dataRaza = data)
  //   .then(() => res.json({dataPaciente, dataSexo, dataRaza}))
  //   .catch(err => res.json(err));

  // let dataPaciente = await AreaSaludService.findReportePaciente(),
  //   dataSexo = await AreaSaludService.findReportePacienteSexo(),
  //   dataRaza = await AreaSaludService.findReportePacienteRaza();
  // return res.json({dataPaciente, dataSexo, dataRaza});

  let initAreas = await AreaSalud.find().populate('pacientes');
  let dataPaciente = AreaSaludService.findReportePaciente(initAreas),
    dataSexo = AreaSaludService.findReportePacienteSexo(initAreas),
    dataRaza = AreaSaludService.findReportePacienteRaza(initAreas);
  [dataPaciente, dataSexo, dataRaza] = [await dataPaciente, await dataSexo, await dataRaza];
  return res.json({dataPaciente, dataSexo, dataRaza});
};

const create = (req, res) => {
  return WorkService.create(req, res, AreaSalud);
};

const update = (req, res) => {
  return WorkService.update(req, res, AreaSalud);
};

const destroy = (req, res) => {
  return WorkService.destroy(req, res, AreaSalud, 'pacientes');
};

const getAreasSaludPorMunicipio = async (req, res) => {
  const idMunicipio = req.param('idMunicipio');
  const areas = await AreaSaludService.findByMunicipio(idMunicipio);
  return res.json({areas});
};


module.exports = {
  getReporte,
  create,
  update,
  destroy,
  getAreasSaludPorMunicipio,
};

