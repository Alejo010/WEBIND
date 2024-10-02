/**
 * Created by Felipe Rodriguez Arias <ucifarias@gmail.com> on 05/11/2017.
 */

let faker = require('faker');
faker.locale = 'es';

module.exports = {
  generate: (callback) => {
    Parentezco.find().then(parentezcos => {
      Paciente.find().then(pacientes => {
        NivelEscolaridad.find().then(niveles => {
          let count = 300, counter = 0;

          for (let i = 0; i < count; i++) {
            let nombre = faker.name.firstName();
            let apellidos = faker.name.lastName();
            let telefono = `22685478`;
            let parentezco = faker.random.arrayElement(parentezcos);
            let paciente = faker.random.arrayElement(pacientes);
            let nivelEscolaridad = faker.random.arrayElement(niveles);

            Familiar.create({
              nombre, apellidos, telefono, parentezco, paciente, nivelEscolaridad
            }).then(() => {
              counter++;
              if (counter === count) {
                callback();
              }
            }).catch(err => `Familiar: ${console.log(err)}`);
          }

        }).catch(err => `NivelEscolaridad: ${console.log(err)}`);
      }).catch(err => `Paciente: ${console.log(err)}`);
    }).catch(err => `Parentezco: ${console.log(err)}`);
  },
};
