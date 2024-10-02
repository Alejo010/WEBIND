/**
 * Created by Felipe Rodriguez Arias <ucifarias@gmail.com> on 09/11/2017.
 */

/**
 * Devuelve la cantidad de pacientes por area de salud
 * @param initAreas {Array} Las áreas de salud iniciales, si no se especifica, se busca en todas
 * @returns {Array}
 */
async function findReportePaciente (initAreas = []) {
  let areas = initAreas.length === 0 ? await AreaSalud.find().populate('pacientes') : initAreas;
  return areas.map(area => ({
    nombre: area.nombre,
    count: area.getCountPacientes(),
  }));
}

/**
 * Devuleve la cantidad de pacientes clasificados por sexo en cada una de las areas de salud
 * @param initAreas {Array} Las áreas de salud iniciales, si no se especifica, se busca en todas
 * @returns {Array.<*>}
 */
async function findReportePacienteSexo (initAreas = []) {
  let areas = initAreas.length === 0 ? AreaSalud.find().populate('pacientes') : initAreas;
  let femaleObj = Sexo.findOne({nombre: 'Femenino'});
  let maleObj = Sexo.findOne({nombre: 'Masculino'});
  [areas, femaleObj, maleObj] = [await areas, await femaleObj, await maleObj];

  let data = areas.map(area => {
    let maleFilter = area.pacientes.filter(paciente => (paciente.sexo == maleObj.id));
    let femaleFilter = area.pacientes.filter(paciente => (paciente.sexo == femaleObj.id));
    return {
      nombre: area.nombre,
      count: area.getCountPacientes(),
      maleCount: maleFilter.length | 0,
      femaleCount: femaleFilter.length | 0,
    };
  });

  return data.filter((value) => (value.count !== 0));
}

/**
 * Devuelve las areas de salud de un municipio
 */
//let idMunicipio == '5b152f93e196bba8384e3e78';

async function findByMunicipio (idMunicipio) {
  //Felipe 0
  let areas = await AreaSalud.find({'municipio': idMunicipio});
  return areas;
}

/**
 * Busca la cantidad de pacientes de las diferentes razas por area de salud
 * @param initAreas {Array} Las áreas de salud iniciales, si no se especifica, se busca en todas
 * @returns {Array.<*>}
 */
async function findReportePacienteRaza (initAreas = []) {
  let areas = initAreas.length === 0 ? AreaSalud.find().populate('pacientes') : initAreas;
  let mestizoObj = Raza.find({nombre: 'Mestizo'}).limit(1);
  let negroObj = Raza.find({nombre: 'Negro'}).limit(1);
  let blancoObj = Raza.find({nombre: 'Blanco'}).limit(1);
  [areas, mestizoObj, negroObj, blancoObj] = [await areas, await mestizoObj, await negroObj, await blancoObj];

  let data = areas.map(area => {
    let negroFilter = area.pacientes.filter(paciente => (paciente.raza == negroObj[0].id));
    let mestizoFilter = area.pacientes.filter(paciente => (paciente.raza == mestizoObj[0].id));
    let blancoFilter = area.pacientes.filter(paciente => (paciente.raza == blancoObj[0].id));
    return {
      nombre: area.nombre,
      count: area.getCountPacientes(),
      negroCount: negroFilter.length | 0,
      mestizoCount: mestizoFilter.length | 0,
      blancoCount: blancoFilter.length | 0,
    };
  });

  return data.filter((value) => (value.count !== 0));
}

module.exports = {
  findReportePaciente,
  findReportePacienteSexo,
  findReportePacienteRaza,
  findByMunicipio,
};
