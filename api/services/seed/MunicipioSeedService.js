/**
 * Created by Felipe Rodriguez Arias <ucifarias@gmail.com> on 05/11/2017.
 */

let faker = require('faker');
faker.locale = "es";
let uuid = require('uuid');

module.exports = {
  generate: (callback) => {

    let municipios = [
      {nombre: "Santiago de Cuba",},
      {nombre: "Guama",},
      {nombre: "San Luis",},
      {nombre: "II Frente",},
      {nombre: "III Frente",},
      {nombre: "Julio A. Mella",},
      {nombre: "Songo-La Maya",},
      {nombre: "Contramaestre",}
    ];

    Provincia.findOne({nombre: 'Santiago de Cuba'}).then(provincia => {
      let count = municipios.length, counter = 0;
      for (let i = 0; i < count; i++) {
        const {nombre} = municipios[i];
        Municipio.create({
          nombre, provincia
        }).then(() => {
          counter++;
          if (counter === count) {
            callback();
          }
        }).catch(err => `Municipio: ${console.log(err)}`);
      }
    }).catch(err => console.log(err));
  },
};
