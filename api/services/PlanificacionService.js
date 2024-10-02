/**
 * Create by Francisco Javier Deler O´Farril
 *  
 */

async function getAllPlanificacion (idConsulta){
    var listM = await Planificacion.find({consulta:idConsulta}).populate('consulta').populate('paciente');
    return listM;
}

async function savePlanificacion (pf, pc, pp){
    const dataP = {
        planificacion_fecha : pf, 
        consulta : pc,
        paciente : pp
    }
    try {
        return await Planificacion.create(dataP);
    } catch (error) {
        console.log("ERROR " + error);
        return null;
    }
}


module.exports = {
    getAllPlanificacion,
    savePlanificacion
};