/**
 * Created by Felipe Rodriguez Arias <ucifarias@gmail.com> on 05/11/2017.
 */

let faker = require('faker');
faker.locale = "es";

module.exports = {
  generate: (callback) => {
    TipoParto.find().then(partos => {
      let count = 100, counter = 0;

      for (let i = 0; i < count; i++) {
        let pesoAlNacer = faker.random.number({min: 2, max: 5});
        let talla = faker.random.number({min: 30, max: 45});
        let circunfCefalica = faker.random.number({min: 10, max: 25});
        let apgar = faker.random.number({min: 1, max: 5});
        let descripcionParto = faker.lorem.sentence();
        let observaciones = faker.lorem.sentence();
        let complicacionesAlNacer = faker.lorem.sentence();
        let horasTrabajoParto = faker.random.number({min: 1, max: 48});
        let edadGestacionalParto = faker.random.number({min: 13, max: 60});
        let tiempoHospitalizacion = faker.random.number({min: 3, max: 90});
        let requirioUcin = faker.random.boolean();
        let otros = faker.lorem.sentence();
        let tipoParto = faker.random.arrayElement(partos);
        let llanto = faker.random.arrayElement(llantos);

        AntPerinatal.create({
          pesoAlNacer, talla, circunfCefalica, apgar, descripcionParto, observaciones,
          tipoParto, llanto, horasTrabajoParto, complicacionesAlNacer, edadGestacionalParto,
          requirioUcin, tiempoHospitalizacion, otros
        }).then(() => {
          counter++;
          if (counter === count) {
            callback();
          }
        }).catch(err => `AntPerinatal: ${console.log(err)}`);
      }

    }).catch(err => `TipoParto: ${console.log(err)}`);
  },
};
