/**
 * LoginController
 *
 * @description :: Server-side logic for managing Logins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  create: function (req, res) {
    //Validate parameters.
    if (req.param('username') === undefined) {
      return res.json({status: "error", info: sails.__("USERNAME_REQUIRED")});
    }

    if (req.param('password') === undefined) {
      return res.json({status: "error", info: sails.__("PASSWORD_REQUIRED")});
    }

    //Create a temporal login variable.
    var cLogin = {
      username: req.param('username'),
      password: req.param('password')
    };
    var tmpML = req.param('isMainLogin');
    //Verify if the isMainLogin, isActivated parameters where provided.
    if (tmpML && typeof tmpML !== bool ) {
      return res.json({status: "error", info: sails.__("INVALID_ISMAINLOGIN")});
    }

    else {
      cLogin.isMainLogin = (tmpML === true);
    }

    var tmpAct = req.param('isActivated');
    if (tmpAct && typeof tmpAct !== bool) {
      return res.json({status: "error", info: sails.__("INVALID_ISACTIVATED")});
    }
    else {
      cLogin.isActivated = (tmpAct === true);
    }


    //Verify if the formation center provided exist.
    FormationCenter.findOne({name: req.param('formationCenter')})
      .exec(function (err, FC) {
        if (err) {
          return res.json({status: "error", info: sails.__("ERROR_SEARCHING_FORMATION_CENTER")});
        }

        if (FC) {
          //If the formation center exist, then search the login username.
          //If the username doesn't exist then create one.

          Login.findOne({
            username: req.param('username')
            //formationCenter: FC.id
          }).exec(function (err, loginFounded) {

            if (err) {
              return res.json({status: "error", info: sails.__("ERROR_SEARCHING_LOGIN")});
            }

            if (loginFounded) {
              return res.json({status: "error", info: sails.__("USERNAME_IN_USE")});
            }
            else {
              //Create the Login.
              cLogin.formationCenter = FC.id;
              Login.create(cLogin)
                .exec(function (err, logincreated) {
                  if (err || !logincreated) {
                    return res.json({status: "error", info: sails.__("ERROR_CREATING_CREDENTIAL")});
                  }

                  return res.json({status: "ok", info: sails.__("LOGIN_CREATED"), data: logincreated});
                });
            }

          });
        }
        else {
          return res.json({status: "error", info: sails.__("FORMATION_CENTER_NO_FOUNDED")});
        }

      });
  },

  update: function (req, res) {
    if (req.param('id') === undefined) {
      return res.json({status: "error", info: sails.__("USERNAME_REQUIRED")});
    }

    if (req.param('newCredentials') === undefined) {
      return res.json({status: "error", info: sails.__("NEWCREDENTIALS_REQUIRED")});
    }

    var newCredentials = req.param('newCredentials');

    //Validate that the new username doesn´t exist.
    Login.findOne({username: newCredentials.username}).exec(function (err, LoginFounded) {
      if (err) {
        return res.json({status: "error", info: sails.__("ERROR_SEARCHING_LOGIN")});
      }

      if (LoginFounded) {
        return res.json({status: "error", info: sails.__("USERNAME_IN_USE")});
      }

      Login.update({
        id: req.param('id')
        //formationCenter: FC.id
      }, newCredentials)
        .exec(function (err) {
          if (err) {
            return res.json({status: "error", info: sails.__("ERROR_UPDATING_CREDENTIAL")});
          }
          return res.json({status: "ok", info: sails.__("CREDENTIAL_UPDATED")});
        });
    });
  },

  check: function (req, res) {
    this.modifyPassword(req, res, "check", function (){
      //It is intencional
    })
  },

  changePassword: function (req, res) {
    this.modifyPassword(req, res, "changePassword", function (){
      //It is intencional
    })

  },

  verify: function (req, res) {
    var token = req.param('token');
    var decoded = LoginService.verifyLoginToken(token);
    return res.json(decoded);

  },

  delete: function (req, res) {

    if (req.param('username') === undefined) {
      return res.json({status: "error", info: sails.__("USERNAME_REQUIRED")});
    }

    FormationCenterServices.findOneFormationCenter(req,res, function(err, FC) {
      if (err)
        return res.json(err)
      else {

        Login.findOne({
          username: req.param('username'),
          formationCenter: FC.id
        }).exec(function (err, loginFounded) {

          if (err) {
            return res.json({status: "error", info: sails.__("ERROR_SEARCHING_LOGIN")});
          }

          if (!loginFounded) {
            return res.json({status: "error", info: sails.__("LOGIN_NO_FOUNDED")});
          }

          Login.destroy({id: loginFounded.id}).exec(function (err) {
            if (err) {
              return res.json({status: "error", info: sails.__("ERROR_DELETING_CREDENTIAL")});
            }
            return res.json({status: "ok", info: sails.__("CREDENTIAL_DELETED")});
          });
        });
      }
    });
  },

  modifyPassword : function (req, res, option,  callback){
    if (req.param('username') === undefined) {
      return res.json({status: "error", info: sails.__("USERNAME_REQUIRED")});
    }
    if (req.param('password') === undefined) {
      return res.json({status: "error", info: sails.__("PASSWORD_REQUIRED")});
    }

    var query = {
      username: req.param('username'),
      password: req.param('password')
    }

    LoginService.verify( query , function(err, result){
       if (err) {
         res.json({result:err});
       }
       else {
         res.json({result:'OK',info:result});
       }
      callback ();
    })


  }
};

