var fs = require('fs');

var winston = require ('winston');
var logPath = 'log';

if (!fs.existsSync( logPath )) {
    fs.mkdirSync( logPath );
}

var logger = new ( winston.Logger ) ({
    transports: [
        new winston.transports.Console({
            level: 'debug',
            colorize: true
        }),
        new winston.transports.File({
            level: 'debug',
            filename: logPath + '/finances.log',
            maxsize: 1024 * 1024 * 10
        })
    ],
    exceptionHandlers: [
        new winston.transports.File({
            filename: logPath + '/exceptions.log'
        })
    ]
});

export default logger;
