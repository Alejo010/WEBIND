/**
 * Created by Felipe Rodriguez Arias <ucifarias@gmail.com> on 12/11/2017.
 */

let assign = require('object-assign');

const findReporteMedicos = async() => {
  let especialidades = await Especialidad.find().populate('medicos');
  return especialidades.map(especialidad => ({
    nombre: especialidad.nombre,
    count: especialidad.getCountMedicos(),
  }));
};

/**
 * Búsqueda la cantidad de consultas por especialidad
 * @returns {Array}
 */
const findReporteConsulta = async() => {
  let especialidades = await Especialidad.find().populate('medicos');
  let especialidadesAux = [];

  for (const especialidad of especialidades) {
    const {medicos} = especialidad;
    let medicosAux = [], sumConsultas = 0;
    for (const medico of medicos) {
      let medicoNew = await Medico.find({id: medico.id})
        .limit(1)
        .populate('consultas');
      sumConsultas += medicoNew[0].getCountConsultas();
      medicosAux.push(medicoNew[0]);
    }
    especialidadesAux.push(assign({}, especialidad, {medicos: medicosAux, sumConsultas}));
  }

  return especialidadesAux.map(especialidad => ({
    nombre: especialidad.nombre,
    count: especialidad.sumConsultas,
  }));
};

/**
 * Versión 2 de la búsqueda de cantidad de consultas por especialidad
 * IMPORTANTE: INCREIBLEMENTE SE TARDA 2 VECES MAS QUE LA VERSION ORIGINAL
 * @returns {Array}
 */
const findReporteConsultaV2 = async() => {
  let consultas = Consulta.find().populate('medico');
  let especialidades = Especialidad.find();
  [especialidades, consultas] = [await especialidades, await consultas];

  return especialidades.map(especialidad => {
    let aux = consultas.filter(consulta => (consulta.medico.especialidad === especialidad.id));
    return {
      nombre: especialidad.nombre,
      count: aux.length | 0,
    }
  });
};

const findReporteConsultaXMes = async() => {
  const daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let month = 1, year = 2017;
  let especialidades = await Especialidad.find();
  let result = [];

  for (let days of daysInMonths) {
    let consultas = await Consulta.find({
      fecha: {'>=': new Date(`${month}/1/${year}`), '<=': new Date(`${month}/${days}/${year}`)}
    }).populate('medico');
    month++;

    const partial = especialidades.map(especialidad => {

      let aux = consultas.filter(consulta => {
        if (typeof  consulta.medico === 'object') {
          return consulta.medico.especialidad === especialidad.id;
        }
        return false;
      });

      return {
        nombre: especialidad.nombre,
        count: aux.length | 0,
      }
    });
    result.push(partial);
  }

  return especialidades.map(especialidad => {
    const valuesXMonths = result.map(item => {
      const aux = item.filter(value => (value.nombre === especialidad.nombre));
      return aux[0].count;
    });
    return {
      nombre: especialidad.nombre,
      values: valuesXMonths,
    }
  });
};

const findReportePertinencia = async() => {
  let especialidades = await Especialidad.find().populate('medicos');
  let especialidadesAux = [];

  for (const especialidad of especialidades) {
    const {medicos} = especialidad;
    let medicosAux = [], sumConsultas = 0;
    for (const medico of medicos) {
      let medicoNew = await Medico.find({id: medico.id})
        .limit(1)
        .populate('consultas', {where: {positivo: true}});
      sumConsultas += medicoNew[0].getCountConsultas();
      medicosAux.push(medicoNew[0]);
    }
    especialidadesAux.push(assign({}, especialidad, {medicos: medicosAux, sumConsultas}));
  }

  return especialidadesAux.map(especialidad => ({
    nombre: especialidad.nombre,
    count: especialidad.sumConsultas,
  }));
};

module.exports = {
  findReporteMedicos,
  findReporteConsulta,
  findReporteConsultaV2,
  findReporteConsultaXMes,
  findReportePertinencia,
};
