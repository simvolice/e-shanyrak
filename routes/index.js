let express = require('express');
let router = express.Router();


const Busboy = require('async-busboy');


let bcryptjs = require('bcryptjs');
let path = require('path');
let fs = require('fs');
let slug = require('slug');
const jsonwebtoken = require('jsonwebtoken');



let AuthService = require('../service/AuthService');
let TransactionService = require('../service/TransactionService');
let MenuService = require('../service/MenuService');
let PostService = require('../service/PostService');









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


            fields.urlImg.push("uploads/" + path.basename(itemFile.path));


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





module.exports = router;
