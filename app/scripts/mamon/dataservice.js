(function() {
    'use strict';

    angular
      .module('mamon')
      .factory('dataservice', dataservice);

    dataservice.$inject = ['$http', '$log'];

    function dataservice($http, $log) {  
        var sum, token, challenge;
    
        return  {
            getChallenge: getChallenge
        };
    
        function getChallenge(url) {
        
            return $http.get(url)
                    .then(function(data, status, headers, config) {
                        token = data.data.token;
                        sum = sumArray(data.data.values);
                        challenge = {token, sum};
                        return solveChallenge(url, challenge);
                    })
                    .catch(function(data, status, headers, config) {
                        $log.error("The request failed");
                        $log.log(status, headers);
                    });
        }
        
        function solveChallenge(url, challenge) {
          var sum, token, solutionUrl;
          
          sum = challenge.sum;
          token = challenge.token;
          solutionUrl = url + '/' + token + '/' + sum;
          
          return $http.get(solutionUrl)
                  .then(function(data, status, headers, config) {
                      return data.data.answer;
                  })
                  .catch(function(data, status, headers, config) {
                      $log.error("The request failed");
                      $log.log(status, headers);
                  });
          
        }
    }

    function sumArray(items) {
        var sum = 0;
        for (var i = 0; i < items.length; i++) {
            sum += items[i];
        }
        return sum;
    }
        
})();