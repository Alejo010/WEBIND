/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
   * etc. depending on your default view engine) your home page.              *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/
  /*
   '/': {
   view: 'homepage'
   }

   '/login': {
   view: 'template/alpona/login'
   },
    '/': {
   view: 'template/alpona/index_admin'
   },*/

  '/': {
    view: 'template/alpona/index'
    //view: 'template/alpona/login'
  },

  // '/principal': {
  //   view: 'template/principals'
  // },

  '/maincotainer': {
    view: 'template/alpona/maincontainer'
  },
  '/makemedicalquery': {
    view: 'template/alpona/formationwizard/wizardpaginationDateBook'
  },
  '/royalmedicalquery': {
    view: 'template/alpona/querywizard/wizardpaginationDateBook'
  },
  '/viewquery': {
    view: 'template/alpona/basic-table'
  },
  '/wizard': {
    view: 'template/alpona/form-wizard'
  },
  '/newquery': {
    view: 'template/alpona/form-elements'
  },
  '/templates/formationwizard/customer.html': {
    view: 'template/alpona/formationwizard/customer1'
  },
  '/templates/formationwizard/licence.html': {
    view: 'template/alpona/formationwizard/licence1'
  },
  '/templates/formationwizard/payment.html': {
    view: 'template/alpona/formationwizard/observations1'
  },
  '/templates/formationwizard/recap.html': {
    view: 'template/alpona/formationwizard/recap1'
  },
  '/templates/querywizard/page1.html': {
    view: 'template/alpona/querywizard/page1'
  },
  '/templates/querywizard/page2.html': {
    view: 'template/alpona/querywizard/page2'
  },
  '/templates/querywizard/page3.html': {
    view: 'template/alpona/querywizard/page3'
  },
  '/wmodalMessage': {
    view: 'template/alpona/wmodalMessage'
  },


  /***************************************************************************
   *                                                                          *
   * Custom routes here...                                                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the custom routes above, it   *
   * is matched against Sails route blueprints. See `config/blueprints.js`    *
   * for configuration options and examples.                                  *
   *                                                                          *
   ***************************************************************************/

  'post /searchpacient': 'PacienteController.findPacient',
  'post /searchpacientmoredata': 'PacienteController.findMorePacientInfo',
  'post /checklogin': 'LoginController.check',
  'post /usernameCheck': 'UsuarioController.userNameCheck',
  'post /login': 'UsuarioController.loginUser',
  'post /userSessionCheck': 'UsuarioController.userSessionCheck',
  'post /addSocketId': 'UsuarioController.addSocketId',
  'post /getMessages': 'MensajeController.getMessages',
  'post /logout': 'UsuarioController.logout',
  'post /setSession': 'UsuarioController.setSession',
  'post /getSession': 'UsuarioController.getSession',
  // New chat
  'GET /getWebSocketID': 'SocketController.getWebSocketID',
  'POST /chatList': 'SocketController.getChatList',
  'POST /sendMessage': 'SocketController.sendMessage',
  'POST /joinChat': 'SocketController.joinChat',
  'POST /leaveChat': 'SocketController.leaveChat',
  'POST /sendUserId': 'SocketController.sendUserId',
  'POST /addMessage': 'SocketController.addMessage',

  'post /getMedicoByIdUser': 'ConsultaController.getMedicoByIdUser',
  'post /deleteUser': 'UsuarioController.deleteUser',
  'post /getUserId': 'UsuarioController.getUserId',
  'post /updateUser': 'UsuarioController.updateUser',
  'post /getEspNameByUserId': 'UsuarioController.getEspNameByUserId',
  'post /getEspNameByMedicoId': 'UsuarioController.getEspNameByMedicoId',
  'post /getIncompleteRemissionCount': 'RemisionController.getIncompleteRemissionCount',

  'post /savePlanificacion': 'PlanificacionController.savePlanificacion',
  'post /getAllPlanificacion': 'PlanificacionController.getAllPlanificacion',

  /***************************************************************************
   *                                                                          *
   * Testing routes here...                                                   *
   *                                                                          *
   ***************************************************************************/

  '/home': 'DefaultController.homeAction',

  /***************************************************************************
   *                                                                          *
   * Reportes routes here...                                                  *
   *                                                                          *
   ***************************************************************************/
  'GET /reporte/area-salud': 'AreaSaludController.getReporte',
  'GET /reporte/especialidad': 'EspecialidadController.getReporte',
  'POST /reporte/pacientes/especialidad': 'PacienteController.getPacientesPorEspecialidad',
  'POST /areaSalud/por/municipio': 'AreaSaludController.getAreasSaludPorMunicipio',
  'POST /municipio/por/provincia': 'MunicipioController.getMunicipiosPorProvincia',
  'POST /paciente/por/hc': 'PacienteController.getPacientesPorHC',
  'POST /paciente/por/ci': 'PacienteController.getPacientesPorCI',
  'POST /antPrenatal/por/id': 'AntPrenatalController.getAntPrenatalesPorID',

};
