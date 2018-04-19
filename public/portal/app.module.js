/**
 * Created by Admin on 29.09.2016.
 */



var app = angular.module('app', ['ngMaterial', 'ui.router', 'ngMessages', 'ngResource', 'ngSanitize', 'pascalprecht.translate', 'ngMaterialDatePicker']);






app.config(function ($locationProvider, $translateProvider, $mdDateLocaleProvider) {



    moment.locale("ru");
    var localeDate = moment.localeData();

    $mdDateLocaleProvider.months = localeDate.months();
    $mdDateLocaleProvider.shortMonths = localeDate.monthsShort();
    $mdDateLocaleProvider.days = localeDate.weekdays();
    $mdDateLocaleProvider.shortDays = localeDate.weekdaysMin();




    $mdDateLocaleProvider.formatDate = function(date) {
        var m = moment(date);
        return m.format('L');
    };



    $mdDateLocaleProvider.firstDayOfWeek = 1;







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


var locale = {
    "decimal": ",",
    "thousands": "\u00A0",
    "grouping": [3],
    "currency": ["", " тнг."],
    "dateTime": "%A, %e %B %Y г. %X",
    "date": "%d.%m.%Y",
    "time": "%H:%M:%S",
    "periods": ["AM", "PM"],
    "days": ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"],
    "shortDays": ["вс", "пн", "вт", "ср", "чт", "пт", "сб"],
    "months": ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"],
    "shortMonths": ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"]
};


d3.formatDefaultLocale(locale);




app.controller('MainCtrl', function ($scope, $state, $timeout, $translate, $rootScope, $window) {








    $rootScope.fio = localStorage.getItem("fio");

    $scope.arrRole = [];

    let arrMenuForRolesUser = [
        {state: "myflat", title: "Моя квартира", icon: "fa-tv"},



        {state: "myhouse", title: "Мой дом", icon: "fa-home"},



        {state: "housemanage", title: "Управление домом", icon: "fa-gavel"},

        {state: "main", title: "Смарт договор", icon: "fa-file-alt"},


        {state: "greencontract", title: "Зеленый контракт", icon: "fa-leaf"},




    ];


    let arrMenuForRolesKSK = [


        {state: "mainksk", title: "Информация о кск", icon: "fa-file-alt"},
        {state: "budgetksk", title: "Бюджет", icon: "fa-database"},
        {state: "planksk", title: "План работ", icon: "fa-database"},
      /*  {state: "messageksk", title: "Сообщения", icon: "fa-database"},*/
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


