const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Listing = require('./models/listing.js');
const Review = require('./models/review.js');
const Joy = require('joi');
const {listingschema} = require('./Listingschema.js');
const {reviewschema} = require('./Listingschema.js');

const port = 3000;

// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static("public")); 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));    
app.use(express.json());


// database connection
async function dbconnect() {
    await mongoose.connect('mongodb://127.0.0.1/onestay');
}
dbconnect().then((err) => {
    if (err) {
        console.log("Database Connection Failed");
    } else {
        console.log("Database Connected");
    }
});

// listening to server
app.listen(port, () => {
  console.log(`Server is Started ...`);
});




// middleware
// app.use("/",function  (req, res, next) {
//     let { token } = req.query;
//     if (token === "123") {
//         next();
//     } else {
//         res.send("Invalid Token");
//     }
// });

// root route
app.get('/', async (req, res) => {
    res.render('index.ejs', {listings: await Listing.find({})});
});

app.get('/err', (req, res) => {
    let abcd = abcd;
});


app.get('/listing/:id', async (req,res) => {
    let {id} = req.params;
    const List = await Listing.findById(id).populate('reviews');
    res.render("listingdetails.ejs", { list : List});
        
});

app.get('/addnewlisting', (req,res) => {
    res.render("newlisting.ejs");
});

app.post('/addnewlisting', async (req,res) => {
    // let result = listingschema.validate(req.body);
    // console.log(result);
    const newListing = new Listing(req.body);
    await newListing.save();
    res.redirect('/');
});

 app.get('/editlisting/:id', async (req,res) => {
    let {id} = req.params;
    const List = await Listing.findById(id);
    res.render("editlisting.ejs", { list : List});
});

app.post('/editlisting/:id', async (req,res) => {
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, req.body);
    res.redirect('/'); 
});

app.post('/deletelisting/:id', async (req,res) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    for(let reviewid of listing.reviews) {
        await Review.findByIdAndDelete(reviewid);
    }
    await Listing.findByIdAndDelete(id);
    res.redirect('/');
});

app.post('/postreviews/:id',async (req,res) => {
    let {id} = req.params;
    let {rating, comment} = req.body;
    const review = new Review({rating, comment});
    const listing = await Listing.findById(id); 
    listing.reviews.push(review);
    await review.save();
    await listing.save();
    res.redirect('/'); 
            
});

app.post('/:id/deletereview/:reviewid', async (req,res) => {
    let {id, reviewid} = req.params;
    let listing = await Listing.findById(id);
    listing.reviews.pull(reviewid);
    await Review.findByIdAndDelete(reviewid);
    await listing.save();
    res.redirect('/listing/' + id);
});



app.use((err, req, res, next) => {
    console.log(err); 
    next();
});