/**
 * Created by webind on 10/05/2017.
 */

myApp.controller('MainController',
 /* ["$scope", "QueryServices", "$uibModal", "$rootScope", "$location", "$routeParams", "ToolsService", "spinnerService",
    function ($scope, QueryServices, $uibModal, $rootScope, $location, ToolsService, spinnerService) {
      $scope.indexPage = {};
      $scope.indexPage.currentPage = 0;
      $scope.indexPage.maxSize = 5;
      $scope.indexPage.itemPerPage = 3;
      $scope.indexPage.totalItems = 3;
      $scope.datePicker = {};
      $scope.textopinion = "";
      $scope.ADMISIBLE_WORDS = 15;
      $scope.advanceSearch = true;
      $scope.searchconfing = {};

      $scope.sortType = "date";
      $rootScope.currentOpinions = "0";
      $scope.sizeByPage = $scope.indexPage.itemPerPage = 3;
      moment.locale('es');
      $scope.ngDatePattern = /^\d{4}\-\d{2}\-\d{2}\s{1}\d{2}:\d{2}$/;
      $scope.Lens = [3, 5, 10, 15, 20];

      $scope.itemsPerPageChance = function () {
        // $scope.indexPage.currentPage = 0;
        $scope.searchOpinions();
        $scope.countAllOpinionSearch();

      };

      $scope.search = {
        programtheme: ""
      };

      ///Advaced search
      $scope.isCollapsed = true;
      $scope.isCollapsedHorizontal = true;
      ///Advaced text search

      ////Tema del programa, nombre y apellidos, fecha con rango, texto de la opinion

      $scope.availableSearchParams = [
        {key: "name", name: "Nombre", placeholder: "Nombre..."},
        {key: "city", name: "Direccion", placeholder: "Dirección..."},
        {key: "phone", name: "Telefono", placeholder: "Teléfono...", allowMultiple: true},
        {key: "emailAddress", name: "E-Mail", placeholder: "E-Mail...", allowMultiple: true}
      ];

      $rootScope.i18nLoaded = false;

      //-----
      $scope.pacients = [{
        fecha_prox_consulta: "2017-10-11 07:45 AM",
        persona: {name: "Jose González Pérez"},
        hc: "465687",
        area_salud: {
          municipio: "Mella",
          name: "El paraiso"
        },
        datos_paciente: {},
        last_query: {}
      },
        {
          fecha_prox_consulta: "2017-10-11 07:45 AM",
          persona: {name: "Maria Napoles Pérez"},
          hc: "465656",
          area_salud: {
            municipio: "San Luis",
            name: "24 de febrero"
          },
          datos_paciente: {},
          last_query: {}
        }
        ,
        {
          fecha_prox_consulta: "2017-10-11 09:45 AM",
          persona: {name: "Marcos  Lopez Pérez"},
          hc: "465656",
          area_salud: {
            municipio: "Santiago de Cuba",
            name: "Armando García"
          },
          datos_paciente: {},
          last_query: {}
        },
        {
          fecha_prox_consulta: "2017-10-11 09:45 AM",
          persona: {name: "Maria  Ramos Castellanos"},
          hc: "465656",
          area_salud: {
            municipio: "Santiago de Cuba",
            name: "Armando García"
          },
          datos_paciente: {},
          last_query: {}
        },
        {
          fecha_prox_consulta: "2017-10-11 10:45 AM",
          persona: {name: "Marta  Lopez Suarez"},
          hc: "465656",
          area_salud: {
            municipio: "Santiago de Cuba",
            name: "Armando García"
          },
          datos_paciente: {},
          last_query: {}
        }
      ];

      //console.log("Inicializar Pacientes");
      $scope.open1 = function () {
        $scope.popup1.opened = true;
      };
      $scope.popup1 = {
        opened: false
      };
      $scope.popup2 = {
        opened: false
      };
      $scope.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
      };
      $scope.dateOptions = {
        dateDisabled: disabled,
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
      };

      $scope.dateOptionsSearch = {
        dateDisabled: disabled,
        formatYear: 'yyyy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
      };

      // Disable weekend selection
      function disabled(data) {
        let date = data.date, mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
      }

      $scope.today = function () {
        $scope.search.initialDate = new Date();
      };

      $scope.today();
      //gloal configurations
      $scope.open1 = function () {
        $scope.popup1.opened = true;
      };

      $scope.open2 = function () {
        $scope.popup2.opened = true;
      };

      $scope.setDate = function (year, month, day) {
        $scope.dt = new Date(year, month, day);
      };

      $scope.formats = ['dd/MM/yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy'];
      $scope.format = $scope.formats[0];
      $scope.ngDatePattern = /^\d{2}\/\d{2}\/\d{4}$/;
      $scope.toggleMin = function () {
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
      };

      $scope.toggleMin();

      let tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      $scope.tomorrow = function () {
        $scope.search.endDate = tomorrow;
      };

      $scope.tomorrow();
      let afterTomorrow = new Date();
      afterTomorrow.setDate(tomorrow.getDate() + 1);
      $scope.events = [
        {
          date: tomorrow,
          status: 'full'
        },
        {
          date: afterTomorrow,
          status: 'partially'
        }
      ];
      $scope.selectedRow = null;
      $scope.mouseoverPoint = function (formationid) {
        $scope.selectedRow = formationid;
        $scope.hover = true
      };

      $scope.mouseoffsidePoint = function () {
        $scope.selectedRow = null;
        $scope.hover = false
      };

      function getDayClass(data) {
        let date = data.date,
          mode = data.mode;
        if (mode === 'day') {
          let dayToCheck = new Date(date).setHours(0, 0, 0, 0);
          for (let i = 0; i < $scope.events.length; i++) {
            let currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);
            if (dayToCheck === currentDay) {
              return $scope.events[i].status;
            }
          }
        }
        return '';
      }

      $rootScope.$on('translateChangeSuccess', function () {
        $rootScope.i18nLoaded = true;

      });

      $scope.label = "Parámetros...";

      ///Advaced date search
      $scope.datePicker.date = {startDate: null, endDate: null};

      $scope.alerts = [];

      /!**
       *  Hidden side bar
       *!/
      $rootScope.hiddeSideBar = function () {
        ToolsService.sideBarControl();
      };

      $scope.opiniones = [];

      ///All EnLineaContigo programs themes.
      $scope.themes = [];
      ///---------

      $scope.initilizeQuery = function () {
        let pageData = 0;
        if ($scope.indexPage.currentPage > 0) {
          pageData = $scope.indexPage.currentPage - 1;
          pageData = String(pageData)
        }
        return {
          page: pageData,
          len: $scope.indexPage.itemPerPage
        };
      };
      /!*
       Search all opinion  with web services call
       *!/
      $scope.findAllOpinion = function () {
        QueryServices.findAllOpinion($scope.initilizeQuery(), function (result) {
          // console.log("Obtener opiniones " + JSON.stringify(result))
          if (typeof result !== "undefined") {
            $scope.opinions = result.data;
            return result;
          }
          return [];
        })
      };

      /!*
       Search all themes  with web services call
       *!/
      $scope.findAllThemes = function () {
        QueryServices.findAllThemes(function (err, result) {
          if (typeof result !== "undefined") {
            $scope.themes = result.data;
          }
          return [];
        })
      };

      /!*
       Count all opinions with web services call
       *!/
      $scope.getNameToShow = function (iopinion) {
        if (typeof iopinion.citizen.name === "undefined" && typeof iopinion.citizen.loginkey === "undefined") {
          return "Desconocido"
        }
        else
          return ((typeof iopinion.citizen.name !== "undefined" && iopinion.citizen.name !== "" ) ? (iopinion.citizen.name + " " + iopinion.citizen.lastname ) : iopinion.citizen.loginkey);
      };

      $scope.countCurrentOpinions = function () {
        //console.log("Contando cantidad de opiniones actuales")
        QueryServices.countAllOpinion(function (err, result) {

          if (typeof result !== "undefined") {
            // console.log("DATABASE RESPONSE " + JSON.stringify(result))
            $rootScope.currentOpinions = "" + result.data;
            // console.log("Obtenidos " + JSON.stringify(  $rootScope.currentOpinions))
            //return result.size;
          }
          else
            $rootScope.currentOpinions = 0;

          return "";
        })
      };

      $scope.countAllOpinionSearch = function (callback) {
        let pageData = 0;
        if ($scope.indexPage.currentPage > 0) {
          pageData = $scope.indexPage.currentPage - 1;
          pageData = String(pageData)
        }
        let config = {
          page: pageData,
          len: $scope.indexPage.itemPerPage
        };

        if (typeof    $scope.searchconfing.dateInit !== "undefined" || $scope.searchconfing.dateInit === "") {
          config.initialDate = $scope.searchconfing.dateInit;
        }

        if (typeof    $scope.searchconfing.dateEnd !== "undefined" || $scope.searchconfing.dateEnd === "") {
          config.finalDate = $scope.searchconfing.dateEnd;
        }

        if (typeof    $scope.searchconfing.programtheme !== "undefined") {
          config.theme = $scope.searchconfing.programtheme;
        }

        if (typeof    $scope.searchconfing.namelastname !== "undefined") {
          config.name = $scope.searchconfing.namelastname;
        }

        if (typeof    $scope.searchconfing.address !== "undefined") {
          config.address = $scope.searchconfing.address;
        }

        if (typeof    $scope.searchconfing.textopinion !== "undefined") {
          config.text = $scope.searchconfing.textopinion;
        }

        if (typeof   $scope.searchconfing.user !== "undefined") {
          if ($scope.searchconfing.user.sms && $scope.searchconfing.user.sms === true) {
            config.sms = "true"
          }

          if ($scope.searchconfing.user.wifi && $scope.searchconfing.user.wifi === true) {
            config.wifi = "true"
          }

          if ($scope.searchconfing.user.mail && $scope.searchconfing.user.mail === true) {
            config.mail = "true"
          }
        }
        $scope.indexPage.totalItems = 0;
        QueryServices.countAllOpinionSearch(config, function (err, result) {
          $scope.indexPage.totalItems = 0;
          if (typeof err === "undefined") {
            $scope.indexPage.totalItems = result.data;
            console.log("In Database " + JSON.stringify($scope.indexPage.totalItems))
          }
          if (typeof callback !== "undefined")
            callback();
        })
      };

      $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
      };

      $scope.timerRunning = true;
      $scope.startTimer = function () {
        $scope.$broadcast('timer-start');
        $scope.timerRunning = true;
      };


///---------  Search opinion ----------------------
      $scope.status = {isCustomHeaderOpen: false};

      $scope.transformDate = function (date) {
        console.log("La fecha" + date);
        return moment.utc(date).format("DD-MM-YYYY HH:MM:SS");
      };

      /!**calculateDate
       *      Compute a review date if _date is minus a hour give answer in minutes ex. 2 minutes ago
       *      If _date it's minus that a day (24 hours) give answer in hour but mayor than one hour ex. 2 hours ago
       *      If  date it's more than a 24 hours and minus a mounth give answer in days. ex 2 days.
       *      If date it's more than a mounth but minus a year give answer in mounths. ex 3 mounths.
       *      etc.
       *
       * @param _date
       *!/
      $scope.calculateDate = function (_date) {
        //console.log("La fecha verified BD date " + _date)
        _date = _date.substring(0, _date.length - 1);
        console.log("New date " + _date);
        let currentDate = new Date();
        // let currentDateTimeStamp = currentDate.getTime();
        let now = moment.utc(currentDate);
        console.log("La fecha verified " + now.format());
        let then = moment(_date);
        return ("Hace " + moment.duration(now.diff(then)).humanize());
      };

      $scope.cleanForm = function () {
        $scope.programtheme = null;
        $scope.namelastname = null;
        $scope.address = null;
        $scope.textopinion = null;
        $scope.dateInit = $scope.dateEnd = "";
        $scope.user = {};
      };

      /!**
       *  Function asociated to search button
       *!/
      $scope.findInformation = function () {
        console.log("Fechas " + $scope.programtheme);
        console.log("Fechas " + $scope.namelastname);
        console.log("Fechas " + $scope.address);
        console.log("Fechas " + $scope.textopinion);
        console.log("Fechas" + JSON.stringify($scope.user));
        console.log("Fechas " + $scope.dateInit + " " + $scope.dateEnd);
        $scope.searchconfing.textopinion = $scope.textopinion;
        $scope.searchconfing.programtheme = $scope.programtheme;
        $scope.searchconfing.namelastname = $scope.namelastname;
        $scope.searchconfing.address = $scope.address;
        $scope.searchconfing.user = $scope.user;
        $scope.searchconfing.dateInit = $scope.dateInit;
        $scope.searchconfing.dateEnd = $scope.dateEnd;
        $scope.countAllOpinionSearch(function () {
          $scope.searchOpinions();
        });
      };

      $scope.searchOpinions = function () {
        if ($scope.searchconfing.dateInit !== "" && typeof   $scope.searchconfing.dateInit !== "undefined" && $scope.searchconfing.dateEnd !== "" && typeof  $scope.searchconfing.dateEnd !== "undefined") {
          const timestampInit = new Date($scope.searchconfing.dateInit).getTime();
          const timestampEnd = new Date($scope.searchconfing.dateEnd).getTime();
          if (timestampEnd < timestampInit) {
            $scope.errorValid = true;

            let message = "Lo siento, La fecha final no es correcta.";
            $scope.alerts.push({
              type: 'danger',
              msg: message
            });
            return;
          }
        }

        // console.log("Fechas " +   $scope.searchconfing.programtheme);
        // console.log("Fechas " +   $scope.searchconfing.namelastname);
        // console.log("Fechas " +    $scope.searchconfing.address);
        // console.log("Fechas " +   $scope.searchconfing.textopinion);
        // console.log("Fechas" + JSON.stringify(  $scope.searchconfing.user))

        if (!$scope.simplesearch.$valid) {
          $scope.errorValid = true;
          const message = "Lo siento, algunos campos de la búsqueda avanzada son inválidos.";
          $scope.alerts.push({
            type: 'danger',
            msg: message
          });
          return;
        }

        let pageData = 0;
        if ($scope.indexPage.currentPage > 0) {
          pageData = $scope.indexPage.currentPage - 1;
          pageData = String(pageData)
        }
        let config = {
          page: pageData,
          len: $scope.indexPage.itemPerPage
        };

        if (typeof $scope.searchconfing.dateInit !== "undefined" || $scope.searchconfing.dateInit === "") {
          config.initialDate = $scope.searchconfing.dateInit;
        }

        if (typeof $scope.searchconfing.dateEnd !== "undefined" || $scope.searchconfing.dateEnd === "") {
          config.finalDate = $scope.searchconfing.dateEnd;
        }

        if (typeof $scope.searchconfing.programtheme !== "undefined") {
          config.theme = $scope.searchconfing.programtheme;
        }

        if (typeof $scope.searchconfing.namelastname !== "undefined") {
          config.name = $scope.searchconfing.namelastname;
        }

        if (typeof $scope.searchconfing.address !== "undefined") {
          config.address = $scope.searchconfing.address;
        }

        if (typeof $scope.searchconfing.textopinion !== "undefined") {
          config.text = $scope.searchconfing.textopinion;
        }

        if (typeof $scope.searchconfing.user !== "undefined") {
          if ($scope.searchconfing.user.sms && $scope.searchconfing.user.sms === true) {
            config.sms = "true"
          }

          if ($scope.searchconfing.user.wifi && $scope.searchconfing.user.wifi === true) {
            config.wifi = "true"
          }

          if ($scope.searchconfing.user.mail && $scope.searchconfing.user.mail === true) {
            config.mail = "true"
          }
        }

        QueryServices.findAllQuery(config, function (err, result) {
          if (err) {
            $scope.errorValid = true;
            const message = "Lo siento, ha ocurrido un error. " + err.message;
            $scope.alerts.push({
              type: 'danger',
              msg: message
            });
          }
          else if (typeof result.data !== "undefined") {
            $scope.opinions = result.data.reverse();
            // console.log("----  Datos ----");
            // console.log(JSON.stringify($scope.opinions))
            // console.log("--------");
            console.log("" + $scope.opinions.length);
            if (typeof $scope.opinions === "undefined" || $scope.opinions.length === 0) {
              $scope.errorValid = true;
              const message = "Lo siento, no se han obtenido resultados en la búsqueda.";
              $scope.alerts.push({
                type: 'danger',
                msg: message
              });
            }
            else {
              $scope.simplesearch.$setUntouched();
              $scope.simplesearch.$setPristine();
              $scope.cleanForm();
              return result;
            }
          }
          else
            return [];
        })
      };

      /!**
       *  Show in modal opinion contact
       *!/
      $scope.animationsEnabled = true;

      $scope.seeMore = function (iOpinion) {
        $scope.items = iOpinion;
        let intCounter = 0;

        iOpinion.imagesource.forEach(function (iTems) {
          iTems.id = intCounter++;
          iTems.text = iTems.title;
        });

        $scope.items.slides = iOpinion.imagesource;
        let modalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'myModalContenOpinion.html',
          controller: 'ModalInstanceCtrl',
          size: "",
          resolve: {
            items: function () {
              return $scope.items;
            }
          }
        });

        modalInstance.result.then(function (selectedItem) {
          $scope.selected = selectedItem;
        }, function () {
        });
      };

      $scope.openOpinionData = function (iOpinion) {
        $scope.items = iOpinion.citizen;

        if (iOpinion.citizen === "undefined") { ///Show modal warning citizen undefined
        }
        else {
          $scope.items.name = (typeof iOpinion.citizen.name !== "undefined" && iOpinion.citizen.name !== "" )
            ? (iOpinion.citizen.name  ) : iOpinion.citizen.loginkey;

          let modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: "",
            resolve: {
              items: function () {
                return $scope.items;
              }
            }
          });

          modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
            console.log("Action " + $scope.selected)
          }, function () {
            console.log('Modal dismissed at: ' + new Date());
          });
        }
      };

      $scope.showPacientDataQuery = function () {
        //  console.log("Datos de la Consulta");
        $location.path('/royalmedicalquery');
        // $scope.items =  {type: "Alert"};
        // $scope.items.message = "wwew ereer fffdd";
        // let modalInstance = $uibModal.open({
        //   animation: $scope.animationsEnabled,
        //   templateUrl: 'formationwizard/wizardpaginationDateBook.ejs',
        //   controller: 'ModalInstanceMessage',
        //   size: "",
        //   resolve: {
        //     items: function () {
        //       return $scope.items;
        //     }
        //   }
        // });
        // modalInstance.result.then(function (selectedItem) {
        //
        // }, function () {
        //
        // });

      };

///----- Panel Work --------------------
      $scope.status = {
        isCustomHeaderOpen: false,
        isFirstOpen: true,
        isFirstDisabled: false
      };
    }
  ]*/
);
