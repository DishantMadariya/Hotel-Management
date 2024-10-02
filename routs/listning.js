const express = require('express');
const router = express.Router();
const listningcontroller = require('../controllers/listningcontroller');
const upload = require('../services/multer.service');
router.post('/insert',upload.fields([{ name: "listningImage", maxCount: 1 }]), listningcontroller.insert);
router.post('/editListning/:id', upload.fields([{ name: "listningImage", maxCount: 1 }]), listningcontroller.editListning);
router.get('/viewListning', listningcontroller.viewListning);
router.delete('/deleteListning/:id', listningcontroller.deleteListning);
module.exports = router;