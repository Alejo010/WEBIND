/**
 * Created by Felipe Rodriguez Arias <ucifarias@gmail.com> on 27/11/2017.
 */

/**
 * Verifica que no existan elemento duplicados en dependecia de la llave duplicate
 * @param req
 * @param res
 * @param model
 * @param duplicate
 */
const create = async(req, res, model, duplicate = 'nombre') => {
  let entity = await existEntity(req, model, duplicate);
  if (typeof entity !== 'undefined') {
    return res.json({error: req.__('duplicate-entity', entity[duplicate])});
  }

  let obj = objFromReq(req, model);
  let result = await model.create(obj);
  return res.json({result});
};

const update = async(req, res, model, duplicate = 'nombre') => {
  let entity = await existEntity(req, model, duplicate);
  if (typeof entity !== 'undefined') {
    return res.json({error: req.__('duplicate-entity', entity[duplicate])});
  }

  let obj = objFromReq(req, model);
  let result = await model.update(req.param('id'), obj);
  return res.json({result});
};

/**
 * Realiza la verificación antes de eliminar de que el elemento
 * no esté siendo utilizado por otras entidades
 * @param req El Request
 * @param res El Response
 * @param model El modelo al q pertenece la entidad
 * @param populate Q elemento va a populate
 * @param attr El atributo que identifica visualmente el elemento q se esta evaluando
 */
const destroy = async(req, res, model, populate, attr = 'nombre') => {
  let id = req.param('id');
  let entity = await model.findOne(id).populate(populate);
  if (typeof entity === 'undefined') {
    return res.json();
  }
  if (entity[populate].length > 0) {
    return res.json({error: req.__('no-delete-entity', entity[attr])});
  }
  await model.destroy(id);
  return res.json();
};

const existEntity = async(req, model, duplicate) => {
  let paramValue = req.param(duplicate);
  let findValue = {};

  findValue[duplicate] = paramValue;
  return await model.findOne(findValue);
};

const objFromReq = (req, model) => {
  let obj = {};
  let keys = Object.keys(model['attributes']);

  for (let key of keys) {
    if (req.param(key) !== undefined && !Array.isArray(req.param(key))) {
      obj[key] = req.param(key);
    }
  }
  return obj;
};

module.exports = {
  create,
  update,
  destroy,
};
