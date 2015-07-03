angular.module('daksportsApp')
    .controller('PositionDemoCtrl', DemoCtrl);

function DemoCtrl($mdDialog) {
    var vm = this;
    this.announceClick = function(index) {
        $mdDialog.show(
            $mdDialog.alert()
            .title('You clicked!')
            .content('You clicked the menu item at index ' + index)
            .ok('Nice')
        );
    };
}
