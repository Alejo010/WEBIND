/**
 * Created by webind on 10/05/2017.
 */

myApp.controller('QueryListController',
  ["$scope", "QueryServices", "$uibModal", "$rootScope", "$location", "$routeParams", "ToolsService", "spinnerService",
    function ($scope, QueryServices, $uibModal, $rootScope, $location, ToolsService, spinnerService) {
      $scope.timerRunning = true;
      $scope.nameRegExp = /^([ê|µ|ç|ùàè|áéíóú|a-z|A-Z|ñ|Ñ]*)([\w|\d])*([_|\s]*[\.|\-|\'|ê|ç|ùàè|áéíóú|A-Z|a-z|ñ|Ñ|\d])*$/;
      $scope.onShowMoreInformation = true;

      $scope.startTimer = function () {
        $scope.$broadcast('timer-start');
        $scope.timerRunning = true;
      };

      $scope.stopTimer = function () {
        $scope.$broadcast('timer-stop');
        $scope.timerRunning = false;
      };

      $scope.search = {};
      $scope.queryResultShow = false;
      $scope.resultquery = {};
      $scope.$on('timer-tick', function (event, args) {
        $scope.timerConsole += $scope.timerType + ' - event.name = ' + event.name + ', timeoutId = ' + args.timeoutId + ', millis = ' + args.millis + '\n';
        // $scope.countCurrentOpinions();
      });

      $scope.showModalMessage = function (messageshow, objectData) {
        $scope.items = objectData;
        $scope.items.message = messageshow;
        let modalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'modalMessage.html',
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

      $scope.searchQuery = function () {
        $scope.queryResultShow = false;
        if ($scope.myform.$invalid || (!$scope.search.HC && !$scope.search.CI && !$scope.search.fullname)) {
          ///Show modal error message
          console.log("No hay datos");
          $scope.showModalMessage("Algunos campos no estan correctos", {type: "Error"});
        }
        else {
          console.log("Datos " + JSON.stringify($scope.search));
          QueryServices.findQuery($scope.search, function (err, result) {
            if (err || result.data.status === "error") {
              $scope.queryResultShow = false;
              $scope.showModalMessage(result.data.info, {type: "Error"});
            }
            else {

              if (typeof result.data.info === "undefined")
                $scope.showModalMessage("No hay información que mostrar", {type: "Error"});
              else {
                $scope.search.HC = "";
                $scope.search.CI = "";
                $scope.search.fullname = "";
                $scope.queryResultShow = true;
                $scope.resultquery = result.data.info;
              }
            }
          })
        }
      };

      $scope.searcMoreInfo = function () {
        console.log("Search more information");
        if ($scope.onShowMoreInformation) {
          QueryServices.findMoreQuery($scope.resultquery, function (err, result) {
            if (err || result.data.status === "error") {
              $scope.queryResultShow = false;
              $scope.showModalMessage(result.data.info, {type: "Error"});
            }
            else {
              $scope.queryResultShow = true;
              $scope.resultquery.datos_paciente = result.data.info;
            }
          })
        }
        $scope.onShowMoreInformation = !$scope.onShowMoreInformation;
      };

      $scope.showCreateWindow = function () {
        $rootScope.pacientInfo = $scope.resultquery;
        $location.path("/makemedicalquery");
      }
    }
  ]
);
