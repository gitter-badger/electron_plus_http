angular.module('ionic_starter', ['ionic']);

angular.module('ionic_starter').run(function($rootScope, $ionicPlatform) {
  return $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      return StatusBar.styleDefault();
    }
  });
});

angular.module('ionic_starter').config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  var param;
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
  param = function(obj) {
    var fullSubName, i, innerObj, name, query, subName, subValue, value;
    query = '';
    name = void 0;
    value = void 0;
    fullSubName = void 0;
    subName = void 0;
    subValue = void 0;
    innerObj = void 0;
    i = void 0;
    for (name in obj) {
      name = name;
      value = obj[name];
      if (value instanceof Array) {
        for (i in value) {
          i = i;
          subValue = value[i];
          fullSubName = name + '[' + i + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      } else if (value instanceof Object) {
        for (subName in value) {
          subName = subName;
          subValue = value[subName];
          fullSubName = name + '[' + subName + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      } else if (value !== void 0 && value !== null) {
        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
      }
    }
    if (query.length) {
      return query.substr(0, query.length - 1);
    } else {
      return query;
    }
  };
  $httpProvider.defaults.transformRequest = function(data, getHeaders) {
    return param(data);
  };
  $stateProvider.state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html'
  });
  $stateProvider.state('app.home', {
    url: '/home',
    views: {
      'menu_content': {
        templateUrl: 'templates/home.html',
        controller: 'HomeController'
      }
    }
  });
  return $urlRouterProvider.otherwise('/app/home');
});

angular.module('ionic_starter').controller('HomeController', function($scope, $interval, $http) {});

angular.module('ionic_starter').service('Example', function($q, $http) {
  var urlBase;
  urlBase = '';
  this.test = function() {
    var deferred;
    deferred = $q.defer();
    $http({
      url: urlBase + 'test',
      method: 'POST'
    }).then(function(data) {
      return deferred.resolve(data);
    }, function(data) {
      return deferred.reject(data);
    });
    return deferred.promise;
  };
  return this;
});
