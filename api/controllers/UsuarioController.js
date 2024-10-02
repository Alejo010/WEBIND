/**
 * Created by Felipe on 04/06/2018.
 */

const userNameCheck = async (req, res) => {
  const username = req.param('username');
  let result = await UsuarioService.userNameCheck(username);
  return res.json(result);
};


const loginUser = async (req, res) => {
  const data = {
    username: req.param('username'),
    password: req.param('password')
  }
  const result = await UsuarioService.loginUser(data);
  return res.json(result);
};

const addSocketId = async (req, res) => {
  //console.log("Socket id to insert: " + req.param('socketId'));
  var userId = req.param('userId');
  var socketId = req.param('socketId');
  const result = await UsuarioService.addSocketId(userId, socketId);
  return res.json(result);
};

const crearUsuario = async (req, res) => {
  console.log("req " + req);
  return res.json(result);
};

const create = async (req, res) => {
  var usuario = req.param('usuario');
  var medico = req.param('medico');

  //console.log('JSON.stringify(medico)  ',JSON.stringify(medico));
  delete usuario.medico;
  try {
    //console.log('usuario', usuario);
    nuevoUsuario = await Usuario.create(usuario);
    //console.log(medico);
    if (medico) {
      //console.log('entro al if', medico);
      medico.usuario_medico = nuevoUsuario.id;
      nuevoMedico = await Medico.create(medico);
      return res.ok([nuevoMedico, nuevoUsuario]);
    }
    return res.ok(nuevoUsuario);

  } catch (err) {
    console.log('explotó', err);
    return res.badRequest(err);
  }
};


const userSessionCheck = async (req, res) => {
  const userId = req.param('userId');
  let result = await UsuarioService.userSessionCheck(userId);
  return res.json(result);
};


const logout = async (req, res) => {
  const userId = req.param('id');
  let result = await UsuarioService.logout(userId);
  req.session.userId = '';
  return res.json(result);
};

const setSession = async (req, res) => {
  req.session.userId = req.param('id');
  return res.json(req.session.userId || 'not yet set');
};

const getSession = async (req, res) => {
  return res.json(req.session.userId || 'not yet set');
};

const getUserLogged = async (req, res) => {
  if(!req.session.userId) {
    return res.ok();
  }
  try {
    var user = await Usuario.findOne(req.session.userId).populate('medicos');
    user.medicos[0].especialidad = await Especialidad.findOne(user.medicos[0].especialidad);
    return res.ok(user || undefined);
  } catch (err) {
    //console.log(err);
    return res.negotiate(err);
  }
};

const deleteUser = async (req, res) => {
    const userId = req.param('id');
    let result = await UsuarioService.deleteUser(userId);
    return res.json(result);
};

const getUserId = async (req, res) => {
    const userId = req.param('id');
    let result = await UsuarioService.getUserId(userId);
    return res.json(result);
};

const updateUser = async (req, res) => {
    const user = req.param('user');
    let result = await UsuarioService.updateUser(user);
    return res.json(result);
};

const getEspNameByUserId = async (req, res) => {
  const userId = req.param('id');
  let result = await UsuarioService.getEspNameByUserId(userId);
  return res.json(result);
};
const getEspNameByMedicoId = async (req, res) => {
  const userId = req.param('id');
  let result = await UsuarioService.getEspNameByMedicoId(userId);
  return res.json(result);
};

module.exports = {
  userNameCheck,
  loginUser,
  addSocketId,
  userSessionCheck,
  logout,
  create,
  crearUsuario,
  getUserLogged,
  setSession,
  getSession,
  deleteUser,
  getUserId,
  updateUser,
  getEspNameByUserId,
  getEspNameByMedicoId
};
