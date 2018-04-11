

const dbConnect = require('../utils/ConnectDB');

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;


const bcrypt = require('bcryptjs');





module.exports = {






    addUsers: async (objParams) => {
        try {



            const col = dbConnect.getConnect().collection('users');




            const result = await col.insertOne({




                        email: objParams.email,
                        fio: objParams.fio,
                        pass: bcrypt.hashSync(objParams.pass, 10),

                        address: objParams.address,
                        role: "user",




                        createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) ),





                }
            );




            return result;


        }catch(err) {



            return err;


        }





    },



    auth: async (email) => {

        try {



            const col = dbConnect.getConnect().collection('users');




            const result = await col.findOne({email: email});




            return result;


        }catch(err) {



            return err;


        }


    },




    createUserSuperRoot: async (hash) => {

        const client = await MongoClient.connect(process.env.DB_HOST);
        const db = client.db(process.env.DB_NAME);




        try {




            const col = await db.collection('users');
            col.createIndex({ email : 1 }, {unique: true});



            const result = await col.insertMany([

                {


                    pass: hash,
                    email: "root",
                    role: "root",
                    fio: "Супер Рут",
                    createAt: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)),

                },


                {


                    pass: hash,
                    email: "cms",
                    role: "cms",
                    fio: "Администратор Сайта",
                    createAt: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)),

                }

                ]);






            return result;


        }catch(err) {



            return err;


        }


    }





};