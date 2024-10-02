/**
 * Created by webind on 12/05/2017.
 */

myApp.service('ToolsService',
  function ($rootScope, $http, $uibModal) {
    this.sidebarUl = jQuery('#sidebar > ul');

    this.sideBarControl = function () {
      if (sidebarUl.is(":visible") === true) {
        jQuery('#main-content').css({
          'margin-left': '0px'
        });
        jQuery('#sidebar').css({
          'margin-left': '-180px'
        });
        sidebarUl.hide();
        jQuery("#container").addClass("sidebar-closed");
      } else {
        jQuery('#main-content').css({
          'margin-left': '180px'
        });
        jsidebarUl.show();
        jQuery('#sidebar').css({
          'margin-left': '0'
        });
        jQuery("#container").removeClass("sidebar-closed");
      }
    };

    this.transformDate = function (date) {
      return (moment(_date).format("DD-MM-YY HH:MM"));
    };

    this.seeMore = function (iOpinion) {
      $scope.items = iOpinion;
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
);
