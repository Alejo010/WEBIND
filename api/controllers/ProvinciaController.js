/**
 * ProvinciaController
 *
 * @description :: Server-side logic for managing Provincias
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const create = (req, res) => {
  return WorkService.create(req, res, Provincia);
};

const update = (req, res) => {
  return WorkService.update(req, res, Provincia);
};

const destroy = (req, res) => {
  return WorkService.destroy(req, res, Provincia, 'municipios');
};

module.exports = {
  create,
  update,
  destroy,
};

