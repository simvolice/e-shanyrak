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


        {state: "main", title: "Мои смарт контракты", icon: "fa-file-alt"},
        {state: "controlksk", title: "Контроль и мониторинг", icon: "fa-database"}



    ];


    let arrMenuForRolesSem = [


        {state: "main", title: "Мои смарт контракты", icon: "fa-file-alt"},
        {state: "controlsem", title: "Расход ресурсов", icon: "fa-money-bill-alt"},
        {state: "analyticssem", title: "Анализ данных", icon: "fa-database"},



    ];

    let arrMenuForRolesGos = [


        {state: "maingos", title: "Анализ данных", icon: "fa-database"}


    ];




    if (localStorage.getItem("role") === "user"){


        $scope.arrRole = arrMenuForRolesUser;



    } else if(localStorage.getItem("role") === "ksk") {


        $scope.arrRole = arrMenuForRolesKSK;



    } else if (localStorage.getItem("role") === "sem") {

        $scope.arrRole = arrMenuForRolesSem;



    }else if (localStorage.getItem("role") === "gos") {

        $scope.arrRole = arrMenuForRolesGos;



    }



    $scope.goToProfile = function(){


        $("#header-user-profile").removeClass("active");
        $("#header-user-notification").removeClass("active");
        $state.go("myprofile");

    };




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


