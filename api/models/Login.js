/**
 * Login.js
 *
 * @description :: Login system informations.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  schema: true,

  attributes: {


  	isMainLogin: {
  		type: 'boolean',
      defaultsTo: false
  	},

  	username: {
  		type: 'string',
  		required:true,
  	},

  	// Para el password se deben usar el modulo para passwords
  	// cifrados.
  	password: {
  		type: 'string',
  		required: true
  	},

  	isActivated: {
  		type: 'boolean',
      defaultsTo: false
  	}
  }
};

