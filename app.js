const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const review = require("./models/review.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate")
const ExpressError = require("./utils/ExpressError.js");
const { ListingSchema } = require("./schema.js");
const session = require("express-session");
const flash = require("connect-flash");
const passportStrategy = require("passport-local");
const User = require("./models/user.js");
const passport = require("passport");
const userRouter = require("./routes/user.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const listingRouter = require("./routes/listing.js");

main().then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")

};

const sessionOptions = {
  secret: "secretCode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expries: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
// app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new passportStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use("/", listingRouter);
app.use("/" , userRouter);

// app.get("/demouser" ,async (req , res)=>{
//   const demouser = new User({
//     email: "demouser@gmail.com",
//     username : "Thakur Bhanu pratap Singh",
//   });
//  const registerUser = await User.register(demouser , "hello" );
// res.send(registerUser);
// })



// reviews show route
app.post("/listings/:id/reviews", async (req, res) => {
  const listing = Listing.findById(req.params.id);
  const newReview = new review(req.body.review);

  listing.reviews.push(newReview);

  await listing.save();
  await newReview.save();

  console.log("new review saved");
  res.send("new review saved");
});

// for all invalid routes error control

app.all(/.*/, (req, res, next) => {
  next(new ExpressError(404, "page not found!"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "something went wrong" } = err;
  console.error(err.stack);
  res.status(statusCode).render("error.ejs", { message });

})

// const validationErrorHandler = (err)=>{

//     console.log("This is chat validation error. please check again")
//     console.dir(err.message);
//   return err;

// };

//  app.use( (err,req,res,next)=>{
//   //console.log(err.name);
// if(err.name === "ValidationError"){
// err = validationErrorHandler(err);
// }
//   next(err);
//  })

app.listen(6060, () => {
  console.log("server started")
});
