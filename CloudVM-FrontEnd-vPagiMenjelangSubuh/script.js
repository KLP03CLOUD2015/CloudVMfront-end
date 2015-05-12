//create a module myApp
var myApp = angular.module('myApp', ['ngRoute','ngCookies']);
 
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
    "editProfile": "views_user/editProfile_user.html"
  }

});


myApp.controller("UserController", function($scope, $http, $location, $cookies) {
  
  $scope.formData = {};
  $scope.loggedUser = {};
  $scope.user = {};

  $scope.date = new Date();

  /* User Related Functions: Register, Login, Profile */ 

  $scope.registerUser = function() {
      $http({
        method: 'POST',
        url: 'http://localhost:8183/user/register',
        data: $.param($scope.formData),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .success(function(data) {
        $.each(data, function(index) {
          alert(JSON.stringify(data[index].msg));
        })
      });
      $scope.formData = {};
  }

  $scope.loginData = {};

  $scope.loadUserProfile = function() {
      
      $scope.loggedUser = {
        id_user: "9",
        token: "32fb7f591b9f3c7d745ddd51670f2d109b54662b704078c06e14335e241bcb70"
      };

      console.log("1");

      $http({
            method: 'POST',
            url: 'http://localhost:8183/user/profile',
            data: $.param($scope.loggedUser),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
          })
          .success(function(res) {
              // $cookies.nama_user = res.json[0].nama_user;
              // console.log($cookies.nama_user);
              console.log("2");
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
            
            console.log($scope.loggedUserProfile);
          });
    }

  $scope.loginUser = function() {
    $http({
      method: 'POST',
      url: 'http://localhost:8183/user/login',
      data: $.param($scope.loginData),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    .success(function(data) {
      //console.log("kesini");

          $cookies.id_user = JSON.stringify(data.id_user);
          $cookies.token = (JSON.stringify(data.token)).substring(1,65);

          $scope.loggedUser = { 
            id_user: $cookies.id_user,
            token: $cookies.token
          };
    
          $location.path('/dashboard');

    });
  }


  $scope.editUserProfile = function() {
    console.log($scope.dummyUser);
    $http( {
        method: 'POST',
        url: 'http://localhost:8183/user/edit',
        data: $.param(($scope.dummyUser)),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .success(function(data) {
        $.each(data, function(index) {
          console.log(JSON.stringify(data[index].msg));
        })
      });
      $scope.formDataEdit = {};
  }

  /* Instance Related Functions */

  $scope.dummyUser = {
    id_user: "9",
    token: "32fb7f591b9f3c7d745ddd51670f2d109b54662b704078c06e14335e241bcb70"
  };

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

  $scope.instances = [];

  $scope.instancesInfo = {};

  $scope.pricings = [];

  $scope.selectInstance = {
    isSelected: false
  };

  $scope.dummyPlan = {};

  $scope.dummyInstance = {
    id_user: "9",
    //uuid_vm: "4487f22a-56a1-e316-9097-604480b14813",
    token: "32fb7f591b9f3c7d745ddd51670f2d109b54662b704078c06e14335e241bcb70"
  };

  $scope.startInstance = function(x) {
    $scope.dummyInstance.uuid_vm = x;
    $http({
        method: 'POST',
        url: 'http://localhost:8183/instance/start',
        data: $.param($scope.dummyInstance ),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .success(function(data) {
          console.log(data); 
      });
  }

  $scope.stopInstance = function(x) {
    $scope.dummyInstance.uuid_vm = x;
    $http({
        method: 'POST',
        url: 'http://localhost:8183/instance/stop',
        data: $.param($scope.dummyInstance ),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .success(function(data) {
          console.log(data); 
      });
  }

  $scope.restartInstance = function(x) {
    $scope.dummyInstance.uuid_vm = x;
    $http({
        method: 'POST',
        url: 'http://localhost:8183/instance/reboot',
        data: $.param($scope.dummyInstance ),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .success(function(data) {
          console.log(data); 
      });
  }

  $scope.checkPlanPrice = function() {
    //console.log("oh hey");
     $http({
        method: 'GET',
        url: 'http://localhost:8183/plan/price_list',
      })
      .success(function(data) {
          //console.log( data[0].length ); 
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

          $scope.infoPlan.nama_plan = (($scope.dummyPlan.cpu).concat($scope.dummyPlan.vram)).concat($scope.dummyPlan.vhdd);
          //console.log($scope.infoPlan.nama_plan);

          $scope.dummyUser.id_plan = $scope.plans[$scope.plans.map(function(x) {return x.nama_plan;}).indexOf($scope.infoPlan.nama_plan)].id_plan;
          //console.log($scope.dummyUser.id_plan);

          $scope.infoPlan.harga_plan = $scope.plans[($scope.dummyUser.id_plan-1)].harga_plan;
          $scope.infoPlan.deskripsi_plan = $scope.plans[($scope.dummyUser.id_plan-1)].deskripsi_plan;

          $scope.infoPlan.toggle = true;
      });
  }

   $scope.createInstance = function() {
    $http({
        method: 'POST',
        url: 'http://localhost:8183/instance/create',
        data: $.param($scope.dummyUser),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .success(function(data) {
        if(data.result == "success") {
          alert("Instance is successfully created.");
          $location.path('/dashboard');
        }
        else
        {
          alert("Please check your data."); 
        }
      });
  }


  $scope.checkState = function(x)
  {
    if(x == 0) {
      return false;
    }
    else if(x == 1) {
      return true;
    }
  }

  $scope.getInfo = function(x,y)
  {
    //console.log(x);
    $scope.dummyInstance.uuid_vm = x;
    console.log($scope.dummyInstance);
    $http({
        method: 'POST',
        url: 'http://localhost:8183/instance/info',
        data: $.param($scope.dummyInstance),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .success(function(data) {
          //console.log(data);
          $scope.selectInstance.nama_instance = y;
          $scope.selectInstance.ssh = data.ip;
          $scope.selectInstance.isSelected = true;
      });
  }

  $scope.editInstance = function(x) {
    
    $location.path('/instance/edit');
    $scope.dummyUser.uuid_vm = x;
    console.log($scope.dummyUser);
    $http( {
        method: 'POST',
        url: 'http://localhost:8183/instance/edit',
        data: $.param(($scope.dummyUser)),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .success(function(data) {
        $.each(data, function(index) {
          console.log(JSON.stringify(data[index].msg));
        })
      });
      $scope.formDataEdit = {};
  }

  $scope.loadInstance = function() {
    $http({
        method: 'POST',
        url: 'http://localhost:8183/user/instances',
        data: $.param($scope.dummyUser),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .success(function(data) {

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

              // $scope.dummyInstance.id_user = data.json[i].id_user;
              // $scope.dummyInstance.uuid_vm = data.json[i].uuid_vm;
              // $scope.dummyInstance.token = "32fb7f591b9f3c7d745ddd51670f2d109b54662b704078c06e14335e241bcb70" ;

              // $http({
              //   method: 'POST',
              //   url: 'http://localhost:8183/instance/info',
              //   data: $.param($scope.dummyInstance),
              //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
              // })
              // .success(function(data) {
              //     console.log(data);
              // });

            }; // end of loop



        // $http({
        //   method: 'GET',
        //   url: 'http://localhost:8183/plan/price_list',
        // })
        // .success(function(res) {
          
        //   for(i=0; i<res[0].length; i++) {
        //     $scope.pricings.push({
        //       deskripsi_plan: res[0][i].deskripsi_plan,
        //       harga_plan: res[0][i].harga_plan,
        //       id_plan: res[0][i].id_plan,
        //       jumlah_cpu: res[0][i].jumlah_cpu,
        //       jumlah_memori: res[0][i].jumlah_memori,
        //       jumlah_storage: res[0][i].jumlah_storage,
        //       nama_plan: res[0][i].nama_plan
        //     });
        //   };

        //   for(idata=0; idata<data.json.length; idata++) {
        //     for(ires=0; ires<$scope.pricings.length; ires++){
        //       if( $scope.pricings[ires].id_plan == data.json[idata].id_plan  ) {
        //         //console.log($scope.pricings[ires].nama_plan);
        //         $scope.instances.push({
        //           id_instances: data.json[idata].id_instances,
        //           id_user: data.json[idata].id_user,
        //           id_plan: data.json[idata].id_plan,
        //           nama_instance: data.json[idata].nama_instance,
        //           uuid_vm: data.json[idata].uuid_vm,
        //           status_pembayaran: data.json[idata].status_pembayaran,
        //           tanggal: data.json[idata].tanggal,
        //           started: data.json[idata].started,
        //           deleted: data.json[idata].deleted,
        //           tipe_instance: $scope.pricings[ires].nama_plan
        //         });
        //       }
        //     }
        //   };
        // });
        
        

      }); 
  }


  $scope.loadInstanceInfo = function() {
    $http({
        method: 'POST',
        url: 'http://localhost:8183/instance/info',
        data: $.param($scope.dummyInstance),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .success(function(data) {
          console.log(data);
      });
  }

});


/* unused */


// myApp.controller("InstanceController", function($scope, $http, $location ,$cookies) {

  
 
//   // Contoh hardcode / dummy id & token buat parameter http request
//   $scope.loggedUser = {
//     id_user: "9",
//     token: "32fb7f591b9f3c7d745ddd51670f2d109b54662b704078c06e14335e241bcb70"
//   };

//   $scope.createInstance = function() {
//     $http({
//         method: 'POST',
//         url: 'http://localhost:8183/instance/create',
//         data: $.param($scope.instanceData),
//         headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
//       })
//       .success(function(data) {
//           console.log("hewo");
//       });
//   }

//   $scope.getInstanceList = function() {
//     $http({
//         method: 'GET',
//         url: 'http://localhost:8183/instance/list',
//       })
//       .success(function(result) {
//           console.log(result);
//       });
//   }

//   $scope.getPricingList = function() {
//      $http({
//         method: 'GET',
//         url: 'http://localhost:8183/plan/price_list',
//       })
//       .success(function(data) {
//           //console.log( data[0].length ); 
//           for(i=0; i<data[0].length; i++) {
//             $scope.pricings.push({
//               deskripsi_plan: data[0][i].deskripsi_plan,
//               harga_plan: data[0][i].harga_plan,
//               id_plan: data[0][i].id_plan,
//               jumlah_cpu: data[0][i].jumlah_cpu,
//               jumlah_memori: data[0][i].jumlah_memori,
//               jumlah_storage: data[0][i].jumlah_storage,
//               nama_plan: data[0][i].nama_plan
//             });
//           };
//           //console.log($scope.pricings[0].id_plan);
//           //console.log($scope.pricings.length);
//       });
//   } 

//   $scope.dummyInstance = {
//     uuid_vm: "01e2709c-3d7f-9d59-b6f6-b0f098584159",
//     id_user: "9",
//     token: "32fb7f591b9f3c7d745ddd51670f2d109b54662b704078c06e14335e241bcb70"
//   };

//   $scope.tryInstance = function() {
//     $http({
//         method: 'POST',
//         url: 'http://localhost:8183/instance/info',
//         data: $.param($scope.dummyInstance),
//         headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
//       })
//       .success(function(data) {
//           console.log("hewo");
//           console.log(data);
//       });
//   }



// });
//   