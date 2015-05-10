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
  $scope.user = {};
  $scope.loggedUser = {
    //id_user: "1",
    //token: "32fb7f591b9f3c7d745ddd51670f2d109b54662b704078c06e14335e241bcb70"
  };

  // DEKLRASI VARIABEL
  $scope.loggedUserProfile = {};

  $scope.registerUser = function() {
    console.log("Yay");
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

  $scope.loginData = function(response) {
	  $http({
        method: 'GET',
        url: 'http://localhost:8183/user/list'
      })
      .success(function(result) {
          console.log("Success: " + result.status);
      });
  }

  $scope.checkUser = function() {
    //console.log("mumumu");
    
  }
  

    $scope.loadUserProfile = function() {

      // MAKE A DUMMY 
      $scope.loggedUser = {
        id_user: "1",
		nama_user: "Budi",
		nama_perusahaan_user: "budicorp",
		alamat_user: "Keputih",
		no_telp_user: "54674637",
		email_user: "budi@budi.com",
		password_user: "123424hdgfd",
		nama_cc_user: "budi",
		alamat_cc_user: "Keputih",
		nomor_cc_user: "1234567",
		nomor_vcv_user: "123",
		expire_month_cc_user: 12,
		expire_year_cc_user: 2015,
        token: "32fb7f591b9f3c7d745ddd51670f2d109b54662b704078c06e14335e241bcb70"
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
                      expire_month_cc_user: res.json[0].expire_month_cc_user,
                      expire_year_cc_user: res.json[0].expire_year_cc_user
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
      console.log("kesini");

          $cookies.id_user = JSON.stringify(data.id_user);
          $cookies.token = (JSON.stringify(data.token)).substring(1,65);

          $scope.loggedUser = { 
            id_user: $cookies.id_user,
            token: $cookies.token
          };
        
          $location.path('/profile');

          $http({
            method: 'POST',
            url: 'http://localhost:8183/user/profile',
            data: $.param($scope.loggedUser),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
          })
          .success(function(res) {
              $cookies.nama_user = res.json[0].nama_user;
              console.log($cookies.nama_user);

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
                      expire_month_cc_user: res.json[0].expire_month_cc_user,
                      expire_year_cc_user: res.json[0].expire_year_cc_user
              }
            
            console.log($scope.loggedUserProfile);
          });
    });
  }

});


myApp.controller("InstanceController", function($scope, $http, $location ,$cookies) {

  $scope.instanceData = {};

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

});
  