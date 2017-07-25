/*
- node app.js // run file
- node // read-eval-print-loop
- ctrl+d or ctrl+c twice to exit
- http://nodejs.org/api
- Console, File System, HTTP, HTTPS are common
- there are user events, and system events:
-- data events, completion events, and error events
- process is nodes environment object, similar to window
*/

'use strict';

const 
profile = require('./profile'),
subject = process.argv[2]; // get subject from console input

// if username argument(s) exist
if (process.argv[3]) {
    const users = process.argv.slice(3); // get the list of usernames
    
    // print each user's profile total badges and points in subject
    users.forEach(user => profile.get(user, subject));
} else {
    // when username argument(s) is undefined
    console.error(
        'Input Error: user profile argument(s) must be provided'
    );
}
