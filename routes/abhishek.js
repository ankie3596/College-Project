const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');


router.post('/contact-us', (req, res, next) => {
    console.log('contact us details', req.body);

    name = req.body.name,
        email = req.body.email,
        city = req.body.city,
        title = req.body.title,
        message = req.body.message

    console.log('after declaration', req.body);
    ///////////////////////////Recieve MAIL////////////////////////////
    nodemailer.createTestAccount((err, account) => {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'ruchisinghal0396@gmail.com',
                pass: ''
            }
        });
        let mailOptions = {
            from: req.body.email,
            to: "ruchisinghal0396@gmail.com",
            subject: "Email Query",
            html: "<p> Title for query is:" + req.body.title + "<br> Description of query is: " + req.body.message + " <br> <br> Thank you <br> Regards: " + req.body.name + " <br> email:" + req.body.email + " </p>"
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Error" + error);
            } else {
                console.log("Success: Mail Send Successfully!!! ");
            }
        });
    });

    ///////////////////////////SEND MAIL////////////////////////////////////////

});

module.exports = router;