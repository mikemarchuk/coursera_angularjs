(function () {
    'use strict';

    angular.module('MenuApp')
        .component('categories', {
            templateUrl: 'templates/components/categories.html',
            bindings: {
                items: '<'
            }
        });

})();