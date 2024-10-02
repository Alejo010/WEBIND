/**
 * Created by webind on 10/05/2017.
 */

myApp.controller("QueryWizardController",
  function ($rootScope, $http, $routeParams, $scope, $uibModal, $location, $translate) {

    let vm = this;
    vm.currentCustomer = {};
    //Model
    vm.currentStep = 1;
    vm.validPayment = false;

    //Messages arrays.
    vm.validationMessages = [];
    vm.paymentMessages = [];
    vm.customerFoundMessages = [];

    //Initializating customer Object.
    vm.initCustomerData = function () {
      vm.customerData = {};
      vm.customerData.driverLicence = {};
      vm.customerData.civility = "M";
    };

    //vm.initCustomerData();

    //Regulars expressions for validate fields.
    vm.phoneRegExp = /^(0)\d{9}$/;
    vm.zipcodeRegExp = /^\d{5}$/;
    vm.nameRegExp = /^([ê|µ|ç|ùàè|áéíóú|a-z|A-Z|ñ|Ñ]*)([\w|\d])*([_|\s]*[\.|\-|\'|ê|ç|ùàè|áéíóú|A-Z|a-z|ñ|Ñ|\d])*$/;
    vm.emailRedExp = /^[a-z][_a-z0-9-]*(\.[_a-z0-9-]+)*@[a-z][a-z0-9-]*(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/;
    vm.dateRegExp = /^\d{2}\/\d{1,2}\/\d{4}$/;
    vm.numberRegExp = /^\d{12}$/;
    vm.numberRegExpCard = /^\d{3}$/;

    vm.paymentServicesError = false;
    vm.paymentButtonDisabled = true;
    vm.customerLicenceNumberUsed = false;
    vm.showBDerror = false; //Show Birth Date Error.
    vm.showDDerror = false; //Show Date of Deliverance error.
    vm.showPDerror = false; //Show Date of Procuration error.
    vm.showPDerrorLessDD = false; //Show error if procuration date less than Deliverance Date.

    //Wizard navigation steps.
    // vm.steps = [
    //   {
    //     step: 1,
    //     name: "Inf. Inicial",
    //     template: "templates/querywizard/page1.html",
    //   },
    //   {
    //     step: 2,
    //     name: "Dictamen",
    //     template: "templates/querywizard/page2.html",
    //   },
    //   {
    //     step: 3,
    //     name: "Conclusiones",
    //     template: "templates/querywizard/page3.html",
    //   }
    // ];
    // ,
    // {
    //   step: 4,
    //     name: "Antec.Pat.Fam.(APF)",
    //   template: "templates/querwizard/page4.html",
    // }
    vm.showValidationMessage = function (message) {
      if (vm.validationMessages.length > 0)
        vm.validationMessages.splice(0, 1);

      vm.validationMessages.push({type: message.type, info: message.info});
    };

    vm.showPaymentMessages = function (message) {
      if (vm.paymentMessages.length > 0) {
        vm.paymentMessages.splice(0, 1);
      }
      vm.paymentMessages.push({type: message.type, info: message.info});
    };

    //wizard Functions
    vm.gotoStep = function (newStep) {
      //Esto para navegar sin las validaciones
      //vm.currentStep = newStep;
      //return;

      if (vm.currentStep === 1) {
        if (newStep === 4) {
          vm.showValidationMessage({
            type: "danger",
            info: "After provide customer and licence information, you should choose a form of payment."
          });
          return;
        }
        if (newStep === 2) {
          if (vm.validateStep1()) {
            vm.currentStep = newStep;
          }
          else {
            vm.showValidationMessage({
              type: "danger",
              info: "There are some mising or invalid information, please check again."
            });
          }
          return;
        }
        if (newStep === 3) {
          if (vm.validateStep1()) {
            if (vm.validateStep2()) {
              vm.currentStep = newStep;
            }
            else {
              vm.currentStep = 2;
              vm.showValidationMessage({
                type: "danger",
                info: "There are some mising or invalid information, please check again."
              });
            }
          }
          else {
            vm.showValidationMessage({
              type: "danger",
              info: "There are some mising or invalid information, please check again."
            });
          }
          return;
        }
        return;
      }

      if (vm.currentStep === 2) {
        if (newStep === 4) {
          vm.showValidationMessage({
            type: "danger",
            info: "After provide customer and licence information, you should choose a form of payment."
          });
          return;
        }
        if (newStep === 1 || newStep === 3) {
          if (vm.validateStep2()) {
            vm.currentStep = newStep;
          }
          else {
            vm.showValidationMessage({
              type: "danger",
              info: "There are some mising or invalid information, please check again."
            });
          }
          return;
        }
        return;
      }

      if (vm.currentStep === 3) {
        console.log("What happen");
        if (newStep === 4) {
          console.log("Not show directly form");
          return;
        }
        vm.currentStep = newStep;
        return;
      }

      if (vm.currentStep === 4) {
        if (newStep !== 4) {
          vm.initCustomerData();
          vm.currentStep = 1;
        }
        else {
          //Register new costumer
          //remenber registe if paid or not
          console.log("Make recap to form");
          //vm.bookFormation();
        }
      }
    };

    vm.getStepTemplate = function () {
      for (let i = 0; i < vm.steps.length; i++) {
        if (vm.currentStep === vm.steps[i].step) {
          return vm.steps[i].template;
        }
      }
    };

    vm.validateStep1 = function () {
      // if (!vm.customerData.name
      //   || !vm.customerData.firstName
      //   || !vm.customerData.phoneNumber
      //   || !vm.customerData.email
      //   || !vm.customerData.zipCode
      //   || !vm.customerData.birthDate
      //   || !vm.validBirthDate()
      //   || !vm.validCity()
      //   || !vm.validBirthCity()) {
      //
      //   return false;
      // }

      return true;
    };

    vm.validateStep2 = function () {
      // if (!vm.customerData.driverLicence.number
      //   || !vm.customerData.driverLicence.placeOfDeliverance
      //   || !vm.customerData.driverLicence.dateOfDeliverance
      //   || !vm.customerData.driverLicence.dateOfProcuration
      //   || !vm.validDeliDate()
      //   || !vm.validProcDate()
      //   || vm.customerLicenceNumberUsed) {
      //
      //   return false;
      // }

      return true;
    };

    vm.validBirthDate = function () {
      if (vm.customerData.birthDate) {
        let birthDate = new Date(vm.customerData.birthDate);
        let maxBirthDate = new Date(actDate.getFullYear() - 16, actDate.getMonth(), actDate.getDate());
        let minBirthDate = new Date(actDate.getFullYear() - 80, actDate.getMonth(), actDate.getDate());

        if (birthDate < maxBirthDate && birthDate > minBirthDate) {
          return true;
        }
      }
      return false;
    };

    vm.validDeliDate = function () {
      if (vm.customerData.driverLicence.dateOfDeliverance) {
        let deliDate = new Date(vm.customerData.driverLicence.dateOfDeliverance);
        let maxDeliDate = new Date().setDate(actDate.getDate() - 1);
        let minDeliDate = new Date(actDate.getFullYear() - 20, actDate.getMonth(), actDate.getDate());

        if (deliDate < maxDeliDate && deliDate > minDeliDate) {
          return true;
        }
      }
      return false;
    };


    //Return true if procuration date grait or equal than deliverance date.
    vm.procDgtdeliD = function () {
      if (!vm.customerData.driverLicence.dateOfProcuration
        || !vm.customerData.driverLicence.dateOfDeliverance) {
        return true;
      }

      if (new Date(vm.customerData.driverLicence.dateOfProcuration) >= new Date(vm.customerData.driverLicence.dateOfDeliverance)) {
        return true;
      }

      return false;
    };

    vm.validProcDate = function () {
      if (vm.customerData.driverLicence.dateOfProcuration) {
        var procDate = new Date(vm.customerData.driverLicence.dateOfProcuration);
        var maxDeliDate = new Date().setDate(actDate.getDate() - 1);
        var minDeliDate = new Date(actDate.getFullYear() - 20, actDate.getMonth(), actDate.getDate());

        if (procDate < maxDeliDate && procDate > minDeliDate && vm.procDgtdeliD()) {
          return true;
        }
      }
      return false;
    };

    vm.validProcDateRange = function () {
      if (vm.customerData.driverLicence.dateOfProcuration) {
        procDate = new Date(vm.customerData.driverLicence.dateOfProcuration);
        maxDeliDate = new Date().setDate(actDate.getDate() - 1);
        minDeliDate = new Date(actDate.getFullYear() - 20, actDate.getMonth(), actDate.getDate());

        if (procDate <= maxDeliDate && procDate > minDeliDate) {
          return true;
        }
      }

      return false;
    };

    vm.verifyDeliDate = function () {
      if (vm.customerData.driverLicence.dateOfDeliverance && !vm.validDeliDate()) {
        vm.showDDerror = true;
        return;
      }
      vm.showDDerror = false;

      vm.verifyProcDate();
    };

    vm.verifyProcDate = function () {

      if (vm.customerData.driverLicence.dateOfProcuration) {

        if (vm.validProcDateRange()) {

          vm.showPDerror = false;

          if (vm.procDgtdeliD()) {
            vm.showPDerrorLessDD = false;
          } else {
            vm.showPDerrorLessDD = true;
          }

        } else {
          vm.showPDerror = true;
          vm.showPDerrorLessDD = false;
        }
      }
      else {
        vm.showPDerror = false;
        vm.showPDerrorLessDD = false;
      }
    };

    vm.validCity = function () {
      if (vm.customerData.city) {
        return vm.nameRegExp.test(vm.customerData.city);
      }
      return true;
    };

    vm.validBirthCity = function () {
      if (vm.customerData.birthCity) {
        return vm.nameRegExp.test(vm.customerData.birthCity);
      }
      return true;
    };

    vm.verifyBirthDate = function () {
      if (vm.customerData.birthDate && !vm.validBirthDate()) {
        vm.showBDerror = true;
        return;
      }
      vm.showBDerror = false;
    };

    vm.checkCustomerLicenceNumber = function () {
      if (vm.customerData.driverLicence.number) {
        $http.post($rootScope.urlBase + "/customer/searchByLicenceInYear", {
          licence: vm.customerData.driverLicence.number,
          year: actDate.getFullYear()
        })
          .success(function (data) {
            if (data.status === "error") {
              //Customer not foud in the present year.

              vm.paymentButtonDisabled = false;
              vm.customerLicenceNumberUsed = false;
            }
            else {
              //Customer with that licence found, therefor show error.
              vm.paymentButtonDisabled = true;
              vm.customerLicenceNumberUsed = true;
            }
          })
          .error(function (err) {
            console.log("error en el chequeo de la licencia de usuario.")
            console.log(err);
          });
      }
      else {
        vm.customerLicenceNumberUsed = false;
      }
    }

    vm.bookFormation = function (cardPayment) {
      // The payment have been made. Now make the book process.

      ///Update if paid or not
      $http.post($rootScope.urlBase + "/formation/bookFormation", {
        id: $routeParams.id,
        customerData: vm.customerData,
        paid: cardPayment
      })
        .success(function (data) {
          if (data.ok !== undefined) {
            if (vm.paymentMessages.length > 0) {
              vm.paymentMessages.splice(0, 1);
            }
            vm.paymentMessages.push({type: "success", info: "Book process complit."});
          }
          else {
            if (vm.paymentMessages.length > 0) {
              vm.paymentMessages.splice(0, 1);
            }
            vm.paymentMessages.push({type: "danger", info: data.err});
          }

          console.log(data);
        })
        .error(function (err) {

          if (vm.paymentMessages.length > 0) {
            vm.paymentMessages.splice(0, 1);
          }

          vm.paymentMessages.push({type: "danger", info: err});
          console.log(err);
        });

    }


    ////--------------------------------------------------------------------------------------
    vm.makePayment = function () {

      console.log("Show modal  ddd")

      ///Find formation center iformation

      //$scope.items = [];

      //size = "" | "lg" | "sm"
      vm.customerData.idformation = $routeParams.id;

      console.log("FORMATION ID", vm.customerData.idformation)
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrlWizard',
        size: "",
        resolve: {
          customerData: function () {
            return vm.customerData;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {

        if (typeof selectedItem != undefined) {
          var cardPayment = false
          vm.customerData.paid = false
          if (selectedItem.status == "OK") {

            ///Update pyment data result to Customer
            vm.customerData.paid = true
            vm.customerData.walleid = selectedItem.result.walleid
            vm.customerData.userid = selectedItem.result.userid
            vm.customerData.carid = selectedItem.result.carid

            vm.sucessfulPay = true;
            vm.showPaymentMessages({type: "success", info: "Book process complit."});
            cardPayment = true
          }
          else {
            vm.showPaymentMessages({type: "error", info: selectedItem.message});
            cardPayment = true
          }
          vm.currentStep = 4;
          ///Call with payment
          vm.bookFormation(cardPayment);
        }
      }, function () {
        //It is intencional
      });

    };

    ///--------------------------------------------------------------------------------
    vm.makePaymentv = function () {

      $http.get($rootScope.urlBase + "/Payment/makepayment/")
        .success(function (data, status, headers, config) {
          if (data.value === "ok") {
            vm.showPaymentMessages({type: "success", info: "Payment ok."});

            //The payment have been made. Now make the book process.
            $http.post($rootScope.urlBase + "/formation/bookFormation", {
              id: $routeParams.id,
              customerData: vm.customerData
            })
              .success(function (data) {
                if (data.ok !== undefined) {
                  vm.showPaymentMessages({type: "success", info: "Book process complit."});
                }
                else {
                  vm.showPaymentMessages({type: "danger", info: data.err});
                }
                console.log(data);
              })
              .error(function (err) {
                console.log(err);
              });
            vm.currentStep = 4;
          }
        })
        .error(function (error, status, headers, config) {
          vm.showPaymentMessages({
            type: "danger",
            info: "Sorry, something is wrong with the payment service."
          });
        });

    };

    vm.closeMessage = function (MessageIndex) {
      vm.validationMessages.splice(MessageIndex, 1);
    };

    vm.paymentMessagesClose = function (MessageIndex) {
      vm.paymentMessages.splice(MessageIndex, 1);
    };


//========================================================================================//
//==                            Date pickers configurations.                            ==//
//========================================================================================//
    vm.today = function () {
      vm.dt = new Date();
    };

    vm.today();

    vm.clear = function () {
      vm.dt = null;
    };

    vm.inlineOptions = {
      customClass: getDayClass,
      minDate: new Date(),
      showWeeks: true
    };

    vm.dateOptions = {
      dateDisabled: disabled,
      formatYear: 'yyyy',
      maxDate: new Date(2020, 5, 22),
      minDate: new Date(2012, 5, 20),
      startingDay: 1
    };


    //For date pickers options configuration.
    var actDate = new Date();
    $scope.initialBirthDateYear = 16

    // BirthDate options
    vm.BirthDateOptions = {
      dateDisabled: disabledBirthDateOptions,
      formatYear: 'yyyy',
      maxDate: new Date(actDate.getFullYear() - $scope.initialBirthDateYear, actDate.getMonth(), actDate.getDate()),
      minDate: new Date(actDate.getFullYear() - 80, 0, 1),
      initDate: new Date(actDate.getFullYear() - $scope.initialBirthDateYear, actDate.getMonth(), actDate.getDate()),
      startingDay: 1
    };

    // Date of Deliverance and Date of Procuration options
    vm.DeliDateOptions = {
      dateDisabled: disabled,
      formatYear: 'yyyy',
      maxDate: new Date().setDate(actDate.getDate() - 1),
      minDate: new Date(actDate.getFullYear() - 20, 0, 1),
      startingDay: 1
    };

    // Disable weekend selection
    function disabled(data) {
      var date = data.date,
        mode = data.mode;
      return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }

    function disabledBirthDateOptions(data) {
      return false;
    }


    vm.toggleMin = function () {
      vm.inlineOptions.minDate = vm.inlineOptions.minDate ? null : new Date();
      vm.dateOptions.minDate = vm.inlineOptions.minDate;
    };

    //vm.toggleMin();

    vm.openBirthDate = function () {
      vm.popupBirthDate.opened = true;
    };

    vm.openDeliDate = function () {
      vm.popupDeliDate.opened = true;
    };

    vm.openProcDate = function () {
      vm.popupProcDate.opened = true;
    };

    vm.setDate = function (year, month, day) {
      vm.dt = new Date(year, month, day);
    };

    vm.formats = ['dd/MM/yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    vm.format = vm.formats[0];
    vm.altInputFormats = ['M!/d!/yyyy'];

    vm.popupBirthDate = {
      opened: false
    };

    vm.popupDeliDate = {
      opened: false
    };

    vm.popupProcDate = {
      opened: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    vm.events = [
      {
        date: tomorrow,
        status: 'full'
      },
      {
        date: afterTomorrow,
        status: 'partially'
      }
    ];

    function getDayClass(data) {
      var date = data.date,
        mode = data.mode;
      if (mode === 'day') {
        var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

        for (var i = 0; i < vm.events.length; i++) {
          var currentDay = new Date(vm.events[i].date).setHours(0, 0, 0, 0);

          if (dayToCheck === currentDay) {
            return vm.events[i].status;
          }
        }
      }

      return '';
    }

    vm.gotoSearch = function () {

      ////Set paramater in $routeParams
      $location.path('/search/undefined');
    };

    ///Search customer

    $scope.searchCustomer = function () {

      $http.post($rootScope.urlBase + "/customer/searchByID", {
        id: $routeParams.id
      })
        .success(function (result) {
          if (result.status === "ok") {
            vm.customerData = result.data;
            $scope.formationId = vm.customerData.formation
            vm.customerData.birthDate = $scope.getReadableDate(vm.customerData.birthDate)
            $scope.birthDate = vm.customerData.birthDate
            vm.customerData.driverLicence.dateOfDeliverance = $scope.getReadableDate(vm.customerData.driverLicence.dateOfDeliverance)
            vm.customerData.driverLicence.dateOfProcuration = $scope.getReadableDate(vm.customerData.driverLicence.dateOfProcuration)
            $scope.searchFormation();


          } else {
            var objeData = {type: $translate.instant('ERROR')};
            $scope.showModalMessage($translate.instant('ERROR_SEARCHING_FORMATION') + ": " + result.info, objeData);
          }
        })
        .error(function (err) {
          var objeData = {type: $translate.instant('ERROR')};
          $scope.showModalMessage($translate.instant('ERROR_SEARCHING_FORMATION') + ": " + err, objeData);
        });
    };

    // $scope.searchCustomer()

    $scope.searchFormation = function () {

      $http.post($rootScope.urlBase + "/formation/searchByID", {
        id: $scope.formationId
      })
        .success(function (result) {
          if (result.status === "ok") {
            $scope.formation = result.data;
            $scope.selectedPlace = $scope.formation.place;
          }
          else {
            var objeData = {type: $translate.instant('ERROR')};
            $scope.showModalMessage($translate.instant('ERROR_SEARCHING_FORMATION') + ": " + result.info, objeData);
          }
        })
        .error(function (err) {
          var objeData = {type: $translate.instant('ERROR')};
          $scope.showModalMessage($translate.instant('ERROR_SEARCHING_FORMATION') + ": " + err, objeData);
        });
    };

    $scope.showModalMessage = function (messageshow, objectData) {

      $scope.items = objectData;
      $scope.items.message = messageshow

      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'myModalMessage.html',
        controller: 'ModalInstanceCtrl',
        size: "",
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {

      }, function () {

      });

    };

    $scope.weekDay = ["Sunday", "Monday", "Tuesday", "Wensday", "Thuesday", "Friday", "Saturday"]

    $scope.getReadableDate = function (dateParmt) {
      var value = new Date(dateParmt);
      return $scope.weekDay[value.getDay()] + ": " + value.getDate() + "/" + value.getMonth() + "/" + value.getFullYear();
    };

    $scope.creationAttestation = function () {
      var currentDate = new Date()
      var docDefinition = {
        content: [
          {
            columns: [
              {
                text: [
                  {text: $translate.instant('ATTESTATION_PAYMENT'), style: 'subheader'},
                  {text: $translate.instant('INCRIPTION_VALIDE'), style: 'subheader'},
                  {text: "", style: 'subheader'},
                  {text: $translate.instant('COMUNICATION_DEMANDE'), style: 'subheader'},
                  {text: "", style: 'subheaderText'},
                  {text: $translate.instant('MODE_PAYMENT'), style: 'subheader'},


                ]
              },
              {
                text: [
                  {
                    text: $translate.instant('ADDRESS') + ": " + $scope.formation.place.address,
                    style: 'subheader'
                  },
                  {text: " ", style: 'subheader'},
                  {text: $scope.getReadableDate(currentDate), style: 'subheader'},
                ]
              }
            ]
          },

          {
            style: 'tableExample',
            color: '#222',
            widths: ['auto'],
            table: {
              headerRows: 1,
              body: [
                [{
                  text: [
                    {text: $translate.instant('ADRESS_FORMATION') + ": " + $scope.formation.place.address}

                  ]
                },

                ],
                [{text: $translate.instant('MODELE_REGLEMENTAIRE') + ": "}],
                [{text: $translate.instant('PRECENSES')}],
              ],

            },
            layout: 'noBorders'
          },
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 10]
          },
          subheader: {
            fontSize: 12,
            bold: true,
            margin: [0, 10, 0, 5]
          },
          subheaderText: {
            fontSize: 11,
            bold: true,
            margin: [0, 20, 0, 5]
          },
          tableExample: {
            margin: [0, 5, 0, 15]
          },
          tableHeader: {
            bold: true,
            fontSize: 13,
            color: 'read'
          }
        },
        defaultStyle: {
          // alignment: 'justify'
        }
      };

      pdfMake.createPdf(docDefinition).open()

    }

    $scope.getReadableDate = function (dateParmt) {
      var value = new Date(dateParmt);
      return value.getDate() + "/" + value.getMonth() + "/" + value.getFullYear();
    };

    $scope.getReadableDateEx = function (dateParmt) {
      var value = new Date(dateParmt);
      return $scope.weekDay[value.getDay()] + " " + value.getDate() + "/" + value.getMonth() + "/" + value.getFullYear();
    };
    $scope.createConvocation = function () {

      var dateList = ""
      $scope.formation.dates.forEach(function (iDate, index) {
        if (index > 0)
          dateList += " " + $translate.instant('CONJUNCTION') + " "
        dateList += $scope.getReadableDateEx(iDate.date)
      })

      var docDefinition = {
        content: [
          {
            text: $translate.instant('CONVOCATION_TITLE'), style: 'header', alignment: "center"
          },
          {
            text: "", style: 'header', alignment: "center"
          },
          {
            columns: [
              {
                text: [
                  {text: $translate.instant('INSCRIPCION_CONFIRME'), style: 'subheader'},


                ]
              },
              {
                text: [
                  {
                    text: vm.customerData.name + " " + vm.customerData.firstName,
                    style: 'textData', alignment: "rigth"
                  },


                ]
              }
            ]
          },
          {
            columns: [
              {
                text: [

                  {text: $translate.instant('COMUNICATION_INFO'), style: 'textDataSimple'},


                ]
              },
              {
                text: [
                  {text: vm.customerData.address, style: 'textDataSimple', alignment: "rigth"}

                ]
              }
            ]
          },
          {
            text: vm.customerData.name + " " + vm.customerData.firstName + " " + $translate.instant('THANKS_ABOUT'),
            style: 'subheader',
            alignment: "left"
          },
          {
            text: $translate.instant('THANKS_ABOUT_LINE'), style: 'subheader', alignment: "left"
          },

          {
            text: "", style: 'subheader', alignment: "left"
          },

          {
            text: $translate.instant('PLACE_HORAIRE'), style: 'textData', alignment: "left"
          },

          {
            style: 'tableExample',
            color: '#222',
            widths: ['1000'],
            headerRows: 1,
            table: {

              body: [
                [{
                  text: [
                    {text: $translate.instant('ADRESS_FORMATION') + ": " + $scope.formation.place.address},

                  ]
                },

                ],
                [{
                  text: [{text: dateList}, {text: ""}, {
                    text: $translate.instant('PRECENSES'),
                    alignment: "center",
                    bold: true
                  }]
                }],
              ],

            },

          },
          {
            text: $translate.instant('RULER1'), style: 'textData', alignment: "left"
          },

          {
            style: 'tableExample',
            color: '#222',
            widths: ['2000'],
            headerRows: 1,
            table: {

              body: [
                [{ul: [{text: $translate.instant('RULER11')}, {text: $translate.instant('RULER12')}]}
                ],

              ],

            },

          },
          {
            text: $translate.instant('INFORMATION_IMPORTANT'), style: 'subheader', alignment: "left"
          },
          {
            ul: [
              {text: [{text: $translate.instant('INFORMATION_IMPORTANT1')}, {text: $translate.instant('INFORMATION_IMPORTANT11')}, {text: $translate.instant('INFORMATION_IMPORTANT111')}, {text: $translate.instant('INFORMATION_IMPORTANT12')}, {text: $translate.instant('INFORMATION_IMPORTANT13')}]},
              {text: [{text: $translate.instant('INFORMATION_IMPORTANT22')}, {text: $translate.instant('INFORMATION_IMPORTANT21')}, {text: $translate.instant('INFORMATION_IMPORTANT212')}, {text: $translate.instant('INFORMATION_IMPORTANT23')}, {text: $translate.instant('INFORMATION_IMPORTANT24')}]},
            ]
          }
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 10]
          },
          subheader: {
            fontSize: 12,
            bold: true,
            margin: [0, 5, 0, 5]
          },
          subheaderText: {
            fontSize: 11,
            bold: true,
            margin: [0, 20, 0, 5]
          },
          tableExample: {
            margin: [0, 5, 0, 15]
          },
          tableHeader: {
            bold: true,
            fontSize: 13,
            color: 'read'
          },
          textData: {
            bold: true,
            fontSize: 10,
            color: 'read'
          },
          textDataSimple: {
            bold: false,
            fontSize: 10,
            color: 'read'
          }
        },
        defaultStyle: {
          // alignment: 'justify'
        }
      };

      pdfMake.createPdf(docDefinition).open();
    };

    $scope.initializeData = function () {
      if (typeof $rootScope.pacientInfo !== "undefined") {
        console.log("Resultados " + JSON.stringify($rootScope.pacientInfo))
      }
    };

    $scope.initializeData();

  }
);
