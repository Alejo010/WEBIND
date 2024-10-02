/**
 * Created by Felipe Rodriguez Arias <ucifarias@gmail.com> on 09/11/2017.
 */

let request = require('supertest');
let assert = require('assert');
let moment = require('moment');

describe('EspecialidadService', function () {

  // describe('#findReporteMedicos()', function () {
  //   it('should check findReporteMedicos function', function (done) {
  //     EspecialidadService.findReporteMedicos()
  //       .then(function (result) {
  //         console.log(result);
  //         assert.notEqual(undefined, result);
  //         done();
  //       })
  //       .catch(done);
  //   });
  // });
  //
  // describe('#findReporteConsulta()', function () {
  //   it('should check findReporteConsulta function', function (done) {
  //     EspecialidadService.findReporteConsulta()
  //       .then(function (result) {
  //         console.log(result);
  //         assert.notEqual(undefined, result);
  //         done();
  //       })
  //       .catch(done);
  //   });
  // });

  // describe('#findReporteConsultaXMes()', function () {
  //   it('should check findReporteConsultaXMes function', function (done) {
  //     EspecialidadService.findReporteConsultaXMes()
  //       .then(function (result) {
  //         console.log(result);
  //         assert.notEqual(undefined, result);
  //         done();
  //       })
  //       .catch(done);
  //   });
  // });

  describe('#findReportePertinencia()', function () {
    it('should check findReportePertinencia function', function (done) {
      EspecialidadService.findReportePertinencia()
        .then(function (result) {
          console.log(result);
          assert.notEqual(undefined, result);
          done();
        })
        .catch(done);
    });
  });

});
