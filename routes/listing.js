const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const { ListingSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");


function asyncWrap(fn){
  return function(req,res,next){
    fn(req,res,next).catch((err)=> next(err))
  }
}

const validateListing = (req , res ,next)=>{
let {error}  = ListingSchema.validate(req.body);
  
  if(error){
    let errmsg = error.details.map((el)=> el.message).join(",");
    throw new ExpressError(400 , errmsg);
  };
};


// Index route 

router.get("/listings", asyncWrap (async (req , res)=>{
const sunaar = await Listing.find({});
    res.render("listings/index.ejs", {sunaar});
    }) 
);

// New listing route

router.get("/listings/new",asyncWrap (async (req , res)=>{
 await res.render("listings/new.ejs");  
}));

// Show route

router.get("/listings/:id", asyncWrap (async (req , res)=>{ 
 let { id } = req.params;
   const sunari = await Listing.findById(id);
   res.render("listings/show.ejs", {sunari});  
}));

// New route

router.post("/listings", validateListing ,asyncWrap (async (req , res)=>{
    if(!req.body.Listing){
  throw new ExpressError(400 , "Send Valid Data for Listing");
 }
const laaala = new Listing(req.body.Listing);
  
   await laaala.save();
   //res.flash("success", "new list created successfully");
   res.redirect("/listings");
  
}));

 // Edit route

router.get("/listings/:id/edit",asyncWrap (async (req , res)=>{ 
let { id } = req.params;
   const sunari = await Listing.findById(id)
    res.render("listings/edit.ejs" ,{sunari});
}));

// Update route
router.put("/listings/:id", validateListing ,asyncWrap  (async (req, res) => {
if(!req.body.Listing){
  throw new ExpressError(400 , "Send Valid Data for Listing");
}
let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.Listing });
  res.redirect(`/listings/${id}`);
}));

// Delete route 

 router.delete("/listings/:id",asyncWrap  (async(req , res)=>{
let { id } = req.params;
    await Listing.findByIdAndDelete(id)
   res.redirect("/listings" ); 
 }));

module.exports = router ;