/**
 * Created by Admin on 29.09.2016.
 */



angular.module('app').controller('MyHouseCtrl', function ($scope, $mdDialog, $mdToast, $http) {



    var request = {
        method: 'GET',
        url: '/getdata',


    };


    $http(request)
        .then(function successCallback(response) {




            $scope.data = response.data.resultFromDb;



        }, function errorCallback(response) {

        });






});

