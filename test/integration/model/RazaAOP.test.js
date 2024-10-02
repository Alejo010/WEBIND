/**
 * Created by Felipe Rodriguez Arias <ucifarias@gmail.com> on 23/11/2017.
 */

let assert = require('assert');
let aop = require("node-aop");
let JSONC = require("circular-json");

describe('Raza', function () {
  describe('#create', function () {
    it('check count create', function (done) {
      // Raza.create({nombre: 'Amarillo1212'})
      //   .then(result => {
      //     console.log(result);
      //     assert.notEqual(undefined, result);
      //     done();
      //   })
      //   .catch(err => console.error(err));

      aop.after(Raza, "find", function (value) {
        if (value) {
          // console.log(`${JSONC.stringify(value)}`);
          console.log('CONSULTA AOP');
        }
      });

      Raza.find()
      .then(result => {
        console.log(`LENGTH -> ${result.length}`);
      })
      .catch(err => console.error(err));

      let obj = {
        url: "",
        get: function (key) {
          return this[key];
        },
        set: function (key, value) {
          this[key] = value;
        }
      };

      let h1 = aop.before(obj, "set", function (key, value) {
        value += " before-1 ";
        return [key, value]; // modify the parameters,
      });

      let h2 = aop.before(obj, "set", function (key, value) {
        value += " before-2 ";// do not modify the parameters
      });

      obj.set("url", "http://mojijs.com");
      console.log(obj.get("url"));  // http://mojijs.com before-1

      // rmmove
      h1.remove();
      h2.remove();

      obj.set("url", "http://google.com");
      console.log( obj.get("url") ); // http://google.com

      done();
    });
  });
});
