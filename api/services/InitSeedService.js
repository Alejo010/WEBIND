/**
 * Created by Felipe Rodriguez Arias <ucifarias@gmail.com> on 05/11/2017.
 */

let AntPrenatalSeedService = require('./seed/AntPrenatalSeedService');
let AntPostnatalSeedService = require('./seed/AntPostnatalSeedService');
let AntecedenteSeedService = require('./seed/AntecedenteSeedService');
let AntPerinatalSeedService = require('./seed/AntPerinatalSeedService');
let MunicipioSeedService = require('./seed/MunicipioSeedService');
let AntPersonalSeedService = require('./seed/AntPersonalSeedService');
let AreaSaludSeedService = require('./seed/AreaSaludSeedService');
let PacienteSeedService = require('./seed/PacienteSeedService');
let FamiliarSeedService = require('./seed/FamiliarSeedService');
let MedicoSeedService = require('./seed/MedicoSeedService');
let ConsultaSeedService = require('./seed/ConsultaSeedService');
let ExamenIndicadoSeedService = require('./seed/ExamenIndicadoSeedService');
let AntFamiliarSeedService = require('./seed/AntFamiliarSeedService');

module.exports = {
  createData: cb => {
    async.series({
      zero: callback => {
        AntPrenatalSeedService.generate(callback);
      },
      one: callback => {
        AntPerinatalSeedService.generate(callback);
      },
      onehalf: callback => {
        AntPersonalSeedService.generate(callback);
      },
      two: callback => {
        AntPostnatalSeedService.generate(callback);
      },
      twohalf: callback => {
        AntecedenteSeedService.generate(callback);
      },
      three: callback => {
        MunicipioSeedService.generate(callback);
      },
      four: callback => {
        AreaSaludSeedService.generate(callback);
      },
      five: callback => {
        PacienteSeedService.generate(callback);
      },
      six: callback => {
        FamiliarSeedService.generate(callback);
      },
      seven: callback => {
        MedicoSeedService.generate(callback);
      },
      eight: callback => {
        ConsultaSeedService.generate(callback);
      },
      nine: callback => {
        ExamenIndicadoSeedService.generate(callback);
      },
      ten: callback => {
        AntFamiliarSeedService.generate(callback);
      },
    }, err => cb());
  },
};
