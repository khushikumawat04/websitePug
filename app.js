const express = require("express");
const app = express();
const path = require("path");
// const bodyparser = require("body-parser");
const mongoose = require("mongoose");
 const dotenv = require("dotenv");
 dotenv.config();
 const username = process.env.mongodb_username;
 const password = process.env.mongodb_password;

mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.wt41sqw.mongodb.net/pugDatabse`)
const port = 80;


//mongoose schema 
const ContactSchema = new mongoose.Schema({
    name: String,
    age: String,
    gender: String,
    adresss: String,
    message: String
});

const Contact = mongoose.model('Contact',ContactSchema)//model


//express related things
app.use('/static', express.static('static'))
app.use(express.urlencoded())//middleware it will help

//pug Related Things
app.set('view engine','pug')
app.set('views',path.join(__dirname,'template'))//set this as view directory

//Endpoint
app.get('/',(req,res)=>{
    //const con = "This is The Best Training institute "
    //const pro = {'title':'EDtechSavers' , 'content': con}
    const pro = {}
    res.status(200).render('home.pug',pro);
});

app.get('/contact',(req,res)=>{
    //const con = "This is the best Training Institute"
    //const pro = {'title': 'EDtechSavers' , 'content': con}
    const pro = {}
    res.status(200).render('contact.pug',pro);
    
    
});

app.post('/contact',(req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    })
});

//Listen TO A server
app.listen(port,()=>{
    console.log(`The application started successfully  on ${port}`)
});

