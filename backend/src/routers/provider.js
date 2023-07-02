const express = require('express')
const router = express.Router();
const passport = require('passport');

const { deleteParking, updateParking } = require('../controllers/providerController');
const Provider = require('../models/provider')

let providerDetails;

router.post('/provider-signup', async function (req, res) {

    const password = req.body.password;

    const provider = new Provider({
        name: req.body.name,
        username: req.body.username,
        phoneNumber: req.body.phone
    });
    console.log(provider)
    Provider.register(provider, password, function (err, user) {
        if (err) {
            res.json({ success: false, message: "Your account could not be saved. Error: ", err })
        } else {
            // passport.authenticate("providerStrategy")(req, res, function(){
            //     res.redirect("/provider/secrets");
            // });
            res.json({ success: true, message: "Your account has been saved" })
        }
    });
});

router.post("/provider-login", (req, res) => {
    const provider = new Provider({
        username: req.body.username,
        password: req.body.password
    });

    req.login(provider, function (err) {
        if (err) {
            console.log(err);
            res.status(401).send('Status: Error')
            return
        } else {
            passport.authenticate("providerStrategy")(req, res, async function () {
                console.log("provider logged in : ",req.isAuthenticated());
                const provider = await Provider.find({ username: req.body.username })
                providerDetails = provider;
                res.status(200).send(provider)
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
        // res.json({success:false, message:"You are not Authenticated"})
    }
});

router.get('/getProvider', async function (req,res){
    res.status(200).send(providerDetails);
    console.log(providerDetails);
});

router.get('/provider-logout', async function (req, res) {
    req.logOut((e) => {
        if(e){
            console.log("logout error",e);
            return res.status(400);
        }
        res.status(200);
    })
    providerDetails = undefined;
    if(req.isAuthenticated()) console.log("logout failed")
    else console.log("provider logged out")
});


router.delete('./deleteParking', deleteParking);

router.patch('./updateParking', updateParking);

module.exports = router;