/**
 * Created by Admin on 29.09.2016.
 */



angular.module('app').controller('MyHouseCtrl', function ($scope, $mdDialog, $mdToast, $http) {



    $scope.dateNow = moment().format("LL");

    function summArr(arr) {
        if (arr.length === 0){

            return 0;

        } else {



            let [firstElem, ...restElem] = arr;

            return firstElem + summArr(restElem);

        }
    }




    $scope.data = {

    dateFrom: new Date(),
    dateTo: new Date(),
    dateFromHoure: new Date()

};


    let request = {
        method: 'POST',
        url: '/getdatahoure',
        data: $scope.data


    };



    $http(request)
        .then(function successCallback(response) {


            let dataQ = [];


            $scope.resultFromDbLast = response.data.resultFromDb;




            for (const itemArr of $scope.resultFromDbLast.aaData) {
                dataQ.push(Number.parseFloat(itemArr.q.replace(",", ".")));

            }

            $scope.qlast  = summArr(dataQ).toFixed(3);
            $scope.t1last = $scope.resultFromDbLast.aaData[0].t1;
            $scope.t2last = $scope.resultFromDbLast.aaData[0].t2;
            $scope.m1last = $scope.resultFromDbLast.aaData[0].m1;
            $scope.m2last = $scope.resultFromDbLast.aaData[0].m2;


            $scope.p1last = $scope.resultFromDbLast.aaData[0].p1;
            $scope.p2last = $scope.resultFromDbLast.aaData[0].p2;


            $scope.v1last = $scope.resultFromDbLast.aaData[0].v1;
            $scope.v2last = $scope.resultFromDbLast.aaData[0].v2;


        }, function errorCallback(response) {

        });










$scope.dateFromChange = function () {

    $scope.data.dateTo = $scope.data.dateFrom;


};




    $scope.sendToSrv = function () {




        $scope.allSumArr = [];


        let request = {
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


                $("#showChart").css("display", "block");


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






            }, function errorCallback(response) {

            });
    };






    $scope.sendToSrvHoure = function () {




        $scope.allSumArrH = [];


        let request = {
            method: 'POST',
            url: '/getdatahoure',
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


                $scope.resultFromDbH = response.data.resultFromDb;


                for (const itemArr of $scope.resultFromDbH.aaData) {




                    categArr.push(itemArr.truedate.substring(6));
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


                $("#showChartHoure").css("display", "block");



                bb.generate({
                    data: {
                        x: "x",
                        xFormat: "%H:%M",
                        columns: [
                            ["x", ...categArr],
                            ["Теплопотребление, в Гкал", ...dataQ]
                        ]
                    },
                    axis: {
                        x: {
                            type: "timeseries",
                            localtime: true,
                            tick: {
                                format: "%H:%M"
                            }
                        }
                    },
                    grid: {
                        y: {
                            show: true,

                        }
                    },
                    bindto: "#chartqh"
                });






                bb.generate({
                    data: {
                        x: "x",
                        xFormat: "%H:%M",
                        columns: [
                            ["x", ...categArr],
                            ["Температура на подаче, в Цельсиях", ...dataT1],
                            ["Температура на обратке, в Цельсиях", ...dataT2],

                        ]
                    },
                    axis: {
                        x: {
                            type: "timeseries",
                            localtime: true,
                            tick: {
                                format: "%H:%M"
                            }
                        }
                    },
                    grid: {
                        y: {
                            show: true,

                        }
                    },
                    bindto: "#chartth"
                });


                bb.generate({
                    data: {
                        x: "x",
                        xFormat: "%H:%M",
                        columns: [
                            ["x", ...categArr],
                            ["Массовый расход на подаче, в тоннах", ...dataM1],
                            ["Массовый расход на обратке, в тоннах", ...dataM2],

                        ]
                    },
                    axis: {
                        x: {
                            type: "timeseries",
                            localtime: true,
                            tick: {
                                format: "%H:%M"
                            }
                        }
                    },
                    grid: {
                        y: {
                            show: true,

                        }
                    },
                    bindto: "#chartmh"
                });





                bb.generate({
                    data: {
                        x: "x",
                        xFormat: "%H:%M",
                        columns: [
                            ["x", ...categArr],
                            ["Давление на подаче, в Ат", ...dataP1],
                            ["Давление на обратке, в Ат", ...dataP2],

                        ]
                    },
                    axis: {
                        x: {
                            type: "timeseries",
                            localtime: true,
                            tick: {
                                format: "%H:%M"
                            }
                        }
                    },
                    grid: {
                        y: {
                            show: true,

                        }
                    },
                    bindto: "#chartph"
                });



                bb.generate({
                    data: {
                        x: "x",
                        xFormat: "%H:%M",
                        columns: [
                            ["x", ...categArr],
                            ["Объёмный расход на подаче, в м3", ...dataV1],
                            ["Объёмный расход на обратке, в м3", ...dataV2],

                        ]
                    },
                    axis: {
                        x: {
                            type: "timeseries",
                            localtime: true,
                            tick: {
                                format: "%H:%M"
                            }
                        }
                    },
                    grid: {
                        y: {
                            show: true,

                        }
                    },
                    bindto: "#chartvh"
                });









                $scope.allSumArrH.push(summArr(dataQ));
                $scope.allSumArrH.push(summArr(dataT1));
                $scope.allSumArrH.push(summArr(dataT2));
                $scope.allSumArrH.push(summArr(dataM1));
                $scope.allSumArrH.push(summArr(dataM2));
                $scope.allSumArrH.push(summArr(dataP1));
                $scope.allSumArrH.push(summArr(dataP2));
                $scope.allSumArrH.push(summArr(dataV1));
                $scope.allSumArrH.push(summArr(dataV2));



                $scope.gkalInSumH = summArr(dataQ);
                $scope.gkalInCurrencyH = summArr(dataQ) * 2642.98;






            }, function errorCallback(response) {

            });
    };




















    setTimeout(function () {



        bb.generate({
            data: {

                columns: [

                    ["Собранная сумма, в тенге", 900000, 1700000, 2500000, 0, 0, 0, 0, 0],
                    ["Прогноз достижения, в тенге", 2300000, 2400000, 2500000, 2600000, 2500000, 2700000, 2800000, 2900000],
                    ["Планируемая для сбора сумма, в тенге", 3666666.67, 6416666.67, 9166666.67, 11916666.67, 14666666.67, 17416666.67, 20166666.67, 22916666.67],

                ]
            },
            axis: {
                x: {
                    type: "category",
                    categories: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023]
                }
            },

            tooltip: {
                format: {

                    value: function (value, ratio, id) {
                        return d3.format(",.2f")(value);
                    }

                }

            },

            grid: {
                y: {
                    show: true,

                }
            },
            bindto: "#chartprognoz"
        });

    }, 350)




});

