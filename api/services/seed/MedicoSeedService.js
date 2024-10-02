/**
 * Created by Felipe Rodriguez Arias <ucifarias@gmail.com> on 05/11/2017.
 */

let faker = require('faker');
faker.locale = "es";
let uuid = require('uuid');

module.exports = {
  generate: (callback) => {
    Especialidad.find().then(especialidades => {
      let count = 30, counter = 0;

      for (let i = 0; i < count; i++) {
        let nombre = faker.name.firstName();
        let apellidos = faker.name.lastName();
        let ci = uuid.v4();
        let numeroMedico = uuid.v4();
        let especialidad = faker.random.arrayElement(especialidades);

        Medico.create({
          nombre, apellidos, ci, numeroMedico, especialidad
        }).then(() => {
          counter++;
          if (counter === count) {
            callback();
          }
        }).catch(err => `Medico: ${console.log(err)}`);
      }

    }).catch(err => `Especialidad: ${console.log(err)}`);
  },
};
