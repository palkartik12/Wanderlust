const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const appSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
    
    },
    image:{
        filename: {
           type: String,
        },
        url: {
            type: String,
        },
      
    },
        price:{
            type:Number,
           
        },
        location:{
            type: String,
           
        },
        country:{
            type: String,
            
        },
        reviews : [
            {
       type : Schema.Types.ObjectId,
       ref : "review",
        }
    ],
    
});

const Listing = mongoose.model("Listing", appSchema);
module.exports = Listing;