const Listning = require('../models/Listning');
const Reserv = require('../models/Reservation');

module.exports.insert = async (req, res) => {
    try {
        if (req.body) {
            let existingData = await Reserv.findOne({ listningId: req.body.listningId, startdate: req.body.startdate });
            if (existingData) {
                // Update the existing reservation if it already exists
                existingData.enddate = req.body.enddate;
                existingData.totalprice = req.body.totalprice;
                existingData.isActive = req.body.isActive ? req.body.isActive : true;
                existingData.currentDate = new Date().toLocaleString();
                existingData.updateDate = new Date().toLocaleString();
                const updatedData = await existingData.save();
                if (updatedData) {
                    let listningId = req.body.listningId;
                    let listningdata = await Listning.findById(listningId);
                    listningdata.reservation.push(updatedData.id    )
                    console.log('hii',listningdata);
                    return;
                }
                return res.status(200).json({ message: "Reservation updated successfully", data: updatedData });
            } else {
                // Create a new reservation if it doesn't exist
                req.body.userId = req.user.id;
                req.body.isActive = true;
                req.body.currentDate = new Date().toLocaleString();
                req.body.updateDate = new Date().toLocaleString();
                const newData = await Reserv.create(req.body);
                if (newData) {
                    let listningId = newData.listningId;
                    console.log(listningId);
                    return;
                }
                return res.status(201).json({ message: "New reservation created successfully", data: newData });
            }
        } else {
            return res.status(400).json({ message: "Error occurred on form submit" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}