
let request = require('supertest');
let assert = require('assert');
let moment = require('moment');

describe('UsuarioService', function () {

describe('#getMedicoByIdUser()', function () {
    it('should check find function', function (done) {
      const id = '5beb31cd3cd5b3e69eaa6b57';
      UsuarioService.getMedicoByIdUser(id)
        .then(function (result) {
          console.log(result);
        //  console.log(result.length);
          assert.notEqual(undefined, result);
          done();
        })
        .catch(done);
    });
  });

})