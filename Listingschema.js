const Joi = require('joi');

const listingschema = 
Joi.object({ 
    listing : Joi.object({
        title : Joi.string().required(),
        description : Joi.string().allow(''),
        image : Joi.string().uri().allow(''),
        price : Joi.number().required().min(0),
        address : Joi.string().required(),
        country : Joi.string().required()
    }).required()
});

const reviewschema = 
Joi.object({
    review : Joi.object({   
        comment : Joi.string().allow(''),
        rating : Joi.number().required().min(1).max(5)
    }).required()
});

module.exports = {reviewschema};
module.exports = {listingschema};