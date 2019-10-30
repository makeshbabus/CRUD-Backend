const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

const ObjectId = mongoose.Types.ObjectId;

module.exports = app => {
    app.post('/api/custom', async (req, res) => {
        const { 
            Name,
            MobileNo,
            Address
              } = req.body;
    
        const custom = new Customer({
            Name,
            MobileNo,
            Address
        });
        console.log("custom");
       try {
          await custom.save();
          res.send(custom);
        } catch (err) {
          res.status(500).send(err);
        }
      });
};