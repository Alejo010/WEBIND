/**
 * Created by webind on 12/05/2017.
 */

myApp.service('ChartOpinionServices',
  function ($rootScope, $http) {

    this.findByType = function (query, callback) {
      $http.post($rootScope.urlBase + "/charts/opinionbytype", query)
        .then(function successCallback(response) {
          callback(undefined, response)
        }, function errorCallback(error) {
          callback(error, undefined);
        });
    };

    this.findOpinionsByDays = function (query, callback) {
      $http.post($rootScope.urlBase + "/charts/opinionsincedays", query)
        .then(function successCallback(response) {
          callback(undefined, response.data)
        }, function errorCallback(error) {
          callback(error, undefined)

        });
    };
  }
);
