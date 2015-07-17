var Promise         = require('promise');
var Todo            = require('./todo-model');

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
    
    this.saveTodo = function(todo) {
        return new Promise(function(resolve, reject) {
            Todo.findOne({ _id: todo._id }, function(err, todo) {
                if (err) {
                    reject(err);
                }
                if (!todo) {
                    todo = new Todo(todo);
                } else {
                    todo.title = todo.title;
                    todo.completed = todo.completed;
                }
                todo.save(function(err, newTodo) {
                    if (err) {
                        reject(err);
                    }
                    resolve(newTodo);
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