const Listning = require('../models/Listning');

module.exports.insert = async (req, res) => {
    try {
        if (req.body && req.files) {
            if (req.files) {
                let listningImage = '/uploads/listningImages' + '/' + req.files.listningImage[0].filename;
                req.body.listningImage = listningImage;
                req.body.userId = req.user._id;
                req.body.isActive = true;
                req.body.currentDate = new Date().toLocaleString();
                req.body.updateDate = new Date().toLocaleString();
                let newListing = await Listning.create(req.body);
                console.log(newListing);
                if (newListing) {
                    return res.status(201).json({ success: true, data: newListing, message: 'Listning created successfully' });
                }
            }
        } else {
            await fs.unlinkSync(req.files.listningImage[0].path);
            return res.status(400).json({ message: "Error accuired on form submit" });
        }
    } catch (error) {
        await fs.unlinkSync(req.files.listningImage[0].path);
        console.log(error);
        return res.status(500).json({ message: "internal server error" });
    }
}