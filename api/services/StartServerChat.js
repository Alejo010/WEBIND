/**
 * Created by Francisco Javier Deler O´Farril on 26/10/2018.
 */


module.exports = {
  OnlineServer: cb => {
    async.series({
      zero: callback => {
        //var s = require('../.././chat/server');
        var cS = require('../.././chat/ServerChat');
        //s.appExecute();   
      },
    }, err => cb());
  },
};