(function() {
    'use strict';

    angular
        .module('app.pages.settingsUser')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider) {
        $stateProvider
            .state('payments', {
                data: {
                    access: '@'
                },
                parent: 'withNavbar',
                url: '/payments',
                views: {
                    content: {
                        controller: 'PaymentsController',
                        templateUrl: 'pages/settingsUser/payments/payments.html'
                    }
                }
            })
            .state('myaccounts', {
                data: {
                    access: '@'
                },
                parent: 'withNavbar',
                url: '/account',
                resolve: {
                    userAllData: function (stepService) {
                        return stepService.getAllUserData(this)
                    }
                },
                views: {
                    content: {
                        controller: 'MyaccountsController',
                        templateUrl: 'pages/settingsUser/myaccounts/myaccounts.html'
                    }
                }
            })
    }
}());