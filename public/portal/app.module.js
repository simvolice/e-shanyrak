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

        {state: "myhouse", title: "Мой дом", icon: "fa-home"},

        {state: "myflat", title: "Моя квартира", icon: "fa-tv"},

        {state: "housemanage", title: "Управление домом", icon: "fa-tv"},

        {state: "main", title: "Смарт контракты", icon: "fa-file-alt"},


        {state: "greencontract", title: "Зеленый контракт", icon: "fa-leaf"},




    ];


    let arrMenuForRolesKSK = [


        {state: "mainksk", title: "Информация о кск", icon: "fa-file-alt"},
        {state: "budgetksk", title: "Бюджет", icon: "fa-database"},
        {state: "planksk", title: "План работ", icon: "fa-database"},
        {state: "messageksk", title: "Сообщения", icon: "fa-database"},
        {state: "serviceksk", title: "Услуги", icon: "fa-database"}



    ];


    let arrMenuForRolesSem = [


        {state: "mainsem", title: "Текущая информация", icon: "fa-file-alt"},
        {state: "financesem", title: "Финансовые показатели", icon: "fa-money-bill-alt"},
        {state: "powersem", title: "Производственные показатели", icon: "fa-database"},
        {state: "datasem", title: "Данные", icon: "fa-database"},
        {state: "notifsem", title: "Оповещения потребителей и КСК", icon: "fa-database"},



    ];

    let arrMenuForRolesGos = [


        {state: "maingos", title: "Анализ данных", icon: "fa-database"}


    ];


    let arrMenuForRolesCms = [


        {state: "maincms", title: "Работа над сайтом", icon: "fa-edit"}


    ];

    if (localStorage.getItem("role") === "user"){


        $scope.arrRole = arrMenuForRolesUser;



    } else if(localStorage.getItem("role") === "ksk") {


        $scope.arrRole = arrMenuForRolesKSK;



    } else if (localStorage.getItem("role") === "sem") {

        $scope.arrRole = arrMenuForRolesSem;



    }else if (localStorage.getItem("role") === "gos") {

        $scope.arrRole = arrMenuForRolesGos;



    }else if (localStorage.getItem("role") === "cms") {

        $scope.arrRole = arrMenuForRolesCms;



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


