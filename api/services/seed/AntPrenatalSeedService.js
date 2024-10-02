/**
 * Created by Felipe Rodriguez Arias <ucifarias@gmail.com> on 05/11/2017.
 */

let faker = require('faker');
faker.locale = "es";

module.exports = {
  generate: (callback) => {
    MovimientoFetal.find().then(movimientosFetales => {
      let count = 100, counter = 0;

      for (let i = 0; i < count; i++) {
        let edadMaterna = faker.random.number({min: 20, max: 42});
        let habitosToxicosMadre = faker.lorem.sentence();
        let alteracionesEcosonograficas = faker.lorem.sentence();
        let antObstetricos = faker.lorem.sentence();
        let enfermedadesMaternasAgudas = faker.lorem.sentence();
        let antEnfCronicaMaterna = faker.lorem.sentence();
        let otros = faker.lorem.sentence();
        let movimientoFetal = faker.random.arrayElement(movimientosFetales);

        AntPrenatal.create({
          edadMaterna, habitosToxicosMadre, alteracionesEcosonograficas,
          antObstetricos, enfermedadesMaternasAgudas, antEnfCronicaMaterna, otros, movimientoFetal
        }).then(() => {
          counter++;
          if (counter === count) {
            callback();
          }
        }).catch(err => `AntPrenatal: ${console.log(err)}`);
      }
    }).catch(err => `MovimientoFetal: ${console.log(err)}`);
  },
};
