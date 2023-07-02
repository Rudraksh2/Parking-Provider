const Provider = require("../models/provider");
const Slots = require('../models/slots');
const Parking = require('../models/parking');

exports.deleteParking = async (res, req) => {
    const parkingId = req.parkingId;
    try {
        const slots = await Slots.find(parkingId);
        if (slots) {
            throw ('Parking is booked!!');
        }
        await Parking.findByIdAndDelete(parkingId);
        await Slots.deleteMany(parkingId);
        res.status(200).send('Deleted Successfully!');
    }
    catch (err) {
        res.status(400).send(err);
    }
}

exports.updateParking = async (res, req) => {
    try {
        const updates = req.updates;
        const parking = Parking.findOne(req.parkingId);
        for (let update in updates) {
            parking[update] = updates[update];
        }
        await parking.save();
        res.status(200).send('Updated Successfully!');
    }
    catch (err) {
        res.status(400).send(err);
    }
}