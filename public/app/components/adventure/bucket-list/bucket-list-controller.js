angular.module('app.adventure.bucket-list', [])
    .controller('BucketListController', function($scope, $filter, $stateParams, BucketList) {
        'use strict';
    
        BucketList.get()
            .success(function(data) {
                var bucketList = $scope.bucketList = data;
    
                $scope.$watch('bucketList', function () {
                    $scope.remainingCount = $filter('filter')(bucketList, { completed: false }).length;
                    $scope.completedCount = bucketList.length - $scope.remainingCount;
                }, true);
            })
            .error(function(err) {
                console.error(err);
            });
        
        $scope.$on('stateChangeSuccess', function () {
            var status = $scope.status = $stateParams.status || '';
    
            $scope.statusFilter = (status === 'active') ?
                { completed: false } : (status === 'completed') ?
                { completed: true } : null;
        });
        
        $scope.newTodo = { title: '' };
        $scope.editedTodo = null;
        
        $scope.addTodo = function () {
            var newTodo = {
                title: $scope.newTodo.title.trim(),
                completed: false
            };
    
            if (!newTodo.title) {
                return;
            }
    
            $scope.saving = true;
            BucketList.put(newTodo)
                .then(function success(res) {
                    $scope.newTodo = { title: '' };
                    $scope.bucketList.unshift(res.data);
                })
                .finally(function () {
                    $scope.saving = false;
                });
        };
    
        $scope.editTodo = function (todo) {
            $scope.originalTodo = Object.assign({}, todo);
        };
    
        $scope.saveEdits = function (todo, event) {
            // Blur events are automatically triggered after the form submit event.
            // This does some unfortunate logic handling to prevent saving twice.
            if (event === 'blur' && $scope.saveEvent === 'submit') {
                $scope.saveEvent = null;
                return;
            }
    
            $scope.saveEvent = event;
    
            todo.title = todo.title.trim();
    
            BucketList.put(todo)
                .then(function success() {}, function error() {
                    todo = Object.assign({}, $scope.originalTodo);
                })
                .finally(function () {
                    $scope.originalTodo = null;
                });
        };
    
        $scope.removeTodo = function (todo) {
            if (confirm('Are you sure you wish to permanently delete this item?')) {
                BucketList.delete(todo)
                    .success(function() {
                        for (var i = 0; i < $scope.bucketList.length; i++) {
                            if ($scope.bucketList[i]._id === todo._id) {
                                $scope.bucketList.splice(i, 1);
                            }
                        }
                    });
            }
        };
    
        $scope.saveTodo = function (todo) {
            BucketList.put(todo);
        };
    
        $scope.toggleCompleted = function (todo) {
            BucketList.put(todo)
                .success(function() {
                    console.log('success!');
                })
                .error(function() {
                    todo.completed = !todo.completed;
                });
        };
    
    });
