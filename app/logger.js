var winston = require('winston');
var env = require('config/environment');

var transports = [];

if (env.name === 'prod') {
    winston.level = 'warn';
    transports.push(
        new (winston.transports.File)({
            filename: 'logs/app.log',
            level: winston.level,
            timestamp: true
        })
    );
} else {
    winston.level = 'debug';
}

transports.push(
    new (winston.transports.Console)({
        level: winston.level,
        timestamp: true,
        colorize: true
    })
);

var logger = new (winston.Logger)({
    transports: transports
});

logger.info('chill winston, the logs are being captured 2 ways - console and file');

module.exports = logger;