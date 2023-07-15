const mongoose = require("mongoose");

const signupSchema = new mongoose.Schema({
    firstname : {type:String, required:true,},
    lastname : {type:String, required:true},
    email : {type:String, required:true, unique:true},   //unique:true
    contact : {type:Number, required:true, unique:true},  //unique:true
    password : {type:String, required:true},
})

const signUp = new mongoose.model("signUp", signupSchema);

module.exports = signUp;