
module.exports = {

    attributes: {
      mensaje: {type: "string", size: 250,},
      id_usuario_envia:{
        model:'Usuario',
        unique: false
      },
      id_usuario_recibe:{
        model:'Usuario',
        unique: false
      },
    }
  };