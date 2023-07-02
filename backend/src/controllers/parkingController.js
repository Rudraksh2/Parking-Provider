const Parking = require('../models/parking');

exports.allParkings = async (req, res) => {

    try {
        const parkings = await Parking.find({})
        res.status(200).send(parkings)

    } catch (err) {
        res.status(500).send(err)
    }

}

exports.allProviderParkings = async (req, res) => {

    try {
        const parkings = await Parking.find({ providerID: req.query.providerId })
        res.status(200).send(parkings)

    } catch (err) {
        res.status(500).send(err)
    }

}

exports.parkingById = async (req, res) => {

    try {
        const parkings = await Parking.find({ _id: req.query.parkingId })
        console.log(parkings)
        res.status(200).send(parkings)

    } catch (err) {
        res.status(500).send(err)
    }

}

exports.addParking = async (req, res) => {

    // console.log("abcd");

    const parking = new Parking(req.body)
    const slots = [];

    const sTime = req.body.startTime;
    const eTime = req.body.endTime;

    let s1 = parseInt(sTime);
    let s2 = parseInt(eTime);

    // console.log(parseInt(sTime));
    // console.log(parseInt(eTime));

    if (sTime[sTime.length - 2] == 'A' && eTime[eTime.length - 2] == 'A') {
        // console.log("abcd");
        for (let i = s1; i < s2; i++) {
            let t2 = i + 1;
            const temp = i + "AM - " + t2 + "AM";
            slots.push({
                space: req.body.space,
                time: temp
            })
        }
    }
    else if (sTime[sTime.length - 2] == 'P' && eTime[eTime.length - 2] == 'P') {
        for (let i = s1; i < s2; i++) {
            let t2 = i + 1;
            const temp = i + "PM - " + t2 + "PM";
            slots.push({
                space: req.body.space,
                time: temp
            })
        }
    }
    else {
        for (let i = s1; i < 11; i++) {
            let t2 = i + 1;
            let temp = i + "AM - " + t2 + "AM";
            slots.push({
                space: req.body.space,
                time: temp
            })
        }

        slots.push({
            space: req.body.space,
            time: "11AM - 12PM"
        })

        if (s2 < 12) {
            slots.push({
                space: req.body.space,
                time: "12PM - 1PM"
            })
        }

        for (let i = 1; i < s2; i++) {
            let t2 = i + 1;
            let temp = i + "PM - " + t2 + "PM";
            slots.push({
                space: req.body.space,
                time: temp
            })
        }
    }

    parking.slots = slots;
    try {
        await parking.save()
        res.status(201).send(parking)

    } catch (err) {
        res.status(400).send(err)
    }
}

exports.deleteParking = async (req, res) => {

    // console.log(req.params);
    const parking_id = req.params.parking_id;
    console.log(parking_id);
    // const id = ObjectId(parking_id);
    // console.log(id);
    Parking.findByIdAndDelete(
        parking_id
    ).then((result) => {
        console.log("Successfully deleted Parking", result)
    }).catch((error) => {
        console.log("Unable to delete", error)
    })
}

exports.updateParking = async (req, res) => {
    const parkingId = req.body.parkingId;
    const slotsId = req.body.slotsId;
    console.log("slotsId : \n" + slotsId)
    try {
        const parking = await Parking.findById(parkingId);
        let currSlots = parking.slots;
        console.log("CurrSlots : \n" + currSlots);
        // let updatedSlots = [{}];

        const updatedSlots = currSlots.map((slot) => {
            slotsId.forEach(slotId => {
                if (slotId == slot._id) {
                    if (slot.space !== 0) {
                        slot.space--;
                    }
                }
            });
            return slot;
        })

        parking.slots = updatedSlots;
        console.log("updatedSlots \n" + updatedSlots)
        await parking.save();

        //saving inside user database
        // const user = await User.findById(req.body.userId);
        // const userObject = {
        //     parkingId: req.body.parkingId,
        //     time: req.body.time,
        //     ownerID: parking.providerID
        // }
        // user.bookedParking.push_back(userObject);
        // await user.save();

        res.status(200).send('Successfully Booked!!');
    }
    catch (err) {
        res.status(400).send(err)
    }
}