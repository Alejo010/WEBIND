/**
 * Created by WebIND on 16/2/2018.
 */


myApp.controller("UsuarioIndexController",
  function ($scope, UsuarioResource, $http, ApiService, API_ROUTE) {
    $scope.usuarios = [];
    // $scope.usuarios = UsuarioResource.query();

    $http.get('/usuario').then(result => {
      $scope.usuarios = result.data;
    }).catch(err => {
      console.log(err);
    });

    // $scope.remove = (usuario) => {
    //   console.log("ID: " +  usuario.id);
    //   UsuarioResource.delete({ id: usuario.id })
    //     .$promise
    //     .then(result => {
    //       console.log(JSON.stringify(result));
    //       console.log("dd");

    //       if (result.error) {
    //         $scope.error = result.error;
    //       } else {
    //         $scope.error = '';
    //         $scope.usuarios = $scope.usuarios.filter(v => usuario.id !== v.id);
    //       }
    //     })
    //     .catch(err => console.log(err));
    // };
    $scope.remove = (usuario) => {
      params = {
        "id" : usuario.id
      }
      ApiService.post(API_ROUTE.DELETE_USER, params)
      .then(function (response) {
        if (response.error) {
            $scope.error = response.error;
          } else {
            $scope.error = '';
            $scope.usuarios = $scope.usuarios.filter(v => usuario.id !== v.id);
            window.location = '#!/backend/usuario/index';
          }
      });
    };
  }
)

  .controller("UsuarioNewController",
  function ($scope, $location, UsuarioResource, RolResource, MedicoResource, EspecialidadResource, $http) {

    $scope.title = 'Insertar Usuario';
    // $scope.usuario = {};
    //  $scope.usuario.medico = {};
    $scope.nombreInvalido = false;
    $scope.esmedico = true;
    $scope.esmedico = function () {
      if (esmedico) {
        esmedico = false;
      }
    };
    $scope.mFilter1 = true;
    $scope.mFilter2 = true;
  /*  $scope.usuario = {
      nombre: 'Roberto',
      apellidos: 'Garcia sjkddjkb',
      ci: '56854785415',
      username: 'rmoreno',
      email: 'lolo@uo.edu.cu',
      password: '1',
      rol: '5c0170b73f94462045dd8ae2',
      online: 'N',
      socketId: '',
    };

    $scope.usuario.medico = {
      numeroMedico: '66587',
      especialidad:'5c082f284ccd51e01aa5aa1b'
    };*/
    $scope.roles = RolResource.query();
    $scope.especialidades = EspecialidadResource.query();

    $scope.selRoles = function () {
      let nombreRol = $scope.usuario.rol.nombre;
      let minombre = nombreRol.indexOf('Médico');
      if (minombre === 0) {
        $scope.esmedico = false;
      } else {
        $scope.esmedico = true;
      }
      if ($scope.usuario.rol.nombre === "Médico Consulta Central") {
        $scope.mFilter1 = false;
        $scope.mFilter2 = true;
      } else {
        $scope.mFilter1 = true;
        $scope.mFilter2 = false;
      }
    };

    $scope.save = () => {
      var data;
      $scope.usuario.socketId = '';
      $scope.usuario.online = 'N';
      console.log("ROL: " + $scope.usuario.rol.nombre);
      if($scope.usuario.rol.nombre ==='Médico Consulta Central' || $scope.usuario.rol.nombre ==='Médico Consulta Pasiva')
        {
          console.log("OYE1...");
          $scope.usuario.medico.nombre = $scope.usuario.nombre;
          $scope.usuario.medico.apellidos = $scope.usuario.apellidos;
          $scope.usuario.medico.ci = $scope.usuario.ci;
          $scope.usuario.medico.numeroMedico = $scope.usuario.medico.numeroMedico;
          $scope.usuario.medico.especialidad = $scope.usuario.medico.especialidad;
          data = {
            medico: $scope.usuario.medico,
            usuario: $scope.usuario
          }
         // console.log('imprimiendo data.medico' +JSON.stringify(data.medico));
         // console.log('imprimiendo data.usuario' +JSON.stringify(data.usuario));
        }
        else if($scope.usuario.rol.nombre ==='Directivo' || $scope.usuario.rol.nombre ==='Administrador') {
          console.log("OYE...");
          data = {
            usuario: $scope.usuario
          }
          console.log('en el if de usuario' +JSON.stringify(data));
        }
      $http.post('/usuario', data)
        .then(result => {
          console.log("Success: ");
          console.log(result);
          console.log("Before redirecting...");
          window.location = '#!/backend/usuario/index';
        })
        .catch(err => {
          console.log(err);
          $scope.error = err;
        });
      /*
              UsuarioResource.save({medico:$scope.usuario.medico, usuario:$scope.usuario})
                .$promise
                .then((result) => {
                  if (result.error) {
                    $scope.error = result.error;
                    alert('Verifique los datos');
                  } else {
                    $scope.error = '';
                    $location.path('/backend/usuario/index');
                  }
                })
                .catch(err => {
                  $scope.error = err
                  alert('Verifique los datos');
                });*/
    };
  }
  )
  .controller("UsuarioEditController",
  function ($scope, $routeParams, $location, UsuarioResource, RolResource, MedicoResource, EspecialidadResource, ApiService, API_ROUTE) {
    $scope.title = 'Editar datos del Usuario';
    $scope.esmedico = true;
    $scope.esmedico = function () {
      if (esmedico) {
        esmedico = false;
      }
    };
    $scope.mFilter1 = true;
    $scope.mFilter2 = true;

    $scope.roles = RolResource.query();
    $scope.especialidades = EspecialidadResource.query();
    $scope.selRoles = function () {
      let nombreRol = $scope.usuario.rol.nombre;
      let minombre = nombreRol.indexOf('Médico');
      if (minombre === 0) {
        $scope.esmedico = false;
      } else $scope.esmedico = true;
      if ($scope.usuario.rol.nombre === "Médico Consulta Central") {
        $scope.mFilter1 = false;
        $scope.mFilter2 = true;
      } else {
        $scope.mFilter1 = true;
        $scope.mFilter2 = false;
      }
    };

    params = {
      "id" : $routeParams.id
    }
    ApiService.post(API_ROUTE.GET_USER, params)
    .then(function (response) {
      if (response.error) {
          $scope.error = response.error;
        } else {
          var rol = response.data.rol;
          var usuario = {
            "id" : response.data.id,
            "nombre" : response.data.nombre,
            "apellidos": response.data.apellidos,
            "ci": response.data.ci,
            "username": response.data.username,
            "rol" : rol,
            //"medico" : "",
            "password" : response.data.password,
            "email" : response.data.email
          }
          if (response.data.rol.nombre === "Médico Consulta Central" || response.data.rol.nombre === "Médico Consulta Pasiva") {
              var medico = response.data.medicos[0];
              usuario.medico = medico;
              $scope.esmedico = false;
          }
          if (response.data.rol.nombre === "Médico Consulta Central") {
            $scope.mFilter1 = false;
            $scope.mFilter2 = true;
          } else {
            $scope.mFilter1 = true;
            $scope.mFilter2 = false;
          }
          $scope.usuario = usuario;
        }
    });


    $scope.save = () => {
      param = {
        "user" : $scope.usuario
      }
      ApiService.post(API_ROUTE.UPDATE_USER, param)
      .then(function (response) {
        if (response.error) {
            $scope.error = response.error;
          } else {
            // Update succesfull
            window.location = '#!/backend/usuario/index';
          }
      });
    };
  }
  )


  .controller("UsuarioShowController",
  function ($scope, $routeParams, $location, UsuarioResource, RolResource, MedicoResource, EspecialidadResource, ApiService, API_ROUTE) {
    $scope.isMedicoShow = true;
    console.log("show m: " + $routeParams.id);
    params = {
      "id" : $routeParams.id
    }
    ApiService.post(API_ROUTE.GET_USER, params)
    .then(function (response) {
      if (response.error) {
          $scope.error = response.error;
        } else {
          var rol = response.data.rol;
          var usuario = {
            "id" : response.data.id,
            "nombre" : response.data.nombre,
            "apellidos": response.data.apellidos,
            "ci": response.data.ci,
            "username": response.data.username,
            "rol" : rol,
            "password" : response.data.password,
            "email" : response.data.email
          }
          if (response.data.rol.nombre === "Médico Consulta Central" || response.data.rol.nombre === "Médico Consulta Pasiva") {
            var medico = response.data.medicos[0];
              usuario.medico = medico;
              $scope.esmedico = false;
              $scope.isMedicoShow = false;
          }
          $scope.usuario = usuario;

        }
    });

  }
  );
