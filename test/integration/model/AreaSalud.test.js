/**
 * Created by Felipe Rodriguez Arias <ucifarias@gmail.com> on 09/11/2017.
 */

let request = require('supertest');
let assert = require('assert');
let moment = require("moment");

describe('AreaSalud', function () {

  describe('#find()', function () {
    it('should check find function', function (done) {
      AreaSalud.find()
        .populate('pacientes')
        .then(function (result) {
          // console.log(result);
          assert.notEqual(undefined, result);
          done();
        })
        .catch(done);
    });
  });

  describe('#count', function () {
    it('check count pacientes', function (done) {
      AreaSalud.findOne({
        nombre: {'contains': 'e'},
      })
        .populate('pacientes')
        .then(function (result) {
          console.log(`${result.id} -> ${result.nombre} -> COUNT: ${result.getCountPacientes()}`);
          assert.notEqual(undefined, result);
          done();
        })
        .catch(done);
    });
  });

  describe('#delete', function () {
    it('check delete', function (done) {
      let nombre = 'magnam2';
      let keys = Object.keys(AreaSalud['attributes']);
      console.log(keys);

      let exist = (key) => {
        let result = keys.filter(val => val === key);
        return result.length > 0;
      };

      let values = ['nombre', 'municipio'];
      let obj = {};

      for (let key of values) {
        if (exist(key)) {
          console.warn(`KEY DENTRO DEL IF-> ${key}`);
          obj[key] = key;
          // Object.defineProperty(obj, key, {
          //   writable: true,
          //   value: key
          // });
        }
      }

      console.log(JSON.stringify(obj));

      // AreaSalud.findOne({nombre})
      //   .then(result => {
      //     console.log(result);
      //     assert.notEqual(undefined, result);
      //     done();
      //   })
      //   .catch(done);
      done();
    });
  });

});
