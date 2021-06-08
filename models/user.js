const pg = require('pg');
const db = require('../config/database');
const pgp = db.$config.pgp;
const uuid = require('uuid-v4');
const bcrypt = require('bcrypt');

module.exports.userSchema = {
    name: String,
    username: String,
    password: String,
    gender: String,
    subject: String,
    user_id: String,
    email: String,
    designation: String,
    address: String,
    city: String,
    mobile_no: String,
    country: String,
    pin_no: String
}


module.exports.getUserByUserid = function(user_id, callback) {
    db.func('"getUserByUserid"', [user_id])
        .then(data => {
            callback(null, data);
        })
        .catch(error => {
            callback(error, null);
        });
}

module.exports.getUserByUsername = function(username, callback) {
    db.func('"getUserByUsername"', [username])
        .then(data => {
            callback(null, data);
        })
        .catch(error => {
            callback(error, null);
        });
}


module.exports.addUser = function(userSchema, callback) {
    // console.log("password", userSchema.password);

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(userSchema.password, salt, (err, hash) => {
            if (err) throw err;
            userSchema.password = hash;
            // console.log("password2", userSchema.password);

            var user_id = uuid();
            // console.log('schema', user_id);
            db.func('"addUser"', [userSchema.name, userSchema.username, userSchema.password, user_id, userSchema.designation, userSchema.email])
                .then(data => {
                    callback(null, data);
                })
                .catch(error => {
                    callback(error, null);
                });
        })
    })
}

module.exports.update = function(userSchema, callback) { //function having update feilds
    // console.log("userSchemaaaa", userSchema);

    // var user_id = uuid();
    //console.log('schema', userScheme);    
    db.func('"update"', [userSchema.name, userSchema.username, userSchema.gender, userSchema.subject, userSchema.email, userSchema.address, userSchema.city, userSchema.mobile_no, userSchema.user_id, userSchema.country, userSchema.pin_no])
        .then(data => {
            console.log("data in update success", data);
            callback(null, data);

        })
        .catch(error => {
            console.log("errror in model", error);
            callback(error, null);
        });

}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
    // console.log('candidate Password \n\n', candidatePassword);
    // console.log('HASH: \n\n', hash);

    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });

}