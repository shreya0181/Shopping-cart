const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const items = require('./routes/api/items');
const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');

// bodyParser Middleware
app.use(bodyparser.json());

// DB config
const db = require('./config/keys').mongoURI;

// connect to mongodb promise based
mongoose
.connect(db,{ useUnifiedTopology: true,useNewUrlParser: true  } )
.then(()=>{
    console.log('Mongodb connected');
})
.catch(err =>{
    console.log(err);
})


//  use Routes 
app.use("/api/items", items)
// app.get("/", (req, res)=>{
//     res.send ("get Req");

// });



// serve static assests if in production
if(process.env.NODE_ENV === 'production'){
    //  Set a static folder 
    app.use(express.static('client/build'));

    app.get('*',(req, res) =>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));

    })
}


app.listen (PORT, ()=>{
    console.log("hello server"+ PORT);
})

