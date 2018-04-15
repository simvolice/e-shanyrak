/**
 * Created by Admin on 29.09.2016.
 */



angular.module('app').controller('maincmsCtrl', function ($scope, $mdDialog, $mdToast, SaveMenu, Allmenus, $http, GetAllpost, Deleteonepost, GetOnepost, $rootScope) {

    var quill = null;

    setTimeout(function () {
        quill = new Quill('#editor-container', {
            modules: {

                toolbar: '#toolbar-container'
            },
            placeholder: 'Создай свою идеальную статью...',
            theme: 'snow'
        });

    }, 350);



    GetAllpost.get({sessionToken: localStorage.getItem("sessionToken")},function (result) {

        $scope.allpost = result.resultFromDB;


    });

    Allmenus.get({sessionToken: localStorage.getItem("sessionToken")},function (result) {






        if (result.resultFromDb.length !== 0) {

            $scope.menus = result.resultFromDb[0].menuArr;

            for (let itemMenu of $scope.menus) {


                $scope.menusFlat.push(flattenTree(itemMenu, "childs"))


            }


            $scope.menusFlat = $scope.menusFlat.reduce(function (prev, curr) {
                return [...prev, ...curr];
            });

            $scope.selectedItem = $scope.menusFlat[0].uniqKey;

        }




    });


    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function removeFromTree(parent, childNameToRemove){
        parent.childs = parent.childs
            .filter(function(child){ return child.uniqKey !== childNameToRemove})
            .map(function(child){ return removeFromTree(child, childNameToRemove)});
        return parent;
    }






    function flattenTree(root, key) {
        let flatten = [Object.assign({}, root)];
        delete flatten[0][key];

        if (root[key] && root[key].length > 0) {
            return flatten.concat(root[key]
                .map((child)=>flattenTree(child, key))
                .reduce((a, b)=>a.concat(b), [])
            );
        }

        return flatten;
    };



    $scope.menusFlat = [];
    $scope.menus = [];


    $scope.addSecondItemMenu = function (childsArr) {

        childsArr.push({title: "Укажите название раздела", childs: [], uniqKey: getRandomInt(0, 1000000)});




    };


    $scope.addNewMenu = function () {
        $scope.menus.push({title: "Укажите название раздела", id: 1, childs: [], uniqKey: getRandomInt(0, 1000000)});

    };




    $scope.deleteItemMenu = function (uniqKey, id) {


        if (id === 1) {


            $scope.menus = $scope.menus
                .filter(function(child){ return child.uniqKey !== uniqKey})

        } else {



            let clearArr = [];


            for (let itemOneMenuObj of $scope.menus) {
                let tempArr = itemOneMenuObj;


                clearArr.push(removeFromTree(tempArr, uniqKey));

                tempArr = [];

            }


            $scope.menus = clearArr;


            clearArr = [];

        }




    };


    $scope.saveMenu = function () {


        SaveMenu.save({menus: $scope.menus, sessionToken: localStorage.getItem("sessionToken")}, function (result) {

            if (result.code === 0) {

                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Операция закончилась успешно')
                        .position('left bottom')
                        .hideDelay(3000)
                );


            } else {


                $mdToast.show(
                    $mdToast.simple()
                        .textContent('У Вас нет прав на эту операцию')
                        .position('left bottom')
                        .hideDelay(3000)
                );


            }

        })



    };





   var formdata = new FormData();

    $scope.getTheFiles = function ($files) {



        angular.forEach($files, function (value, key) {
            formdata.append(key, value);
        });



    };






    $scope.savePost = function () {

        formdata.append('postHTML', quill.root.innerHTML);
        formdata.append('menuUniqueKey', $scope.selectedItem);
        formdata.append('title', $scope.title);


        var request = {
            method: 'POST',
            url: '/addpost',
            data: formdata,
            headers: {
                'Content-Type': undefined,
                'sessionToken': localStorage.getItem("sessionToken")
            }
        };


        $http(request)
            .then(function successCallback(response) {
                formdata = new FormData();
                document.getElementById("file").value = null;







                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Вы успешно загрузили объект.')
                        .position('left bottom')
                        .hideDelay(3000)
                );





            }, function errorCallback(response) {
                formdata = new FormData();
                document.getElementById("file").value = null;
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Операция закончилась не удачно, попробуйте изменить данные.')
                        .position('left bottom')
                        .hideDelay(3000)
                );
            });









    };

    $scope.deletePost = function (id) {

        Deleteonepost.save({sessionToken: localStorage.getItem("sessionToken"), id: id}, function (result) {


            if (result.code === 0) {

                GetAllpost.get(function (result) {

                    $scope.allpost = result.resultFromDB;


                });

                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Операция закончилась успешно')
                        .position('left bottom')
                        .hideDelay(3000)
                );


            } else {



                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Операция закончилась неудачно')
                        .position('left bottom')
                        .hideDelay(3000)
                );

            }


        });

    };


    $scope.clkTab = function () {
        GetAllpost.get(function (result) {

            $scope.allpost = result.resultFromDB;


        });
    };



    $scope.updatePost = function (id, ev) {
        GetOnepost.save({sessionToken: localStorage.getItem("sessionToken"), id: id}, function (result) {


            if (result.code === 0) {


                $("#videohead-pro").css("z-index", 50);

                $mdDialog.show({
                    controller: DialogControllerUpdatePost,
                    locals:{data: result.resultFromDb, menusFlat: $scope.menusFlat},
                    templateUrl: 'components/maincms/dialog_template.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose:true,
                    fullscreen: true // Only for -xs, -sm breakpoints.
                });



            } else {



                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Операция закончилась неудачно')
                        .position('left bottom')
                        .hideDelay(3000)
                );

            }


        });

    };


function DialogControllerUpdatePost($scope, data, menusFlat) {
    var quillUpd = null;

    setTimeout(function () {
        quillUpd = new Quill('#editor-container-upd', {
            modules: {

                toolbar: '#toolbar-container-upd'
            },
            placeholder: 'Создай свою идеальную статью...',
            theme: 'snow'
        });



        quillUpd.root.innerHTML = data.postHTML;

    }, 350);



    $scope.data = {

        title: data.title,

        selectedItem: data.menuUniqueKey,
        menusFlat: menusFlat,
        urlImg: data.urlImg,
        readonly: true,
        removable: true


    };

    var formdataUpd = new FormData();

    $scope.getTheFilesUpd = function ($files) {



        angular.forEach($files, function (value, key) {
            formdataUpd.append(key, value);
        });



    };


    $scope.updPost = function(){



        formdataUpd.append('postHTML', quillUpd.root.innerHTML);
        formdataUpd.append('menuUniqueKey', $scope.data.selectedItem);
        formdataUpd.append('title', $scope.data.title);
        formdataUpd.append('id', data._id);
        formdataUpd.append('urlImg', JSON.stringify($scope.data.urlImg));


        var request = {
            method: 'POST',
            url: '/updpost',
            data: formdataUpd,
            headers: {
                'Content-Type': undefined,
                'sessionToken': localStorage.getItem("sessionToken")
            }
        };


        $http(request)
            .then(function successCallback(response) {
                formdataUpd = new FormData();
                document.getElementById("file").value = null;







                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Вы успешно загрузили объект.')
                        .position('left bottom')
                        .hideDelay(3000)
                );





            }, function errorCallback(response) {
                formdataUpd = new FormData();
                document.getElementById("file").value = null;
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Операция закончилась не удачно, попробуйте изменить данные.')
                        .position('left bottom')
                        .hideDelay(3000)
                );
            });






    };


    $scope.closeDialog = function () {
        $("#videohead-pro").css("z-index", 1000);
        $mdDialog.hide();
    };


}



});

