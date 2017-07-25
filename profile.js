'use strict';

const
https = require('https'),
error = require('./error'),
printMessage = (username, badgeCount, points, subject) => {
    const message = `${username} has ${badgeCount} total badge(s) and ${points} points in ${subject}`;
    console.log(message);
},
getProfile = (username, subject) => {
    try {
        const
        url = `https://teamtreehouse.com/${username}.json`,
        request = https.get(url, (res) => {
            if (res.statusCode === 200) {
                let body = '';
                
                res.on('data', (data) => {
                    body += data.toString();
                });
                
                res.on('end', () => {
                    try {
                        const profile = JSON.parse(body);
                        let points = 0;
                        if (profile.points[subject]) {
                            points = profile.points[subject];
                        }
                        printMessage(
                            username,
                            profile.badges.length,
                            points,
                            subject
                        );
                    } catch (err) {
                        error.print('JSON', err, res);
                    }
                });
            } else {
                const 
                message = `There was an error getting profile ${username}`,
                statusCodeError = new Error(message);
                
                error.print('Status Code', statusCodeError, res);
            }
    
        });
        
        request.on('error', (err) => {
            error.print('Request URL', err);
        });
    } catch (err) {
        error.print('Protocol', err);
    }
};

module.exports.get = getProfile;