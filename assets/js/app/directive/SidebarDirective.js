/**
 * Created by webind on 29/05/2017.
 */

myApp.directive('sidebar', function () {
//...
  var linker = function (scope, element, attrs) {
    // scope.$watch('sourceArray', function () {
    //   scope.data = parseDataForCharts(
    //     scope.sourceArray,
    //     attrs['sourceProp'],
    //     scope.referenceArray,
    //     attrs['referenceProp']
    //   );
    //   if(element.is(':visible')){
    //     $.plot(element, [ scope.data ], {
    //       series: {
    //         bars: {
    //           show: true,
    //           barWidth: 0.6,
    //           align: "center"
    //         }
    //       },
    //       xaxis: {
    //         mode: "categories",
    //         tickLength: 0
    //       }
    //     });
    //   }
    // });


    if (jQuery('#sidebar > ul').is(":visible") === true) {
      jQuery('#main-content').css({
        'margin-left': '0px'
      });
      jQuery('#sidebar').css({
        'margin-left': '-180px'
      });
      jQuery('#sidebar > ul').hide();
      jQuery("#container").addClass("sidebar-closed");
    } else {
      jQuery('#main-content').css({
        'margin-left': '180px'
      });
      jQuery('#sidebar > ul').show();
      jQuery('#sidebar').css({
        'margin-left': '0'
      });
      jQuery("#container").removeClass("sidebar-closed");
    }
  };
//...
});

