(function() {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItems);

    function FoundItems() {
        var ddo = {
            templateUrl: 'menuList.html',
            scope: {
                items: '<',
                isFinded: '<',
                onRemove: '&'
            }
        };
        return ddo;
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var narrowItDown = this;

        narrowItDown.isFinded = false;
        narrowItDown.found = [];
        narrowItDown.criteria = '';

        narrowItDown.find = function () {
            narrowItDown.isFinded = true;

            if (narrowItDown.criteria === '') {
                console.log('Nothing found');
                return;
            }
            var promise = MenuSearchService.getMatchedMenuItems(narrowItDown.criteria);
            promise
              .then(function (response) {
                  narrowItDown.found = response;
                  if (!narrowItDown.found.length) {
                      console.log('Nothing found');
                  }
              })
              .catch(function (errorResponse) {
                  console.log(errorResponse.message);
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
                    return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
                });
            });
        };
    }
})();