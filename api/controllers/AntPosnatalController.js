/**
 * Antecedentes_posnatalesController
 *
 * @description :: Server-side logic for managing Antecedentes_posnatales
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const getAntecedentes_postnatalesPorID = async (req, res) => {
  const id = req.param('id');
  const antPostnatal = await AntPostnatalService.findAntPostnatalByID(id);
  return res.json({antPostnatal});
};


module.exports = {
  getAntecedentes_postnatalesPorID,
};
