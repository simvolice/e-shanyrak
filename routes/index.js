let express = require('express');
let router = express.Router();


const Busboy = require('async-busboy');
var moment = require('moment-timezone');

let bcryptjs = require('bcryptjs');
let path = require('path');
let fs = require('fs');
let slug = require('slug');
const jsonwebtoken = require('jsonwebtoken');



let AuthService = require('../service/AuthService');
let TransactionService = require('../service/TransactionService');
let MenuService = require('../service/MenuService');
let PostService = require('../service/PostService');



const request = require('request-promise-native');






function setSlugForTree(menusArr) {


    menusArr.childs = menusArr.childs
        .map(function (child) {


            child["url"] = slug(child.title, {lower: true});


            return child;


        }).map(function (child) {
            return setSlugForTree(child);
        });


    return menusArr;

}

router.post('/savemenu', async (req, res, next) =>{




        let clearArr = [];


        for (let itemOneMenuObj of req.body.menus) {
            let tempArr = itemOneMenuObj;


            clearArr.push(setSlugForTree(tempArr));

            tempArr = [];

        }


        for (let itemOneParentObj of clearArr) {
            itemOneParentObj["url"] = slug(itemOneParentObj.title, {lower: true});

        }


        let result = await MenuService.addMenus(clearArr);


        if (result.result.ok === 1) {

            res.json({"code": 0});


        } else {


            res.json({"code": 1});


        }




});

router.get('/allmenus', async (req, res, next) => {


    let result = await MenuService.getAllMenus();


    res.json({"code": 0, "resultFromDb": result});


});



router.post("/adduser", async(req, res, next) => {


        let result = await AuthService.addUsers(req.body);




        res.json({code: 0});







});






router.post('/auth', async(req, res, next) => {





    let result = await AuthService.auth(req.body.email);



    if (result) {


        if (bcryptjs.compareSync(req.body.pass, result.pass)) {





            res.json({"code": 0, "address": result.address, "role": result.role, "fio": result.fio, "sessionToken": jsonwebtoken.sign(result._id.toString(), process.env.SECRETJSONWEBTOKEN)});


        }else {

            res.json({"code": 1});


        }

    }else {

        res.json({"code": 1});



    }








});



router.post('/addtransactionhash', async (req, res, next) =>{



    await TransactionService.addTransaction(req.body);


    res.json({"code": 0});

});



router.post('/getalltransactionhash', async (req, res, next) =>{

    let result = await TransactionService.getAll(req.body);

    res.json({"code": 0, "resultFromDb": result});

});





router.post('/addpost', async (req, res, next) =>{



    const {files, fields} = await Busboy(req);
    let pathForWrite = path.join(__dirname, "../public/uploads/");
    fields["urlImg"] = [];



    if (files.length !== 0) {


        for (let itemFile of files) {


            itemFile.pipe(fs.createWriteStream(pathForWrite + path.basename(itemFile.path)));


            fields.urlImg.push({url: "uploads/" + path.basename(itemFile.path), fileName: itemFile.filename});


        }




    }



    await PostService.addPost(fields);

    res.json({"code": 0});


});



router.post("/deleteonepost", async (req, res, next) => {





        let result = await PostService.deleteOnePost(req.body.id);

        if (result.result.ok === 1) {

            res.json({"code": 0});

        } else {

            res.json({"code": 1});

        }





});

router.get("/getallpost", async (req, res, next) => {



        let result = await PostService.getAllPost();


        res.json({code: 0, resultFromDB: result});




});



router.get('/getonepost', async (req, res, next) =>{


    let result = await PostService.getOnePost(req.query.id);




    res.json({"code": 0, "resultFromDb": result});


});



router.post('/getonepostfromdb', async (req, res, next) =>{

    let result = await PostService.getOnePostById(req.body.id);




    res.json({"code": 0, "resultFromDb": result});



});



router.post('/updpost', async (req, res, next) =>{



    const {files, fields} = await Busboy(req);
    let pathForWrite = path.join(__dirname, "../public/uploads/");
    fields.urlImg = JSON.parse(fields.urlImg);


    if (files.length !== 0) {


        for (let itemFile of files) {


            itemFile.pipe(fs.createWriteStream(pathForWrite + path.basename(itemFile.path)));


            fields.urlImg.push({url: "uploads/" + path.basename(itemFile.path), fileName: itemFile.filename});


        }




    }


    if (fields.urlImg.length !== 0) {
        for (const itemImg of fields.urlImg) {
            delete itemImg.$$hashKey;
        }
    }



    await PostService.updPost(fields);

    res.json({"code": 0});


});




router.post('/getdata', async (req, res, next) =>{
    moment.locale("ru");





   let resultToken  = await request.get("http://193.42.142.125/rest/api/authenticate?username=astana&password=654321");



   let result = await request.get(`http://193.42.142.125/rest/api/gethourarch?idCounter=606500&dtStart=${moment.tz(req.body.dateFrom, "Asia/Dhaka").format("l")} ${moment.tz(req.body.timeFrom, "Asia/Dhaka").format("LTS")}&dtEnd=${moment.tz(req.body.dateTo, "Asia/Dhaka").format("l")} ${moment.tz(req.body.timeTo, "Asia/Dhaka").format("LTS")}&token=${resultToken}`);



   let resultClean = JSON.parse(result);


    res.json({"code": 0, "resultFromDb": resultClean});







});



module.exports = router;
