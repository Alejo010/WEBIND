/**
 * ParentezcoController
 *
 * @description :: Server-side logic for managing Parentezcoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const create = (req, res) => {
  return WorkService.create(req, res, Parentezco);
};

const update = (req, res) => {
  return WorkService.update(req, res, Parentezco);
};

const destroy = (req, res) => {
  return WorkService.destroy(req, res, Parentezco, 'familiares');
};

module.exports = {
  create,
  update,
  destroy,
};

