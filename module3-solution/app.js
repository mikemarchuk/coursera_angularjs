(function() {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItemsDirective);

    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'menuList.html',
            restrict: 'E',
            scope: {
                items: '<foundItems',
                searched: '<isSearched',
                onRemove: '&'
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'list',
            bindToController: true
        };
        return ddo;
    }

    function FoundItemsDirectiveController() {
        var list = this;
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var narrowItDown = this;

        narrowItDown.isSearched = false;
        narrowItDown.found = [];
        narrowItDown.criteria = '';

        narrowItDown.find = function () {
            if (narrowItDown.criteria === '') {
                narrowItDown.isSearched = true;
                return;
            }
            var promise = MenuSearchService.getMatchedMenuItems(narrowItDown.criteria);
            promise
              .then(function (response) {
                  narrowItDown.isSearched = true;
                  narrowItDown.found = response;
                  if (!narrowItDown.found.length) {
                      console.log('Nothing found');
                  }
              })
              .catch(function (errorResponse) {
                  narrowItDown.isSearched = true;
              });
        };

        narrowItDown.removeItem = function(itemIndex) {
            narrowItDown.found.splice(itemIndex, 1);
        };
    }

    MenuSearchService.$inject = ['$http'];
    function MenuSearchService($http) {
        var service = this;
        
        service.getMatchedMenuItems = function (searchTerm) {
            return $http({
                url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
            }).then(function (result) {
                var foundItems = result.data.menu_items;

                return foundItems.filter(function(item) {
                    return item.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
                });
            });
        };
    }
})();