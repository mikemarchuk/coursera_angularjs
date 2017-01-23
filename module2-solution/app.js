(function() {
	'use strict';

	angular.module('ShoppingListCheckOff', [])
		.controller('ToBuyController', ToBuyController)
		.controller('AlreadyBoughtController', AlreadyBoughtController)
		.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

	ToBuyController.$inject = ['ShoppingListCheckOffService'];
	function ToBuyController(ShoppingListCheckOffService) {
		var toBuy = this;

		toBuy.items = ShoppingListCheckOffService.getToBuyItems();

		toBuy.buyItem = function(itemIndex) {
			ShoppingListCheckOffService.buyItem(itemIndex);
		}
	}

	AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
	function AlreadyBoughtController(ShoppingListCheckOffService) {
		var alreadyBought = this;

		alreadyBought.items = ShoppingListCheckOffService.getBoughtItems();

		alreadyBought.removeItem = function(itemIndex) {
			ShoppingListCheckOffService.removeItem(itemIndex);
		}
	}

	function ShoppingListCheckOffService() {
		var service = this;

		service.toBuyItems = [
			{name: "cookies", quantity: 10},
			{name: "chips", quantity: 3},
			{name: "waffles", quantity: 6},
			{name: "chocolates", quantity: 4},
			{name: "ice creams", quantity: 4},
			{name: "candies", quantity: 20}
		];

		service.boughtItems = [];

		service.buyItem = function(itemIndex) {
			service.boughtItems.push(service.toBuyItems[itemIndex]);
			service.toBuyItems.splice(itemIndex, 1);
		};

		service.removeItem = function(itemIndex) {
			service.toBuyItems.push(service.boughtItems[itemIndex]);
			service.boughtItems.splice(itemIndex, 1);
		};

		service.getToBuyItems = function() {
			return service.toBuyItems;
		};

		service.getBoughtItems = function() {
			return service.boughtItems;
		};
	}

})();