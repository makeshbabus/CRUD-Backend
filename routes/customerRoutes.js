const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

const ObjectId = mongoose.Types.ObjectId;

module.exports = app => {
    app.get('/api/list', async (req, res) => {

        Customer.find({})
        .then((data)=>{
            res.send(data);
        })
        .catch((err)=>{
        console.log(err);
        })
  
    });
};