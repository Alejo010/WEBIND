/**
 * Created by Francisco Javier Deler O´Farril on 26/10/2018.
 */


module.exports = {
  restartUserOnline: cb => {
    async.series({
      zero: callback => {
        //var s = require('../.././chat/server');
        var cS = require('../controllers/UsuarioController').restartAllUserOnline;
        //s.appExecute();   
      },
    }, err => cb());
  },
};