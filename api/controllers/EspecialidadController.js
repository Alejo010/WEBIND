/**
 * EspecialidadController
 *
 * @description :: Server-side logic for managing Especialidads
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const getReporte = (req, res) => {
  (async function () {
    let dataMedico = EspecialidadService.findReporteMedicos();
    let dataConsulta = EspecialidadService.findReporteConsulta();
    let dataConsultaMensual = EspecialidadService.findReporteConsultaXMes();
    let dataPertinencia = EspecialidadService.findReportePertinencia();
    [dataMedico, dataConsulta, dataConsultaMensual, dataPertinencia,] = [await dataMedico, await dataConsulta, await dataConsultaMensual, await dataPertinencia];
    return {dataMedico, dataConsulta, dataConsultaMensual, dataPertinencia};
  })().then(data => res.json(data)).catch(err => res.json(err));
};

const create = (req, res) => {
  return WorkService.create(req, res, Especialidad);
};

const update = (req, res) => {
  return WorkService.update(req, res, Especialidad);
};

const destroy = (req, res) => {
  return WorkService.destroy(req, res, Especialidad, 'medicos');
};

module.exports = {
  getReporte,
  create,
  update,
  destroy,
};

