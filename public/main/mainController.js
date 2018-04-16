/**
 * Created by Admin on 29.09.2016.
 */



angular.module('land').controller('mainPageCtrl', function ($sce, $scope, $stateParams, $http) {






    $('.progression-studios-slider').flexslider({
        slideshow: true,  		/* Autoplay True/False */
        slideshowSpeed: 8000,	/* Autoplay Speed */
        animation: "fade",		/* Slideshow Transition Animation */
        animationSpeed: 800, 	/* Slide Transition Speed */
        directionNav: true,		/* Left/Right Navigation True/False */
        controlNav: true,		/* Bullet Navigaion True/False */
        prevText: "",
        nextText: "",
    });





    var map;

    DG.then(function () {
        map = DG.map('map', {
            center: [51.135774, 71.360891],
            zoom: 18
        });




        DG.marker([51.135774, 71.360891]).addTo(map).bindPopup(`Адрес: ул. Ч. Айтматова, 31, Управляющая компания: "Тестовая", Обслуживающая компания: "Тестовая", Участковый: "Иванов И.И"`);

    });







});

