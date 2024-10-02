/**
 * MovimientoFetalController
 *
 * @description :: Server-side logic for managing Movimientos_fetales
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const create = (req, res) => {
  return WorkService.create(req, res, MovimientoFetal);
};

const update = (req, res) => {
  return WorkService.update(req, res, MovimientoFetal);
};

const destroy = (req, res) => {
  return WorkService.destroy(req, res, MovimientoFetal, 'antPrenatales');
};

module.exports = {
  create,
  update,
  destroy,
};

