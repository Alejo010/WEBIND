/**
 * NivelEscolaridadController
 *
 * @description :: Server-side logic for managing Nivel_de_escolaridads
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const create = (req, res) => {
  return WorkService.create(req, res, NivelEscolaridad);
};

const update = (req, res) => {
  return WorkService.update(req, res, NivelEscolaridad);
};

const destroy = (req, res) => {
  return WorkService.destroy(req, res, NivelEscolaridad, 'familiares');
};

module.exports = {
  create,
  update,
  destroy,
};

