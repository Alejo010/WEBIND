/**
 * Created by WebIND on 12/10/2018.
 */

//funciona ok
async function findAntFamiliarByID (idAntFamPac) {
  let ant = await AntFamiliar.find({"id" : idAntFamPac});
  return ant;
}



module.exports = {
  findAntFamiliarByID,
};
