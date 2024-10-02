/**
 * Created by WebIND on 17/10/2018.
 */


// let request = require('supertest');
let assert = require('assert');
// let moment = require('moment');



describe('AntecedenteService', function () {

  describe('#findAnt', function () {
    it('should check find function', function (done) {
      const idAntPrenatPac = '5bbf8a548b97c1ec6e6040f6 ';
      AntecedenteService(idAntPrenatPac)
        .then(function (result) {
          console.log(JSON.stringify(result.length));
          // console.log(result.length);
          assert.notEqual(undefined, result);
          done();
        })
        .catch(done);
    });
  });



});
