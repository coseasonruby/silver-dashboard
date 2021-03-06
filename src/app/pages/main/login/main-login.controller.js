(function () {
    'use strict';

    angular
        .module('app.pages.main')
        .controller('MainLoginController', MainLoginController);

    /* @ngInject */
    function MainLoginController($scope, $auth, $state, toaster, pageService, userService, adminUserService) {

        // --- vars ---
        $scope.login = {
            email: '',
            password: ''
        };
        // cartService.onLogin();
        $scope.errors = {};

        // --- methods ---

        $scope.submit = function () {
            $auth.login($scope.login)
                .then(
                    function (response) {
                        toaster.pop({type: 'success', body: "Welcome!", timeout: 1000});

                        // update user data
                        userService.loadUser(true).then(function (user) {
                            if(user.role == adminUserService.ROLE_ADMIN)
                                $state.go('admin.home');
                            else
                                $state.go('home');
                        });

                    }
                )
                .catch(function(err) {
                    toaster.pop({type: 'error', body: err.data.message ? err.data.message : 'Your Email or Password are incorrect. Please try again!', timeout: 2000});
                });
        };

        // $scope.authenticate = function(provider) {
        //     $auth.authenticate(provider)
        //         .then(function(response) {
        //             console.log(response);
        //             toastr.success('You have successfully signed in with ' + provider + '!');
        //             userService.loadUser(true).then(function () {
        //                 $state.go('home');
        //             });
        //         })
        //         .catch(function(error) {
        //             if (error.error) {
        //                 // Popup error - invalid redirect_uri, pressed cancel button, etc.
        //                 toastr.error(error.error);
        //             } else if (error.data) {
        //                 // HTTP response error from server
        //                 toastr.error(error.data.message, error.status);
        //             } else {
        //                 toastr.error(error);
        //             }
        //         });
        // };

        // --- init ---

        pageService.reset().setPageTitle(' Login').addCrumb({name: 'Login', path: 'login'});

    }
})();
