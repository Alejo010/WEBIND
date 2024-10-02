/**
 * Created by Felipe on 04/06/2018.
 */


async function userNameCheck (username){
    return await Usuario.find({username: username});
}

async function loginUser(params){
    var status = {
        id : ''
    };
    try {
        var v = await Usuario.findOne({username: params.username, password : params.password});
        //if(v !== null && v.online === 'N'){
        if(v !== null && v.online === 'N'){
            const data = {
                id : v.id,
                value : {
                    online : 'Y'
                }
            };
            const t = await Usuario.update({"id" : v.id}, data.value);
            return await Usuario.find({username: params.username, password : params.password}).populate('rol');
        } else if(v !== null && v.online === 'Y'){
            // Usuario ya está loguedo
            status.id = 'Logueado';
            return status;
        }
        return status;

    } catch (error) {
        return null;
    }
}

async function userSessionCheck(userId){
    try {
        const result = await Usuario.findOne({"id" : userId, online : 'Y'});
        if(result !== null){
            return result;
        }else{
            return null;
        }
    } catch (error) {
        return null;
    }
}

async function addSocketId(userId, userSocketId){
    const data = {
        id : userId,
        value : {
            //set :{
                socketId : userSocketId,
                online : 'Y'
           // }
        }
    };
    try {
        return await Usuario.update({"id" : userId}, data.value);
    } catch (error) {
        console.log(error);
        return null;
    }
}

async function isUserLoggedOut(userSocketId){
    try {
        return await Usuario.find({socketId: userSocketId});
    } catch (error) {
        return null;
    }
}

async function logout(userId){
    const data = {
        set :{
            online : 'N'
        }
    };
    try{
        return await Usuario.update({"id" : userId}, data.set);
    } catch(eror){
        console.warn(error);
        return null;
    }
}

async function getChatList(userId, userSocketId){
    try {
        var userinfo = await Usuario.find({"id" : userId});
        // var chatlist = await Usuario.find({ online : 'Y'});
        var chatlist = await Usuario.find({ online : 'Y'}).populate('rol');
        
        chatlist = chatlist.filter(item => item.id !== userId);
        chatlist = chatlist.filter(item => item.rol.nombre !== 'Administrador');
        chatlist = chatlist.filter(item => item.rol.nombre !== 'Directivo');
        // Again for delay
        chatlist = chatlist.filter(item => item.id !== userId);
        chatlist = chatlist.filter(item => item.rol.nombre !== 'Administrador');
        chatlist = chatlist.filter(item => item.rol.nombre !== 'Directivo');
        
        var response = {
            userinfo : userinfo[0],
            chatlist : chatlist
        }
        return response;
    } catch (error) {
        console.warn(error);
        return null;
    }
}

//var userId='5c01732f0f52545c1d4f469c';
async function getMedicoByIdUser(userId){
    try {
        var userinfo = await Usuario.findOne({"id" : userId}).populate('medicos');
       //userinfo.medicos[0];
        /*if(userinfo.rol === 'Médico Consulta Pasiva' || userinfo.rol === 'Médico Consulta Central'){
            userinfo.populate('medico');
            console.log(JSON.stringify(userinfo));
            return userinfo;
        }
        return -1;*/
        return userinfo;
    } catch (error) {
        console.warn(error);
        return null;
    }
}

async function deleteUser(userId){
    try {
        var userInfo = await Usuario.destroy({"id" : userId});
        var userMedInfo = await Medico.destroy({"usuario_medico" : userId});
        return userInfo;
    } catch (error) {
        console.warn(error);
        return null;
    }
}

async function getUserId(userId){
    try {
        var userInfo = await Usuario.findOne({"id" : userId}).populate('rol');
        if(userInfo.rol.nombre === 'Médico Consulta Central' || userInfo.rol.nombre === 'Médico Consulta Pasiva') {
            var userInfo2 = await Usuario.findOne({"id" : userId}).populate('rol').populate('medicos');
            var especialidad = await Especialidad.findOne({"id" : userInfo2.medicos[0].especialidad})
            userInfo2.medicos[0].especialidadDetalles = especialidad;
            return userInfo2;
        } else {
            return userInfo;
        }
    } catch (error) {
        console.warn(error);
        return null;
    }
}

async function updateUser(user){
    try {
        //console.log(JSON.stringify(user));
        var criteriaUser = {
            "id" : user.id
        }
        valuesToSetUser = {
            "nombre" : user.nombre,
            "apellidos" : user.apellidos,
            "ci" : user.ci,
            "username" : user.username,
            "email" : user.email,
            "password" : user.password,
            "rol" : user.rol.id,
            "online" : "N",
            "socketId" : "",
        }
        var updatedRecordsUser = await Usuario.update(criteriaUser).set(valuesToSetUser);
        if(user.rol.nombre === "Médico Consulta Central" || user.rol.nombre === "Médico Consulta Pasiva") {
            // Update User and Doctor
            var criteriaMedico = {
                "usuario_medico" : user.id
            }
            valuesToSetMedico = {
                "especialidad" : user.medico.especialidad,
                "nombre" : user.medico.nombre,
                "apellidos" : user.medico.apellidos,
                "ci" : user.medico.ci,
                "usuario_medico" : user.medico.usuario_medico,
                "numero_medico" : user.medico.numeroMedico
            }
            var updatedRecordsMedico = await Medico.update(criteriaMedico).set(valuesToSetMedico);
        }
        // var updatedRecords = await Usuario.update(criteria).set(valuesToSet).fetch();
        return updatedRecordsUser;
    } catch (error) {
        console.warn(error);
        return null;
    }
}

async function getEspNameByUserId(userId){
    try {
        var userInfo = await Usuario.findOne({"id" : userId}).populate('rol');
        if(userInfo.rol.nombre === 'Médico Consulta Central' || userInfo.rol.nombre === 'Médico Consulta Pasiva') {
            var userInfo2 = await Usuario.findOne({"id" : userId}).populate('rol').populate('medicos');
            var especialidad = await Especialidad.findOne({"id" : userInfo2.medicos[0].especialidad})
            //console.log("Esp Name: " + especialidad);
            return especialidad;
        }
    } catch (error) {
        console.warn(error);
        return null;
    }
}
async function getEspNameByMedicoId(medicoId){
    try {
        return await Medico.findOne({"id" : medicoId}).populate('especialidad');
    } catch (error) {
        console.warn(error);
        return null;
    }
}

module.exports = {
    userNameCheck,
    loginUser,
    userSessionCheck,
    addSocketId,
    isUserLoggedOut,
    logout,
    getChatList,
    getMedicoByIdUser,
    deleteUser,
    getUserId,
    updateUser,
    getEspNameByUserId,
    getEspNameByMedicoId
};
