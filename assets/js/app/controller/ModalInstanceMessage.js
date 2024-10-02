/**
 * Created by webind on 10/05/2017.
 */

myApp.controller('ModalInstanceMessage',
  function ($scope, $uibModalInstance, items) {
    let $ctrl = this;
    $scope.items = items;

    $scope.selected = {
      item: $scope.items
    };
    $ctrl.rotateValue = 0;
    $scope.myInterval = 5000;

    // Carrouserll$scope.noWrapSlides = false;
    $scope.active = 0;
    // var currIndex = 0;

    $scope.slides = [
      {
        image: '/images/avatar1.jpg',
        text: ['Nice image', 'Awesome photograph', 'That is so cool', 'I love that'][0],
        id: 0
      },
      {
        image: '/images/avatar1.jpg',
        text: ['Nice image', 'Awesome photograph', 'That is so cool', 'I love that'][1],
        id: 1
      }];

    $ctrl.rotateImage = function () {
      // $uibModalInstance.rotateImage($scope.selected.item);
      console.log("Ter " + $ctrl.rotateValue);
      if ($ctrl.rotateValue > 360)
        $ctrl.rotateValue = 0;
      else
        $ctrl.rotateValue += 90;

      $scope.selected.item.action = "Rotate";
      //$uibModalInstance.close($scope.selected.item);
    };

    $scope.ok = function () {
      $scope.selected.item.action = "OK";
      $uibModalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
      $scope.formationCenterName = "";
    };
  }
);
