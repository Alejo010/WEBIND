/**
 * Created by Felipe Rodriguez Arias <ucifarias@gmail.com> on 05/11/2017.
 */

let faker = require('faker');
faker.locale = "es";

module.exports = {
  generate: (callback) => {
    let examenes = [], consultas = [];

    let inner = () => {
      let count = 300, counter = 0;
      for (let i = 0; i < count; i++) {
        let resultado = faker.lorem.sentence();
        let consulta = faker.random.arrayElement(consultas);
        let examen = faker.random.arrayElement(examenes);

        ExamenIndicado.create({
          resultado, consulta, examen
        }).then(counter++)
          .then(counter === count ? callback() : null);
      }
    };

    Examen.find()
      .then(result => examenes = result)
      .then(() => Consulta.find())
      .then(result => consultas = result)
      .then(() => inner())
      .catch(err => `ExamenIndicadoSeedService: ${console.log(err)}`);
  },
};
