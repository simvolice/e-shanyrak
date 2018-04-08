/**
 * Created by Admin on 29.09.2016.
 */



angular.module('app').controller('maingosCtrl', function ($scope, $mdDialog, $mdToast) {


    let arrChart = ["#chart1",

        "#chart2","#chart3","#chart4","#chart5","#chart6","#chart7"

    ];

    setTimeout(function () {


        for (const item of arrChart) {
            bb.generate({
                bindto: item,
                data: {


                    columns: [

                        ["Тестовый показатель", 45,45, 789,4545, 454,555]
                    ],

                    type: 'bar',

                },
                bar: {
                    width: {
                        ratio: 0.5 // this makes bar width 50% of length between ticks
                    }
                    // or
                    //width: 100 // this makes bar width 100px
                },

                grid: {

                    y: {
                        show: true
                    }
                },


                axis: {
                    x: {
                        type: 'category',
                        categories: ["Астана",
                            "Алматы",
                            "Караганда",
                            "Кызылорда",
                            "Костанай",
                            "Павлодар"]
                    }
                },

                legend: {
                    show: true
                },

                tooltip: {
                    show: true

                }


            });

        }




    }, 350)





});

