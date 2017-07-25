'use strict';

const
http = require('http'),
print = (type, err, res) => {
    /*is*/typeof type === 'undefined'
    /*then*/&& (type = '');
    /*is*/typeof err === 'undefined'
    /*then*/&& (err = 'undefined');
     /*is*/typeof res === 'undefined'
    /*then*/&& (res = 'undefined');
    
    let status = http.STATUS_CODES[res.statusCode];
    /*is*/typeof status === 'undefined'
    /*then*/&& (status = 'no response status code');
    
    console.error(`${type} Error: ${err.message} (Response Status: ${status})`);
};

module.exports.print = print;