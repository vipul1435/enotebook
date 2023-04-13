const mongoose = require('mongoose');

const mongoURI = 'mongodb://127.0.0.1:27017/enotebook';

async function connectToMongo(){
    await mongoose.connect(mongoURI)
    .then((test)=>{console.log("connected to mongoose")})
    .catch((err)=>{console.log(err)});
}

module.exports = connectToMongo;