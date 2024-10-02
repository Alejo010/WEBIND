/**
 * Created by Felipe Rodriguez Arias <ucifarias@gmail.com> on 09/11/2017.
 */

let request = require('supertest');
let assert = require('assert');
let moment = require('moment');

describe('Paciente', function () {

  describe('#create()', function () {
    it('should check find function', function (done) {

      const paciente = {
        hc: '14524',
        nombre: 'Fernando',
        apellidos: 'Apellidos',
        ci: '87021522003',
        direccion: 'Calle 2, # 4',
        hospital: '-1',
        municipio: {},
        areaSalud: {},
        raza: '-1',
        sexo: '-1',
        antecedente: {
          antPrenatal: {
            edadMaterna: 34,
            habitosToxicosMadre: 'habitosToxicosMadre',
            alteracionesEcosonograficas: 'alteracionesEcosonograficas',
            antObstetricos: 'antObstetricos',
            enfermedadesMaternasAgudas: 'enfermedades Maternas Agudas',
            antEnfCronicaMaterna: 'antEnfCronicaMaterna',
            movimientoFetal: '-1',
            otros: 'otros',
          },
          antPerinatal: {
            tipoParto: '-1',
            descripcionParto: 'descripcionParto',
            observaciones: 'observaciones',
            horasTrabajoParto: 4,
            complicacionesAlNacer: 'complicacionesAlNacer',
            edadGestacionalParto: 38,
            requirioUcin: '0',
            tiempoHospitalizacion: 2,
            otros: 'otros',
          },
          antPostnatal: {
            llanto: '-1',
            pesoAlNacer: 58,
            talla: 7,
            circunfCefalica: 15,
            apgar: 99,
            infeccionesSnc: 'infeccionesSnc',
            infeccionesSistemicas: 'infeccionesSistemicas',
            traumatismosCraneales: 'traumatismosCraneales',
            malFormaCongenitas: 'malFormaCongenitas',
            otros: 'otros',
          },
          antPersonal: {
            otros: 'otros'
          },
        }
      };

      const antPrenatal = paciente.antecedente.antPrenatal;

      AntPrenatal.create(antPrenatal)
        .then(function (result) {
          console.log(result);
          assert.notEqual(undefined, result);
          done();
        })
        .catch(done);
    });
  });

});
