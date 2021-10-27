const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser")
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/contactDance');
}
const port = 8000;

// define mongoose Schema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phon: String,
    address: String
});
const Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'))
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

// ENDPOINTS
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/about', (req, res) => {
    const params = {}
    res.status(200).render('about.pug', params);
})
app.get('/classInfo', (req, res) => {
    const params = {}
    res.status(200).render('classInfo.pug', params);
})
app.get('/service', (req, res) => {
    const params = {}
    res.status(200).render('service.pug', params);
})
app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res) => {
    const myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("This iten has been saved to the database")
    }).catch(() => {
        res.status(400).send('Item was not saved to the database')
    })
    // res.status(200).render('contact.pug');
})

// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfuily on port ${port}`);
})