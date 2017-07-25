'use strict';

const
https = require('https'),
print = require('./print'), // for message and error methods

// gets a user's profile
getProfile = (username, subject) => {
    
    // try getting https url
    try {
        const
        url = `https://teamtreehouse.com/${username}.json`, // treehouse API
        
        // define the request
        request = https.get(url, (res) => {
            
            // if the status code is 200 (OK)
            if (res.statusCode === 200) {
                let body = ''; // to hold response chunks
                
                // As data fragments arrive
                res.on('data', (data) => {
                    // append the data to the body
                    body += data.toString(); // convert buffered data to string
                });
                
                // When the response has ended
                res.on('end', () => {
                    // try getting the json string
                    try {
                        const profile = JSON.parse(body); // get parsed json
                        let points = 0; // default points
                        
                        // if the subject exists
                        if (profile.points[subject]) {
                            // get points for that subject
                            points = profile.points[subject];
                        }
                        // print user's total badges and points in subject
                        print.message(
                            username,
                            profile.badges.length,
                            points,
                            subject
                        );
                    } catch (err) {
                        // print JSON error and response status
                        print.error('JSON', err, res);
                    }
                });
            } else {
                const 
                // define error message
                message = `There was an error getting profile ${username}`,
                
                // define new error
                statusCodeError = new Error(message);
                
                // print status code error and response status
                print.error('Status Code', statusCodeError, res);
            }
    
        });
        
        // When request error occures
        request.on('error', (err) => {
            // print request error
            print.error('Request URL', err);
        });
        
    } catch (err) {
        // print https error
        print.error('Protocol', err);
    }
};

module.exports.get = getProfile;