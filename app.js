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
subject = process.argv[2];

if (process.argv[3]) {
    const users = process.argv.slice(3);
    users.forEach(user => profile.get(user, subject));
} else {
    console.error(
        'Input Error: user profile argument(s) must be provided'
    );
}
