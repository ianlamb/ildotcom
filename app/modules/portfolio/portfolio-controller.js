var auth               = require('../../middleware/auth');
var PortfolioProvider  = require('./portfolio-provider');

module.exports = function(router) {
    'use strict';
    
    var portfolioProvider = new PortfolioProvider();
    
    router.get('/projects', function(req, res) {
        portfolioProvider.getProjects()
            .then(function(result) {
                res.json(result);
            })
            .catch(function(err) {
                res.send(err);
            });
    });
    
    router.put('/project', auth, function(req, res) {
        portfolioProvider.saveProject(req.body)
            .then(function(result) {
                res.json(result);
            })
            .catch(function(err) {
                res.send(err);
            });
    });
    
    router.delete('/project/:id', auth, function(req, res) {
        portfolioProvider.deleteProject(req.params.id)
            .then(function() {
                res.send(200);
            })
            .catch(function(err) {
                res.send(err);
            });
    });
};