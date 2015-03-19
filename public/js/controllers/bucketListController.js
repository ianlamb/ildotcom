angular.module('bucketListController', []).config(['$httpProvider', function($httpProvider) {
    var token = window.localStorage.getItem('token');
    if (token) {
        $httpProvider.defaults.headers.common = { 'x-access-token': token }
    }
}]).controller('BucketListController', function($scope, $filter, BucketList) {
    'use strict';

    var token = window.localStorage.getItem('token');
    if (token) {
        $scope.authorized = true;
    }

    BucketList.get()
        .success(function(data) {
            var bucketList = $scope.bucketList = data;

            $scope.$watch('bucketList', function () {
                $scope.remainingCount = $filter('filter')(bucketList, { completed: false }).length;
                $scope.completedCount = bucketList.length - $scope.remainingCount;
                $scope.allChecked = !$scope.remainingCount;
            }, true);
        })
        .error(function(err) {
            console.error(err);
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
            .then(function success() {
                $scope.newTodo = '';
            })
            .finally(function () {
                $scope.saving = false;
            });
    };

    $scope.editTodo = function (todo) {
        $scope.editedTodo = todo;
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

        if (todo.title === $scope.originalTodo.title) {
            $scope.editedTodo = null;
            return;
        }

        BucketList[todo.title ? 'put' : 'delete'](todo)
            .then(function success() {}, function error() {
                todo.title = $scope.originalTodo.title;
            })
            .finally(function () {
                $scope.editedTodo = null;
            });
    };

    $scope.removeTodo = function (todo) {
        BucketList.delete(todo);
    };

    $scope.saveTodo = function (todo) {
        BucketList.put(todo);
    };

    $scope.toggleCompleted = function (todo, completed) {
        if (angular.isDefined(completed)) {
            todo.completed = completed;
        }
        store.put(todo, todos.indexOf(todo))
            .then(function success() {}, function error() {
                todo.completed = !todo.completed;
            });
    };

});
