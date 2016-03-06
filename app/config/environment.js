/* globals process */

var environment;

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

switch(process.env.NODE_ENV) {
    case 'prod':
        environment = {
            'name': 'prod',
            'port': 8080,
            'assetsRoot': '/dist'
        };
        break;
    case 'dev':
        environment = {
            'name': 'dev',
            'port': 8080,
            'assetsRoot': '/public'
        };
}

module.exports = environment;