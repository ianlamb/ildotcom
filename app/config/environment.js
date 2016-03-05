/* globals process */

var environment;

switch(process.env.NODE_ENV){
    case 'prod':
        environment = {
            'port': 8080,
            'assetsRoot': '/dist'
        };
    case 'dev':
        environment = {
            'port': 8181,
            'assetsRoot': '/public'
        };
    default:
        environment = {
            'port': 8080,
            'assetsRoot': '/public'
        };
}

module.exports = environment;