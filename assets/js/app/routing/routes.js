/**
 * Created by webind on 22/05/2017.
 */
myApp.config(["$routeProvider", function ($routeProvider) {

    $routeProvider
      .when("/", {
          controller: "LoginController",
          templateUrl: "/templates/home.html",
        }
      )
      .when("/maincotainer", {
          controller: "MainController",
          templateUrl: "maincotainer",
        }
      )
      .when("/makemedicalquery", {
          controller: "WizardController",
          templateUrl: "makemedicalquery",
        }
      )
      .when("/royalmedicalquery", {
          controller: "QueryWizardController",
          templateUrl: "royalmedicalquery",
        }
      )
      .when("/wizard", {
          controller: "CalendarController",
          templateUrl: "wizard",
        }
      )
      .when("/newquery", {
          controller: "QueryListController",
          templateUrl: "newquery",
        }
      )

      .when("/remisiones", {
        controller: "RemisionPageController",
        templateUrl: "templates/remision/remisiones.html"
      })

      .when("/remisionesSalida", {
        controller: "RemisionesSalidaPageController",
        templateUrl: "templates/remision/remisionesSalida.html"
      })

      // .when("/calendario", {
      //   controller: "CalendarioBackendController",
      //   templateUrl: "templates/calendario/calendar.html"
      // })

      .when("/wmodalMessage", {
          controller: "ModalInstanceMessage",
          templateUrl: "modalMessage",
        }
      )
      // .otherwise("/");
  }]
);
