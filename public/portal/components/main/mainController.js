/**
 * Created by Admin on 29.09.2016.
 */



angular.module('app').controller('HomePageCtrl', function ($scope, $mdDialog, $mdToast, AddTransactionHash, GetAllTransactionHash, $rootScope) {

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




              $scope.data = JSON.parse(decodeDataFromTransaction(objTx.input)[1].value);




            });










        $scope.closeDialog = function () {
            $("#videohead-pro").css("z-index", 1000);
            $mdDialog.hide();
        }



    }

    function DialogControllerNewContract($scope) {





        $scope.data = {


            dataForBlackChain: {},
            selectOrg: "",
            nameContract: "",
            allOrgs: [

                {_id: 0, name: "Астанаэнергосбыт"},


                {_id: 1, name: "Астана-Тазарту"},
                {_id: 2, name: "Астана газ сервис"},
                {_id: 3, name: "Астана су арнасы"},
                {_id: 4, name: "Лифтовые службы в г. Астана"},
                {_id: 5, name: "Клининговая компания"},




                ]


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
            var newContractInstance = new web3.eth.Contract([{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"propforsaves","outputs":[{"name":"jsStringifyObject","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_address","type":"address"}],"name":"getDatajsStringifyObject","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"},{"name":"_jsStringifyObject","type":"string"}],"name":"setDatajsStringifyObject","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}], "0x991f6c686227be66999e8e542ddd8D28c5e49Bcf", {
                from: web3.eth.defaultAccount,
                gasPrice: '0',
                gas: 1500000,

            });



            startTransactionInNewContractInstance(newContractInstance);



        };


        function startTransactionInNewContractInstance(newContractInstance) {



            $scope.data.dataForBlackChain = {

                name_contract: $scope.data.nameContract,
                number_contract: 1515,

                name_uslugi: "Тестовая услуга",


                iin_udv_zakazchika: "890712350030",
                fio_zakazchika: "Иванов Иван Иванович",

                address_zakazchika: "Республика Казахстан, 010000 г. Астана, ул. Тельмана, 55",
                udv_create_org: "МВД РК",
                udv_create_date: "13.04.2012",
                udv_number: "033200972",




                name_org : $scope.data.selectOrg,
                address_org: "Республика Казахстан, 010000 г. Астана, ул. Мира, 55",
                bin_ispolnitel: "161040023528",
                bank_name_org: "ДБ АО Тестовый Банк",
                iik_ispolnitel: "KZ44914012203KZ003U6"


            };




            newContractInstance.methods.setDatajsStringifyObject(localStorage.getItem("address"), JSON.stringify($scope.data.dataForBlackChain)).send()
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

