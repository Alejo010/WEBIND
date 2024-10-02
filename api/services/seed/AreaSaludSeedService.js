/**
 * Created by Felipe Rodriguez Arias <ucifarias@gmail.com> on 05/11/2017.
 */

let faker = require('faker');
faker.locale = "es";

module.exports = {
  generate: (callback) => {
    Municipio.find().then(municipios => {
      let count = 10, counter = 0;

      for (let i = 0; i < count; i++) {
        let nombre = `${faker.lorem.word()}${i}`;
        let municipio = faker.random.arrayElement(municipios);

        AreaSalud.create({
          nombre, municipio
        }).then(() => {
          counter++;
          if (counter === count) {
            callback();
          }
        }).catch(err => `AreaSalud: ${console.log(err)}`);
      }

    }).catch(err => `Municipio: ${console.log(err)}`);
  },
};
