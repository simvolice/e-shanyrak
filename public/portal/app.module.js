/**
 * Created by Admin on 29.09.2016.
 */



var app = angular.module('app', ['ngMaterial', 'ui.router', 'ngMessages', 'ngResource', 'ngSanitize', 'pascalprecht.translate']);






app.config(function ($locationProvider, $translateProvider, $mdDateLocaleProvider) {









    $translateProvider.useStaticFilesLoader({
        prefix: 'i18n/locale-',
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


app.filter('ruFormat', function() {
    return function(x) {
        return d3.format(",.2f")(x);
    };
});





app.controller('MainCtrl', function ($scope, $state, $timeout, $translate, $rootScope, $window) {

    $rootScope.fio = localStorage.getItem("fio");

    $scope.arrRole = [];

    let arrMenuForRolesUser = [


        {state: "main", title: "Мои смарт контракты", icon: "fa-file-alt"},
        {state: "myhouse", title: "Мой дом", icon: "fa-home"},
        {state: "myflat", title: "Моя квартира", icon: "fa-tv"},
        {state: "greencontract", title: "Зеленый контракт", icon: "fa-leaf"},




    ];


    let arrMenuForRolesKSK = [


        {state: "mainksk", title: "Мои смарт контракты"},
        {state: "controlksk", title: "Контроль и мониторинг"}



    ];


    let arrMenuForRolesSem = [


        {state: "mainsem", title: "Мои смарт контракты"},
        {state: "controlsem", title: "Расход ресурсов"},
        {state: "analyticssem", title: "Анализ данных"},



    ];

    let arrMenuForRolesGos = [


        {state: "maingos", title: "Анализ данных"}


    ];




    if (localStorage.getItem("role") === "user"){


        $scope.arrRole = arrMenuForRolesUser;



    }





    $scope.exitClk = function () {


        localStorage.removeItem('sessionToken');
        localStorage.removeItem('fio');
        localStorage.removeItem('address');
        localStorage.removeItem('role');


        window.location.replace("/");


    };


    $scope.changeLanguage = function (langKey) {
        $translate.use(langKey);

    };







});


