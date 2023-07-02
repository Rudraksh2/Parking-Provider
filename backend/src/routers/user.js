const express = require('express')
const router = express.Router();
const passport = require('passport');

const { bookSlot, allParkings } = require('../controllers/userController');
const User = require('../models/user')

let userDetails;

router.post('/user-signup', async function (req, res) {

    const password = req.body.password;

    const user = new User({
        name: req.body.name,
        username: req.body.username,
        phoneNumber: req.body.phone,
        bookedParking: []
    });

    User.register(user, password, function (err, user) {
        if (err) {
            res.json({ success: false, message: "Your account could not be saved. Error: ", err })
        } else {
            // passport.authenticate("userStrategy")(req, res, function(){
            //     res.redirect("/user/secrets");
            // });
            res.json({ success: true, message: "Your account has been saved" })
        }
    });
});

router.post("/user-login", (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    req.login(user, function (err) {
        if (err) {
            console.log(err)
            res.status(401).send('Status: Error')
            return
        } else {
            passport.authenticate("userStrategy")(req, res, async function () {
                console.log("user logged in : ",req.isAuthenticated());
                const user = await User.find({ username: req.body.username });
                userDetails = user;
                res.status(200).send(user)
            });
        }
    });
});

router.get('/dashboard', async function (req, res) {
    if (req.isAuthenticated()) {
        res.status(200).send('Status: OK')
        //res.json({success:true, message:"You have successfully logged in"})
    }
    else {
        res.status(401).send('Status: Error')
        //res.json({success:false, message:"You are not Authenticated"})
    }
});

router.get('/getUser', async function (req,res){
    res.status(200).send(userDetails);
    console.log(userDetails);
});

router.get('/user-logout', async function (req, res) {
    req.logOut((e) => {
        if(e){
            console.log("logout error",e);
            return res.status(400);
        }
        res.status(200);
    })
    userDetails = undefined;
    if(req.isAuthenticated()) console.log("logout failed")
    else console.log("user logged out")
    //console.log("user session active: ",req.isAuthenticated());
    //res.redirect('/user/login');
});

router.get('/parkings/:userId', allParkings)
router.post('./BookSlot', bookSlot);

module.exports = router;