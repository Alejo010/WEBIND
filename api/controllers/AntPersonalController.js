/**
 * AntecedentePersonalController
 *
 * @description :: Server-side logic for managing Antecedentes_patologicos_pers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


const getAntecedentes_personolesPorID = async (req, res) => {
  const id = req.param('id');
  const antPersonal = await AntPersonalService.findAntPersonalByID(id);
  return res.json({antPersonal});
};


module.exports = {
  getAntecedentes_personolesPorID,
};
