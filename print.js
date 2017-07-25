'use strict';

const
http = require('http'), // for STATUS_CODES method 

// prints a user's total badges and points in subject
message = (username, badgeCount, points, subject) => {
    const message = `${username} has ${badgeCount} total badge(s) and ${points} points in ${subject}`;
    console.log(message);
},

// prints the error type, message, and status code message
error = (type, err, res) => {
    
    // get the status code message (ex. OK)
    let status = http.STATUS_CODES[res.statusCode];
    /*is*/typeof status === 'undefined'
    /*then*/&& (status = 'no response status code');
    
    // print the error message
    console.error(`${type} Error: ${err.message} (Response Status: ${status})`);
};

module.exports.message = message;
module.exports.error = error;