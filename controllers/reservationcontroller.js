const Listning = require('../models/Listning');
const Reserv = require('../models/Reservation');

module.exports.insert = async (req, res) => {
    try {
        if (req.body) {
            let existingData = await Reserv.findOne({ listningId: req.body.listningId, startdate: req.body.startdate });
            if (existingData) {
                return res.status(400).json({ message: "already have booking" });
            } else {
                req.body.userId = req.user.id;
                req.body.isActive = true;
                req.body.currentDate = new Date().toLocaleString();
                req.body.updateDate = new Date().toLocaleString();
                const newData = await Reserv.create(req.body);
                if (newData) {
                    let listningId = req.body.listningId;
                    let listningData = await Listning.findById(listningId);
                    listningData.reservation.push(newData.id);
                    let updated = await Listning.findByIdAndUpdate(listningId, listningData);

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

module.exports.viewReservation = async (req, res) => {
    try {
        const data = await Reserv.find().populate('listningId').exec();
        if (data) {
            return res.status(201).json({ message: "Reservation fetched successfully", data: data });
        } else {
            return res.status(400).json({ message: "No data found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

module.exports.editreservation = async (req, res) => {
    try {
        const { editId } = req.params;
        if (req.body) {
            let data = await Reserv.findById(editId);
            if (data) {
                let findSlot = await Reserv.findOne({ startdate: req.body.startdate });
                if (findSlot) {
                    return res.status(404).json({ message: "Slot is not available" });
                }
                req.body.updateDate = new Date().toLocaleString();
                let updatedData = await Reserv.findByIdAndUpdate(editId, req.body);
                if (updatedData) {
                    return res.status(201).json({ message: "Reservation Updated Succesfully", data: updatedData });
                }
            }
        } else {
            return res.status(404).json({ message: "Something went wrong" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

module.exports.deleteReservation = async (req, res) => {
    try {
        const { id } = req.params;
        if (id) {
            let deletedata = await Reserv.findByIdAnDelete(id);
            if (deletedata) {
                return res.status(201).json({ message: 'Booking successfully Canceled' });
            }
            return res.status(404).json({ message: "something wrong" });
        } else {
            return res.status(400).json({ message: "id is missing" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}