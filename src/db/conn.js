const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

mongoose.connect("mongodb://localhost:27017/myform", {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    // useCreateIndex:true
}).then(() =>{
    console.log(`connection successfull`);
}).catch((e) =>{
    console.log(`no connection`);
})