/**
 * Created by Felipe Rodriguez Arias <ucifarias@gmail.com> on 08/11/2017.
 */

myApp.service('TodoService', function ($http) {
    return {
      'getTodos': function () {
        return new Promise((resolve, reject) => {
          resolve([
            {value: 'Tarea1'},
            {value: 'Tarea2'},
            {value: 'Tarea3'},
            {value: 'Tarea4'},
            {value: 'Tarea5'},
            {value: 'Tarea6'},
            {value: 'Tarea7'},
            {value: 'Tarea8'},
            {value: 'Tarea9'},
            {value: 'Tarea1'},
            {value: 'Tarea2'},
            {value: 'Tarea3'},
            {value: 'Tarea4'},
            {value: 'Tarea5'},
          ]);
        });
        // var defer = $q.defer();
        // $http.get('/todo/getTodos').success(function (resp) {
        //   defer.resolve(resp);
        // }).error(function (err) {
        //   defer.reject(err);
        // });
        // return defer.promise;
      },
      'addTodo': function (todo) {
        // var defer = $q.defer();
        // $http.post('/todo/addTodo', todo).success(function (resp) {
        //   defer.resolve(resp);
        // }).error(function (err) {
        //   defer.reject(err);
        // });
        // return defer.promise;
      },
      'removeTodo': function (todo) {
        // var defer = $q.defer();
        // $http.post('/todo/removeTodo', todo).success(function (resp) {
        //   defer.resolve(resp);
        // }).error(function (err) {
        //   defer.reject(err);
        // });
        // return defer.promise;
      }
    }
  }
);
