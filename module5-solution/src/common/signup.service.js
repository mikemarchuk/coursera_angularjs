(function() {
	'use strict';

	angular.module('common')
		.service('SignUpService', SignUpService);

	function SignUpService() {
		var service = this;
		service.registered = false;
		service.userInfo = {};

		service.saveUserInfo = function(data) {
			service.registered = true;
			service.userInfo = data;
		};

		service.isRegistered = function() {
			return service.registered;
		};

		service.getUserInfo = function() {
			return service.userInfo;
		};
	}
})();