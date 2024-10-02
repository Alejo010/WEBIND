/**
 * Created by WebIND on 12/10/2018.
 */


//funciona ok
async function findAntPersonalesyID (idAntPerPac) {
  let ant = await AntPersonal.find({"id" : idAntPerPac});
  return ant;
}

module.exports = {
  findAntPersonalesyID,
};
