/**
 * Created by webind on 10/05/2017.
 */

myApp.controller("LoginController",
  ["$scope", "$rootScope", "$location", "$http", "$uibModal", "$translate", "$browser", "QueryServices",
    function ($scope, $rootScope, $location, $http, $uibModal, $translate, $browser, QueryServices) {
      //If i get here and the user is logged, go to dashboard.

      /*Siempre autenticado... Quitar en producción*/
      $rootScope.userAuthenticated = true;

      console.log(".... LOGIN IN SYSTEM ....");
      if ($rootScope.userAuthenticated === true) {
        // $location.path('/viewquery');
      }

      $scope.initParameters = function () {
        $scope.username = null;
        $scope.password = null;
        $scope.loginButtonText = "Login";
      };

      $scope.initParameters();
      $scope.usernameExpReg = /^[µçùàèáéíóúA-Za-z]([µçùàèáéíóúA-Za-z\d]*[_.\s]*[µçùàèáéíóúA-Za-z\d]*)+$/;

      $scope.login = function () {
        QueryServices.loginUser($scope.credentials.username, $scope.credentials.password, function (err, res) {
          console.log("Error " + JSON.stringify(err));
          console.log("result " + JSON.stringify(res))
          if (!err) {                                                                             //If no error.

            $location.path('/');
            // $browser.url($rootScope.urlBase + '/viewquery');
            $browser.onUrlChange(function () {
            });
            console.log(".... LOGIN IN SYSTEM ....");
            $scope.loginButtonText = "Login in ...";
          }
          else {                                                                                //Some error has ocurred.
            if (err) {
              $scope.showModalMessage("Usuario o contraseña invalida", {type: "Error"});
            } else {
              $scope.showModalMessage("Error al consultar el servicio de autenticación", {type: "Error"});
            }
          }
        })
      };

      $scope.closeLogin = function ($event) {
        $event.preventDefault();
        console.log("Close system")
      };

      $scope.showModalMessage = function (messageshow, objectData) {
        $scope.items = objectData;
        $scope.items.message = messageshow;

        let modalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: "myModalContent.html",
          controller: 'ModalInstanceMessage',
          size: "",
          resolve: {
            items: function () {
              return $scope.items;
            }
          }
        });
        modalInstance.result.then(function (selectedItem) {
        }, function () {
        });
      };
    }
  ]
);
