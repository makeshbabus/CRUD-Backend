var mongoose = require("mongoose");
const { Schema } =mongoose;

var customerSchema = new mongoose.Schema({
    Name: String,
    MobileNo: Number,
    Address:String
},{ collection: 'Customer' });

mongoose.model("Customer", customerSchema);