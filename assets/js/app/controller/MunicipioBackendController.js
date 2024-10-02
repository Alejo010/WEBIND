/**
 * Created by Felipe Rodriguez Arias <ucifarias@gmail.com> on 23/11/2017.
 */

myApp.controller("MunicipioIndexController",
  function ($scope, MunicipioResource) {
    $scope.municipios = [];
    $scope.municipios = MunicipioResource.query();

    $scope.remove = (municipio) => {
      MunicipioResource.delete({id: municipio.id})
        .$promise
        .then(result => {
          if (result.error) {
            $scope.error = result.error;
          } else {
            $scope.error = '';
            $scope.municipios = $scope.municipios.filter(v => municipio.id !== v.id);
          }
        })
        .catch(err => console.log(err));
    };
  }
)
  .controller("MunicipioNewController",
    function ($scope, $location, MunicipioResource, ProvinciaResource) {
      $scope.title = 'Crear Municipio';
      $scope.municipio = {};
      $scope.provincias = ProvinciaResource.query();

      $scope.save = () => {
        MunicipioResource.save($scope.municipio)
          .$promise
          .then((result) => {
            if (result.error) {
              $scope.error = result.error;
            } else {
              $scope.error = '';
              $location.path('/backend/municipio/index');
            }
          })
          .catch(err => $scope.error = err);
      };
    }
  )
  .controller("MunicipioEditController",
    function ($scope, $routeParams, $location, MunicipioResource, ProvinciaResource) {
      $scope.title = 'Editar Municipio';
      MunicipioResource.get({id: $routeParams.id})
        .$promise
        .then(result => {
          $scope.municipio = result;
          $scope.municipio.provincia = $scope.municipio.provincia.id;
        });

      $scope.provincias = ProvinciaResource.query();

      $scope.save = () => {
        MunicipioResource.save({id: $scope.municipio.id}, $scope.municipio)
          .$promise
          .then((result) => {
            if (result.error) {
              $scope.error = result.error;
            } else {
              $scope.error = '';
              $location.path('/backend/municipio/index');
            }
          })
          .catch(err => $scope.error = err);
      };
    }
  )
  .controller("MunicipioShowController",
    function ($scope, $routeParams, MunicipioResource) {
      $scope.municipio = MunicipioResource.get({id: $routeParams.id});
    }
  );
