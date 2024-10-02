const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    name :{
        type: String,
        required : true
    },
    email :{
        type : String,
        required: true,
        unique: true,
    },
    password :{
        type : String,
        required : true
    },
    favouriteIds: {
        type: Array,
        required: false,
        default:[]
    },
    isActive :{
        type : Boolean,
        required : true
    },
    currentDate :{
        type : String,
        required : true
    },
    updateDate :{
        type : String,
        required : true
    },
});
const User = mongoose.model('User',UserSchema);
module.exports=User;