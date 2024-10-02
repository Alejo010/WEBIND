/**
 * Created by webind on 10/05/2017.
 */

myApp.controller('ModalInstanceCtrlMail', function ($scope, $uibModalInstance, items, $translate) {
    $scope.phoneRegExp = /^(0)\d{9}$/;
    $scope.zipcodeRegExp = /^\d{5}$/;
    $scope.nameRegExp = /^[µçùàèáéíóúa-zA-Z][µçùàèáéíóúa-zA-Z\s]+$/;
    $scope.emailRedExp = /^[a-z][_a-z0-9-]*(\.[_a-z0-9-]+)*@[a-z][a-z0-9-]*(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/;
    $scope.dateRegExp = /^\d{2}\/\d{1,2}\/\d{4}$/;
    $scope.numberRegExp = /^\d{12}$/;
    $scope.numberRegExpCard = /^\d{3}$/;
    $scope.items = items;
    $scope.selected = {
      item: $scope.items
    };

    $scope.alerts = [];

    $scope.closeAlert = function (index) {
      $scope.alerts.splice(index, 1);
    };

    //$scope.mailuser = "";
    //$scope.mailsender = "";
    //$scope.mailsubject = "";
    //$scope.messagebody = "";

    $scope.ok = function () {
      ///Validate form
      if (!$scope.formMail.$valid) {
        $scope.errorValid = true;
        let message = $translate.instant('EMAIL_FIELD_ERROR');
        $scope.alerts.push({
          type: 'danger',
          msg: message
        });
        return;
      }

      $scope.selected.item.action = "OK";
      $scope.selected.item.mailuser = $scope.mailuser;
      $scope.selected.item.mailsender = $scope.mailsender;
      $scope.selected.item.mailsubject = $scope.mailsubject;
      $scope.selected.item.messagebody = $scope.messagebody;

      $uibModalInstance.close($scope.selected.item);
      $uibModalInstance.dismiss('cancel');
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
      $scope.formationCenterName = ""
    };
  }
);
