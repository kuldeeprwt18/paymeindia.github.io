const mongoose = require("mongoose");

const submitSchema = new mongoose.Schema({
    title: { type: String, required: false },
    discription: { type: String, required: false, },
    image:
    {
        data: Buffer,
        contentType: String,
    }

})

const submit = new mongoose.model("submit", submitSchema);

module.exports = submit;