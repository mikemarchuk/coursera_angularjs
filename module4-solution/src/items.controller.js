(function () {
	'use strict';

	angular.module('MenuApp')
		.controller('ItemsController', ItemsController);


	ItemsController.$inject = ['data'];
	function ItemsController(data) {
		var itemsCtrl = this;
		itemsCtrl.items = data.items;
		itemsCtrl.categoryName = data.categoryName;
	}

})();
