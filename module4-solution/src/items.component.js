(function () {
    'use strict';

    angular.module('MenuApp')
        .component('items', {
            templateUrl: 'templates/components/items.html',
            bindings: {
                items: '<',
                categoryName: '<'
            }
        });

})();