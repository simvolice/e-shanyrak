/**
 * Created by Admin on 29.09.2016.
 */



angular.module('app').controller('MyHouseCtrl', function ($scope, $mdDialog, $mdToast, $http) {



    function summArr(arr) {
        if (arr.length === 0){

            return 0;

        } else {



            let [firstElem, ...restElem] = arr;

            return firstElem + summArr(restElem);

        }
    }




    $scope.sendToSrv = function () {

        $scope.allSumArr = [];


        var request = {
            method: 'POST',
            url: '/getdata',
            data: $scope.data


        };

        $http(request)
            .then(function successCallback(response) {


                let categArr = [];
                let dataQ = [];
                let dataT1 = [];
                let dataT2 = [];
                let dataM1 = [];
                let dataM2 = [];
                let dataP1 = [];
                let dataP2 = [];
                let dataV1 = [];
                let dataV2 = [];


                $scope.resultFromDb = response.data.resultFromDb;


                for (const itemArr of $scope.resultFromDb.aaData) {


                    categArr.push(itemArr.truedate);
                    dataQ.push(Number.parseFloat(itemArr.q.replace(",", ".")));
                    dataT1.push(Number.parseFloat(itemArr.t1.replace(",", ".")));
                    dataT2.push(Number.parseFloat(itemArr.t2.replace(",", ".")));
                    dataM1.push(Number.parseFloat(itemArr.m1.replace(",", ".")));
                    dataM2.push(Number.parseFloat(itemArr.m2.replace(",", ".")));
                    dataP1.push(Number.parseFloat(itemArr.p1.replace(",", ".")));
                    dataP2.push(Number.parseFloat(itemArr.p2.replace(",", ".")));
                    dataV1.push(Number.parseFloat(itemArr.v1.replace(",", ".")));
                    dataV2.push(Number.parseFloat(itemArr.v2.replace(",", ".")));

                }




                bb.generate({
                    data: {

                        columns: [

                            ["Теплопотребление, в Гкал", ...dataQ]

                        ]
                    },
                   axis: {
                       x: {
                           type: "category",
                           categories: categArr
                       }
                   },

                   grid: {
                       y: {
                           show: true,

                       }
                   },
                    bindto: "#chartq"
                });



                bb.generate({
                    data: {

                        columns: [

                            ["Температура на подаче, в Цельсиях", ...dataT1],
                            ["Температура на обратке, в Цельсиях", ...dataT2],

                        ]
                    },
                    axis: {
                        x: {
                            type: "category",
                            categories: categArr
                        }
                    },

                    grid: {
                        y: {
                            show: true,

                        }
                    },
                    bindto: "#chartt"
                });



                bb.generate({
                    data: {

                        columns: [

                            ["Массовый расход на подаче, в тоннах", ...dataM1],
                            ["Массовый расход на обратке, в тоннах", ...dataM2],

                        ]
                    },
                    axis: {
                        x: {
                            type: "category",
                            categories: categArr
                        }
                    },

                    grid: {
                        y: {
                            show: true,

                        }
                    },
                    bindto: "#chartm"
                });


                bb.generate({
                    data: {

                        columns: [

                            ["Давление на подаче, в Ат", ...dataP1],
                            ["Давление на обратке, в Ат", ...dataP2],

                        ]
                    },
                    axis: {
                        x: {
                            type: "category",
                            categories: categArr
                        }
                    },

                    grid: {
                        y: {
                            show: true,

                        }
                    },
                    bindto: "#chartp"
                });

                bb.generate({
                    data: {

                        columns: [

                            ["Объёмный расход на подаче, в м3", ...dataV1],
                            ["Объёмный расход на обратке, в м3", ...dataV2],

                        ]
                    },
                    axis: {
                        x: {
                            type: "category",
                            categories: categArr
                        }
                    },

                    grid: {
                        y: {
                            show: true,

                        }
                    },
                    bindto: "#chartv"
                });





                $scope.allSumArr.push(summArr(dataQ));
                $scope.allSumArr.push(summArr(dataT1));
                $scope.allSumArr.push(summArr(dataT2));
                $scope.allSumArr.push(summArr(dataM1));
                $scope.allSumArr.push(summArr(dataM2));
                $scope.allSumArr.push(summArr(dataP1));
                $scope.allSumArr.push(summArr(dataP2));
                $scope.allSumArr.push(summArr(dataV1));
                $scope.allSumArr.push(summArr(dataV2));



                $scope.gkalInSum = summArr(dataQ);
                $scope.gkalInCurrency = summArr(dataQ) * 2642.98;



                $("#showChart").css("visibility", "visible");



            }, function errorCallback(response) {

            });

    };



});

