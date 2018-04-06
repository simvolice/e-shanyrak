/**
 * Created by Admin on 29.09.2016.
 */



angular.module('app').controller('HomePageCtrl', function ($scope, $mdDialog, $mdToast, AddTransactionHash, GetAllTransactionHash, $rootScope) {

    var web3 = new Web3('http://localhost:8545');

    const testABI = [{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"propforsaves","outputs":[{"name":"number_contract","type":"uint256"},{"name":"iin_udv_ispolnitel","type":"string"},{"name":"iin_udv_zakazchika","type":"string"},{"name":"name_org","type":"string"},{"name":"address_org","type":"string"},{"name":"number_schet_org","type":"string"},{"name":"bank_org","type":"string"},{"name":"name_contract","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"},{"name":"_number_contract","type":"uint256"},{"name":"_iin_udv_ispolnitel","type":"string"},{"name":"_iin_udv_zakazchika","type":"string"},{"name":"_name_org","type":"string"},{"name":"_address_org","type":"string"},{"name":"_number_schet_org","type":"string"},{"name":"_bank_org","type":"string"},{"name":"_name_contract","type":"string"}],"name":"setInstructor","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];
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




        const decodedData = abiDecoder.decodeMethod(txInput);


        return decodedData.params;




    }



    $scope.newContract = function (ev) {


        $("#videohead-pro").css("z-index", 50);

        $mdDialog.show({
            controller: DialogControllerNewContract,
            locals:{},
            templateUrl: 'components/main/dialog_template.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: true // Only for -xs, -sm breakpoints.
        });





    };


    $scope.view = function (txHash, ev) {


        $("#videohead-pro").css("z-index", 50);

        $mdDialog.show({
            controller: DialogControllerViewContract,
            locals:{txHash: txHash},
            templateUrl: 'components/main/dialog_template_view.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: true // Only for -xs, -sm breakpoints.
        });





    };


    function DialogControllerViewContract($scope, txHash) {


        web3.eth.getTransaction(txHash)
            .then(function (objTx) {
                $scope.data = decodeDataFromTransaction(objTx.input);

                $scope.modelRusForData = [
                    "Ваш адрес внутри сети блокчейн",
                    "Номер контракта",
                    "ИНН УДВ. исполнителя",
                    "ИНН УДВ. заказчика",
                    "Имя компании",
                    "Адрес компании",
                    "Счет компании",
                    "Банк компании",
                    "Имя контракта"
                ];






                for (let [index, itemObjInputTx] of $scope.data.entries()) {


                    itemObjInputTx["modelRusForData"] = $scope.modelRusForData[index];



                }






            });










        $scope.closeDialog = function () {
            $("#videohead-pro").css("z-index", 1000);
            $mdDialog.hide();
        }



    }

    function DialogControllerNewContract($scope) {





        $scope.data = {

            selectOrg: "",
            nameContract: "",
            allOrgs: [{_id: 0, name: "Энерго компания"}, {_id: 1, name: "Вода компания"}]


        };

        $scope.closeDialog = function () {
            $("#videohead-pro").css("z-index", 1000);
            $mdDialog.hide();
        };


        $scope.saveContract = function () {

            $("#videohead-pro").css("z-index", 1000);
            $mdDialog.hide();



            web3.eth.getAccounts().then(createNewContract);


        };



        function createNewContract(defaultAddress){

            web3.eth.defaultAccount = defaultAddress[0];


            //TODO Всегда надо диплоить контракт, чтобы забрать адрес
            var newContractInstance = new web3.eth.Contract([{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"propforsaves","outputs":[{"name":"number_contract","type":"uint256"},{"name":"iin_udv_ispolnitel","type":"string"},{"name":"iin_udv_zakazchika","type":"string"},{"name":"name_org","type":"string"},{"name":"address_org","type":"string"},{"name":"number_schet_org","type":"string"},{"name":"bank_org","type":"string"},{"name":"name_contract","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"},{"name":"_number_contract","type":"uint256"},{"name":"_iin_udv_ispolnitel","type":"string"},{"name":"_iin_udv_zakazchika","type":"string"},{"name":"_name_org","type":"string"},{"name":"_address_org","type":"string"},{"name":"_number_schet_org","type":"string"},{"name":"_bank_org","type":"string"},{"name":"_name_contract","type":"string"}],"name":"setInstructor","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}], "0xC2D3d78dC289D24F0942Dc9fe37aFffF7c04fb83", {
                from: web3.eth.defaultAccount,
                gasPrice: '0',
                gas: 1500000,

            });



            startTransactionInNewContractInstance(newContractInstance);



        };


        function startTransactionInNewContractInstance(newContractInstance) {





            newContractInstance.methods.setInstructor(localStorage.getItem("address"), 1111, "Test1", "Test2", $scope.data.selectOrg, "Test4", "Test5", "Test6", $scope.data.nameContract).send()
                .then(saveTransactionHashToDB);





        }


        function saveTransactionHashToDB(resultObj) {



            AddTransactionHash.save({sessionToken: localStorage.getItem('sessionToken'), transactionHash: resultObj.transactionHash, nameContract: $scope.data.nameContract, blockNumber: resultObj.blockNumber}, function (result) {


                if (result.code === 0) {

                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Вы успешно создали смарт - контракт.')
                            .position('bottom left')
                            .hideDelay(3000)
                    );



                    GetAllTransactionHash.save({sessionToken: localStorage.getItem('sessionToken')}, function (result) {



                        if (result.code === 0) {

                            $rootScope.data = result.resultFromDb;



                        } else {


                            $rootScope.data = [];


                        }



                    });





                } else {


                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Создание смарт - контракта прошло неудачно, попробуйте снова.')
                            .position('bottom left')
                            .hideDelay(3000)
                    );

                }

            });




        }




    }




});

