/**
 * Created by Felipe Rodriguez Arias <ucifarias@gmail.com> on 05/11/2017.
 */

let faker = require('faker');
faker.locale = "es";

module.exports = {
  generate: (callback) => {

    let count = 100, counter = 0;

    for (let i = 0; i < count; i++) {
      let otros = faker.lorem.sentence();

      AntPersonal.create({
        otros
      }).then(() => {
        counter++;
        if (counter === count) {
          callback();
        }
      }).catch(err => `AntPersonal: ${console.log(err)}`);
    }
  },
};
