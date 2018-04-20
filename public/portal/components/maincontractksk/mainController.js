/**
 * Created by Admin on 29.09.2016.
 */



angular.module('app').controller('maincontractkskCtrl', function ($scope, $mdDialog, $mdToast, SetStatusTransactionHash, GetAllTransactionHash, $rootScope) {

    var web3 = new Web3('http://localhost:8545');

    const testABI = [{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"propforsaves","outputs":[{"name":"jsStringifyObject","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_address","type":"address"}],"name":"getDatajsStringifyObject","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"},{"name":"_jsStringifyObject","type":"string"}],"name":"setDatajsStringifyObject","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];
    abiDecoder.addABI(testABI);




    $rootScope.data = [];


    GetAllTransactionHash.save({sessionToken: localStorage.getItem('sessionToken')}, function (result) {



   if (result.code === 0) {

       $rootScope.data = result.resultFromDb;



   } else {


       $rootScope.data = [];


   }



    });




    function decodeDataFromTransaction(txInput) {





           let decodeHex = abiDecoder.decodeMethod(txInput);


           return decodeHex.params;








    }




    $scope.view = function (data, ev) {





        $("#videohead-pro").css("z-index", 50);

        $mdDialog.show({
            controller: DialogControllerViewContract,
            locals:{id: data._id, txHash: data.transactionHash},
            templateUrl: 'components/maincontractksk/dialog_template_view.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: true // Only for -xs, -sm breakpoints.
        });





    };


    function DialogControllerViewContract($scope, txHash, id, SetStatusTransactionHash) {





        web3.eth.getTransaction(txHash)
            .then(function (objTx) {




              $scope.data = JSON.parse(decodeDataFromTransaction(objTx.input)[1].value);




            });









        $scope.writeOk = function(){


            SetStatusTransactionHash.save({sessionToken: localStorage.getItem('sessionToken'), id: id, status: "Подписан"}, function (result) {


                GetAllTransactionHash.save({sessionToken: localStorage.getItem('sessionToken')}, function (result) {



                    if (result.code === 0) {

                        $rootScope.data = result.resultFromDb;



                    } else {


                        $rootScope.data = [];


                    }



                });


                $("#videohead-pro").css("z-index", 1000);
                $mdDialog.hide();

                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Договор успешно подписан.')
                        .position('bottom left')
                        .hideDelay(3000)
                );








            });




        };



        $scope.closeDialog = function () {



            SetStatusTransactionHash.save({sessionToken: localStorage.getItem('sessionToken'), id: id, status: "Отклонен"}, function (result) {


                GetAllTransactionHash.save({sessionToken: localStorage.getItem('sessionToken')}, function (result) {



                    if (result.code === 0) {

                        $rootScope.data = result.resultFromDb;



                    } else {


                        $rootScope.data = [];


                    }



                });


                $("#videohead-pro").css("z-index", 1000);
                $mdDialog.hide();

                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Вы отклонили договор.')
                        .position('bottom left')
                        .hideDelay(3000)
                );








            });

        }


        $scope.closeDialogOnly = function () {
            $("#videohead-pro").css("z-index", 1000);
            $mdDialog.hide();
        };



    }





});

