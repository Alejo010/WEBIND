/**
 * ExamenController
 *
 * @description :: Server-side logic for managing Examenes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const create = (req, res) => {
  var examen = req.param('examen');
  console.log('examen que llego al controller de examen', examen);
  return WorkService.create(req, res, Examen);
};

const update = (req, res) => {
  return WorkService.update(req, res, Examen);
};

const destroy = (req, res) => {
  return WorkService.destroy(req, res, Examen, 'examenesIndicados');
};

module.exports = {
  create,
  update,
  destroy,
};

