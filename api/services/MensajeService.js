/**
 * Created by Felipe on 04/06/2018.
 */


// OK
 async function insertMessages(ue, ur, m){
    const dataM = {
        id_usuario_envia : ue, 
        id_usuario_recibe : ur,
        mensaje : m
    }
    try {
        return await Mensaje.create(dataM);
    } catch (error) {
        console.log("ERROR " + error);
        return null;
    }
}

// OK
async function getMessages(userId, toUserId){
    try {
        var t1 = await Mensaje.find({id_usuario_recibe: toUserId, id_usuario_envia: userId}).sort([{ createdAt: 'ASC' }]);
        var t2 = await Mensaje.find({id_usuario_recibe: userId, id_usuario_envia: toUserId}).sort([{ createdAt: 'ASC' }]);
        var t3 =  t1.concat(t2);
        t3.sort(function (a, b) {
            return (a.createdAt - b.createdAt)
        })
        for(x = 0; x < t3.length; x++){
            // Create Date to send Chat'Box
            var dateToSave = new Date(t3[x].createdAt);
            var d = dateToSave.getFullYear() + "-" + dateToSave.getMonth() + 1 + "-" + dateToSave.getDate();
            d = d + " " + dateToSave.getHours() + ":" + dateToSave.getMinutes() + ":" + dateToSave.getSeconds(); 
            t3[x].createdAt = d;
        }
        
        return t3;
    } catch (error) {
        console.log(error)
        return null;
    }
}


module.exports = {
    insertMessages,
    getMessages,
};