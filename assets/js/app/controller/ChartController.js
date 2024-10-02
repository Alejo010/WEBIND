/**
 * Created by webind on 10/05/2017.
 */
myApp.controller('ChartController',
  ['$scope', '$rootScope', 'ChartOpinionServices', 'ToolsService', "QueryServices",
    function ($scope, $rootScope, ChartOpinionServices, ToolsService, QueryServices) {
      //yyyy-MM-dd HH:MM

      $scope.ngDatePattern = /^\d{4}\-\d{2}\-\d{2}$/;
      $rootScope.i18nLoaded = false;
      $rootScope.$on('translateChangeSuccess', function () {
        $rootScope.i18nLoaded = true;
      });

      ///All EnLineaContigo programs themes.
      $scope.themes = [];

      /*
       Search all themes  with web services call
       */
      $scope.findAllThemes = function () {
        QueryServices.findAllThemes(function (err, result) {
          if (typeof result !== "undefined") {
            $scope.themes = result.data;
          }
          return [];
        })
      };
      //http://jtblin.github.io/angular-chart.js/
      /*
       chart-data: series data
       chart-labels: x axis labels
       chart-options (default: {}): Chart.js options
       chart-series (default: []): series labels
       chart-click (optional): onclick event handler
       chart-hover (optional): onmousemove event handler
       chart-colors (default to global colors): colors for the chart
       chart-dataset-override (optional): override datasets individually
       */

      /**
       *  Hidden side bar
       */
      $rootScope.hiddeSideBar = function () {
        ToolsService.sideBarControl();
      };

      $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
      //$scope.series = ['Series A', 'Series B'];
      $scope.series = ['Sms', 'Wifi', 'Email'];
      $scope.data = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
      ];
      $scope.onClick = function (points, evt) {
        console.log(points, evt);
      };
      $scope.datasetOverride = [{yAxisID: 'y-axis-1'}, {yAxisID: 'y-axis-2'}];
      $scope.options = {
        scales: {
          yAxes: [
            {
              id: 'y-axis-1',
              type: 'linear',
              display: true,
              position: 'left'
            },
            {
              id: 'y-axis-2',
              type: 'linear',
              display: true,
              position: 'right'
            }
          ]
        }
      };

      ////-----------------------------------------------------------
      $scope.labels1 = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
      $scope.series1 = ['Sms', 'Wifi', 'Email'];

      $scope.data1 = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
      ];

      ///----------------------------------------------------------------
      $scope.labels2 = [];
      $scope.data2 = [];
      //------------------------------------------------------------------

      $scope.dateInit = "";
      $scope.sizeOpinions = 0;
      $scope.programtheme = "";

      $scope.findByDays = function () {
        let config = {
          text: $scope.programtheme,
          len: 10
        };
        if (typeof config.text === undefined || config.text === "") {
          config.text = ""
        }

        ///Optional give de current date
        if ($scope.dateInit === "")
          config.date = new Date();
        else
          config.date = $scope.dateInit;
        console.log("Parametros" + JSON.stringify(config));

        ChartOpinionServices.findOpinionsByDays(config, function (err, result) {
          console.log("To Database ---" + JSON.stringify(result));

          $scope.series1 = ['Sms', 'Wifi', 'Email'];
          $scope.serie = $scope.series1;

          ///Set for wiew result
          let arrayTest = [
            {"date": "29-05-2017", "data": {"review": {"wifiSize": 30, "smsSize": 50, "mailSize": 70}}},
            {"date": "28-05-2017", "data": {"review": {"wifiSize": 56, "smsSize": 45, "mailSize": 12}}},
            {"date": "27-05-2017", "data": {"review": {"wifiSize": 65, "smsSize": 55, "mailSize": 89}}},
            {"date": "26-05-2017", "data": {"review": {"wifiSize": 40, "smsSize": 33, "mailSize": 30}}},
            {"date": "25-05-2017", "data": {"review": {"wifiSize": 44, "smsSize": 45, "mailSize": 40}}},
            {"date": "24-05-2017", "data": {"review": {"wifiSize": 67, "smsSize": 90, "mailSize": 55}}},
            {"date": "23-05-2017", "data": {"review": {"wifiSize": 45, "smsSize": 34, "mailSize": 5}}}];
          arrayTest = result;
          let icounter = 0;
          let smsArray = [];
          let mailArray = [];
          let wifiArray = [];
          arrayTest.forEach(function (items) {
            $scope.labels1[icounter++] = items.date;
            smsArray.push(items.data.review.smsSize);
            mailArray.push(items.data.review.mailSize);
            wifiArray.push(items.data.review.wifiSize);
          });

          $scope.data = $scope.data1 = [smsArray, mailArray, wifiArray];
          $scope.labels = $scope.labels1;
          /*
           chart-data="data1" chart-labels="labels1"> chart-series="series1"

           $scope.labels1 = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
           $scope.series1 = ['Series A', 'Series B'];

           $scope.data1 = [
           [65, 59, 80, 81, 56, 55, 40],
           [28, 48, 40, 19, 86, 27, 90]
           ];

           chart-data="data"
           chart-labels="labels" chart-series="series"

           $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
           $scope.series = ['Series A', 'Series B'];
           $scope.data = [
           [65, 59, 80, 81, 56, 55, 40],
           [28, 48, 40, 19, 86, 27, 90]
           ];

           */
          if (err)
            console.log("Show Modal Error " + JSON.stringify(err));
          else if (typeof result.data !== "undefined")
            return result; // $scope.opinions = result.data;
          return [];
        })
      };

      $scope.findByType = function () {
        let config = {
          text: $scope.programtheme,
          len: 10
        };

        if (typeof config.text === undefined || config.text === "") {
          config.text = "";
        }

        ChartOpinionServices.findByType(config, function (err, result) {
          console.log("To Database " + JSON.stringify(result.data));
          if (err) {
            console.log("Show Modal Error ");
          }
          else if (typeof result.data !== "undefined") {
            // $scope.opinions = result.data;
            $scope.labels2[0] = "sms";
            $scope.labels2[1] = "wifi";
            $scope.labels2[2] = "mail";

            // $scope.labels2 = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];

            $scope.data2[0] = result.data.smsSize;
            $scope.data2[1] = result.data.wifiSize;
            $scope.data2[2] = result.data.mailSize;

            $scope.sizeOpinions = result.data.smsSize + result.data.wifiSize + result.data.mailSize;

            //{"wifiSize":28,"smsSize":25,"mailSize":0}
            return result;
          }
          else
            return [];
        })
      };

      $scope.findData = function () {
        $scope.findByType();
        $scope.findByDays();
      };

      $scope.findByType();
      $scope.findByDays();
      $scope.findAllThemes();
    }
  ]
);
