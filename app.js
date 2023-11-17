const express =  require('express');
const dotenv = require('dotenv').config();
const morgan = require('morgan');
const bodyParser = require("body-parser");
const cors = require('cors');
const path = require('path')
const app = express();
const db = require('./server/database/connection');

app.use(cors());
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });
//log request
app.use(morgan('tiny'));

//parse request to body-parser
app.use(bodyParser.urlencoded({extended:true}))
//set view engine
app.set("view engine", "ejs")
// app.set("views",path.resolve(__dirname,"views/ejs"))

// load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))

//load routers
app.use('/', require('./server/routes/router'))




const port = process.env.PORT || 8080
app.listen(port,()=>{
    console.log(`server running on http://localhost:${port}`);
})

