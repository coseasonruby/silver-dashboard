(function () {
    'use strict';

    angular
        .module('app.pages.statement')
        .controller('StatementOverviewController', StatementOverviewController);

    /* @ngInject */
    function StatementOverviewController($scope, activeStep, pageService, stepService, $state) {
        $scope.videoUrl = activeStep.videoUrl;
        angular.extend($scope, activeStep.model, {
            forward: true,
            sendData: sendData
        });

        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('SLAPstatement');

        function sendData(direction) {
            stepService.updateActiveModel($scope);
            stepService.setFinishActiveStep();

            var nextprevStep = stepService.getNextAndPrevStep();

            if(direction == 'forward')  
				$state.go(nextprevStep.nextStep.sref); 
            else if(direction == 'backward')
				$state.go(nextprevStep.prevStep.sref);
        }
    }
}());