/**
 * Created by Felipe Rodriguez Arias <ucifarias@gmail.com> on 05/11/2017.
 */

let faker = require('faker');
faker.locale = "es";

module.exports = {
  generate: (callback) => {
    Paciente.find().then(pacientes => {
      Medico.find().then(medicos => {
        Especialidad.find().then(especialidades => {
          Mnt.find().then(mnts => {
            let count = 400, counter = 0;

            for (let i = 0; i < count; i++) {
              let fecha = faker.date.past();
              let motivo = faker.lorem.sentence();
              let impresionDiagnostica = faker.lorem.sentence();
              let diagosticoDef = faker.lorem.sentence();
              let examenFisico = faker.lorem.sentence();
              let tratamiento = faker.lorem.sentence();
              let evolucion = faker.lorem.sentence();
              let fechaProximaConsulta = faker.date.past();
              let positivo = faker.random.boolean();
              //let remitirA = faker.random.arrayElement(especialidades);
              let remitidoDesde = faker.random.arrayElement(especialidades);
              let medico = faker.random.arrayElement(medicos);
              let paciente = faker.random.arrayElement(pacientes);
              let mnt = faker.random.arrayElement(mnts);

              Consulta.create({
                fecha, motivo, impresionDiagnostica, diagosticoDef, examenFisico, tratamiento, evolucion,
                fechaProximaConsulta, remitidoDesde, medico, paciente, positivo, mnt
              }).then(() => {
                counter++;
                if (counter === count) {
                  callback();
                }
              }).catch(err => `Consulta: ${console.log(err)}`);
            }

          }).catch(err => `Mnt: ${console.log(err)}`);
        }).catch(err => `Especialidad: ${console.log(err)}`);
      }).catch(err => `Medico: ${console.log(err)}`);
    }).catch(err => `Paciente: ${console.log(err)}`);
  },
};
