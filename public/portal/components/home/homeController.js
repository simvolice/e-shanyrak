/**
 * Created by Admin on 29.09.2016.
 */



angular.module('app').controller('homeCtrl', function ($scope, $http, $mdToast) {



    let request = {
        method: 'GET',
        url: '/getwaters'



    };



    $http(request)
        .then(function successCallback(response) {


           $scope.coldWater = response.data.resultFromDb.data[0].counter1;
           $scope.hotWater = response.data.resultFromDb.data[0].counter2;


           $scope.waterColdInCurrence = 46.21 * $scope.coldWater;
           $scope.waterHotInCurrence = 	159.64 * $scope.hotWater;

        }, function errorCallback(response) {

        });












});

