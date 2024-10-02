/**
 * Created by WebIND on 12/10/2018.
 */

async function findAntPerinatalByID (idAntPerinatPac) {
  return await AntPerinatal.find({id: idAntPerinatPac});
}

module.exports = {
  findAntPerinatalByID,
};
