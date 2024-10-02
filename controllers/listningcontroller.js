const Listning = require('../models/Listning');
const fs = require('fs');
const path = require('path');
module.exports.insert = async (req, res) => {
    try {
        if (req.body) {
            let exsitingData = await Listning.findOne({ title: req.body.title, userId: req.user.id });
            if (exsitingData) {
                if (req.files && req.files.listningImage && req.files.listningImage[0]) await fs.unlinkSync(req.files.listningImage[0].path);
                return res.status(400).json({ message: "Listning data already exist" });
            }
            if (req.files && req.files.listningImage && req.files.listningImage[0]) {
                let listningImage = '/uploads/listningImages' + '/' + req.files.listningImage[0].filename;
                req.body.listningImage = listningImage;
                req.body.userId = req.user._id;
                req.body.isActive = true;
                req.body.currentDate = new Date().toLocaleString();
                req.body.updateDate = new Date().toLocaleString();
                let newListing = await Listning.create(req.body);
                if (newListing) {
                    return res.status(201).json({ success: true, data: newListing, message: 'Listning created successfully' });
                }
            }
        } else {
            if (req.files && req.files.listningImage && req.files.listningImage[0]) await fs.unlinkSync(req.files.listningImage[0].path);
            return res.status(400).json({ message: "Error accuired on form submit" });
        }
    } catch (error) {
        if (req.files && req.files.listningImage && req.files.listningImage[0]) await fs.unlinkSync(req.files.listningImage[0].path);
        console.log(error);
        return res.status(500).json({ message: "internal server error" });
    }
}

module.exports.editListning = async (req, res) => {
    try {
        const { id } = req.params;
        if (id) {
            if (req.body) {
                let exsitingData = await Listning.findById(id);
                if (exsitingData) {
                    if (req.files && req.files.listningImage && req.files.listningImage[0]) {
                        if (exsitingData.listningImage) {
                            let fullPath = path.join(__dirname, '..', exsitingData.listningImage);
                            await fs.unlinkSync(fullPath);
                        }
                        let listningImage = '/uploads/listningImages' + '/' + req.files.listningImage[0].filename;
                        req.body.listningImage = listningImage;
                        req.body.updateDate = new Date().toLocaleString();
                        let UpdateListing = await Listning.findByIdAndUpdate(id, req.body);
                        if (UpdateListing) {
                            return res.status(201).json({ success: true, data: UpdateListing, message: 'Listning updated successfully' });
                        }
                    } else {
                        req.body.listningImage = exsitingData.listningImage;
                        req.body.updateDate = new Date().toLocaleString();
                        let UpdateListing = await Listning.findByIdAndUpdate(id, req.body);
                        if (UpdateListing) {
                            return res.status(201).json({ success: true, data: UpdateListing, message: 'Listning updated successfully' });
                        }
                    }
                } else {
                    return res.status(400).json({ message: "No record found by given id" });
                }
            } else {
                if (req.files && req.files.listningImage && req.files.listningImage[0]) await fs.unlinkSync(req.files.listningImage[0].path);
                return res.status(400).json({ message: "Error accuired on form submit" });
            }
        } else {
            if (req.files && req.files.listningImage && req.files.listningImage[0]) await fs.unlinkSync(req.files.listningImage[0].path);
            return res.status(400).json({ message: "there is no id" });
        }
    } catch (error) {
        if (req.files && req.files.listningImage && req.files.listningImage[0]) await fs.unlinkSync(req.files.listningImage[0].path);
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

module.exports.viewListning = async (req, res) => {
    try {
        let listningData = await Listning.find({ isActive: true }).populate('userId').exec();
        if (listningData) {
            return res.status(201).json({ message: 'Listning data fetched successfully', data: listningData });
        }
        return res.status(400).json({ message: "there is no data" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

module.exports.deleteListning = async (req, res) => {
    try {
        const { id } = req.params;
        if (id) {
            const data = await Listning.findById(id);
            if (data) {
                if (data.listningImage) {
                    let fullpath = path.join(__dirname, '..', data.listningImage);
                    await fs.unlinkSync(fullpath);
                }
                let deletedata = await Listning.findByIdAndDelete(id);
                if (deletedata) {
                    return res.status(200).json({ success: true, message: "Data deleted successfully", data:deletedata });
                }
            } else {
                return res.status(400).json({ message: "there is no data" });
            }
        } else {
            return res.status(400).json({ message: "there is no id" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}