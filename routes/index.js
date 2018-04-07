let express = require('express');
let router = express.Router();





let bcryptjs = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');



let AuthService = require('../service/AuthService');
let TransactionService = require('../service/TransactionService');














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

module.exports = router;
