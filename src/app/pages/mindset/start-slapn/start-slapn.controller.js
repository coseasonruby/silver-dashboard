(function () {
    'use strict';

    angular
        .module('app.pages.mindset')
        .controller('StartSlapnController', StartSlapnController);

    /* @ngInject */
    function StartSlapnController($scope, pageService,activeStep, stepService,$state) {

        angular.extend($scope, activeStep.model, {
            forward: true,
            sendData: sendData
        });

        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('Start SLAPn!');

        function sendData(direction) {
            stepService.updateActiveModel($scope);
            stepService.setFinishActiveStep();
            var nextprevStep = stepService.getNextAndPrevStep();
            if(direction == 'forward')  
				$state.go(nextprevStep.nextStep.sref); 
            else
				$state.go(nextprevStep.prevStep.sref);
        }
    }
}());