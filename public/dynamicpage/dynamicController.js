/**
 * Created by Admin on 29.09.2016.
 */



angular.module('land').controller('dynamicPageCtrl', function ($sce, $scope, $stateParams, $http) {



    $scope.readonly = true;
    $scope.removable = false;



    $http({
        method : "GET",
        url : "/getonepost?id=" + $stateParams.id
    }).then(function mySuccess(response) {


        $scope.data = response.data.resultFromDb;




        $scope.postHTML = $sce.trustAsHtml($scope.data.postHTML);



    }, function myError(response) {




    });










});

