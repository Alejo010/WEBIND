/**
 * Created by Felipe Rodriguez Arias <ucifarias@gmail.com> on 05/11/2017.
 */

let faker = require('faker');
faker.locale = "es";

module.exports = {
  generate: (callback) => {
    //Parentezco.find().then(parentezcos => {
      Paciente.find().then(pacientes => {
        let count = 100, counter = 0;

        for (let i = 0; i < count; i++) {
          let padecimientos_cronicos_familiar = faker.lorem.sentence();
          //let parentezco = faker.random.arrayElement(parentezcos);
          let paciente = faker.random.arrayElement(pacientes);

          AntFamiliar.create({
            padecimientos_cronicos_familiar,/* parentezco, */paciente
          }).then(() => {
            counter++;
            if (counter === count) {
              callback();
            }
          }).catch(err => `AntPatFamiliar: ${console.log(err)}`);
        }

      }).catch(err => `Paciente: ${console.log(err)}`);
    //}).catch(err => `Parentezco: ${console.log(err)}`);
  },
};
