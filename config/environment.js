module.exports = function() {
    switch(process.env.NODE_ENV){
        case 'prod':
            return {
                'port': 8080,
                'assetsRoot': '/dist'
            };
        case 'dev':
            return {
                'port': 8181,
                'assetsRoot': '/public'
            };
        default:
            return {
                'port': 8080,
                'assetsRoot': '/public'
            };
    }
};