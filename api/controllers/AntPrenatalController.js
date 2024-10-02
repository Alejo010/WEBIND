/**
 * Antecedentes_prenatalesController
 *
 * @description :: Server-side logic for managing Antecedentes_prenatales
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


const getAntPrenatalesPorID = async (req, res) => {
  const id = req.param('id');
  const antPrenatal = await AntPrenatalService.findAntPrenatalByID(id);
  return res.json({antPrenatal});
};


module.exports = {
  getAntPrenatalesPorID,
};

