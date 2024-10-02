/**
 * Created by WebIND on 12/10/2018.
 */


//funciona ok
async function findAntPostnatalByID (idAntPostnatPac) {
  let ant = await AntPostnatal.find({"id" : idAntPostnatPac});
  return ant;
}

module.exports = {
  findAntPostnatalByID,
};
