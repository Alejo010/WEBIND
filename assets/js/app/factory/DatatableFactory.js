/**
 * Created by Felipe Rodriguez Arias <ucifarias@gmail.com> on 26/11/2017.
 */

myApp.factory('dtable', function () {
  return {
    init: function () {
      $('.dtable').dataTable({
        bPaginate: true,
        bLengthChange: true,
        bFilter: true,
        bSort: true,
        bInfo: true,
        bAutoWidth: true
      });
    },
  };
});


