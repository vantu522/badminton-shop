const mongoose = require('mongoose');

const userContact = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    content:{
        type:String,
        required:true
    } 
});

const userOrder = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type:String,
        required: true
    },
    address: {
        type: String,
        required: true
    }

})

const UserModel = mongoose.model('user', userContact);
const OrderModel = mongoose.model('order',userOrder )


module.exports = {UserModel, OrderModel};
