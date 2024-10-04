const express = require("express");
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
const bodyparser = require("body-parser")
const app = express();
const port= 1300;

// Define mongoose schema
const ContactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    Email: String,
    Address: String,
    Desc: String
  });

const Contact = mongoose.model('Contact', ContactSchema);


// Express Specific Stuff
app.use('/static', express.static('static')); // For serving static files 
app.use(express.urlencoded())

// Pug Specific Stuff
app.set('view engine', 'pug') // To set the template engine as pug
// Set the views directory
app.set('views', path.join(__dirname,'views'))

// End Points
app.get('/', (req,res)=>{
    
    const params = {}
     res.status(200).render('home.pug',params);

})

app.get('/contact', (req,res)=>{
    
    const params = {}
     res.status(200).render('contact.pug',params);

})

app.post('/contact', (req,res)=>{
    
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        console.log("Data is save Succesfully!")
    }).catch(()=>{
        res.status(400).send("Item not saved")
    })
    

})


// Start the server
app.listen(port,()=>{
    console.log(`This application started succesfully on port ${port}`)
})

