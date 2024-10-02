/**
 * Created by WebIND on 12/10/2018.
 */
// let request = require('supertest');
let assert = require('assert');
// let moment = require('moment');



describe('AntPrenatalService', function () {


  //probado y funciona
  describe('#findAntPrenatalByID', function () {
    it('should check find function', function (done) {
      const idAntPac = '5be5135623a790816f71ec4a';
      AntPrenatalService.findAntPrenatalByID(idAntPac)
        .then(function (result) {
          console.log(JSON.stringify(result));
          // console.log(result.length);
          assert.notEqual(undefined, result);
          done();
        })
        .catch(done);
    });
  });

});

