const mongoose = require("mongoose");

const sampleListing = require("./data.js");

const listing = require("../models/listing.js");

main().then(()=> console.log("mongodb connected"))
.catch((err)=> console.log(err));

async function main(){
   await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")
   
};



const initDB = async()=>{
    await listing.deleteMany({});
    await listing.insertMany(sampleListing );
};
initDB().then((res)=> console.log("started"))
.catch((err)=> console.log(err));
