const express = require('express')
const router = express.Router();

const { allParkings, addParking, allProviderParkings, parkingById, deleteParking,updateParking } = require('../controllers/parkingController');

router.get('/getAllParkings/', allParkings);
router.get('/getAllProviderParkings/', allProviderParkings);
router.get('/getParkingById', parkingById)
router.post('/addParking', addParking);
router.delete('/deleteParking/:parking_id', deleteParking);
router.post('/updateParking',updateParking);


module.exports = router;