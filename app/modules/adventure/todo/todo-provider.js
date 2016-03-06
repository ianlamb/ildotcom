var logger = require('logger');
var Todo = require('./todo-model');

module.exports = function() {
    'use strict';
    
    this.getTodos = function() {
        return new Promise(function(resolve, reject) {
            Todo.find({}, {}, { sort: { 'created_at': -1 }})
                .exec(function(err, data) {
                    if (err) {
                        reject(err);
                    }
                    resolve(data);
                });
        });
    };
    
    this.saveTodo = function(data) {
        return new Promise(function(resolve, reject) {
            Todo.findOne({ _id: data._id }, function(err, todo) {
                if (err) {
                    reject(err);
                }
                if (!todo || !data._id) {
                    todo = new Todo(data);
                } else {
                    todo.title = data.title;
                    todo.completed = data.completed;
                }
                todo.save(function(err, res) {
                    if (err) {
                        reject(err);
                    }
                    resolve(res);
                });
            });
        });
    };
    
    this.deleteTodo = function(id) {
        return new Promise(function(resolve, reject) {
            Todo.remove({ _id: id })
                .exec(function(err) {
                    if (err) {
                        reject(err);
                    }
                    resolve();
                });
        });
    };
};