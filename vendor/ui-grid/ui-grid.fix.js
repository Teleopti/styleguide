(function() {
	'use strict';

	//Overwriting getColumnElementPosition of uiGridColumnMenuService for fixing bug #45655 
	angular.module('ui.grid').decorator('uiGridColumnMenuService', ['$delegate', 'i18nService', 'uiGridConstants', 'gridUtil', function($delegate, i18nService, uiGridConstants, gridUtil) {
		$delegate.getColumnElementPosition = function($scope, column, $columnElement) {
			var positionData = {};
			positionData.left = $columnElement[0].offsetLeft;
			positionData.top = $columnElement[0].offsetTop;
			positionData.parentLeft = $columnElement[0].offsetParent.offsetLeft;

			// Get the grid scrollLeft
			positionData.offset = 0;
			if (column.grid.options.offsetLeft) {
				positionData.offset = column.grid.options.offsetLeft;
			}

			//positionData.height = gridUtil.elementHeight($columnElement, true);
			//positionData.width = gridUtil.elementWidth($columnElement, true);
			positionData.width = $columnElement[0].clientWidth;
			positionData.height = $columnElement[0].clientHeight;
			if (/MSIE/.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent)) {
				positionData.width = $columnElement[0].clientWidth - 20;
			}

			return positionData;
		};

		return $delegate;
	}]);
})();