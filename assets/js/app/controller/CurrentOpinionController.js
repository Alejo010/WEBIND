/**
 * Created by webind on 10/05/2017.
 */

myApp.controller('CurrentOpinionController',
  ["$scope", "QueryServices", "$uibModal", "$rootScope", "$location", "$routeParams", "ToolsService",
    function ($scope, QueryServices, $uibModal, $rootScope, $location, ToolsService) {
      $scope.indexPage = {};
      $scope.indexPage.currentPage = 0;
      $scope.indexPage.maxSize = 5;
      $scope.indexPage.itemPerPage = 3;
      $scope.indexPage.totalItems = 0;
      $scope.datePicker = {};
      $scope.textopinion = "";
      $scope.ADMISIBLE_WORDS = 15;
      $scope.startInline = true;
      $scope.opinions = [];
      $scope.dinamysearch = true;
      $scope.sortType = "date";
      $rootScope.currentOpinions = "100";
      $scope.sizeByPage = $scope.indexPage.itemPerPage = 3;

      $scope.Lens = [3, 5, 10, 15, 20];
      $rootScope.i18nLoaded = false;
      $rootScope.$on('translateChangeSuccess', function () {
        $rootScope.i18nLoaded = true;
      });

      $scope.itemsPerPageChance = function () {
        // $scope.indexPage.currentPage = 0;
        // $scope.indexPage.itemPerPage
        $scope.searchOpinions();
        //$scope.countAllOpinionSearch();
      };

      $scope.search = {
        programtheme: ""
      };

      $scope.transformDate = function (date) {
        return moment.utc(date).format("DD-MM-YYYY HH:MM");
      };

      $scope.openOpinionData = function (iOpinion) {
        $scope.items = iOpinion.citizen;

        $scope.items.name = (typeof iOpinion.citizen.name !== "undefined" && iOpinion.citizen.name !== "" )
          ? (iOpinion.citizen.name ) : iOpinion.citizen.loginkey;

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
        }, function () {
          console.log('Modal dismissed at: ' + new Date());
        });
      };

      $scope.calculateDate = function (_date) {
        let currentDate = new Date();
        // var currentDateTimeStamp = currentDate.getTime();
        let opinionDate = Date.parse(_date);
        moment.locale('es');
        let now = moment(currentDate);
        let then = moment(opinionDate);
        return ("Hace " + moment.duration(now.diff(then)).humanize());
      };

      $scope.searchOpinions = function () {
        if (!$scope.simplesearch.$valid) {
          $scope.errorValid = true
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

        if (typeof  $scope.dateInit !== "undefined" || $scope.dateInit === "") {
          config.initialDate = $scope.dateInit;
        }

        if (typeof  $scope.dateEnd !== "undefined" || $scope.dateEnd === "") {
          config.finalDate = $scope.dateEnd;
        }

        if (typeof  $scope.programtheme !== "undefined") {
          config.theme = $scope.programtheme;
        }

        if (typeof  $scope.namelastname !== "undefined") {
          config.name = $scope.namelastname;
        }

        if (typeof  $scope.address !== "undefined") {
          config.address = $scope.address;
        }
        if (typeof  $scope.textopinion !== "undefined") {
          config.text = $scope.textopinion;
        }

        QueryServices.findAllOpinion(config, function (err, result) {
          //console.log("To Database " + JSON.stringify(config))
          if (err) {
          }
          else if (typeof result.data !== "undefined") {
            $scope.opinions = result.data.reverse();
            $scope.countAllOpinionSearch();
            return result;
          }
          else
            return [];
        })
      };

      $scope.searchOpinionsFast = function () {
        let pageData = 0;
        if ($scope.indexPage.currentPage > 0) {
          pageData = $scope.indexPage.currentPage - 1;
          pageData = String(pageData)
        }
        let config = {
          page: pageData,
          len: $scope.indexPage.itemPerPage
        };

        if (typeof  $scope.programtheme !== "undefined") {
          config.theme = $scope.programtheme;
        }

        QueryServices.findOpinionsFindLast(config, function (err, result) {
          if (err) {
            console.log("Error" + err.message);
          }
          else if (typeof result !== "undefined") {
            $scope.opinions = result.reverse();
            //$scope.countAllOpinionSearch();
            return result;
          }
          else
            return [];
        })
      };

      /**
       *  Show in modal opinion contact
       */
      $scope.animationsEnabled = true;

      $scope.getNameToShow = function (iopinion) {
        if (typeof iopinion.citizen.name === "undefined" && typeof iopinion.citizen.loginkey === "undefined") {
          return "Desconocido";
        }
        return ((typeof iopinion.citizen.name !== "undefined" && iopinion.citizen.name !== "" )
          ? (iopinion.citizen.name + " " + iopinion.citizen.lastname ) : iopinion.citizen.loginkey);
      };

      $scope.startTimer = function () {
        $scope.$broadcast('timer-start');
        $scope.timerRunning = true;
      };

      $scope.$on('timer-tick', function (event, args) {
        //console.log("TIMER TICK")
        $scope.timerConsole += $scope.timerType + ' - event.name = ' + event.name + ', timeoutId = ' + args.timeoutId + ', millis = ' + args.millis + '\n';
        $scope.countCurrentOpinions();
        if ($scope.dinamysearch)
          console.log("Search");
        $scope.searchOpinionsFast();
      });

      $scope.countCurrentOpinions = function () {
        //console.log("Contando cantidad de opiniones actuales")
        QueryServices.countAllOpinion(function (err, result) {

          if (typeof result !== "undefined") {
            // console.log("DATABASE RESPONSE " + JSON.stringify(result))
            $rootScope.currentOpinions = "" + result.data;
            // console.log("Obtenidos " + JSON.stringify(  $rootScope.currentOpinions))
            //return result.size;
          }
          else {
            $rootScope.currentOpinions = 0;
          }
          return "";
        })
      };

      $scope.countAllOpinionSearch = function () {
        let pageData = 0;
        if ($scope.indexPage.currentPage > 0) {
          pageData = $scope.indexPage.currentPage - 1;
          pageData = String(pageData)
        }
        let config = {
          page: pageData,
          len: $scope.indexPage.itemPerPage
        };

        if (typeof  $scope.dateInit !== "undefined" || $scope.dateInit === "") {
          config.initialDate = $scope.dateInit;
        }

        if (typeof  $scope.dateEnd !== "undefined" || $scope.dateEnd === "") {
          config.finalDate = $scope.dateEnd;
        }

        if (typeof  $scope.programtheme !== "undefined") {
          config.theme = $scope.programtheme;
        }

        if (typeof  $scope.namelastname !== "undefined") {
          config.name = $scope.namelastname;
        }

        if (typeof  $scope.address !== "undefined") {
          config.address = $scope.address;
        }

        if (typeof  $scope.textopinion !== "undefined") {
          config.text = $scope.textopinion;
        }
        $scope.indexPage.totalItems = 0;
        QueryServices.countAllOpinionSearch(config, function (err, result) {
          $scope.indexPage.totalItems = 0;
          if (typeof err === "undefined") {
            $scope.indexPage.totalItems = result.data;
            console.log("In Database " + JSON.stringify($scope.indexPage.totalItems))
          }
        })
      };


      $scope.searchOpinionsFast();
      $scope.countAllOpinionSearch();


      /**
       *  Hidden side bar
       */
      $rootScope.hiddeSideBar = function () {
        ToolsService.sideBarControl();
      };

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
    }
  ]
);
