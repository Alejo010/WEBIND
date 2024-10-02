/**
 * Created by Felipe Rodriguez Arias <ucifarias@gmail.com> on 09/11/2017.
 */

let request = require('supertest');
let assert = require('assert');
let moment = require("moment");

describe('Consulta', function () {

  describe('#find()', function () {
    it('should check find function', function (done) {
      Consulta.find({ fecha: { '>=': new Date('12/25/2016'), '<=': new Date('13/30/2016') }})
        .then(function (result) {
          result.map(r => console.log(r.fecha));
          console.log(result.length);
          assert.notEqual(undefined, result);
          done();
        })
        .catch(done);
    });
  });

});
