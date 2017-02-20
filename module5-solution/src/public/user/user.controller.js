(function() {
	'use strict';

	angular.module('public')
		.controller('UserController', UserController);

	UserController.$inject = ['SignUpService'];
	function UserController(SignUpService) {
		var userController = this;

		userController.registered = SignUpService.isRegistered();

		userController.user = SignUpService.getUserInfo();
	}
})();