(function () {
    'use strict';

    angular.module('MenuApp')
        .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider

            .state('home', {
                url: '/',
                templateUrl: 'templates/home.html'
            })

            .state('categories', {
                url: '/categories',
                templateUrl: 'templates/categories.html',
                controller: 'CategoriesController as categoriesCtrl',
                resolve: {
                    items: ['MenuDataService', function (MenuDataService) {
                        return MenuDataService.getAllCategories();
                    }]
                }
            })

            .state('items', {
                url: '/items/{categoryShortName}',
                templateUrl: 'templates/items.template.html',
                /*controller: 'ItemDetailController as itemDetail',
                resolve: {
                    item: ['$stateParams', 'ShoppingListService',
                        function ($stateParams, ShoppingListService) {
                            return ShoppingListService.getItems()
                                .then(function (items) {
                                    return items[$stateParams.itemId];
                                });
                        }]
                }*/
            });
    }

})();
