(function() {

'use strict';

angular.module('teleopti.wfm')
.directive('htmlBinder', htmlBinder);


function htmlBinder() {

    return {       
        link: postlink,
        scope: {
            htmlBinder: '='
        }
    };
    
    function postlink(scope, elem, attrs) { 
        elem.text(scope.htmlBinder);        
    }    
}

})();