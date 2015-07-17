var auth            = require('../../middleware/auth');
var TodoProvider    = require('./todo-provider');

module.exports = function(router) {
    'use strict';
    
    var todoProvider = new TodoProvider();
    
    router.get('/bucketlist', function(req, res) {
        todoProvider.getTodos()
            .then(function(result) {
                res.json(result);
            })
            .catch(function(err) {
                res.send(err);
            });
    });
    
    router.put('/bucketlist', auth, function(req, res) {
        todoProvider.saveTodo(req.body)
            .then(function(result) {
                res.json(result);
            })
            .catch(function(err) {
                res.send(err);
            });
    });
    
    router.delete('/bucketlist/:id', auth, function(req, res) {
        todoProvider.deleteTodo(req.params.id)
            .then(function() {
                res.send(200);
            })
            .catch(function(err) {
                res.send(err);
            });
    });
};