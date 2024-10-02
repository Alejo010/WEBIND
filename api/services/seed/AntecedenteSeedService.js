/**
 * Created by Felipe Rodriguez Arias <ucifarias@gmail.com> on 05/11/2017.
 */

let faker = require('faker');
faker.locale = "es";

module.exports = {
  generate: (callback) => {
    AntPrenatal.find().then(prenatales => {
      AntPostnatal.find().then(postnatales => {
        AntPerinatal.find().then(perinatales => {
          AntPersonal.find().then(personales => {
            let count = 100, counter = 0;

            for (let i = 0; i < count; i++) {
              let antPrenatal = faker.random.arrayElement(prenatales);
              let antPerinatal = faker.random.arrayElement(perinatales);
              let antPostnatal = faker.random.arrayElement(postnatales);
              let antPersonal = faker.random.arrayElement(personales);

              Antecedente.create({
                antPrenatal, antPostnatal, antPerinatal, antPersonal
              }).then(() => {
                counter++;
                if (counter === count) {
                  callback();
                }
              }).catch(err => `Antecedente: ${console.log(err)}`);
            }

          }).catch(err => `AntPersonal: ${console.log(err)}`)
        }).catch(err => `AntPerinatal: ${console.log(err)}`)
      }).catch(err => `AntPostnatal: ${console.log(err)}`)
    }).catch(err => `AntPrenatal: ${console.log(err)}`);
  },
};
