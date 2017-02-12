'use strict';

// require webpack assets
require('./scss/main.scss');

// npm modules
let cowsay = require('cowsay-browser');
let angular = require('angular');

// angular module
let demoApp = angular.module('demoApp', []);

// angular constructus
demoApp.controller('CowsayController', CowsayController);

function CowsayController($log){
  $log.debug('init CowsayController');
  this.title = 'Cowsay Controller Lab';
  this.history = [];

  cowsay.list((err, cowfiles) => {
    this.cowfiles = cowfiles;
    this.currentCow = this.cowfiles[0];
  });

  this.updateCow = function(input, type){
    $log.debug('this.updateCow()');
    return '\n' + cowsay.say({text: input || 'gimme something to say', f: this.currentCow});
  };

  this.save = function(){
    this.history.push(this.updateCow(this.text, this.cowfile));
    this.saved = this.history[this.history.length-1];
  };


  this.undo = function(){
    this.history.pop();
    this.saved = this.history[this.history.length-1];
    $log.debug('this.undo()');
  };
}
  // this.helloClick = function(input){
  //   $log.debug('cowsayCtrl.helloClick()');
  //   $log.log(input);
  // };

// }
