/**
 * Created by webind on 10/05/2017.
 */
myApp.controller('HeaderController',
  ["$scope", "QueryServices", "$uibModal", "$rootScope", "$location", "$routeParams", "ToolsService", 'ChartOpinionServices', 'spinnerService', "ApiService", "API_ROUTE", "$http",
    function ($scope, QueryServices, $uibModal, $rootScope, $location, $routeParams, ToolsService, ChartOpinionServices,
              spinnerService, ApiService, API_ROUTE, $http) {

      // Init counter to check incomplete remision
      var userMedicoIsLogueded = false;
      var idMyEsp = '';

      var x = setInterval(function() {
        if(userMedicoIsLogueded === true) {
          // get remission incomplete by id especialidad
          paramsRR = {
            id : idMyEsp
          }
          ApiService.post(API_ROUTE.GET_INCOMPLETE_REMISSION_COUNT, paramsRR)
          .then(function (response) {
            if(response.data > 0) {
              document.getElementById("incompleteRemission").innerHTML = response.data;
              document.getElementById("incompleteRemission").style.display = 'block';
            }
          });
        }
      }, 10000);

      //  Enabled logout when don't have any activity
      var idleTime = 0;
      $(document).ready(function() {
          //Increment the idle time counter every minute.
          var idleInterval = setInterval(timerIncrement, 60000); // 60000 = 1 minute

          //Zero the idle timer on mouse movement.
          $(this).mousemove(function (e) {
            idleTime = 0;
          });
          $(this).keypress(function (e) {
            idleTime = 0;
          });
      });

      function timerIncrement() {
        if(userMedicoIsLogueded === true) {
          idleTime = idleTime + 1;
          if (idleTime > 60 ) { // 60 minutes
            // Le paso el id del usuario logueado
            //var UserId;
            idleTime = 0;
            paramsG = {}
            ApiService.post(API_ROUTE.GET_SESSION, paramsG)
              .then(function (response) {
                // console.log("Parse" + response.data);
                var UserId = response.data; //
                if(response.data === 'not yet set'){
                  UserId = document.getElementById("tempIdUser").innerHTML;
                }
                params = {
                  id: UserId
                }
                ApiService.post(API_ROUTE.LOGOUT, params)
                  .then(function (response) {
                    if (response.data[0].id !== null && response.data[0].id !== '') {
                    // $scope.socket.emit('logout', UserId);
                      $scope.userAuthenticated = true;
                      $scope.userShowAuthenticated = false;
                      document.getElementById("tempIdUser").innerHTML = '';
                      resDataSend = {
                        roomName: 'chatHospital',
                        userLogoutId : response.data[0].id
                      }
                      io.socket.post('/leaveChat', resDataSend, function (resData, jwres) {
                        //console.log("SocketID: " + resData.WebSocketId);
                      });
                      $scope.data.selectedFriendId = "";
                      $location.path('/');
                      userMedicoIsLogueded = false;
                      idMyEsp = '';
                    }
                  });
              });
          }
        }
      } //  End enabled logout when don't have any activity

      // Save here userId incomming message
      var myMessagesPending = new Array();

      $scope.openModal = function (size) {
        var modalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'myModalChatContent.html',
          controller: 'ModalChatInstanceController',
          size: size,
          resolve: {
            scopeData: function () {
              return $scope.data;
            },
            myMessagesPending:function(){
              return myMessagesPending;
            }
          }
        });

        modalInstance.result.then(function ($scope) {
          //$scope.selected = selectedItem;
          $scope = $scope;
        }, function () {
          //console.log('Modal dismissed at: ' + new Date());
          document.getElementById("activeModal").innerHTML = 'N';
        });

        // clean array
        myMessagesPending = new Array();
        // clean incommingMessage Notify' component
        document.getElementById("incommingMessage").style.display = 'none';
      };

      $scope.userAuthenticated = true;
      $scope.userShowAuthenticated = false;
      $scope.alertShow = false;
      // Roles
      $scope.userAdministrador = true;
      $scope.userDirectivo = true;
      $scope.userMedicoPasiva = true;
      $scope.userMedicoCentral = true;

      $rootScope.currentOpinions = "0";
      $rootScope.titlesite = "";
      $scope.smsSize = "0";
      $scope.wifiSize = "0";
      $scope.mailSize = "0";
      $scope.Lens = [3, 5, 10, 15, 20];

      //----------------------------------------------------------------------------
      $scope.loginUser = () => {
        $scope.alertShow = false;
        params = {
          username: $scope.data.loginUsername,
          password: $scope.data.loginPassword
        }
        $scope.data.loginUsername = "";
        $scope.data.loginPassword = "";

        ApiService.post(API_ROUTE.USER_LOGIN, params)
          .then(function (response) {
            if (response.data === null) {
              document.getElementById("messageAlert").innerHTML = "Este usuario no existe...";
              $scope.alertShow = true;
            }
            else if (response.data.id === 'Logueado') {
              // Usuario ya está logueado
              document.getElementById("messageAlert").innerHTML = "Este usuario ya está logueado...";
              $scope.alertShow = true;
            } else if (response.data[0].id !== null && response.data[0].id !== '') {
              //Save session
              paramsS = {
                id: response.data[0].id,
              }
              ApiService.post(API_ROUTE.SET_SESSION, paramsS)
                .then(function (response) {

                });

              var stringTemp = response.data[0].username + '(' + response.data[0]['rol'].nombre;

              if (response.data[0]['rol'].nombre === 'Administrador') {
                stringTemp = stringTemp +  ')';
                //document.getElementById("spanRol").innerHTML = response.data[0].username + '(' + response.data[0]['rol'].nombre + ')';
                document.getElementById("spanRol").innerHTML = stringTemp;
                $scope.userAdministrador = true;
                $scope.userDirectivo = false;
                $scope.userMedicoPasiva = false;
                $scope.userMedicoCentral = false;
              }
              if (response.data[0]['rol'].nombre === 'Directivo') {
                stringTemp = stringTemp +  ')';
                document.getElementById("spanRol").innerHTML = stringTemp;
                $scope.userDirectivo = true;
                $scope.userAdministrador = false;
                $scope.userMedicoPasiva = false;
                $scope.userMedicoCentral = false;
              }
              if (response.data[0]['rol'].nombre === 'Médico Consulta Pasiva') {
                ApiService.post(API_ROUTE.GET_ESP_NAME_BY_USER_ID, paramsS)
                .then(function (response) {
                  userMedicoIsLogueded = true;
                  stringTemp = stringTemp +  ' / ' + response.data.nombre;
                  stringTemp = stringTemp +  ')';
                  document.getElementById("spanRol").innerHTML = stringTemp;
                  $scope.userMedicoPasiva = true;
                  $scope.userAdministrador = false;
                  $scope.userDirectivo = false;
                  $scope.userMedicoCentral = false;
                  // get remission incomplete by id especialidad
                  idMyEsp = response.data.id;
                  paramsR = {
                    id : response.data.id
                  }
                  ApiService.post(API_ROUTE.GET_INCOMPLETE_REMISSION_COUNT, paramsR)
                  .then(function (response) {
                    if(response.data > 0) {
                      document.getElementById("incompleteRemission").innerHTML = response.data;
                      document.getElementById("incompleteRemission").style.display = 'block';
                    }
                  });
                });
              }
              if (response.data[0]['rol'].nombre === 'Médico Consulta Central') {
                ApiService.post(API_ROUTE.GET_ESP_NAME_BY_USER_ID, paramsS)
                .then(function (response) {
                  userMedicoIsLogueded = true;
                  stringTemp = stringTemp +  ' / ' + response.data.nombre;
                  stringTemp = stringTemp +  ')';
                  document.getElementById("spanRol").innerHTML = stringTemp;
                  $scope.userMedicoCentral = true;
                  $scope.userMedicoPasiva = false;
                  $scope.userAdministrador = false;
                  $scope.userDirectivo = false;
                  // get remission incomplete by id especialidad
                  idMyEsp = response.data.id;
                  paramsR = {
                    id : response.data.id
                  }
                  ApiService.post(API_ROUTE.GET_INCOMPLETE_REMISSION_COUNT, paramsR)
                  .then(function (response) {
                    if(response.data > 0) {
                      document.getElementById("incompleteRemission").innerHTML = response.data;
                      document.getElementById("incompleteRemission").style.display = 'block';
                    }
                  });
                });
              }

              if(response.data[0]['rol'].nombre === 'Médico Consulta Central' || response.data[0]['rol'].nombre === 'Médico Consulta Pasiva') {
                // Use to connect a room if are medico
                dataSendRoomName = {
                  roomName: 'chatHospital'
                };
                io.socket.post('/joinChat', dataSendRoomName, function (resData, jwRes) {
                  if (jwRes.statusCode === 200) {
                    ApiService.post(API_ROUTE.GET_SESSION, {})
                      .then(function (response) {
                        var UserId = response.data; //
                        dataSendUserId = {
                          userId: UserId,
                          roomName: 'chatHospital'
                        };
                        // Save in temporal userId
                        document.getElementById("tempIdUser").innerHTML = UserId;
                        io.socket.get('/getWebSocketID', function (resData, jwres) {
                          document.getElementById("tempSocketId").innerHTML = resData.WebSocketId;
                          paramsA = {
                            userId: UserId,
                            socketId: resData.WebSocketId
                          }
                          ApiService.post(API_ROUTE.ADD_SOCKET_ID, paramsA)
                            .then(function (response) {

                            })
                        });

                      });
                    }
                  });
              }

              $scope.userAuthenticated = false;
              $scope.userShowAuthenticated = true;
              document.getElementById("allComponent").style.display = 'block';

            }
          });
      };
      $scope.data = {};
      $http.get('/usuario/getUserLogged').then(result => {
        if (result.data) {
          $scope.data.loginUsername = result.data.username;
          $scope.data.loginPassword = result.data.password;
          $scope.loginUser();
      }
      }).catch(err => {
        console.log(err);
      });

      $scope.logout = () => {
        // Le paso el id del usuario logueado
        //var UserId;
        paramsG = {}
        ApiService.post(API_ROUTE.GET_SESSION, paramsG)
          .then(function (response) {
            var UserId = response.data; //
            if(response.data === 'not yet set'){
              UserId = document.getElementById("tempIdUser").innerHTML;
            }
            params = {
              id: UserId
            }
            ApiService.post(API_ROUTE.LOGOUT, params)
              .then(function (response) {
                if (response.data[0].id !== null && response.data[0].id !== '') {
                 // $scope.socket.emit('logout', UserId);
                  $scope.userAuthenticated = true;
                  $scope.userShowAuthenticated = false;
                  document.getElementById("tempIdUser").innerHTML = '';
                  resDataSend = {
                    roomName: 'chatHospital',
                    userLogoutId : response.data[0].id
                  }
                  io.socket.post('/leaveChat', resDataSend, function (resData, jwres) {

                  });
                  $scope.data.selectedFriendId = "";
                  document.getElementById("allComponent").style.display = 'none';
                  $location.path('/');
                  userMedicoIsLogueded = false;
                  idMyEsp = '';
                }
              });
          });
      }

      //----------------------------------------------------------------------------
      io.socket.on('add-message-response', function(response) {
        if (document.getElementById("activeModal").innerHTML === 'N') {
          // Save in array to send modal
          if(myMessagesPending.indexOf(response.id_usuario_envia) === -1) {
            myMessagesPending.push(response.id_usuario_envia);
          }
          if(document.getElementById("incommingMessage").style.display === 'none') {
            document.getElementById("incommingMessage").style.display = 'block';
          }
        }
      });

    }
  ]
)

//---------------------------------- MODAL DEMO -------------------------------------------------------

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.
  .controller("ModalChatInstanceController", ["$scope", "$uibModalInstance", "ApiService", "API_ROUTE", "scopeData", "myMessagesPending",
      function ($scope, $uibModalInstance, ApiService, API_ROUTE, scopeData, myMessagesPending) {

        //Le paso el scope al scope del modal, para tener acceso
        $scope.data = scopeData;
        var arr = myMessagesPending;
        document.getElementById("activeModal").innerHTML = 'S';

        //------------------------------
        var UserId = document.getElementById("tempIdUser").innerHTML;
        var userSocketId = document.getElementById("tempSocketId").innerHTML;
        paramsB = {
          userId: UserId,
          socketId: userSocketId
        }

        // ApiService.post(API_ROUTE.ADD_SOCKET_ID, paramsA)
        //   .then(function (response) {

        //   })
        ApiService.post(API_ROUTE.USER_SESSION_CHECK, paramsB)
        .then(function (response) {
          //socket.emit('chat-list', UserId);
              data = {
                userId: UserId
              }
              //sails.sockets.broadcast('chatHospital', 'chat-list', data);
              io.socket.post('/chatList', data, function (resData, jwres) {
              });
            })
        //**************** */
        io.socket.on('chat-list-response', function (response) {
          $scope.$apply(() => {
            if (!response.error) {
              if (response.singleUser) {
                console.log("SingleUser");
                /*
                 * Removing duplicate user from chat list array
                 */
                if ($scope.data.chatlist.length > 0) {
                    $scope.data.chatlist = $scope.data.chatlist.filter(function (obj) {
                    return obj.id !== response.chatList.id;
                  });
                }
                /*
                 * Adding new online user into chat list array
                 */
                $scope.data.chatlist.push(response.chatList);
              } else if (response.userDisconnected) {
                /*
                 * Removing a user from chat list, if user goes offline
                 */
                $scope.data.chatlist = $scope.data.chatlist.filter(function (obj) {
                  return obj.socketid !== response.socketId;
                });
              } else {
                /*
                 * Updating entire chatlist if user logs in
                 */
                $scope.data.chatlist = response.chatList;
              }
            } else {
              alert('Faild to load Chat list');
            }
          });

          if(arr.length > 0){
            arr.forEach(function(element){
              if(document.getElementById(element) !== null) {
                var c = document.getElementById(element);
                var spans = c.querySelectorAll('span');
                if(spans.length < 1){
                  var classSpan = document.createElement('span');
                  classSpan.className = "offline";
                  c.appendChild(classSpan);
                }
              }
            });
          }
        });
        //************** */

        $scope.selectFriendToChat = (friendId) => {
          // Remove market that indicate a new message
          var c = document.getElementById(friendId);
          var spans = c.querySelectorAll('span');
          if(spans.length > 0){
              c.removeChild(c.lastChild);
          }
          /*
           * Highlighting the selected user from the chat list
           */
           const friendData = $scope.data.chatlist.filter((obj) => {
               return obj.id === friendId;
           });

           $scope.data.selectedFriendName = friendData[0]['username'];
           $scope.data.selectedFriendId = friendId;
           /**
           * This HTTP call will fetch chat between two users
           */
          paramsM = {
             userId : UserId,
             friendId : friendId
          }

          ApiService.post(API_ROUTE.GET_MESSAGES, paramsM)
         .then(function (response) {
             $scope.data.messages = response.data;
         })
         .catch( (error) => {
               //alert('Unexpected Error, Contact your Site Admin.' + error);
           });
       }

       $scope.sendMessage = (event) => {

        if (event.keyCode === 13) {

            let toUserId = null;
            let toSocketId = null;

            /* Fetching the selected User from the chat list starts */
            let selectedFriendId = $scope.data.selectedFriendId;
            if (selectedFriendId === null) {
                return null;
            }
            friendData = $scope.data.chatlist.filter((obj) => {
                return obj.id === selectedFriendId;
            });
            /* Fetching the selected User from the chat list ends */

            /* Emmiting socket event to server with Message, starts */
            if (friendData.length > 0) {
                toUserId = friendData[0]['id'];
                toSocketId = friendData[0]['socketId'];

                // Create Date to send Chat'Box
                var dateToSave = new Date();
                var d = dateToSave.getFullYear() + "-" + dateToSave.getMonth() + 1 + "-" + dateToSave.getDate();
                d = d + " " + dateToSave.getHours() + ":" + dateToSave.getMinutes() + ":" + dateToSave.getSeconds();

                let messagePacket = {
                  createdAt: d,
                  mensaje: document.querySelector('#message').value,
                  id_usuario_envia: UserId,
                  id_usuario_recibe: toUserId,
                  toSocketId: toSocketId,
                  mySocketId: userSocketId
                };
                $scope.data.messages.push(messagePacket);
                //socket.emit('add-message', messagePacket);
                io.socket.post('/addMessage', messagePacket, function (resData, jwRes) {
                  if (jwRes.statusCode === 200) {
                   //
                  }
                });

                document.querySelector('#message').value = '';
                const messageThread = document.querySelector('.message-thread');
                    setTimeout(() => {
                    messageThread.scrollTop = messageThread.scrollHeight + 500;
                    }, 10);
            }else {
                alert('Error inesperado,por favor contacte con el administrador');
            }
            /* Emmiting socket event to server with Message, ends */
        }
    }

    $scope.alignMessage = (fromUserId) => {
        return fromUserId == UserId ? true : false;
    }

    //------------------------------
    $scope.cancel = function () {
      document.getElementById("activeModal").innerHTML = 'N';
      $uibModalInstance.dismiss('cancel');
    };



  /*
  * This eventt will display the new incmoing message
  */
  io.socket.on('add-message-response', function(response) {
    $scope.$apply( () => {
      if (response && response.id_usuario_envia === $scope.data.selectedFriendId) {
          $scope.data.messages.push(response);
          const messageThread = document.querySelector('.message-thread');
          setTimeout(() => {
            messageThread.scrollTop = messageThread.scrollHeight + 500;
          }, 10);
      } else {
          // Create market for indicate a new message
          if(document.getElementById(response.id_usuario_envia) !== null) {
            var c = document.getElementById(response.id_usuario_envia);
            var spans = c.querySelectorAll('span');
            if(spans.length < 1){
              var classSpan = document.createElement('span');
              classSpan.className = "offline";
              c.appendChild(classSpan);
            }
          }
      }
    });
  });

  /*
  * This eventt will display when user logout
  */
  io.socket.on('logout-message-response', function(response) {
    $scope.$apply( () => {
      /*
      * Removing a user from chat list, if user goes offline
      */
      data = {
        userId: UserId
      }
      io.socket.post('/chatList', data, function (resData, jwres) {
      });
      //  clear chat-box
      if($scope.data.selectedFriendId === response.userLogoutId){
        //$scope.data.messages.clear();
        //$scope.data.selectedFriendId = "";
      }
    });
  });

  /*
  * This eventt will display when user login
  */
  io.socket.on('login-message-response', function(response) {
    $scope.$apply( () => {
      console.log("Login user...");
      data = {
        userId: UserId
      }
      io.socket.post('/chatList', data, function (resData, jwres) {
      });
    });
  });

  }])





