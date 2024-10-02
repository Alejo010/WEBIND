/**
 * Antecedentes_perinatalesController
 *
 * @description :: Server-side logic for managing Antecedentes_perinatales
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const getAntecedentes_perinatalesPorID = async (req, res) => {
  const id = req.param('id');
  const antPerinatal = await AntPerinatalService.findAntPerinatalByID(id);
  return res.json({antPerinatal});
};


module.exports = {
  getAntecedentes_perinatalesPorID,
};
