/**
 * Created by GRID-2 on 13/09/2017.
 */
var bcrypt = require('bcryptjs');

module.exports = {

  generateLoginToken: function (tokenID) {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(tokenID, salt, function (err, hash) {
        return hash;
      });
    });
  },
  verifyLoginToken: function (token) {
    try {
      var decoded = jwt.verify(token, jwtSecret);
    } catch (err) {
      return {status: "error", info: "And error has ocurred validating the token.", data: err};
    }
    return {status: "ok", info: "", data: decoded.id};
  },
  verify: function (query, callback) {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(query.password, salt, function (err, hash) {
        Login.find({username: query.username}).exec(function userFounded(err, systemuser) {

          if (!systemuser || err) {
            callback("Don´t exist user.", null);
            return;
          }
          else if (systemuser.length > 1 || systemuser.length == 0) {

            callback("Don´t exist user.", null);
            return;
          }
          else {
            callback(null, {token: hash});
            return;
          }
        });
      });
    });
  }
};
