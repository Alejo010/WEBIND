/**
 * Created by Felipe Rodriguez Arias <ucifarias@gmail.com> on 05/11/2017.
 */

let faker = require('faker');
faker.locale = "es";

module.exports = {
  generate: (callback) => {
    AreaSalud.find().then(areas => {
      Antecedente.find().then(antecedentes => {
        Hospital.find().then(hospitales => {
          Sexo.find().then(sexos => {
            Raza.find().then(razas => {
              let count = 100, counter = 0;

              for (let i = 0; i < count; i++) {
                let hc = `${faker.lorem.word()}${i}`;
                let nombre = faker.name.firstName();
                let apellidos = faker.name.lastName();
                let direccion = faker.lorem.sentence();
                let ci = `${faker.lorem.word()}${i}`;
                let fechaNacimiento = faker.date.past();
                let areaSalud = faker.random.arrayElement(areas);
                let antecedente = faker.random.arrayElement(antecedentes);
                let hospital = faker.random.arrayElement(hospitales);
                let sexo = faker.random.arrayElement(sexos);
                let raza = faker.random.arrayElement(razas);

                Paciente.create({
                  hc, nombre, apellidos, direccion, fechaNacimiento, areaSalud,
                  antecedente, hospital, sexo, raza, ci
                }).then(() => {
                  counter++;
                  if (counter === count) {
                    callback();
                  }
                }).catch(err => `Paciente: ${console.log(err)}`);
              }

            }).catch(err => `Raza: ${console.log(err)}`);
          }).catch(err => `Sexo: ${console.log(err)}`);
        }).catch(err => `Hospital: ${console.log(err)}`);
      }).catch(err => `Antecedente: ${console.log(err)}`);
    }).catch(err => `AreaSalud: ${console.log(err)}`);
  },
};
