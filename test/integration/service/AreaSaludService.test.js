/**
 * Created by Felipe Rodriguez Arias <ucifarias@gmail.com> on 09/11/2017.
 */

let request = require('supertest');
let assert = require('assert');

describe('AreaSaludService', function () {

  // describe('#findReportePaciente()', function () {
  //   it('should check findReportePaciente function', function (done) {
  //     AreaSaludService.findReportePaciente()
  //       .then(function (result) {
  //         console.log(result);
  //         assert.notEqual(undefined, result);
  //         done();
  //       })
  //       .catch(done);
  //   });
  // });
  //
  // describe('#findReportePacienteSexo()', function () {
  //   it('should check findReportePacienteSexo function', function (done) {
  //     AreaSaludService.findReportePacienteSexo()
  //       .then(function (result) {
  //         console.log(result);
  //         assert.notEqual(undefined, result);
  //         done();
  //       })
  //       .catch(done);
  //   });
  // });

  describe('#findByMunicipio()', function () {
    it('should check findByMunicipio function', function (done) {
      let id = '5b9a75e2e562782013c55eed';
      AreaSaludService.findByMunicipio(id)
        .then(function (result) {
          console.log(result);
          console.log('length', result.length);
          assert.notEqual(undefined, result);
          done();
        })
        .catch(done);
    });
  });

});
