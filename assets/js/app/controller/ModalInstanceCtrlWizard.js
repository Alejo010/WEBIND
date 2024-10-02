/**
 * Created by webind on 10/05/2017.
 */

myApp.controller('ModalInstanceCtrlWizard',
  function ($scope, $uibModalInstance, $rootScope, $routeParams, $http, customerData, $translate) {
// Disable weekend selection
    function disabled() {
      return false;
    }

    $scope.weekDay = ["Sunday", "Monday", "Tuesday", "Wensday", "Thuesday", "Friday", "Saturday"];

    $scope.getReadableDate = function (dateParmt) {
      let value = new Date(dateParmt);
      return $scope.weekDay[value.getDay()] + ": " + value.getDate() + "/" + value.getMonth() + "/" + value.getFullYear();
    };

    $scope.getCustomerFormation = function (customersArray) {
      return customersArray.length;
    };

    $scope.formats = ['dd/MM/yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];
    $scope.dateOptions = {
      dateDisabled: disabled,
      formatYear: 'yyyy',
      maxDate: new Date(2020, 5, 22),
      minDate: new Date(),
      startingDay: 1
    };

    $scope.paymentMessages = [];
    $scope.numberRegExp = /^\d{16}$/;
    $scope.numberRegExpCard = /^\d{3}$/;
    $scope.dateRegExp = /^\d{2}\/\d{2}\/\d{4}$/;

    $scope.creditCardData = {};
    $scope.popupCardCreditDate = {
      opened: false
    };

    $scope.openCardCreditDate = function () {
      $scope.popupCardCreditDate.opened = true;
    };

    $scope.customerData = customerData;
    $scope.price = customerData.amount;
    $scope.showError = false;
    //$scope.selected = {
    //    item: $scope.items[0]
    //};

    $scope.ok = function () {


      ///With formation center identifier and constumer data make payment
      if ($scope.paymentdata.$invalid) {
        if ($scope.paymentMessages.length > 0) {
          $scope.paymentMessages.splice(0, 1);
        }
        $scope.paymentMessages.push({type: "danger", info: "Sorry, Some fields are invalid"});
        return;
      }

      ////Make payment if all data if of
      let config = {
        userdata: $scope.customerData,
        formationidentifier: $scope.customerData.idformation,
        creditCardData: $scope.creditCardData,
        price: $scope.price,
        currency: "EUR"
      };
      config.userdata.nacionality = "FR";
      config.userdata.country = "FR";
      let selectedItem = {status: "OK"};

      ///Modify for paymet services
      $http.post("/Payment/mangopaymentex/", config)
        .success(function (data) {
          let message = "Payment ok.";
          let mtype = "success";
          if (data.response != "OK") {
            ///Error BIG PROBLEMS
            $scope.showError = true;
            if (data.response == "ERROR") {
              selectedItem.status = "ERROR";
              message = selectedItem.message = data.message;
              mtype = "error";
            }
          }
          else {
            selectedItem.result = data.result
          }
          if ($scope.paymentMessages.length > 0) {
            $scope.paymentMessages.splice(0, 1);
          }
          $scope.paymentMessages.push({type: mtype, info: message});
          $uibModalInstance.close(selectedItem);
          $uibModalInstance.dismiss('cancel');
        })
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
      $scope.formationCenterName = "";
    };

    $scope.getCardNumTooltipError = function () {
      if ($scope.paymentdata.number.$error.required) {
        return $translate.instant('CARDNUMBER_REQUIRED');
      }
      else if ($scope.paymentdata.number.$error.pattern) {
        return $translate.instant('CARDNUMBER_ERROR');
      }
    };

    $scope.isCardNumTooltipError = function () {
      return ($scope.paymentdata.number.$dirty && $scope.paymentdata.number.$invalid)
    };
  }
);
