/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

let faker = require('faker');
let _ = require('lodash');

module.exports.bootstrap = async function (cb) {

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)

  // InitSeedService.createData(() => cb());//llenar la BD con Faker

  console.log("BOOTSTRAP FILE EXECUTION!!!!!!!!!!!!!!!!");
  // console.log("PP = " + sails.config.globals.myServerAddress);
  // sails.config.globals.myServerAddress = 'LOP';
  // console.log("PP = " + sails.config.globals.myServerAddress);

  try {
    // await seedDatabase();
  } catch (err) {
    console.log(err);
  }

   //StartInitData.restartUserOnline(() => cb());
   //Set for all user satatus online = N
   var criteriaUser = {
      "online" : "Y"
    }
    valuesToSetUser = {
       "online" : "N",
       "socketId" : "",
   }
   var allUser = await Usuario.update(criteriaUser).set(valuesToSetUser);

  cb();
};

async function seedDatabase() {

  let remisionesCount = await Remision.count();
  if (remisionesCount == 0) {
    // await seedRemisiones();
  }

  let municipioCount = await Municipio.count();
  if (municipioCount == 0) {
    await seedMunicipio();
  }

  let areaSaludCount = await AreaSalud.count();
  if (areaSaludCount == 0) {
    await seedAreaSalud();
  }

  console.log("Remisiones: " + remisionesCount);
  console.log("Municipios: " + municipioCount);
  console.log("Areas de Salud: " + areaSaludCount);


}

async function seedRemisiones() {

  // var especialidadesId = await arrayOfEspecialidadesId();

  var especialidadesId = await arrayOfId(Especialidad);

  options = {};
  for (let i = 0; i < 20; i++) {

    options = {
      fecha: faker.date.recent(),
      consulta: faker.random.uuid(),
      motivo: faker.lorem.sentence(),
      especialidad_destino: faker.random.arrayElement(especialidadesId),
      atendido: faker.random.boolean(),
    }

    await Remision.create(options);

  }

  console.log(especialidadesId);
}


async function seedMunicipio() {
  let provinciasId = await arrayOfId(Provincia);

  for (let i = 0; i < 50; i++) {

    options = {
      nombre: _.startCase(faker.lorem.words(2)),
      provincia: faker.random.arrayElement(provinciasId),
    }
    try {
      await Municipio.create(options);
    } catch (err) {
      console.log("Duplicate nombre in Municipio");
    }
  }

}

async function seedAreaSalud() {
  let ids = await arrayOfId(Municipio);

  for (let i = 0; i < 150; i++) {

    options = {
      nombre: _.startCase(faker.lorem.words(3)),
      municipio: faker.random.arrayElement(ids),
    }

    try {
      await AreaSalud.create(options);
    } catch (err) {
      console.log("Duplicate nombre in Area Salud");
    }
  }
}

async function arrayOfId(model) {
  records = await model.find();
  recordsId = records.map(record => record.id);

  return recordsId;
}


// async function arrayOfEspecialidadesId() {
//
//     records = await Especialidad.find();
//     recordsId = records.map(record => record.id);
//
//     return recordsId;
//
// }
//
// async function arrayOfProvinciasId() {
//
//   records = await Provincia.find();
//   recordsId = records.map(record => record.id);
//
//   return recordsId;
//
// }
