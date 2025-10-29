
const mongoose = require("mongoose");
const Schema = mongoose.Schema ;

main().then(()=> console.log("mongodb connected"))
.catch((err)=> console.log(err));

async function main(){
   await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")
   
};

const reviewSchema = new Schema({
comment : {
    type: String,
},
rating : {
    type : Number,
},
created_at : {
    type : Date,
     
}
});

const review = mongoose.model("review" ,reviewSchema );
module.exports = review ;
