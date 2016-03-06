var winston = require('winston');
var env = require('config/environment');

if (env.name === 'prod') {
    winston.level = 'warn';
} else {
    winston.level = 'debug';
}

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            level: winston.level,
            timestamp: true,
            colorize: true
        })
    ]
});

logger.info('chill winston, the logs are being captured on the console');

module.exports = logger;