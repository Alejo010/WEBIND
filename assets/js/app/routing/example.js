/**
 * Created by Felipe Rodriguez Arias <ucifarias@gmail.com> on 08/11/2017.
 */

myApp.config(["$routeProvider", function ($routeProvider) {

    $routeProvider
      .when("/todo", {
          controller: "TodoCtrl",
          templateUrl: "/templates/todo.html",
        }
      )
      .when("/message", {
          controller: "TodoCtrl",
          templateUrl: "/templates/message.html",
        }
      );
  }]
);
