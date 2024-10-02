/**
 * OcupacionController
 *
 * @description :: Server-side logic for managing Ocupacions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const create = (req, res) => {
  return WorkService.create(req, res/*, Ocupacion*/);
};

const update = (req, res) => {
  return WorkService.update(req, res/*, Ocupacion*/);
};

const destroy = (req, res) => {
  return WorkService.destroy(req, res,/* Ocupacion, */'familiares');
};

module.exports = {
  create,
  update,
  destroy,
};


