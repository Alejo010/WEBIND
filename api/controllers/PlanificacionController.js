/**
 * Created by Francisco on 29/01/2019.
 */

    const savePlanificacion = async (req, res) => {
        planificacion_fecha = req.param('planificacion_fecha');
        planificacion_consulta = req.param('planificacion_consulta');
        planificacion_paciente = req.param('planificacion_paciente');
        
        let result = await PlanificacionService.savePlanificacion(planificacion_fecha, planificacion_consulta, planificacion_paciente);
        return res.json(result);
    };

    const getAllPlanificacion = async (req, res) => {
        var idConsulta = req.param('idConsulta');
        let result = await PlanificacionService.getAllPlanificacion(idConsulta);
        return res.json(result);
    };
   
  
  module.exports = {
    savePlanificacion,
    getAllPlanificacion
  };