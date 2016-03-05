/* globals process */

var environment;

switch(process.env.NODE_ENV){
    case 'prod':
        environment = {
            'name': 'prod',
            'port': 8080,
            'assetsRoot': '/dist'
        };
    case 'dev':
    default:
        environment = {
            'name': 'dev',
            'port': 8080,
            'assetsRoot': '/public'
        };
}

module.exports = environment;