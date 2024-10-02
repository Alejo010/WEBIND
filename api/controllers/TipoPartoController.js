/**
 * TipoPartoController
 *
 * @description :: Server-side logic for managing Tipo_partoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const create = (req, res) => {
  return WorkService.create(req, res, TipoParto);
};

const update = (req, res) => {
  return WorkService.update(req, res, TipoParto);
};

const destroy = (req, res) => {
  return WorkService.destroy(req, res, TipoParto, 'antPerinatales');
};

module.exports = {
  create,
  update,
  destroy,
};

