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
                templateUrl: 'templates/items.html',
                controller: 'ItemsController as itemsCtrl',
                resolve: {
                    data: ['$stateParams', 'MenuDataService',
                        function ($stateParams, MenuDataService) {
                            return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
                        }]
                }
            });
    }

})();
