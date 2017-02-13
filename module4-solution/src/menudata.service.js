(function() {
    'use strict';

    angular.module('data')
        .service('MenuDataService', MenuDataService);

    MenuDataService.$inject = ['$http', '$q'];
    function MenuDataService($http, $q) {
        var menudata = this;

        menudata.getAllCategories = function () {
            var deferred = $q.defer();

            var http = $http({
                url: 'https://davids-restaurant.herokuapp.com/categories.json'
            }).then(function (result) {
                deferred.resolve(result.data);
            });

            return deferred.promise;
        };

        menudata.getItemsForCategory = function (categoryShortName) {
            var deferred = $q.defer();

            var http = $http({
                url: 'https://davids-restaurant.herokuapp.com/menu_items.json?category=' + categoryShortName
            }).then(function (result) {
                deferred.resolve({
                    items: result.data.menu_items,
                    categoryName: result.data.category.name
                });
            });

            return deferred.promise;
        };
    }

})();