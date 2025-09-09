const mongoose = require('mongoose');
const listingschema = new mongoose.Schema({
    title: {    
        type: String, 
        required: true
    },
    description: String,
    image: String,
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
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});


const Listing = mongoose.model('Listing', listingschema);
module.exports = Listing;


