const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

const ObjectId = mongoose.Types.ObjectId;

module.exports = app => {
    app.delete('/delete/:id', async (req, res) => {
        const itemId = req.params.id;
        
       const id=ObjectId(itemId);

        Customer.deleteOne({_id: id})
        .then((docs)=>{
          if(docs) {
            res.send({"success":true,data:docs});
          } 
      })
  
    });
};