const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

const ObjectId = mongoose.Types.ObjectId;

module.exports = app => {

      app.post("/customUpdate", async(req, res) => {

        const { Name,MobileNo,Address } = req.body;
    
       await Customer.findOneAndUpdate({Name: Name},{$set:{Address:Address,MobileNo:MobileNo}},{new:true})
       .then((docs)=>{
        if(docs) {
            res.send({success:true,data:docs});
         } else {
            res.send({success:false,data:"no such user exist"});
         }
     }).catch((err)=>{
        res.send(err);
        })
    });


      
};