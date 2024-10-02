/**
 * AntecedenteFamiliarController
 *
 * @description :: Server-side logic for managing Antecedentes_patologicos_fams
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const getAntecedentes_familiaresPorID = async (req, res) => {
  const id = req.param('id');
  const antFamiliar = await AntFamiliarService.findAntFamiliarByID(id);
  return res.json({antFamiliar});
};


module.exports = {
  getAntecedentes_familiaresPorID,
};
