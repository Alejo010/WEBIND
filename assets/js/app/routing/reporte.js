/**
 * Created by Felipe Rodriguez Arias <ucifarias@gmail.com> on 08/11/2017.
 */

myApp.config(["$routeProvider", function ($routeProvider) {
    let prefix = '/reporte';
    let location = `/templates${prefix}`;

    $routeProvider
      .when(`${prefix}`, {
          controller: "ReporteController",
          templateUrl: `${location}/index.html`,
        }
      )
      .when(`${prefix}/index`, {
          controller: "ReporteController",
          templateUrl: `${location}/index.html`,
        }
      )
      .when(`${prefix}/area-salud`, {
          controller: "AreaSaludReporteController",
          templateUrl: `${location}/area-salud.html`,
        }
      )
      .when(`${prefix}/edad`, {
          controller: "ReporteController",
          templateUrl: `${location}/edad.html`,
        }
      )
      .when(`${prefix}/especialidad`, {
          controller: "EspecialidadReporteController",
          templateUrl: `${location}/especialidad.html`,
        }
      )
      .when(`${prefix}/hospital`, {
          controller: "ReporteController",
          templateUrl: `${location}/hospital.html`,
        }
      )
      .when(`${prefix}/pacientes-especialidad`, {
          controller: "PacientesPorEspecialidadReporteController",
          templateUrl: `${location}/pacientes-especialidad.html`,
        }
      )
      .when(`${prefix}/municipio`, {
          controller: "ReporteController",
          templateUrl: `${location}/municipio.html`,
        }
      );
  }]
);
