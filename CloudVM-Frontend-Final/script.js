//create a module myApp
var myApp = angular.module('myApp', ['ngRoute','ngCookies','ng']);
 
//Now Configure  our  routing
myApp.config(function($routeProvider, $locationProvider,$httpProvider) {
  
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];

  $routeProvider
  /** set route for the index page and it load uirouter.html
    *in ng-view and activate RouteCtrl
    **/
  .when('/', {
    controller: 'RouteCtrl',
    templateUrl: 'views/home_views.html'
  })

  .when('/features', {
    controller: 'RouteCtrl',
    templateUrl: 'views/features_views.html'
  })

  .when('/pricing', {
    controller: 'RouteCtrl',
    templateUrl: 'views/pricing_views.html'
  })

  .when('/login', {
    controller: 'RouteCtrl',
    templateUrl: 'views/login_views.html'
  })

  .when('/register', {
    controller: 'RouteCtrl',
    templateUrl: 'views/register_views.html'
  })

  .when('/logout', {
  controller: 'RouteCtrl',
  templateUrl: 'views/logout_views.html'
  })

  .when('/error', {
    controller: 'RouteCtrl',
    templateUrl: 'views/error_views.html'
  })

   .when('/restricted', {
  controller: 'RouteCtrl',
  templateUrl: 'views/restricted_views.html'
  })

   .when('/expire', {
  controller: 'RouteCtrl',
  templateUrl: 'views/sessionExpire_views.html'
  })

  .when('/aboutus', {
  controller: 'RouteCtrl',
  templateUrl: 'views/aboutus_views.html'
  })

  .when('/instance', {
  controller: 'RouteCtrl',
  templateUrl: 'views/instance_views.html'
  })

  .when('/instance/create', {
  controller: 'RouteCtrl',
  templateUrl: 'views/createInstance_views.html'
  })  

  .when('/instance/edit', {
  controller: 'RouteCtrl',
  templateUrl: 'views/editInstance_views.html'
  })

  .when('/profile', {
  controller: 'RouteCtrl',
  templateUrl: 'views/profile_views.html'
  })

  .when('/profile/edit', {
  controller: 'RouteCtrl',
  templateUrl: 'views/editProfile_views.html'
  })

  .when('/dashboard', {
  controller: 'RouteCtrl',
  templateUrl: 'views/dashboard_views.html'
  })

  ;

  // // if not match with any route config then send to home page
  // .otherwise({
  //   redirectTo: '/home'
  // });
});
 

myApp.controller('RouteCtrl', function($scope) {
  
  $scope.global = {
    "navbar": "views_global/navbar_global.html",
    "header": "views_global/header_global.html",
    "features": "views_global/features_global.html",
    "pricing": "views_global/pricing_global.html",
    "error": "views_global/error_global.html",
    "aboutus": "views_global/aboutus_global.html",
    "logout": "views_global/logout_global.html",
    "restricted": "views_global/restricted_global.html",
    "footer": "views_global/footer_global.html"
  }
  
  $scope.user = {
    "navbar": "views_user/navbar_user.html",
    "navbarLoggedUser": "views_user/navbar_loggedUser.html",
    "login": "views_user/login_user.html",
    "register": "views_user/register_user.html",
    "dashboard": "views_user/dashboard_user.html",
    "headerDashboard": "views_user/headerDashboard_user.html",
    "createInstance": "views_user/createInstance_user.html",
    "profile": "views_user/profile_user.html",
    "instance": "views_user/instance_user.html",
    "editInstance": "views_user/editInstance_user.html",
    "editProfile": "views_user/editProfile_user.html",
    "sessionExpire": "views_user/sessionExpire_user.html"
  }

});


myApp.controller("UserController", function($scope, $http, $location, $cookies, $cookieStore, $window) {
  
  /* Hardcoded value for dropdown list, instance purposes */

  $scope.formData = {};
  $scope.loggedUser = {};
  $scope.user = {};
  $scope.dummyUser = { 
        id_user: $cookies.id_user,
        token: $cookies.token
    };
  $scope.dummyInstance = {};
  $scope.dummyPlan = {};
  $scope.formDataEdit = {};

  /* ------------------------------------------------------
   *                                                       *
   *                        USER                           *
   *                                                       *
   ------------------------------------------------------- */

   /* Cookies related functions, credential purposes */

  $scope.resetCookies = function(x) {

    /* If there are cookies */

    if ( x == "UserCookies" || x === "UserCookies" ) {
        console.log("Reseting user cookies");
        if( $cookies.id_user !== null || $cookies.id_user !== undefined || $cookies.id_user != "" ) {
          //$cookies.id_user = undefined;
          $cookieStore.remove('id_user');
        } else {
          console.log("There are no cookies for id_user stored yet.");
        }
        if( $cookies.token !== null || $cookies.token !== undefined || $cookies.token != "" ) {
          //$cookies.token = undefined;
          $cookieStore.remove('token');
        } else {
          console.log("There are no cookies for token stored yet.");
        }
    } 
    else if ( x == "VMCookies" || x === "VMCookies" ) {
      console.log("Reseting VM cookies");
      if( $cookies.uuid_vm !== null || $cookies.uuid_vm !== undefined || $cookies.uuid_vm != "" ) {
          //$cookies.uuid_vm = undefined;
          $cookieStore.remove('uuid_vm');
        } else {
          console.log("There are no cookies for uuid_vm stored yet.");
        }
        if( $cookies.nama_instance !== null || $cookies.nama_instance !== undefined || $cookies.nama_instance != "" ) {
         // $cookies.nama_instance = undefined;
         $cookieStore.remove('nama_instance');
        } else {
          console.log("There are no cookies for nama_instance stored yet.");
        }
        if( $cookies.tanggal !== null || $cookies.tanggal !== undefined || $cookies.tanggal != "" ) {
          //$cookies.tanggal = undefined;
          $cookieStore.remove('tanggal');
        } else {
          console.log("There are no cookies for tanggal stored yet.");
        }
        if( $cookies.status_pembayaran !== null || $cookies.status_pembayaran !== undefined || $cookies.status_pembayaran != "" ) {
          //$cookies.status_pembayaran = undefined;
          $cookieStore.remove('status_pembayaran');
        } else {
          console.log("There are no cookies for status_pembayaran stored yet.");
        }
        if( $cookies.deleted !== null || $cookies.deleted !== undefined || $cookies.deleted != "" ) {
          //$cookies.deleted = undefined;
          $cookieStore.remove('deleted');
        } else {
          console.log("There are no cookies for deleted stored yet.");
        }
        if( $cookies.id_plan !== null || $cookies.id_plan !== undefined || $cookies.id_plan != "" ) {
        //$cookies.id_plan = undefined;
          $cookieStore.remove('id_plan');
        } else {
          console.log("There are no cookies for id_plan stored yet.");
        }

    }
    else if ( x =="AllCookies" ) {
        console.log("Reseting all cookies");
        if( $cookies.id_user !== null || $cookies.id_user !== undefined || $cookies.id_user != "" ) {
          //$cookies.id_user = undefined;
          $cookieStore.remove('id_user');
          //console.log("id_user resetted, it became: " + $cookies.id_user);
        } else {
          console.log("There are no cookies for id_user stored yet.");
        }
        if( $cookies.token !== null || $cookies.token !== undefined || $cookies.token != "" ) {
          //$cookies.token = undefined;
          $cookieStore.remove('token');
        } else {
          console.log("There are no cookies for token stored yet.");
        }
        if( $cookies.uuid_vm !== null || $cookies.uuid_vm !== undefined || $cookies.uuid_vm != "" ) {
          //$cookies.uuid_vm = undefined;
          $cookieStore.remove('uuid_vm');
        } else {
          console.log("There are no cookies for uuid_vm stored yet.");
        }
        if( $cookies.nama_instance !== null || $cookies.nama_instance !== undefined || $cookies.nama_instance != "" ) {
         // $cookies.nama_instance = undefined;
         $cookieStore.remove('nama_instance');
        } else {
          console.log("There are no cookies for nama_instance stored yet.");
        }
        if( $cookies.tanggal !== null || $cookies.tanggal !== undefined || $cookies.tanggal != "" ) {
          //$cookies.tanggal = undefined;
          $cookieStore.remove('tanggal');
        } else {
          console.log("There are no cookies for tanggal stored yet.");
        }
        if( $cookies.status_pembayaran !== null || $cookies.status_pembayaran !== undefined || $cookies.status_pembayaran != "" ) {
          //$cookies.status_pembayaran = undefined;
          $cookieStore.remove('status_pembayaran');
        } else {
          console.log("There are no cookies for status_pembayaran stored yet.");
        }
        if( $cookies.deleted !== null || $cookies.deleted !== undefined || $cookies.deleted != "" ) {
          //$cookies.deleted = undefined;
          $cookieStore.remove('deleted');
        } else {
          console.log("There are no cookies for deleted stored yet.");
        }
        if( $cookies.id_plan !== null || $cookies.id_plan !== undefined || $cookies.id_plan != "" ) {
        //$cookies.id_plan = undefined;
          $cookieStore.remove('id_plan');
        } else {
          console.log("There are no cookies for id_plan stored yet.");
        }
        console.log("All cookies are resetted.");
    }
    
  }

  $scope.checkExistingCookies = function(x) {
    
    /* If there are no cookies */
    if ( x == "UserCookies" || x === "UserCookies" ) {
        console.log("Checking if there are user cookies.");
        if(  ($cookies.id_user === undefined || $cookies.id_user === null || $cookies.id_user === "") && ($cookies.token === undefined || $cookies.token === null || $cookies.token == "") ) {
          /* Then the page is restriced, redirect to error page */
            console.log("There are no user cookies stored yet.");
            return false;
        } 
        else {
          console.log("There are cookies for id_user: " + $cookies.id_user + " and token: " + $cookies.token);
          return true;
        }
    } else if ( x == "VMCookies" || x === "VMCookies" ) {
      console.log("Checking if there are vm coookies");
      if( $cookies.uuid_vm === null || $cookies.uuid_vm === undefined || $cookies.uuid_vm == "" ) {
        console.log("There are no vm cookies stored yet.");
        return false;
      } else {
        console.log("There are cookies for this vm with uuid_vm: " + $cookies.uuid_vm );
        return true;
      }
    }
  }

  $scope.createUserCookies = function(x,y) {
    if ( $cookies.id_user === undefined || $cookies.id_user === null || $cookies.id_user == "" ) {
       $cookies.id_user = x;
    } else {
      console.log("Error creating cookies for id_user, possible value is existed :" + $cookies.id_user);
    }

    if ( $cookies.token === undefined || $cookies.token === null || $cookies.token == "" ) {
       $cookies.token = y;
    } else {
     console.log("Error creating cookies for token, possible value is existed :" + $cookies.token);
    }
  }

  $scope.createVMCookies = function(a,b,c,d,e,f) {
    if ( $cookies.uuid_vm === undefined || $cookies.uuid_vm === null || $cookies.uuid_vm == "" ) {
       $cookies.uuid_vm = a;
    } else {
     console.log("Error creating cookies for uuid_vm, possible value is existed :" + $cookies.token);
    }
    if ( $cookies.nama_instance === undefined || $cookies.nama_instance === null || $cookies.nama_instance == "" ) {
       $cookies.nama_instance = b;
    } else {
     console.log("Error creating cookies for nama_instance, possible value is existed :" + $cookies.token);
    }
    if(  $cookies.tanggal === undefined || $cookies.tanggal === null || $cookies.tanggal == "" ) {
      $cookies.tanggal = c;
    } else {
      console.log("There are no cookies for tanggal stored yet.");
    }
    if( $cookies.status_pembayaran === undefined || $cookies.status_pembayaran === null ||  $cookies.status_pembayaran !== "" ) {
      $cookies.status_pembayaran = d;
    } else {
      console.log("There are no cookies for status_pembayaran stored yet.");
    }
    if( $cookies.deleted === undefined || $cookies.deleted === null || $cookies.deleted == "" ) {
      $cookies.deleted = e;
    } else {
      console.log("There are no cookies for deleted stored yet.");
    }
    if( $cookies.id_plan === undefined || $cookies.id_plan === null || $cookies.id_plan == "" ) {
      $cookies.id_plan = f;
    } else {
      console.log("There are no cookies for id_plan stored yet.");
    }
  }

  $scope.checkAccess = function() {
    console.log("Starting checkAccess...");
    if ( $scope.checkExistingCookies("UserCookies") == true ) {
      console.log("User has access.");
      return true;
    } 
    else if ( $scope.checkExistingCookies("UserCookies") == false ) {
      console.log("User has no access. Should be redirected elsewhere.");
      $location.path('/restricted');
      return false;
    }
    else {
      console.log("None of the above.")
      return false;
    }    
  }

  $scope.isGlobal = function() {
    console.log("Checking for global...");
    //console.log($location.$$path);
    if ( $scope.checkExistingCookies("UserCookies") == true ) {
      console.log("User has active session.");
      $location.path('/expire');
    } 
    else if ( $scope.checkExistingCookies("UserCookies") == false ) {
      console.log("User has no active session, can ontinue.");
    }
  }

  $scope.sessionExpiring = function() {
    if ( $scope.checkExistingCookies("UserCookies") == true ) {
      console.log("User has active session.");
      console.log("id_user: " + $cookies.id_user + " and token: " + $cookies.token);
    } 
    else if ( $scope.checkExistingCookies("UserCookies") == false ) {
      console.log("User has no access. Should be redirected elsewhere.");
      $location.path('/restricted');
    }
  }

  $scope.redirectTo = function(x) {
    $location.path(x);
  }


  /* * * * * * *  * * * * * * * * * * * * * * * *
    *         Functions used in Register        * 
    * * * * * * * * * * * * * * * * * * * * * * */

  $scope.registerUser = function() {
      $http({
        method: 'POST',
        url: 'http://localhost:8183/user/register',
        data: $.param($scope.formData),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .success(function(data) {
          $.each(data, function(index) {
            if(data[index].msg == "registrasi berhasil") {
              alert("Account is successfully registered.");
              $location.path('/login');
            }
            else {
              alert(JSON.stringify(data[index].msg));
            }
          })
      });
      $scope.formData = {};
  }

  $scope.loginData = {};

  /* * * * * * *  * * * * * * * * * * * * * * * *
    *         Functions used in Login           * 
    * * * * * * * * * * * * * * * * * * * * * * */

  $scope.loginUser = function() {
    $http({
      method: 'POST',
      url: 'http://localhost:8183/user/login',
      data: $.param($scope.loginData),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    .success(function(data) {
      if(data.result == "success") {
          $scope.resetCookies("UserCookies");
          $scope.createUserCookies(data.id_user, ((JSON.stringify(data.token)).substring(1,65)) );
          $location.path('/dashboard');
      } 
      else if (data.result == "failed") {
        alert("Incorrect email or password. Please retry");
        $window.location.reload();
      }

    });
  }


  /* * * * * * *  * * * * * * * * * * * * * * * *
    *         Functions used in Logout          * 
    * * * * * * * * * * * * * * * * * * * * * * */

  $scope.logoutUser = function() {
    console.log("Ready to be logged out.");
    if ( ($scope.checkExistingCookies("UserCookies")) == true )
    {
      $scope.resetCookies("AllCookies");
      $location.path("/logout");
    }
    else {
      $location.path("/restricted");
    }
  }


  /* * * * * * *  * * * * * * * * * * * * * * * *
    *   Functions used in Load User Profile     * 
    * * * * * * * * * * * * * * * * * * * * * * */

  $scope.loadUserProfile = function() {
   
      console.log($scope.checkAccess());
      if ( $scope.checkAccess() == true ) {    
        $scope.loggedUser = { 
              id_user: $cookies.id_user,
              token: $cookies.token
        };

        $http({
              method: 'POST',
              url: 'http://localhost:8183/user/profile',
              data: $.param($scope.loggedUser),
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
            .success(function(res) {

                 $cookies.nama_user = res.json[0].nama_user;
                  console.log($cookies.nama_user);
                  console.log($cookies.id_user)
   
                $scope.loggedUserProfile = {
                  nama_user: res.json[0].nama_user,
                  email_user: res.json[0].email_user,
                  no_telp_user: res.json[0].no_telp_user,
                  nama_perusahaan_user: res.json[0].nama_perusahaan_user,
                  alamat_user: res.json[0].alamat_user,
                  nama_cc_user: res.json[0].nama_cc_user,
                  alamat_cc_user: res.json[0].alamat_cc_user,
                  nomor_cc_user: res.json[0].nomor_cc_user,
                  nomor_vcv_user: res.json[0].nomor_vcv_user,
                  expire_month_user: res.json[0].expire_month_cc_user,
                  expire_year_user: res.json[0].expire_year_cc_user
                }
            });
    } 

  }

  /* * * * * * *  * * * * * * * * * * * * * * * *
    *   Functions used in Edit User Profile     * 
    * * * * * * * * * * * * * * * * * * * * * * */

  $scope.editUserProfile = function() {

    console.log("Here are the credentials before POST Edit Profile.")
    console.log($scope.dummyUser);
    
    $http( {
        method: 'POST',
        url: 'http://localhost:8183/user/edit',
        data: $.param(($scope.dummyUser)),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .success(function(data) {
        if(data.result == "success") {
          alert("Data is successfully updated.");
          $location.path("/dashboard");
        } else {
          $.each(data, function(index) {
            alert(JSON.stringify(data[index].msg));
          })
        }
      });
      $scope.formDataEdit = {};
  }

  /* ------------------------------------------------------
   *                                                       *
   *                       INSTANCE                        *
   *                                                       *
   ------------------------------------------------------- */

  /* Hardcoded value for dropdown list, instance purposes */

  $scope.operatingSystems = [
    {'os': 'ubuntu', 'description': 'Ubuntu'},
    {'os': 'debian', 'description': 'Debian'},
    {'os': 'centos', 'description': 'Centos'},
  ];

  $scope.cpus = [
    { 'cpu': 'C1', 'description': '1' },
    { 'cpu': 'C2', 'description': '2' },
  ];

  $scope.vrams = [
    { 'vram': 'M1', 'description': '1 GB' },
    { 'vram': 'M2', 'description': '2 GB' },
  ];

  $scope.vhdds = [
    { 'vhdd': 'S08', 'description': '8 GB' },
    { 'vhdd': 'S16', 'description': '16 GB' },
    { 'vhdd': 'S32', 'description': '32 GB' },
    { 'vhdd': 'S64', 'description': '64 GB' },
  ];

  $scope.plans = [];
  
  $scope.infoPlan = {
    toggle: false
  };

  $scope.selectInstance = {
    isSelected: false
  };

  $scope.instances = [];
  $scope.instancesInfo = {};
  $scope.pricings = [];

  $scope.dummyPL = {};


  $scope.hasWhiteSpace = function(s) {
    return s.indexOf(' ') >= 0;
  }

   /* * * * * * *  * * * * * * * * * * * * * * * *
    *         Functions used in Instance         * 
    * * * * * * * * * * * * * * * * * * * * * *  */

  /* a. Load all the instances belong to the logged user */
  $scope.loadInstance = function() {

    console.log("Loading instances...");
    console.log($scope.checkAccess());
    if( $scope.checkAccess() == true ) {
      console.log("Passing the access checking, now loading instances..");
      $scope.dummyUser = { 
            id_user: $cookies.id_user,
            token: $cookies.token
        };
        console.log("Here are the credentials before POST User Instances.")
        console.log($scope.dummyUser);

        $http({
            method: 'POST',
            url: 'http://localhost:8183/user/instances',
            data: $.param($scope.dummyUser),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
          })
          .success(function(data) {
            if(data.json.length == 0) {
              alert("You don't have any instance yet.");
              $location.path('/dashboard');
            } else {
              for(i=0; i<data.json.length; i++) {
                $scope.instances.push( {
                  id_instances: data.json[i].id_instances,
                  id_user: data.json[i].id_user,
                  id_plan: data.json[i].id_plan,
                  nama_instance: data.json[i].nama_instance,
                  uuid_vm: data.json[i].uuid_vm,
                  status_pembayaran: data.json[i].status_pembayaran,
                  tanggal: data.json[i].tanggal,
                  started: data.json[i].started,
                  deleted: data.json[i].deleted,
                  selected: false
                });
              }; // end of loop
            }
          }); 
    }
  }

  /* b. Load  specific instance info */
  $scope.getInfo = function(x,y,z)
  {
    $scope.dummyInstance = { 
        id_user: $cookies.id_user,
        token: $cookies.token,
        uuid_vm: x.trim()
    };
    console.log("Here are the credentials before POST Get Info Instances.")
    console.log($scope.dummyInstance);

    $http({
        method: 'POST',
        url: 'http://localhost:8183/instance/info',
        data: $.param($scope.dummyInstance),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .success(function(data) {
          if(z == "ssh") {
            console.log("It goes here.");
            $scope.selectInstance.nama_instance = y;
            $scope.selectInstance.ssh = data.ip;
            $scope.selectInstance.isSelected = true;
            $scope.selectInstance.id_plan = data.json[0].id_plan;

            console.log("Here are price list:");
            $http({
                method: 'GET',
                url: 'http://localhost:8183/plan/price_list',
              })
              .success(function(res) {
                  for(i=0; i<res[0].length; i++) {
                    $scope.plans.push({
                      id_plan: res[0][i].id_plan,
                      nama_plan: res[0][i].nama_plan,
                      deskripsi_plan: res[0][i].deskripsi_plan,
                      harga_plan: res[0][i].harga_plan,
                      jumlah_cpu: res[0][i].jumlah_cpu,
                      jumlah_memori: res[0][i].jumlah_memori,
                      jumlah_storage: res[0][i].jumlah_storage
                    });
                  };


              });

            console.log(data.json[0].id_plan);  
            $scope.selectInstance.nama_plan = $scope.plans[($scope.selectInstance.id_plan-1)].nama_plan;
            $scope.selectInstance.vhdd = $scope.selectInstance.nama_plan.substring(5);
            $scope.selectInstance.vram = $scope.selectInstance.nama_plan.substring(2,1);
            $scope.selectInstance.cpu = $scope.selectInstance.nama_plan.substring(1,2);

          } else if( z == "all") {
            $scope.resetCookies("VMCookies");
            $scope.createVMCookies(x.trim(),y,data.json[0].tanggal,data.json[0].status_pembayaran,data.json[0].deleted,data.json[0].id_plan);
            console.log($cookies.uuid_vm);
            console.log($cookies.nama_instance);
            console.log($cookies.tanggal);
            console.log($cookies.status_pembayaran);
            console.log($cookies.deleted);
            console.log($cookies.id_plan);
          }
      });
  }

  /* c. Start  specific instance info */
  $scope.startInstance = function(x) {
    $scope.dummyInstance = { 
        id_user: $cookies.id_user,
        token: $cookies.token,
        uuid_vm: x
    };
    console.log("Here are the credentials before POST Start Instance.")
    console.log($scope.dummyInstance);

    $http({
        method: 'POST',
        url: 'http://localhost:8183/instance/start',
        data: $.param($scope.dummyInstance ),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .success(function(data) {
          if(data.result == "success") {
            alert("Instance is successfully started.");
          }
          else
          {
            alert("Please retry."); 
          }
          $window.location.reload();
      });
  }

  /* d. Stop  specific instance info */
  $scope.stopInstance = function(x) { 
    
    $scope.dummyInstance = { 
        id_user: $cookies.id_user,
        token: $cookies.token,
        uuid_vm: x
    };
    console.log("Here are the credentials before POST Stop Instance.")
    console.log($scope.dummyInstance);

    $http({
        method: 'POST',
        url: 'http://localhost:8183/instance/stop',
        data: $.param($scope.dummyInstance ),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .success(function(data) {
          if(data.result == "success") {
            alert("Instance has stopped.");
          }
          else
          {
            alert("Please retry."); 
          }
          $window.location.reload(); 
      });
  }

  /* e. Load  specific instance info */
  $scope.restartInstance = function(x) {
    
    $scope.dummyInstance = { 
        id_user: $cookies.id_user,
        token: $cookies.token,
        uuid_vm: x
    };
    console.log("Here are the credentials before POST Restart Instance.")
    console.log($scope.dummyInstance);

    $http({
        method: 'POST',
        url: 'http://localhost:8183/instance/reboot',
        data: $.param($scope.dummyInstance ),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .success(function(data) {
          if(data.result == "vm_reboot_succeed") {
            alert("Instance is restarted.");
          }
          else
          {
            alert("Please retry."); 
          }
          $window.location.reload();
      });
  }


  /* f. Get State 1 or 0 from a param */
  $scope.checkState = function(x)
  {
    if(x == 0) {
      return false;
    }
    else if(x == 1) {
      return true;
    }
  }

  /* g. Hide details button */


   /* * * * * * *  * * * * * * * * * * * * * * * *
    *     Functions used in Add Instance         * 
    * * * * * * * * * * * * * * * * * * * * * *  */

   /* a. Get id_plan for custom plan */
  $scope.checkPlanPrice = function(x) {
     $http({
        method: 'GET',
        url: 'http://localhost:8183/plan/price_list',
      })
      .success(function(data) {
          for(i=0; i<data[0].length; i++) {
            $scope.plans.push({
              id_plan: data[0][i].id_plan,
              nama_plan: data[0][i].nama_plan,
              deskripsi_plan: data[0][i].deskripsi_plan,
              harga_plan: data[0][i].harga_plan,
              jumlah_cpu: data[0][i].jumlah_cpu,
              jumlah_memori: data[0][i].jumlah_memori,
              jumlah_storage: data[0][i].jumlah_storage
            });
          };
          if( x == "Add" ) {       
            console.log("Almost add"); 
            $scope.infoPlan.nama_plan = (($scope.dummyPlan.cpu).concat($scope.dummyPlan.vram)).concat($scope.dummyPlan.vhdd);
            $scope.dummyUser.id_plan = $scope.plans[$scope.plans.map(function(x) {return x.nama_plan;}).indexOf($scope.infoPlan.nama_plan)].id_plan;
            $scope.infoPlan.harga_plan = $scope.plans[($scope.dummyUser.id_plan-1)].harga_plan;
            $scope.infoPlan.deskripsi_plan = $scope.plans[($scope.dummyUser.id_plan-1)].deskripsi_plan;
            $scope.infoPlan.toggle = true;

            console.log($scope.infoPlan.nama_plan);          
            console.log($scope.dummyUser.id_plan);
          }
          else if ( x == "Edit" ) {
            console.log("Its here in editing part.");
            $scope.dummyPL.nama_plan = $scope.plans[$cookies.id_plan-1].nama_plan;
            console.log("The instance previous plan is: " + $scope.dummyPL.nama_plan);
            $scope.dummyPlan.vhdd = $scope.dummyPL.nama_plan.substring(4);


            $scope.infoPlan.nama_plan = (($scope.dummyPlan.cpu).concat($scope.dummyPlan.vram)).concat($scope.dummyPlan.vhdd);
            $scope.dummyUser.id_plan = $scope.plans[$scope.plans.map(function(x) {return x.nama_plan;}).indexOf($scope.infoPlan.nama_plan)].id_plan; 

            console.log($cookies.id_plan);
            console.log($scope.dummyUser.id_plan);
            if ( ($scope.isPlanAllowed($cookies.id_plan, $scope.dummyUser.id_plan)) == false ) {
                alert("Downgrading plan is not allowed. Please retry.");
                $location.path("/instance");
            }
            else {
              $scope.infoPlan.harga_plan = $scope.plans[($scope.dummyUser.id_plan-1)].harga_plan;
              $scope.infoPlan.deskripsi_plan = $scope.plans[($scope.dummyUser.id_plan-1)].deskripsi_plan;
              $scope.infoPlan.toggle = true;
            }
          }
          console.log("It goes here");
          console.log($scope.infoPlan.harga_plan);

      });
  }
  
  /* c. Create Instance */
  $scope.createInstance = function() {
    // $scope.dummyUser = { 
    //     id_user: $cookies.id_user,
    //     token: $cookies.token
    // };
    console.log("Here are the credentials before POST Create Instances.")
    console.log($scope.dummyUser);

    if ( $scope.hasWhiteSpace($scope.dummyUser.nama_instance) == true ) {
      alert("Instance name cannot contain spaces. Please retry.");
      $window.location.reload();
    } else {
      $http({
        method: 'POST',
        url: 'http://localhost:8183/instance/create',
        data: $.param($scope.dummyUser),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .success(function(data) {
        if(data.result == "success") {
          alert("Instance is successfully created.");
          $location.path('/instance');
        }
        else
        {
          alert("Please check your data."); 
        }
      });
    }

    
  }

  
   /* * * * * * *  * * * * * * * * * * * * * * * *
    *    Functions used in Edit Instance         * 
    * * * * * * * * * * * * * * * * * * * * * *  */

  /* a. Load Edit Page for selected vm */

  $scope.editInstance = function(x,y) {
    $scope.getInfo(x, y, "all");
    $location.path('/instance/edit');
  }

  /* b. Check whether the plan is allowed to be editted */

  $scope.isPlanAllowed = function(x,y) {
    if(x < y || x == y) {
      return true;
    } 
    else if ( x > y ) {
      return false;
    }
  }

  /* c. Edit Instance */

  $scope.callingEditInstanceAPI = function() {

    if ( $scope.hasWhiteSpace($scope.dummyUser.nama_instance_baru) == true ) {
      alert("Instance name cannot contain spaces. Please retry.");
      $window.location.reload();
    } else {
      $scope.dummyUser.uuid_vm = $cookies.uuid_vm;
      $scope.dummyUser.nama_instance = $cookies.nama_instance;
      $scope.dummyUser.tanggal = $cookies.tanggal;
      $scope.dummyUser.status_pembayaran = $cookies.status_pembayaran;
      $scope.dummyUser.deleted = $cookies.deleted;

      console.log("Here are the credentials before POST Edit Instances.")
      console.log($scope.dummyUser);

      $http( {
          method: 'POST',
          url: 'http://localhost:8183/instance/edit',
          data: $.param(($scope.dummyUser)),
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .success(function(data) {
          if(data.result == "success") {
            alert("Data is successfully updated.");
          } else {
            $.each(data, function(index) {
              alert(JSON.stringify(data[index].msg));
            })
          }
          $location.path("/instance");
        });
    }

   
  }

});