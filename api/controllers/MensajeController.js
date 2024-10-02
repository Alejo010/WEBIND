/**
 * Created by Felipe on 04/06/2018.
 */


const getMessages = async (req, res) => {
    var id_usuario_envia = req.param('userId');
    var id_usuario_recibe = req.param('friendId');
    const result = await MensajeService.getMessages(id_usuario_envia, id_usuario_recibe); 
    //console.log("M: " + JSON.stringify(result));
return res.json(result);
}; 


module.exports = {
    getMessages,
    
};