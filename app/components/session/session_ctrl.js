simpleApp.controller('SessionCtrl', ['$scope', 'Session', function ($scope, Session) {

  $scope.session = Session;

  // Model init and form submission
  $scope.inputs = {
    email    : null,
    password : null
  };
  $scope.submit = function submit () {
    var inputs = $scope.inputs;
    console.log('submitting:');
    console.log($scope);

    if (inputs.isSignUp) {

    } else {

    }
  }
}]);