/**
 * Created by Francisco Javier Deler O´Farril on 19/10/2018.
 */

myApp.controller("AuthController",
  function ($scope, $location, $timeout, ApiService, API_ROUTE) {
    //alert("ID");
    $scope.data = {
        regUsername : '',
        regPassword : '',
        usernameAvailable : false,
        loginUsername : '',
        loginPassword : ''
    };
    
    /* usernamme check variables starts*/
    let TypeTimer ;
    const TypingInterval = 800;
    /* usernamme check variables ends*/

    $scope.initiateCheckUserName = () => {
        $scope.data.usernameAvailable = false;
        $timeout.cancel(TypeTimer);
        TypeTimer = $timeout( () => {
            let username = $scope.data.regUsername;
            ApiService.post(API_ROUTE.USER_NAME_CHECK, {username})
            .then((response) => {
                $scope.$apply( () =>{
                    $scope.data.usernameAvailable = response.error ? true : false;
                });
            })
            .catch((error) => {
                $scope.$apply(() => {
                    $scope.data.usernameAvailable = true;
                });
               
            });
        }, TypingInterval);
    }

    $scope.clearCheckUserName = () => {
        $timeout.cancel(TypeTimer);
    }

    $scope.loginUser = () => {
        params = {
            username: $scope.data.loginUsername,
            password: $scope.data.loginPassword
        }
        ApiService.post(API_ROUTE.USER_LOGIN, params)
        .then(function (response) {
            //alert("ID" +JSON.stringify(response.data[0].id));
            if(response.data[0].id !== null && response.data[0].id !== ''){
                $location.path(`/backend/home/${response.data[0].id}`);
                //$scope.$apply();
            } else {
                // user not exist
                $location.path(`/backend/chat`);
            }
          });
        
    }
  }
)