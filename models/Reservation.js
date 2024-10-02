const mongoose = require('mongoose');
const ReservSchema = mongoose.Schema({
    listningId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listning",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    startdate: {
        type: String,
        required: true,
    },
    enddate: {
        type: String,
        required: true
    },
    totalprice: {
        type: String,
        required: false,
    },
    isActive: {
        type: Boolean,
        required: true
    },
    currentDate: {
        type: String,
        required: true
    },
    updateDate: {
        type: String,
        required: true
    },
});
const Reserv = mongoose.model('Reserv', ReservSchema);
module.exports = Reserv;