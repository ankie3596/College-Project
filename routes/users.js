const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const uuid = require('uuid-v4');
const db = require('../config/database');
const abc = db.$config.pgp;
const User = require('../models/user');
const nodemailer = require('nodemailer');

//Register
router.post('/register', (req, res, next) => {
    User.userSchema.name = req.body.name,
        User.userSchema.username = req.body.username,
        User.userSchema.password = req.body.password,
        User.userSchema.designation = req.body.designation,
        User.userSchema.email = req.body.email

    ///////////////////////////SEND MAIL////////////////////////////
    nodemailer.createTestAccount((err, account) => {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'ruchisinghal0396@gmail.com',
                pass: ''
            }
        });
        let mailOptions = {
            from: "ruchisinghal0396@gmail.com",
            to: req.body.email,
            subject: "Email Verification",
            html: "<p> This is simple test mail. You are register in my project. <br> From: ankita mittal :p </p>"
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

    // console.log("userjs start", req.body);
    User.addUser(User.userSchema, (err, user) => {
        // console.log("UserSchema", User.userSchema);

        if (err) {
            // console.log("if error", err);
            res.json({ success: false, msg: "Failed to register user" });
        } else {
            // console.log("if success", user);
            res.json({ success: true, msg: "User Registered" });
        }
    });
});

//profile
router.post('/update', (req, res, next) => {
    User.userSchema.name = req.body.name,
        User.userSchema.username = req.body.username,
        User.userSchema.gender = req.body.gender,
        User.userSchema.subject = req.body.subject,
        User.userSchema.email = req.body.email,
        User.userSchema.address = req.body.address,
        User.userSchema.city = req.body.city,
        User.userSchema.mobile_no = req.body.mobile_no,
        User.userSchema.user_id = req.body.user_id,
        User.userSchema.country = req.body.country,
        User.userSchema.pin_no = req.body.pin_no

    ///////////////////////////SEND MAIL////////////////////////////
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
            subject: "Email Verification",
            html: "<p> Your profile has been updated in my project. <br> Thank you. <br> Regards: Ankita Mittal</p>"
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

    // console.log("userjs start", req.body);
    User.update(User.userSchema, (err, user) => {
        if (err) {
            res.json({ success: false, msg: "Failed to register user" });
        } else {
            // console.log("if success", user);
            res.json({ success: true, msg: "User Registered" });
        }
    });
});


//authentication
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    //console.log("routes Authentication accpeting");

    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (user.length == 0) {
            return res.json({ success: false, msg: 'User not found' });
            //console.log("not found");
        }
        //console.log("router authentication if success");
        //console.log('USER OBJECT \n\n', user);
        //console.log('password \n\n', user.password);

        User.comparePassword(password, user[0].password, (err, isMatch) => {
            if (err) throw err;
            var payload = { //for passing in isMatch method
                name: user[0].name,
                username: user[0].username,
                password: user[0].password,
                gender: user[0].gender,
                subject: user[0].subject,
                user_id: user[0].user_id,
                email: user[0].email,
                designation: user[0].designation,
                address: user[0].address,
                city: user[0].city,
                mobile_no: user[0].mobile_no,
                country: user[0].country,
                pin_no: user[0].pin_no
            }
            const secret = '1234';
            if (isMatch) {
                const token = jwt.sign(payload, '1234', {
                    expiresIn: 604800 //1 week
                });
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        name: user[0].name,
                        username: user[0].username,
                        password: user[0].password,
                        gender: user[0].gender,
                        subject: user[0].subject,
                        user_id: user[0].user_id,
                        email: user[0].email,
                        designation: user[0].designation,
                        address: user[0].address,
                        city: user[0].city,
                        mobile_no: user[0].mobile_no,
                        country: user[0].country,
                        pin_no: user[0].pin_no
                    }
                });
            } else {
                return res.json({ success: false, msg: 'Wrong Password' });
            }
        });
    });
});

router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.json({ user: req.user });
});

module.exports = router;