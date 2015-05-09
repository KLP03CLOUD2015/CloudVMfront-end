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

 // $scope.loginData = $scope.getPriceList;

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
        
          $location.path('/profile');
          $scope.checkUser(); 
    });
  }

});


myApp.controller("InstanceController", function($scope, $http, $location ,$cookies) {
  
  $scope.instanceData = {
	     //   id_user: "9",
			nama_instance: "jokowi21",
            token: "32fb7f591b9f3c7d745ddd51670f2d109b54662b704078c06e14335e241bcb70",
		//	id_plan: "1",
		//	os: "ubuntu"
  };
  
  $scope.oses = [
		{'os': 'ubuntu'},
		{'os': 'debian'},
		{'os': 'centos'},
	];
	
  $scope.os_list = [
        {'lookupCode': 'ubuntu', 'description': 'Ubuntu'},
        {'lookupCode': 'debian', 'description': 'Debian'},
        {'lookupCode': 'centos', 'description': 'Centos'},
   ];
  
  $scope.plans = [
	{'id_plan': '1'},
	{'id_plan': '2'},
	{'id_plan': '3'},
	{'id_plan': '4'},
	{'id_plan': '5'}
  ];
  
  $scope.price_list =[
	    {'lookupCode': '1', 'description': 'Small-1'},
        {'lookupCode': '2', 'description': 'Medium-1'},
        {'lookupCode': '3', 'description': 'Large-1'},
        {'lookupCode': '4', 'description': 'Small-2'},
        {'lookupCode': '5', 'description': 'Large-2'}
  ];
  
  $scope.createInstance = function() {
    $http({
        method: 'POST',
        url: 'http://localhost:8183/instance/create',
        data: $.param($scope.instanceData),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .success(function(data) {
          console.log("harusnya jalan coy");
		 $location.path('/instance')
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
/*
    $scope.getPriceList = function() {
     $http({
        method: 'POST',
        url: 'http://localhost:8183/plan/price_list',
		data: $.param($scope.price_list),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .success(function(data) {
          console.log("woohoo");
		  for(i=0; i<data.json.length; i++) {
          $scope.price_list.push({
            id_plan: data.json[i].id_plan,
            deskripsi_plan: data.json[i].deskripsi_plan,
            harga_plan: data.json[i].harga_plan,
            jumlah_cpu: data.json[i].jumlah_cpu,
            jumlah_memori: data.json[i].jumlah_memori,
            jumlah_storage: data.json[i].jumlah_storage
      });
	       console.log($scope.instances[0].id_plan);
           console.log($scope.instances[2].id_plan);
  }
  */
/*  
    $scope.loadInstance = function() {
    console.log($scope.loggedUser);
    console.log($scope.loggedUser.id_user);
    console.log($scope.loggedUser.token);

    $http({
        method: 'POST',
        url: 'http://localhost:8183/user/instances',
        data: $.param($scope.loggedUser),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .success(function(data) {
        // console.log(data.json.length);
        for(i=0; i<data.json.length; i++) {
          $scope.instances.push({
            id_instances: data.json[i].id_instances,
            id_user: data.json[i].id_user,
            id_plan: data.json[i].id_plan,
            nama_instance: data.json[i].nama_instance,
            uuid_vm: data.json[i].uuid_vm,
            status_pembayaran: data.json[i].status_pembayaran,
            tanggal: data.json[i].tanggal,
            deleted: data.json[i].deleted
          });
        };
      }); 
  } */
});
  