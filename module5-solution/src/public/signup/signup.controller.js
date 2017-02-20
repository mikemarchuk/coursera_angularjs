(function() {
	'use strict';

	angular.module('public')
		.controller('SignUpController', SignUpController);

	SignUpController.$inject = ['MenuService', 'SignUpService'];
	function SignUpController(MenuService, SignUpService) {
		var signUp = this;
		signUp.isFavoriteDishValid = false;
		signUp.submited = false;

		signUp.submit = function() {
			MenuService.checkItem(signUp.user.favoriteDish).then(function (data) {
				signUp.submited = true;
				signUp.isFavoriteDishValid = data.check;
				if (data.check) {
					signUp.user.favoriteDishData = data.itemData;
					SignUpService.saveUserInfo(signUp.user);
				}
			});
		};
	}


})();