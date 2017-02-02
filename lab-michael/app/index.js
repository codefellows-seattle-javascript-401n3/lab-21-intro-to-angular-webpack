// APP LOGIC GOES HERE
'use strict';

require('./scss/main.scss'); // require in CSS

// npm / yarn modules
const cowsay = require('cowsay-browser');
const angular = require('angular');

// angular module
const cowsayDemoApp = angular.module('cowsayDemoApp', []);

// angular controllers
cowsayDemoApp.controller('CowsayController', [ '$log', '$scope', CowsayController]);

function CowsayController($log, $scope) {
  $log.debug('init CowsayController');
  let cowsayCtrl = $scope.cowsayCtrl = {};
  cowsayCtrl.title = 'Moooooo';

  cowsayCtrl.updateCow = function(input){
    $log.debug('cowsayCtrl.updateCow()');
    return '\n' + cowsay.say({text: input || 'gimme something to say'});
  };

  cowsayCtrl.helloClick = function(input){
    $log.debug('cowsayCtrl.helloClick()');
    $log.log(input);
  };

}
