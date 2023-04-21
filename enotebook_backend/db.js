const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://vipul:8e5wqm40PTmEjIsh@cluster0.unmppzi.mongodb.net/enotebook';

async function connectToMongo(){
    await mongoose.connect(mongoURI)
    .then((test)=>{console.log("connected to mongoose")})
    .catch((err)=>{console.log(err)});
}

module.exports = connectToMongo;