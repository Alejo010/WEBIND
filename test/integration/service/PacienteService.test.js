/**
 * Created by Felipe Rodriguez Arias <ucifarias@gmail.com> on 09/11/2017.
 */

let request = require('supertest');
let assert = require('assert');
let moment = require('moment');

describe('PacienteService', function () {


  // describe('#findByEspecialidad()', function () {
  //   it('should check findByEspecialidad function', function (done) {
  //     const idEspecialidad = '5b0c507e22d01a8c22f7d75c';
  //     PacienteService.findByEspecialidad(idEspecialidad)
  //       .then(function (result) {
  //         // console.log(result);
  //         console.log(result.length);
  //         assert.notEqual(undefined, result);
  //         done();
  //       })
  //       .catch(done);
  //   });
  // });
  //
  // describe('#find()', function () {
  //   it('should check find function', function (done) {
  //     PacienteService.find()
  //       .then(function (result) {
  //         // console.log(result);
  //         console.log(result.length);
  //         assert.notEqual(undefined, result);
  //         done();
  //       })
  //       .catch(done);
  //   });
  // });
  //
  describe('#findPacienteByCI()', function () {
    it('should check find function', function (done) {
      const ci = '87021522003';
      PacienteService.findPacienteByCI(ci)
        .then(function (result) {
          console.log(result);
          console.log(result.length);
          assert.notEqual(undefined, result);
          done();
        })
        .catch(done);
    });
  });



});
