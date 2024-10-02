/**
 * Created by webind
 */


myApp.controller("MedicoIndexController",
  function ($scope, MedicoResource) {
    $scope.medicos = [];
    $scope.medicos = MedicoResource.query();

    $scope.remove = (medico) => {
      MedicoResource.delete({id: medico.id})
        .$promise
        .then(result => {
          console.log(JSON.stringify(result));
          console.log("dd");

          if (result.error) {
            $scope.error = result.error;
          } else {
            $scope.error = '';
            $scope.medicos = $scope.medicos.filter(v => medico.id !== v.id);
          }
        })
        .catch(err => console.log(err));
    };
  }
)

  .controller("MedicoNewController",
    function ($scope, $location, MedicoResource, EspecialidadResource) {
      $scope.title = 'Insertar nuevo Médico';
      $scope.medico = { };
      $scope.especialidades = EspecialidadResource.query();

      $scope.save = () => {
        log.console('$scope.medico',$scope.medico);
        MedicoResource.save($scope.medico)
          .$promise
          .then((result) => {
            if (result.error) {
              $scope.error = result.error;
            } else {
              $scope.error = '';
              $location.path('/backend/medico/index');
              log.console('insertado correctamente');
            }
          })
          .catch(err => $scope.error = err);
      };
    }
  )
  .controller("MedicoEditController",
    function ($scope, $routeParams, $location, MedicoResource, EspecialidadResource) {
      $scope.title = 'Editar datos del Médico';
      MedicoResource.get({id: $routeParams.id})
        .$promise
        .then(result => {
          $scope.medico = result;
          $scope.medico.especialidad = $scope.medico.especialidad.id;
        });

      $scope.especialidades = EspecialidadResource.query();

      $scope.save = () => {
        MedicoResource.save({id: $scope.medico.id}, $scope.medico)
          .$promise
          .then((result) => {
            if (result.error) {
              $scope.error = result.error;
            } else {
              $scope.error = '';
              $location.path('/backend/medico/index');
            }
          })
          .catch(err => $scope.error = err);
      };
    }
  )
  .controller("MedicoShowController",
    function ($scope, $routeParams, MedicoResource) {
      $scope.medico = MedicoResource.get({id: $routeParams.id});
    }
  );



