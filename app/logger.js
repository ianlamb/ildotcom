var winston = require('winston');
var env = require('config/environment');

winston.setLevels({
    debug: 0,
    info:  1,
    silly: 2,
    warn:  3,
    error: 4,
});

winston.addColors({
    debug: 'green',
    info:  'cyan',
    silly: 'magenta',
    warn:  'yellow',
    error: 'red'
});

if (env.name === 'prod') {
    winston.level = 'warn';
} else {
    winston.level = 'debug';
}

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            level: winston.level,
            timestamp: true
        })
    ]
});

logger.info('chill winston, the logs are being captured on the console');

module.exports = logger;