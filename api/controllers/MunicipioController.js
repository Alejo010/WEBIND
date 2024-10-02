/**
 * MunicipioController
 *
 * @description :: Server-side logic for managing Municipios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const create = (req, res) => {
  return WorkService.create(req, res, Municipio);
};

const update = (req, res) => {
  return WorkService.update(req, res, Municipio);
};

const destroy = (req, res) => {
  return WorkService.destroy(req, res, Municipio, 'areas');
};

const getMunicipiosPorProvincia = async (req, res) => {
  const idProvincia = req.param('idProvincia');
  const municipios = await MunicipioService.findByProvincia(idProvincia);
  return res.json({municipios});
};

module.exports = {
  create,
  update,
  destroy,
  getMunicipiosPorProvincia,
};

