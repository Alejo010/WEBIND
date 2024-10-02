myApp.controller("ModalDemoCtrl",
  function ($scope, $uibModal, $log) {
    $scope.items = ['item1', 'item2', 'item3'];

    $scope.animationsEnabled = true;
  
    $scope.open = function (size) {
  
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl',
        size: size,
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });
  
      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
  
    $scope.toggleAnimation = function () {
      $scope.animationsEnabled = !$scope.animationsEnabled;
    };
  
  })

  // Please note that $uibModalInstance represents a modal window (instance) dependency.
  // It is not the same as the $uibModal service used above.
  .controller("ModalInstanceCtrl",
    function ($scope, $uibModalInstance, items) {
        $scope.items = items;
        $scope.selected = {
          item: $scope.items[0]
        };
      
        $scope.ok = function () {
          $uibModalInstance.close($scope.selected.item);
        };
      
        $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };
    }
  )

  // Start Controller Implementation
    .controller("HomeController",
    function ($scope, $location, $routeParams, ApiService, API_ROUTE) {
        
    const UserId = $routeParams.id;
    paramsG = {
    }
    ApiService.post(API_ROUTE.GET_SESSION, paramsG)
    .then(function (response) {
        UserId = response.session.userId
    });
    
    params = {
        userId: $routeParams.id,
    }

    $scope.data = {
        username: '',
        chatlist: [],
        selectedFriendId: null,
        selectedFriendName: null,
        messages: []
    };

    const socket = io.connect('http://localhost:3000', { 'forceNew': true});
    socket.emit('userId', UserId);

    socket.on('r-socket-id', function(response) {
        if(UserId === response['userId']){
            paramsA = {
                userId: $routeParams.id,
                socketId: response['socketId'],
            }
        
        ApiService.post(API_ROUTE.ADD_SOCKET_ID, paramsA)
        .then(function (response) {
            //alert("Socket Id added: " + JSON.stringify(response)) 
            ApiService.post(API_ROUTE.USER_SESSION_CHECK, params)
            .then(function (response) {
                $scope.data.username = response.data.username;
                socket.emit('chat-list', UserId);
                socket.on('chat-list-response', function(response) {
                    $scope.$apply( () =>{
                        if (!response.error) {
                            if (response.singleUser) {
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
                            alert(`Faild to load Chat list`);
                        }
                    });
                });
            })   
        })
        }
        
    }); // end 'r-socket-id' 

    /*
    * This eventt will display the new incmoing message
    */
    socket.on('add-message-response', function(response) {
        $scope.$apply( () => {
        if (response && response.id_usuario_envia == $scope.data.selectedFriendId) {
            $scope.data.messages.push(response);
            const messageThread = document.querySelector('.message-thread');
            setTimeout(() => {
            messageThread.scrollTop = messageThread.scrollHeight + 500;
            }, 10);
        } else {
            // Create market for indicate a new message
            var classSpan = document.createElement('span')
            classSpan.className = "offline";
            var c = document.getElementById(response.id_usuario_envia);
            c.appendChild(classSpan);
        }
    });
    });

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
        $scope.$apply(() => {
            $scope.data.messages = response.data[0];
        });
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

            let messagePacket = {
                mensaje: document.querySelector('#message').value,
                id_usuario_envia: UserId,
                id_usuario_recibe: toUserId,
                toSocketId: toSocketId
            };
            $scope.data.messages.push(messagePacket);
            socket.emit(`add-message`, messagePacket);
            
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

    $scope.logout = () => {
    //appService.socketEmit(`logout`, UserId);
    paramsL = {
        id : UserId   
    }
    ApiService.post(API_ROUTE.LOGOUT, paramsL)
    .then(function (response) {
        socket.emit(`logout`, UserId);
        $location.path(`/backend/chat`);
    });
    }
    
    })