/**
 * Created by simvolice on 06.04.2018 1:37
 */
const dbConnect = require('../utils/ConnectDB');
const ObjectId = require('mongodb').ObjectId;
const jsonwebtoken = require('jsonwebtoken');



module.exports = {






    addTransaction: async (objParams) => {
        try {



            const col = dbConnect.getConnect().collection('transactions');




            const result = await col.insertOne({




                    userId: ObjectId(jsonwebtoken.verify(objParams.sessionToken, process.env.SECRETJSONWEBTOKEN)),
                    transactionHash: objParams.transactionHash,
                    nameContract: objParams.nameContract,
                    blockNumber: objParams.blockNumber,

                    statusTx: "В ожидании",



                    createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) ),





                }
            );




            return result;


        }catch(err) {



            return err;


        }





    },

    getAll: async (objParams) => {
        try {



            const col = dbConnect.getConnect().collection('transactions');




            let result = await col.find({}).project({userId: 0}).toArray();




            return result;


        }catch(err) {



            return err;


        }





    },


    setStatusTransaction: async (objParams) => {
        try {



            const col = dbConnect.getConnect().collection('transactions');



            let result = await col.updateOne({_id: ObjectId(objParams.id)},{

                $set: {


                    statusTx: objParams.status

                }


            });




            return result;


        }catch(err) {



            return err;


        }





    }








};