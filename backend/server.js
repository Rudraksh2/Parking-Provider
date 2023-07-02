const express = require('express')
require('./src/db/mongoose')
// const bodyParser = require('body-parser')
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');



//Routes
const userRoute = require('./src/routers/user');
const parkingRoute = require('./src/routers/parking')
const providerRoute = require('./src/routers/provider');

const app = express()
const port = 3001

//automatically parse incoming json to the object
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "DELETE, POST, GET, PATCH, OPTIONS")
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
    next()
});

app.use(express.static("public"));
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

app.use(express.json())

app.get("/", (req, res) => {
    res.send("HOME PAGE")
})

//Passport
app.use(session({
    secret: '5INNAGip1cxf',
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

require('./src/config/passport')(passport);

app.use(providerRoute)
app.use(userRoute)
app.use(parkingRoute)
app.use(cors());

app.listen(port, () => {
    console.log("Server is up on port " + port);
})

