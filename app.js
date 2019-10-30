var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/test",{ useNewUrlParser: true,useUnifiedTopology:true,useFindAndModify:false });
const ObjectId = mongoose.Types.ObjectId;


require('./models/Customer');
var nameSchema = new mongoose.Schema({
    firstName: String,
    lastName: String
});
var User = mongoose.model("User", nameSchema);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/addname", (req, res) => {
    var myData = new User(req.body);
    myData.save()
        .then(item => {
            res.send("Name saved to database");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});


app.post("/updatename", async(req, res) => {

    const { firstName,lastName } = req.body;

   await User.findOneAndUpdate({firstName: firstName},{$set:{lastName:lastName}},{new:true})
   .then((docs)=>{
    if(docs) {
        res.send({success:true,data:docs});
        }
    })
});

app.get('/api/userlist/:userId', async (req, res) => {

    const { userId } =req.params;// req.body.values;  
    var userIdObj = ObjectId(userId);
  
   
        await User.find(
              {_id:userIdObj},
              {firstName:1,lastName:1})
        .exec( function (err, result) {
                  res.send(result);
              })
  
    });


    app.get('/api/alluserlist', async (req, res) => {

       
            await User.find({})
            .then((data)=>{
                res.send(data);
            })
            .catch((err)=>{
            console.log(err);
            })
      
        });


require('./routes/customerRoutes')(app);
require('./routes/customInsertRoutes')(app);
require('./routes/customerUpdateRoutes')(app);
require('./routes/custDeleteRoutes')(app);

app.listen(port, () => {
    console.log("Server listening on port " + port);
});