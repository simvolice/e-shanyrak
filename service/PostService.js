/**
 * Created by simvolice on 27.02.2018 16:18
 */



const dbConnect = require('../utils/ConnectDB');

const {MongoClient, ObjectId, Int32 } = require('mongodb');







module.exports = {





    addPost: async (objParams) => {

        try {



            const col = dbConnect.getConnect().collection('posts');






            const result = await col.insertOne({





                title: objParams.title,
                postHTML: objParams.postHTML,
                menuUniqueKey: Int32(objParams.menuUniqueKey),
                urlImg: objParams.urlImg,
                createAt: new Date( new Date().getTime() - ( new Date().getTimezoneOffset() * 60000 ) )





            });




            return result;


        }catch(err) {




            return err;


        }


    },

    getAllPost: async () => {

        try {



            const col = dbConnect.getConnect().collection('posts');






            const result = await col.find().toArray();




            return result;


        }catch(err) {




            return err;


        }


    },


    deleteOnePost: async (id) => {

        try {



            const col = dbConnect.getConnect().collection('posts');






            const result = await col.deleteOne({_id: ObjectId(id)});




            return result;


        }catch(err) {




            return err;


        }


    },


    getOnePost: async (id) => {

        try {



            const col = dbConnect.getConnect().collection('posts');




            const result = await col.findOne({menuUniqueKey: Int32(id)});




            return result;


        }catch(err) {



            return err;


        }


    }





};