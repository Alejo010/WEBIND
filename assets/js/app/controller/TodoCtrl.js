/**
 * Created by Felipe Rodriguez Arias <ucifarias@gmail.com> on 08/11/2017.
 */

myApp.controller('TodoCtrl',
  ['$scope', '$rootScope', 'TodoService',
    function ($scope, $rootScope, TodoService) {
      $scope.formData = {};
      $scope.message = 'Hello world!!!';
      $scope.todos = [];

      TodoService.getTodos().then(function (response) {
        $scope.$apply(function () {
          $scope.todos = response;
        });
      });

      $scope.addTodo = function () {
        TodoService.addTodo($scope.formData).then(function (response) {
          $scope.todos.push($scope.formData);
          $scope.formData = {};
        });
      };

      $scope.removeTodo = function (todo) {
        TodoService.removeTodo(todo).then(function (response) {
          $scope.todos.splice($scope.todos.indexOf(todo), 1)
        });
      };
    }
  ]
);
