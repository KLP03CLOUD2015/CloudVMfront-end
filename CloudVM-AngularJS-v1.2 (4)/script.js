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

  ;


  // // if not match with any route config then send to home page
  // .otherwise({
  //   redirectTo: '/home'
  // });
});
 
// create the controller and inject Angular's $scope
// set for Route Controller
myApp.controller('RouteCtrl', function($scope) {
  /** create $scope.template **/
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
    "createInstance": "views_user/createInstance_user.html",
    "profile": "views_user/profile_user.html",
    "instance": "views_user/instance_user.html",
    "editInstance": "views_user/editInstance_user.html",
    "editProfile": "views_user/editProfile_user.html"
  }
 
  /** now after this ng-include in uirouter.html set and take template from their respective path **/
});


myApp.controller("UserController", function($scope, $http, $location, $cookies) {
  
  $scope.formData = {};
  $scope.loggedUser = {};
  $scope.user = {};

  $scope.registerUser = function() {
    //console.log("Yay");
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

  $scope.checkUser = function() {
    console.log("mumumu");
    $http({
        method: 'POST',
        url: 'http://localhost:8183/user/profile',
        data: $.param($scope.loggedUser),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .success(function(data) {
          $cookies.nama_user = data.json[0].nama_user;
          console.log($cookies.nama_user);
      });
  }

  $scope.loginUser = function() {x
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
        
          $location.path('/profile');
          $scope.checkUser(); 
    });
  }

});


myApp.controller("InstanceController", function($scope, $http, $location ,$cookies) {

  $scope.instances = [];
  $scope.pricings = [];
  $scope.dummy = {
    name: 'this is a f dummy you cant edit me',
    age: 56
  };
 
  // Contoh hardcode / dummy id & token buat parameter http request
  $scope.loggedUser = {
    id_user: "9",
    token: "32fb7f591b9f3c7d745ddd51670f2d109b54662b704078c06e14335e241bcb70"
  };

  $scope.createInstance = function() {
    $http({
        method: 'POST',
        url: 'http://localhost:8183/instance/create',
        data: $.param($scope.instanceData),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .success(function(data) {
          console.log("hewo");
      });
  }

  $scope.getInstanceList = function() {
    $http({
        method: 'GET',
        url: 'http://localhost:8183/instance/list',
      })
      .success(function(result) {
          console.log(result);
      });
  }

  $scope.getPricingList = function() {
     $http({
        method: 'GET',
        url: 'http://localhost:8183/plan/price_list',
      })
      .success(function(data) {
          //console.log( data[0].length ); 
          for(i=0; i<data[0].length; i++) {
            $scope.pricings.push({
              deskripsi_plan: data[0][i].deskripsi_plan,
              harga_plan: data[0][i].harga_plan,
              id_plan: data[0][i].id_plan,
              jumlah_cpu: data[0][i].jumlah_cpu,
              jumlah_memori: data[0][i].jumlah_memori,
              jumlah_storage: data[0][i].jumlah_storage,
              nama_plan: data[0][i].nama_plan
            });
          };
          //console.log($scope.pricings[0].id_plan);
          //console.log($scope.pricings.length);
      });
  } 

  $scope.loadInstance = function() {

    $http({
        method: 'POST',
        url: 'http://localhost:8183/user/instances',
        data: $.param($scope.loggedUser),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .success(function(data) {

        // for(i=0; i<data.json.length; i++) {
        //   $scope.instances.push({
        //     id_instances: data.json[i].id_instances,
        //     id_user: data.json[i].id_user,
        //     id_plan: data.json[i].id_plan,
        //     nama_instance: data.json[i].nama_instance,
        //     uuid_vm: data.json[i].uuid_vm,
        //     status_pembayaran: data.json[i].status_pembayaran,
        //     tanggal: data.json[i].tanggal,
        //     deleted: data.json[i].deleted
        //   });
        // };

        $http({
          method: 'GET',
          url: 'http://localhost:8183/plan/price_list',
        })
        .success(function(res) {
          
          for(i=0; i<res[0].length; i++) {
            $scope.pricings.push({
              deskripsi_plan: res[0][i].deskripsi_plan,
              harga_plan: res[0][i].harga_plan,
              id_plan: res[0][i].id_plan,
              jumlah_cpu: res[0][i].jumlah_cpu,
              jumlah_memori: res[0][i].jumlah_memori,
              jumlah_storage: res[0][i].jumlah_storage,
              nama_plan: res[0][i].nama_plan
            });
          };

          for(idata=0; idata<data.json.length; idata++) {
            for(ires=0; ires<$scope.pricings.length; ires++){
              if( $scope.pricings[ires].id_plan == data.json[idata].id_plan  ) {
                //console.log($scope.pricings[ires].nama_plan);
                $scope.instances.push({
                  id_instances: data.json[idata].id_instances,
                  id_user: data.json[idata].id_user,
                  id_plan: data.json[idata].id_plan,
                  nama_instance: data.json[idata].nama_instance,
                  uuid_vm: data.json[idata].uuid_vm,
                  status_pembayaran: data.json[idata].status_pembayaran,
                  tanggal: data.json[idata].tanggal,
                  deleted: data.json[idata].deleted,
                  tipe_instance: $scope.pricings[ires].nama_plan
                });
              }
            }
          };

          //console.log($scope.instances);          

        });

      }); 
  }

});
  