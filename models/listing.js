const mongoose = require('mongoose');

const listingschema = new mongoose.Schema({
    title: {    
        type: String, 
        required: true
    },
    description: {
        type: String,
    },
    image: {
        type: String,
        set: (v) => v === '' ? 'https://cdn.pixabay.com/photo/2015/04/21/12/01/mailbox-733161_1280.jpg' : v,
        default: 'https://cdn.pixabay.com/photo/2015/04/21/12/01/mailbox-733161_1280.jpg'
    },
    price: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    country : {
        type: String,
        required: true
    }
});

const Listing = mongoose.model('Listing', listingschema);
module.exports = Listing;