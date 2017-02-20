(function() {
	'use strict';

	angular.module('public')
		.directive('favoriteDish', FavoriteDishValidator);

	FavoriteDishValidator.$inject = ['$q', 'MenuService'];
	function FavoriteDishValidator($q, MenuService) {
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function(scope, element, attr, ngModel) {

				ngModel.$asyncValidators.invalidUsername = function(modelValue, viewValue) {
					var deferred = $q.defer();

					MenuService.checkItem(viewValue).then(function (data) {
						if (data.check) {
							deferred.resolve();
						} else {
							deferred.reject();
						}
					});

					return deferred.promise;
				}
			}
		}
	}
})();