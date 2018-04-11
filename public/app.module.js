/**
 * Created by Admin on 29.09.2016.
 */



var app = angular.module('land', ['ngMaterial', 'ui.router', 'ngMessages', 'ngResource', 'ngSanitize', 'pascalprecht.translate']);






app.config(function ($locationProvider, $translateProvider, $mdDateLocaleProvider) {









    $translateProvider.useStaticFilesLoader({
        prefix: 'portal/i18n/locale-',
        suffix: '.json'
    });
    $translateProvider.preferredLanguage('ru');
    $translateProvider.useSanitizeValueStrategy('sanitizeParameters');

});





app.directive('ngFiles', ['$parse', function ($parse) {

  function fn_link(scope, element, attrs) {
    var onChange = $parse(attrs.ngFiles);
    element.on('change', function (event) {
      onChange(scope, { $files: event.target.files });
    });
  };

  return {
    link: fn_link
  }
} ]);

angular.module('land').factory("Allmenus", function($resource) {
    return $resource("/allmenus");
});

app.controller('MainCtrl', function ($scope, $state, $timeout, $translate, $rootScope, $window, Allmenus) {





    Allmenus.get(function (result) {



        if (result.resultFromDb.length !== 0) {


            $scope.arrMenu = result.resultFromDb[0].menuArr;


        }


    });












    $scope.changeLanguage = function (langKey) {
        $translate.use(langKey);

    };







});


