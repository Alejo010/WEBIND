/**
 * Created by webind on 10/05/2017.
 */

myApp.controller('TimerController',
  ['$scope',
    function ($scope) {
      $scope.timerRunning = true;

      $scope.startTimer = function () {
        $scope.$broadcast('timer-start');
        $scope.timerRunning = true;
      };

      $scope.stopTimer = function () {
        $scope.$broadcast('timer-stop');
        $scope.timerRunning = false;
      };

      $scope.$on('timer-tick', function (event, args) {
        console.log("TIMER TICK");
        let str1 = `${$scope.timerType} - event.name = ${event.name},`;
        let str2 = ` timeoutId = ${args.timeoutId}, millis = ${args.millis} \n`;
        $scope.timerConsole += `${str1}${str2}`;
        // $scope.countCurrentOpinions();
      });
    }
  ]
);
