angular.module('nutritionApp', ['md.data.table', 'ngMaterial' ,'angularMoment','ngMessages'])

  .config(['$mdThemingProvider', function ($mdThemingProvider) {
    'use strict';

    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('pink');
  }]);
