const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Listing = require('./models/listing.js');

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

// root route
app.get('/', async (req, res) => {
    res.render('index.ejs', {listings: await Listing.find({})});
});

app.get('/listing/:id', async (req,res) => {
    let {id} = req.params;
    const List = await Listing.findById(id);
    res.render("listingdetails.ejs", { list : List});
    
    
});