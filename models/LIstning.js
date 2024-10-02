// title, description, image, created, category,room count, bathroom count,guestcount, localtion,price, 
const mongoose = require('mongoose');
const ListningSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    room_count: {
        type: Number,
        required: true
    },
    bathroom_count: {
        type: Number,
        required: true,
    },
    guestcount: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    listningImage: {
        type: String,
        required: true,
    },
    reservation: {
        type: Array,
        required: true
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
const User = mongoose.model('Listning', ListningSchema);
module.exports = User;