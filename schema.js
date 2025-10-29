const joi = require("joi");


 module.exports.ListingSchema = joi.object({
    Listing : joi.object({
    title : joi.string().required(),
    description : joi.string().required(),
    location : joi.string().required(),
    price : joi.number().required().min(0),
    country : joi.string().required(),
    image: joi.object({
            url: joi.string().allow("", null),
            filename: joi.string().allow("", null)
        })
    }).required()

});