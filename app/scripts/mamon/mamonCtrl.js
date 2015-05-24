(function() {
    'use strict';
    
    angular.module('mamon').controller('MamonController', MamonController);
       
    MamonController.$inject = ['dataservice'];
        
    function MamonController(dataservice) {
        var vm = this;
        
        vm.mamonBowl = 'Feed me';
        vm.solution = 'Starter';
        vm.showMeTheChallenge = function () {
        
          dataservice.getChallenge('http://aerial-valor-93012.appspot.com/challenge')
            .then(function(response) {
              
              vm.getFood = response;
              
          });
          
        }
        
    }

})();