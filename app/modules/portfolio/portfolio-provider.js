var Promise         = require('promise');
var Project        	= require('./project-model');

module.exports = function() {
    'use strict';
    
    this.getProjects = function() {
        return new Promise(function(resolve, reject) {
            Project.find({}, {}, { sort: { 'created_at': -1 }})
                .exec(function(err, projects) {
                    if (err) {
                        reject(err);
                    }
                    resolve(projects);
                });
        });
    };
    
    this.saveProject = function(data) {
        return new Promise(function(resolve, reject) {
            Project.findOne({ _id: data._id }, function(err, project) {
                if (err) {
                    reject(err);
                }
                if (!project) {
                    project = new Project(data);
                } else {
                    for (var prop in project) {
                        if (data.hasOwnProperty(prop) && data[prop]) {
                            project[prop] = data[prop];
                        }
                    }
                }
                project.save(function(err, res) {
                    if (err) {
                        reject(err);
                    }
                    resolve(res);
                });
            });
        });
    };
    
    this.deleteProject = function(id) {
        return new Promise(function(resolve, reject) {
            Project.remove({ _id: id })
                .exec(function(err) {
                    if (err) {
                        reject(err);
                    }
                    resolve();
                });
        });
    };
};