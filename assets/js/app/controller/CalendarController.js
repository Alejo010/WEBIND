/**
 * Created by webind on 10/05/2017.
 */

myApp.controller('CalendarController',
  ["$scope", "QueryServices", "$uibModal", "$rootScope", "$location", "$routeParams", "ToolsService", 'calendarConfig', "ApiService", "API_ROUTE",
    function ($scope, QueryServices, $uibModal, $rootScope, $location, $routeParams, ToolsService, calendarConfig, ApiService, API_ROUTE) {

      let vm = this;
      // console.log("DATOS CONFING " + JSON.stringify(calendarConfig))

      //These variables MUST be set as a minimum for the calendar to work
      vm.calendarView = 'month';
      vm.viewDate = new Date();
      let actions = [];
      vm.events = [];
      
      vm.cellIsOpen = true;

      vm.addEvent = function () {
        vm.events.push({
          title: 'New event',
          startsAt: moment().startOf('day').toDate(),
          endsAt: moment().endOf('day').toDate(),
          color: calendarConfig.colorTypes.important,
          draggable: true,
          resizable: true
        });
      };

      vm.eventClicked = function (event) {
        alert.show('Clicked', event);
      };

      vm.eventEdited = function (event) {
        alert.show('Edited', event);
      };

      vm.eventDeleted = function (event) {
        alert.show('Deleted', event);
      };

      vm.eventTimesChanged = function (event) {
        alert.show('Dropped or resized', event);
      };

      vm.toggle = function ($event, field, event) {
        $event.preventDefault();
        $event.stopPropagation();
        event[field] = !event[field];
      };

      vm.timespanClicked = function (date, cell) {
        if (vm.calendarView === 'month') {
          if ((vm.cellIsOpen && moment(date).startOf('day').isSame(moment(vm.viewDate).startOf('day'))) || cell.events.length === 0 || !cell.inMonth) {
            vm.cellIsOpen = false;
          } else {
            vm.cellIsOpen = true;
            vm.viewDate = date;
          }
        } else if (vm.calendarView === 'year') {
          if ((vm.cellIsOpen && moment(date).startOf('month').isSame(moment(vm.viewDate).startOf('month'))) || cell.events.length === 0) {
            vm.cellIsOpen = false;
          } else {
            vm.cellIsOpen = true;
            vm.viewDate = date;
          }
        }
      };
      // Load all 
      paramsPlan = {
        id: document.getElementById("tempIdUser").innerHTML
      }
      console.log("ID ESP: " + document.getElementById("tempIdUser").innerHTML);
      ApiService.post(API_ROUTE.GET_ESP_NAME_BY_USER_ID, paramsPlan)
        .then(function (response) {
          var idEsp = response.data.id;
          paramPlanId = {
            idConsulta : idEsp 
          }
          ApiService.post(API_ROUTE.GET_ALL_PLANIFICACION, paramPlanId)
            .then(function (response) {
              for(x = 0; x < response.data.length; x++){
                var tempDate = new Date(response.data[x]['planificacion_fecha']);
                var nombre = response.data[x]['paciente'].nombre + ' ' + response.data[x]['paciente'].apellidos;
                var temp = {
                  title: 'Nombre: ' + nombre + ' / ' + 'HC: ' + response.data[x]['paciente'].hc,
                  color: calendarConfig.colorTypes.warning,
                  startsAt: tempDate,
                  endsAt: tempDate,
                  draggable: true,
                  resizable: true,
                  actions: actions
                }
                vm.events[x] = temp;
              }
            })
        })
    }
  ]
);
