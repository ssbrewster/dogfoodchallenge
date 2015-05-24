(function() {

    'use strict';

    angular
        .module('mamonChallenge')
        .factory('sumArray', sumArray);

    function sumArray(items) {
        var sum = 0;
        for (var i = 0; i < items.length; i++) {
                sum += items[i];
            }
        return sum;
    }
})();
