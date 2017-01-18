(function() {
	'use strict';

	angular.module('LunchCheck', []).
		controller('LunchCheckController', LunchCheckController);

	LunchCheckController.$inject = ['$scope'];
	function LunchCheckController($scope) {
		$scope.items = '';
		$scope.message = '';
		$scope.typeMessage = '';
		$scope.showInfoMessage = false;

		$scope.messages = {
			success: {
				text: 'Enjoy!'
			},
			warning: {
				text: 'Too much!'
			},
			error: {
				text: 'Please enter data first'
			}
		};

		$scope.checkLunch = function() {
			$scope.showInfoMessage = false;
			var countItems = $scope.items.split(',').filter(function(value) {
				var valid = value.trim() !== "";
				if (!valid && $scope.items.length) {
					$scope.showInfoMessage = true;
				}
				return valid;
			}).length;

			if (countItems === 0) {
				$scope.message = $scope.messages.error.text;
				$scope.typeMessage = 'error';
			} else if (countItems < 4) {
				$scope.message = $scope.messages.success.text;
				$scope.typeMessage = 'success';
			} else {
				$scope.message = $scope.messages.warning.text;
				$scope.typeMessage = 'warning';
			}
		};
	}

})();