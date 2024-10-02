/**
 * Created by WebIND on 28/1/2019.
 */

async function findByProvincia (idProvincia) {
  let municipios = await Municipio.find({'provincia': idProvincia});
  return municipios;
}

module.exports = {
  findByProvincia,
};
