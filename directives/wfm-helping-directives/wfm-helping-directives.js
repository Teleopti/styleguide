(function() {
    angular.module('wfm.helpingDirectives',[]).
    directive('outsideClick', ['$window','$parse', function($window, $parse) {
        return {
            restrict: 'A',
            link: linkFunction
        };

        function linkFunction(scope, element, attrs) {
            var outsideClickHandler = $parse(attrs.outsideClick);
            var clickEventHandler = function (event) {
                if (element[0].contains(event.target)) {return;}
                event.preventDefault();
                outsideClickHandler(scope, {$event: event});
                scope.$apply();
            };
            angular.element($window).on('click', clickEventHandler);

            var cleanUp = function () {
                window.angular.element($window).off('click', clickEventHandler);
            };
            scope.$on('$destroy', cleanUp);
        }
    }
    ]);
})();
