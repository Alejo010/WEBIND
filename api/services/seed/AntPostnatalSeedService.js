/**
 * Created by Felipe Rodriguez Arias <ucifarias@gmail.com> on 05/11/2017.
 */

let faker = require('faker');
faker.locale = "es";

module.exports = {
  generate: (callback) => {
    let count = 100, counter = 0;

    for (let i = 0; i < count; i++) {
      let infeccionesSnc = faker.lorem.sentence();
      let infeccionesSistemicas = faker.lorem.sentence();
      let traumatismosCraneales = faker.lorem.sentence();
      let malFormaCongenitas = faker.lorem.sentence();
      let otros = faker.lorem.sentence();

      AntPostnatal.create({
        infeccionesSnc, infeccionesSistemicas, traumatismosCraneales, malFormaCongenitas, otros
      }).then(() => {
        counter++;
        if (counter === count) {
          callback();
        }
      }).catch(err => `AntPostnatal: ${console.log(err)}`);
    }
  },
};
