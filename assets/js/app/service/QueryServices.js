/**
 * Created by webind on 12/05/2017.
 */

myApp.service('QueryServices',
  function ($rootScope, $http) {

    this.findQuery = function (query, callback) {
      $http.post($rootScope.urlBase + "/searchpacient", query)
        .then(function successCallback(response) {
          console.log(JSON.stringify(response));
          callback(undefined, response)
        }, function errorCallback(error) {
          callback(error, undefined);
        });
    };

    this.findAllQuery = function (query, callback) {
      $http.post($rootScope.urlBase + "/searchallquery", query)
        .then(function successCallback(response) {
          console.log(JSON.stringify(response));
          callback(undefined, response)
        }, function errorCallback(error) {
          callback(error, undefined)

        });
    };

    this.findMoreQuery = function (query, callback) {
      $http.post($rootScope.urlBase + "/searchpacientmoredata", {pacient: query})
        .then(function successCallback(response) {
          callback(undefined, response)
        }, function errorCallback(error) {
          callback(error, undefined)

        });
    };

    this.userIsAuthenticated = function () {
      return $rootScope.userAuthenticated != undefined && $rootScope.userAuthenticated;
    };

    this.loginUser = function (username, password, callback) {
      $http.post($rootScope.urlBase + "/checklogin", {
        username: username,
        password: password
      })
        .then(function successCallback(response) {
          console.log("Respuesta" + JSON.stringify(response.data))
          if (!response.data.info) {
            callback(response.data.result, undefined)
          }
          else {
            console.log("Respuesta" + JSON.stringify(response.data));
            //Set applications variables
            $rootScope.userToken = response.data.info.token;
            $rootScope.userAuthenticated = true;
            $rootScope.username = username;
            $rootScope.userIsMain = response.data.info.isMainLogin;

            //************** Set the token for authentication ************************
            localStorage.setItem('id_token', response.data.token);

            callback(undefined, response)
          }
        }, function errorCallback(error) {
          callback(error, undefined)
        });
    };

    this.countAllMailOpinion = function (callback) {
      $http.post($rootScope.urlBase + "/opinion/countallMail")
        .then(function successCallback(response) {
          callback(undefined, response)
        }, function errorCallback(error) {
          callback(error, undefined)

        });
    };

    this.findOpinionsFindLast = function (query, callback) {
      $http.post($rootScope.urlBase + "/opinion/finallast", query)
        .then(function successCallback(response) {
          callback(undefined, response.data)
        }, function errorCallback(error) {
          callback(error, undefined)

        });
    };

  }
);
