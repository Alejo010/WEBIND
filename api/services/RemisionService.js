/**
 * Create by Francisco Javier Deler O´Farril
 *  
 */

async function getIncompleteRemissionCount (espId){
    var arr = new Array();
    arr = await Remision.find({especialidad_destino: espId, atendido:false});
    return arr.length;
}


module.exports = {
    getIncompleteRemissionCount
};