/**
 * Usuario.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    nombre:{ type:'string',   required:true  },
    apellidos:{ type:'string',  required:true  },
    ci: {type: "string", required: true, unique: true, size: 11,},

    username:{  type:'string',  required:true, unique:true  },
    email:{ type:'email',   required:true,    unique:true  },
    password:{ type:'string', required:true },
    rol: {   model:'Rol',  required: true },

    medicos: { collection: 'Medico',  via: 'usuario_medico' },

    online: {
      type:'string',
      required: true
    },
    socketId: {
      type:'string',
      required: false
    },

/*  toJSON: function(){
 // Esta funcion se llama cuando el modelo se convierte a JSON
 var obj = this.toObject();
 delete obj.password; // se borra ya que solo se guarda la contrasenna encriptada
 delete obj.passwordConfirmation;// se borra ya que solo se guarda la contrasenna encriptada
 delete obj._csrf; // el csrf es la proteccion que trae sails contra algunos tipos de ataques
 return obj;
 }
 },
 beforeCreate: function (values, next){ // funcion de ORM Waterline

 // Group.findOneByName(values.group,function (err, group) {
 //   console.log(values.group);
 //   values.group = 1;
 // })

 var password = values.password;
 var passwordConfirmation = values.passwordConfirmation;
 if(!password || !passwordConfirmation || password != passwordConfirmation ){
 var passwordDoesNotMatch = [{
 name: 'passwordDoesNotMatch',
 message: 'Las contraseñas no coinciden'
 }];
 return next({
 err:passwordDoesNotMatch
 });
 }

 require('bcrypt').hash(values.password, 10, function passwordEncrypted(err, encryptedPassword){
 values.encryptedPassword = encryptedPassword;
 values.password = null;
 values.passwordConfirmation = null;
 next();
 })

 },
 beforeUpdate: function (values, next) {

 var password = values.password;
 var passwordConfirmation = values.passwordConfirmation;
 console.log(password+' ; '+passwordConfirmation);
 if(!password || !passwordConfirmation || password != passwordConfirmation ){
 var passwordDoesNotMatch = [{
 name: 'passwordDoesNotMatch',
 message: 'Las contraseñas no coinciden'
 }];
 return next({
 err:passwordDoesNotMatch
 });
 }

 require('bcrypt').hash(values.password, 10, function passwordEncrypted(err, encryptedPassword){
 values.encryptedPassword = encryptedPassword;
 values.password = null;
 values.passwordConfirmation = null;
 next();
 })*/


  }
};

