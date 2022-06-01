
const express = require('express')
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

//serving and storing media
const url = 'mongodb://localhost:27017/teniscore';

mongoose.connect(url , { useNewUrlParser: true,useUnifiedTopology: true,
  
})

   
    .then(()=> console.log('MongoDB Connected...'))
    .catch(err=>console.log(err))
   // autoIncrement.initialize(db);

app.use(cors());
app.use(bodyParser.urlencoded({
  limit : '50mb',
      extended: true
      
    }));
app.use(bodyParser.json({}));
require('./routes/admin.route')(app);
require('./routes/club.route')(app);
require('./routes/coach.route')(app);
require('./routes/user.route')(app);

var server = require('http').createServer(app);
const PORT = process.env.PORT || 5000;
server.listen(PORT);