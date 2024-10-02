/**
 * Created by Felipe Rodriguez Arias <ucifarias@gmail.com> on 23/11/2017.
 */

myApp.controller("AreaSaludIndexController",
  function ($scope, AreaSaludResource) {
    $scope.areas = [];
    $scope.areas = AreaSaludResource.query();


    //para el paginado de la tabla
    // $scope.filteredTodos = []
    //   ,$scope.currentPage = 1
    //   ,$scope.numPerPage = 5
    //   ,$scope.maxSize = 5;
    //
    // $scope.numPages = function () {
    //   return Math.ceil($scope.areas.length / $scope.numPerPage);
    // };
    // $scope.$watch('currentPage + numPerPage', function() {
    //   var begin = (($scope.currentPage - 1) * $scope.numPerPage)
    //     , end = begin + $scope.numPerPage;
    //   $scope.filteredTodos = $scope.areas.slice(begin, end);
    // });


    $scope.remove = (area) => {
      AreaSaludResource.delete({id: area.id})
        .$promise
        .then(result => {
          if (result.error) {
            $scope.error = result.error;
          } else {
            $scope.error = '';
            $scope.areas = $scope.areas.filter(v => area.id !== v.id);
          }
        })
        .catch(err => console.log(err));
    };
  }
)
  .controller("AreaSaludNewController",
    function ($scope, $location, AreaSaludResource, MunicipioResource) {
      $scope.title = 'Inserte nueva Área de salud';
      $scope.area = {};
      $scope.municipios = MunicipioResource.query();

      //codigo q valida el form
      // $scope.areaSaludInvalido = false;
      // $scope.completo = false;

      $scope.save = () => {

        // if(!$scope.registro.nombre.$valid){
        //   $scope.completo = true;
        //   //$scope.areaSaludInvalido = true;
        // }

        AreaSaludResource.save($scope.area)
          .$promise
          .then((result) => {
            if (result.error) {
              $scope.error = result.error;
            } else {
              $scope.error = '';
              $location.path('/backend/area-salud/index');
            }
          })
          .catch(err => $scope.error = err);
      };
    }
  )
  .controller("AreaSaludEditController",
    function ($scope, $routeParams, $location, AreaSaludResource, MunicipioResource) {
      $scope.title = 'Editar Área de Salud';
      AreaSaludResource.get({id: $routeParams.id})
        .$promise
        .then(result => {
          $scope.area = result;
          $scope.area.municipio = $scope.area.municipio.id;
        });

      $scope.municipios = MunicipioResource.query();

      $scope.save = () => {
        AreaSaludResource.save({id: $scope.area.id}, $scope.area)
          .$promise
          .then((result) => {
            if (result.error) {
              $scope.error = result.error;
            } else {
              $scope.error = '';
              $location.path('/backend/area-salud/index');
            }
          })
          .catch(err => $scope.error = err);
      };
    }
  )
  .controller("AreaSaludShowController",
    function ($scope, $routeParams, AreaSaludResource) {
      $scope.area = AreaSaludResource.get({id: $routeParams.id});
    }
  );
