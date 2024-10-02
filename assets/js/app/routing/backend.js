/**
 * Created by Felipe Rodriguez Arias <ucifarias@gmail.com> on 23/11/2017.
 */

myApp.config(['$routeProvider', function ($routeProvider) {
    let prefix = '/backend';

    $routeProvider
    /****************************************************************************************************************/
    /***************************************************Chat*********************************************************/
    /****************************************************************************************************************/
    .when(`${prefix}/chat`, {
      controller: 'AuthController',
      templateUrl: '/templates/chat/auth.html',

    })
    .when(`${prefix}/home/:id`, {
      controller: 'HomeController',
      templateUrl: '/templates/chat/home.html',

    })
    /****************************************************************************************************************/
    /*****************************************************Área de Salud**********************************************/
    /****************************************************************************************************************/
      .when(`${prefix}/area-salud`, {
          controller: 'AreaSaludIndexController',
          templateUrl: `templates/area-salud/index.html`,
        }
      )
      .when(`${prefix}/area-salud/index`, {
          controller: 'AreaSaludIndexController',
          templateUrl: `templates/area-salud/index.html`,
        }
      )
      .when(`${prefix}/area-salud/new`, {
          controller: 'AreaSaludNewController',
          templateUrl: `templates/area-salud/form.html`,
        }
      )
      .when(`${prefix}/area-salud/edit/:id`, {
          controller: 'AreaSaludEditController',
          templateUrl: `templates/area-salud/form.html`,
        }
      )
      .when(`${prefix}/area-salud/show/:id`, {
          controller: 'AreaSaludShowController',
          templateUrl: `templates/area-salud/show.html`,
        }
      )
      /****************************************************************************************************************/
      /*****************************************************Especialidad***********************************************/
      /****************************************************************************************************************/
      .when(`${prefix}/especialidad`, {
          controller: 'EspecialidadIndexController',
          templateUrl: `templates/nomenclador/index.html`,
        }
      )
      .when(`${prefix}/especialidad/index`, {
          controller: 'EspecialidadIndexController',
          templateUrl: `templates/nomenclador/index.html`,
        }
      )
      .when(`${prefix}/especialidad/new`, {
          controller: 'EspecialidadNewController',
          templateUrl: `templates/nomenclador/new.html`,
        }
      )
      .when(`${prefix}/especialidad/edit/:id`, {
          controller: 'EspecialidadEditController',
          templateUrl: `templates/nomenclador/edit.html`,
        }
      )
      .when(`${prefix}/especialidad/show/:id`, {
          controller: 'EspecialidadShowController',
          templateUrl: `templates/nomenclador/show.html`,
        }
      )
      /****************************************************************************************************************/
      /*****************************************************Examen*****************************************************/
      /****************************************************************************************************************/
      .when(`${prefix}/examen`, {
          controller: 'ExamenIndexController',
          templateUrl: `templates/nomenclador/index.html`,
        }
      )
      .when(`${prefix}/examen/index`, {
          controller: 'ExamenIndexController',
          templateUrl: `templates/nomenclador/index.html`,
        }
      )
      .when(`${prefix}/examen/new`, {
          controller: 'ExamenNewController',
          templateUrl: `templates/nomenclador/new.html`,
        }
      )
      .when(`${prefix}/examen/edit/:id`, {
          controller: 'ExamenEditController',
          templateUrl: `templates/nomenclador/edit.html`,
        }
      )
      .when(`${prefix}/examen/show/:id`, {
          controller: 'ExamenShowController',
          templateUrl: `templates/nomenclador/show.html`,
        }
      )
      /****************************************************************************************************************/
      /*****************************************************Hospital***************************************************/
      /****************************************************************************************************************/
      .when(`${prefix}/hospital`, {
          controller: 'HospitalIndexController',
          templateUrl: `templates/nomenclador/index.html`,
        }
      )
      .when(`${prefix}/hospital/index`, {
          controller: 'HospitalIndexController',
          templateUrl: `templates/nomenclador/index.html`,
        }
      )
      .when(`${prefix}/hospital/new`, {
          controller: 'HospitalNewController',
          templateUrl: `templates/nomenclador/new.html`,
        }
      )
      .when(`${prefix}/hospital/edit/:id`, {
          controller: 'HospitalEditController',
          templateUrl: `templates/nomenclador/edit.html`,
        }
      )
      .when(`${prefix}/hospital/show/:id`, {
          controller: 'HospitalShowController',
          templateUrl: `templates/nomenclador/show.html`,
        }
      )
      /****************************************************************************************************************/
      /************************************************Movimiento Fetal************************************************/
      /****************************************************************************************************************/
      .when(`${prefix}/movimiento-fetal`, {
          controller: 'MovimientoFetalIndexController',
          templateUrl: `templates/nomenclador/index.html`,
        }
      )
      .when(`${prefix}/movimiento-fetal/index`, {
          controller: 'MovimientoFetalIndexController',
          templateUrl: `templates/nomenclador/index.html`,
        }
      )
      .when(`${prefix}/movimiento-fetal/new`, {
          controller: 'MovimientoFetalNewController',
          templateUrl: `templates/nomenclador/new.html`,
        }
      )
      .when(`${prefix}/movimiento-fetal/edit/:id`, {
          controller: 'MovimientoFetalEditController',
          templateUrl: `templates/nomenclador/edit.html`,
        }
      )
      .when(`${prefix}/movimiento-fetal/show/:id`, {
          controller: 'MovimientoFetalShowController',
          templateUrl: `templates/nomenclador/show.html`,
        }
      )
      /****************************************************************************************************************/
      /************************************************Nivel Escolaridad***********************************************/
      /****************************************************************************************************************/
      .when(`${prefix}/nivel-escolaridad`, {
          controller: 'NivelEscolaridadIndexController',
          templateUrl: `templates/nomenclador/index.html`,
        }
      )
      .when(`${prefix}/nivel-escolaridad/index`, {
          controller: 'NivelEscolaridadIndexController',
          templateUrl: `templates/nomenclador/index.html`,
        }
      )
      .when(`${prefix}/nivel-escolaridad/new`, {
          controller: 'NivelEscolaridadNewController',
          templateUrl: `templates/nomenclador/new.html`,
        }
      )
      .when(`${prefix}/nivel-escolaridad/edit/:id`, {
          controller: 'NivelEscolaridadEditController',
          templateUrl: `templates/nomenclador/edit.html`,
        }
      )
      .when(`${prefix}/nivel-escolaridad/show/:id`, {
          controller: 'NivelEscolaridadShowController',
          templateUrl: `templates/nomenclador/show.html`,
        }
      )
      /****************************************************************************************************************/
      /************************************************Rol*******************************************************/
      /****************************************************************************************************************/
      .when(`${prefix}/rol`, {
          controller: 'RolIndexController',
          templateUrl: `templates/nomenclador/index.html`,
        }
      )
      .when(`${prefix}/rol/index`, {
          controller: 'RolIndexController',
          templateUrl: `templates/nomenclador/index.html`,
        }
      )
      .when(`${prefix}/rol/new`, {
          controller: 'RolNewController',
          templateUrl: `templates/nomenclador/new.html`,
        }
      )
      .when(`${prefix}/rol/edit/:id`, {
          controller: 'RolEditController',
          templateUrl: `templates/nomenclador/edit.html`,
        }
      )
      .when(`${prefix}/rol/show/:id`, {
          controller: 'RolShowController',
          templateUrl: `templates/nomenclador/show.html`,
        }
      )
      /****************************************************************************************************************/
      /************************************************Parentezco******************************************************/
      /****************************************************************************************************************/
      .when(`${prefix}/parentezco`, {
          controller: 'ParentezcoIndexController',
          templateUrl: `templates/nomenclador/index.html`,
        }
      )
      .when(`${prefix}/parentezco/index`, {
          controller: 'ParentezcoIndexController',
          templateUrl: `templates/nomenclador/index.html`,
        }
      )
      .when(`${prefix}/parentezco/new`, {
          controller: 'ParentezcoNewController',
          templateUrl: `templates/nomenclador/new.html`,
        }
      )
      .when(`${prefix}/parentezco/edit/:id`, {
          controller: 'ParentezcoEditController',
          templateUrl: `templates/nomenclador/edit.html`,
        }
      )
      .when(`${prefix}/parentezco/show/:id`, {
          controller: 'ParentezcoShowController',
          templateUrl: `templates/nomenclador/show.html`,
        }
      )
      /****************************************************************************************************************/
      /************************************************TipoParto*******************************************************/
      /****************************************************************************************************************/
      .when(`${prefix}/tipo-parto`, {
          controller: 'TipoPartoIndexController',
          templateUrl: `templates/nomenclador/index.html`,
        }
      )
      .when(`${prefix}/tipo-parto/index`, {
          controller: 'TipoPartoIndexController',
          templateUrl: `templates/nomenclador/index.html`,
        }
      )
      .when(`${prefix}/tipo-parto/new`, {
          controller: 'TipoPartoNewController',
          templateUrl: `templates/nomenclador/new.html`,
        }
      )
      .when(`${prefix}/tipo-parto/edit/:id`, {
          controller: 'TipoPartoEditController',
          templateUrl: `templates/nomenclador/edit.html`,
        }
      )
      .when(`${prefix}/tipo-parto/show/:id`, {
          controller: 'TipoPartoShowController',
          templateUrl: `templates/nomenclador/show.html`,
        }
      )
      /****************************************************************************************************************/
      /************************************************Llanto*******************************************************/
      /****************************************************************************************************************/
      .when(`${prefix}/llanto`, {
          controller: 'LlantoIndexController',
          templateUrl: `templates/nomenclador/index.html`,
        }
      )
      .when(`${prefix}/llanto/index`, {
          controller: 'LlantoIndexController',
          templateUrl: `templates/nomenclador/index.html`,
        }
      )
      .when(`${prefix}/llanto/new`, {
          controller: 'LlantoNewController',
          templateUrl: `templates/nomenclador/new.html`,
        }
      )
      .when(`${prefix}/llanto/edit/:id`, {
          controller: 'LlantoEditController',
          templateUrl: `templates/nomenclador/edit.html`,
        }
      )
      .when(`${prefix}/llanto/show/:id`, {
          controller: 'LlantoShowController',
          templateUrl: `templates/nomenclador/show.html`,
        }
      )
      /****************************************************************************************************************/
      /************************************************Municipio*******************************************************/
      /****************************************************************************************************************/
      .when(`${prefix}/municipio`, {
          controller: 'MunicipioIndexController',
          templateUrl: `templates/municipio/index.html`,
        }
      )
      .when(`${prefix}/municipio/index`, {
          controller: 'MunicipioIndexController',
          templateUrl: `templates/municipio/index.html`,
        }
      )
      .when(`${prefix}/municipio/new`, {
          controller: 'MunicipioNewController',
          templateUrl: `templates/municipio/form.html`,
        }
      )
      .when(`${prefix}/municipio/edit/:id`, {
          controller: 'MunicipioEditController',
          templateUrl: `templates/municipio/form.html`,
        }
      )
      .when(`${prefix}/municipio/show/:id`, {
          controller: 'MunicipioShowController',
          templateUrl: `templates/municipio/show.html`,
        }
      )
      /****************************************************************************************************************/
      /************************************************Provincia*******************************************************/
      /****************************************************************************************************************/
      .when(`${prefix}/provincia`, {
          controller: 'ProvinciaIndexController',
          templateUrl: `templates/nomenclador/index.html`,
        }
      )
      .when(`${prefix}/provincia/index`, {
          controller: 'ProvinciaIndexController',
          templateUrl: `templates/nomenclador/index.html`,
        }
      )
      .when(`${prefix}/provincia/new`, {
          controller: 'ProvinciaNewController',
          templateUrl: `templates/nomenclador/new.html`,
        }
      )
      .when(`${prefix}/provincia/edit/:id`, {
          controller: 'ProvinciaEditController',
          templateUrl: `templates/nomenclador/edit.html`,
        }
      )
      .when(`${prefix}/provincia/show/:id`, {
          controller: 'ProvinciaShowController',
          templateUrl: `templates/nomenclador/show.html`,
        }
      )
      /*****************************************************Paciente**********************************************/
      /****************************************************************************************************************/
      .when(`${prefix}/paciente`, {
          controller: 'PacienteIndexController',
          templateUrl: `templates/paciente/index.html`,
        }
      )
      .when(`${prefix}/paciente/index`, {
          controller: 'PacienteIndexController',
          templateUrl: `templates/paciente/index.html`,
        }
      )
      .when(`${prefix}/paciente/new`, {
          controller: 'PacienteNewController',
          templateUrl: `templates/paciente/form.html`,
        }
      )
      .when(`${prefix}/paciente/edit/:id`, {
          controller: 'PacienteEditController',
          templateUrl: `templates/paciente/form.html`,
        }
      )
      .when(`${prefix}/paciente/show/:id`, {
          controller: 'PacienteShowController',
          templateUrl: `templates/paciente/show.html`,
        }
      )

      .when(`${prefix}/paciente/imprimir/:id`, {
          controller: 'PacienteImprimirController',
          templateUrl: `templates/paciente/imprimir.html`,
        }
      )
      /****************************************************************************************************************/
      /****************************************************************************************************************/
      /*****************************************************Medico**********************************************/
      /****************************************************************************************************************/
      .when(`${prefix}/medico`, {
          controller: 'MedicoIndexController',
          templateUrl: `templates/medico/index.html`,
        }
      )
      .when(`${prefix}/medico/index`, {
          controller: 'MedicoIndexController',
          templateUrl: `templates/medico/index.html`,
        }
      )
      .when(`${prefix}/medico/new`, {
          controller: 'MedicoNewController',
          templateUrl: `templates/medico/form.html`,
        }
      )
      .when(`${prefix}/medico/edit/:id`, {
          controller: 'MedicoEditController',
          templateUrl: `templates/medico/form.html`,
        }
      )
      .when(`${prefix}/medico/show/:id`, {
          controller: 'MedicoShowController',
          templateUrl: `templates/medico/show.html`,
        }
      )
      /****************************************************************************************************************/
      /****************************************************************************************************************/
      /*****************************************************Usuarios**********************************************/
      /****************************************************************************************************************/
      .when(`${prefix}/usuario`, {
          controller: 'UsuarioIndexController',
          templateUrl: `templates/usuario/index.html`,
        }
      )
      .when(`${prefix}/usuario/index`, {
          controller: 'UsuarioIndexController',
          templateUrl: `templates/usuario/index.html`,
        }
      )
      .when(`${prefix}/usuario/new`, {
          controller: 'UsuarioNewController',
          templateUrl: `templates/usuario/form.html`,
        }
      )
      .when(`${prefix}/usuario/edit/:id`, {
          controller: 'UsuarioEditController',
          templateUrl: `templates/usuario/form.html`,
        }
      )
      .when(`${prefix}/usuario/show/:id`, {
          controller: 'UsuarioShowController',
          templateUrl: `templates/usuario/show.html`,
        }
      )
      /****************************************************************************************************************/
      /****************************************************************************************************************/
      /*****************************************************Consulta**********************************************/
      /****************************************************************************************************************/

      .when(`${prefix}/consulta/buscar`, {
          controller: 'ConsultaBuscarController',
          templateUrl: `templates/consulta/buscar.html`,
        }
      )
      .when(`${prefix}/consulta/new/:idPaciente/:idMedico`, {
          controller: 'ConsultaNewController',
          templateUrl: `templates/consulta/form.html`,
        }
      )
      .when(`${prefix}/consulta/index/:idPaciente`, {
          controller: 'ConsultaIndexController',
          templateUrl: `templates/consulta/index.html`,
        }
      )

      .when(`${prefix}/consulta/show/:id`, {
          controller: 'ConsultaShowController',
          templateUrl: `templates/consulta/show.html`,
        }
      )
        /****************************************************************************************************************/
      /****************************************************************************************************************/
      /*****************************************************Calendario**********************************************/
      /****************************************************************************************************************/

      // .when(`${prefix}/calendar/show/:idMedico`, {
      //     controller: 'CalendarioShowController',
      //     templateUrl: `templates/calendario/calendar.html`,
      //   }
      // )
      // .when(`${prefix}/calendar/show/`, {
      //     controller: 'CalendarController',
      //     templateUrl: `templates/calendario/calendar.html`,
      //   }
      // )

      .when("/wizard", {
          controller: "CalendarController",
          templateUrl: "wizard",
        }
      )
      /****************************************************************************************************************/
      /****************************************************************************************************************/
      /*****************************************************Modal**********************************************/
      /****************************************************************************************************************/
      .when(`${prefix}/modal/modal1`, {
          controller: 'Modal1Controller',
          templateUrl: `templates/modal/modal1.html`,
        }
      )
      /****************************************************************************************************************/
  /****************************************************************************************************************/
  /*****************************************************Remisiones**********************************************/
  /****************************************************************************************************************/
    //
    // .when(`${prefix}/remisiones/show/:idConsulta/:idEspecialidad/:motivoRemision/:atendido`, {
    //     controller: 'Remision/ShowController',
    //     templateUrl: `templates/remisiones/remisiones.html`,
    //   }
    // )
  // .when(`${prefix}/remisiones/show/:idConsulta/:idEspecialidad/:motivoRemision/:atendido`, {
  //     controller: 'Remision/RemisionesSalidaShowController',
  //     templateUrl: `templates/remisiones/remisionesSalida.html`,
  //   }
  // );
    /****************************************************************************************************************/
    /****************************************************************************************************************/
    /**************************************************************************************************/
    /****************************************************************************************************************/

  }]
);
