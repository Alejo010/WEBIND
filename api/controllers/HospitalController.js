/**
 * HospitalController
 *
 * @description :: Server-side logic for managing Hospital_donde_nacios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const create = (req, res) => {
  return WorkService.create(req, res, Hospital);
};

const update = (req, res) => {
  return WorkService.update(req, res, Hospital);
};

const destroy = (req, res) => {
  return WorkService.destroy(req, res, Hospital, 'pacientes');
};

module.exports = {
  create,
  update,
  destroy,
};

