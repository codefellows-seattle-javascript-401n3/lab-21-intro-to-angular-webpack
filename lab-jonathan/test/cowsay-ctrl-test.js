'use strict';

require('./lib/test-setup.js');

let angular = require('angular');
let cowsay = require('cowsay-browser');

describe('Cowsay Controller', function() {
  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject($controller => {
      this.cowsayCtrl = new $controller('CowsayController');
    });
  });

  describe('initial properties', () => {
    it('title property should equal Cowsay Controller Lab', () => {
      expect(this.cowsayCtrl.title).toBe('Cowsay Controller Lab');
    });

    it('history property should be an empty array', () => {
      expect(Array.isArray(this.cowsayCtrl.history)).toBe(true);
    });

    it('list of cowfiles should show proper cowfiles', () => {
      cowsay.list((err, list) => {
        expect(this.cowsayCtrl.cowfiles).toEqual(list);
        expect(this.cowsayCtrl.currentCow).toEqual(list[0]);
      });
    });
  });

  describe('#updateCow()', () => {
    it('should return a cow that says yo mamma', () => {
      let expected = '\n' + cowsay.say({ text: 'yo mamma', f: this.cowsayCtrl.currentCow });
      let result = this.cowsayCtrl.updateCow('yo mamma', this.cowsayCtrl.currentCow);
      expect(result).toBe(expected);
    });
  });

  describe('#save()', () => {
    it('should add a cowfile to the history', () => {
      let expected = cowsay.say({ text: 'testing', f: this.cowsayCtrl.currentCow });
      this.cowsayCtrl.text = 'testing';
      this.cowsayCtrl.cowfile = this.cowsayCtrl.currentCow;
      this.cowsayCtrl.save();
      expect(this.cowsayCtrl.history.length).toBe(1);
      expect(this.cowsayCtrl.history[0]).toEqual(expected);
    });
  });

  describe('#undo', () => {
    it('should remove an item from history', () => {
      let expected = cowsay.say({ text: 'testing', f: this.cowsayCtrl.currentCow });
      this.cowsayCtrl.text = 'testing';
      this.cowsayCtrl.cowfile = this.cowsayCtrl.currentCow;
      this.cowsayCtrl.save();
      this.cowsayCtrl.text = 'testing part two';
      this.cowsayCtrl.cowfile = this.cowsayCtrl.currentCow;
      this.cowsayCtrl.save();
      expect(this.cowsayCtrl.history.length).toBe(2);
      this.cowsayCtrl.undo();
      expect(this.cowsayCtrl.history.length).toEqual(1);
      expect(this.cowsayCtrl.history[0]).toEqual(expected);
    });
  });
});
