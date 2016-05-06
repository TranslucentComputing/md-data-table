// Karma configuration
// Generated on Thu May 05 2016 09:25:59 GMT-0400 (EDT)

module.exports = function(config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      // protip: ORDER MATTERS!!!
      "bower_components/angular/angular.js",
      "bower_components/angular-animate/angular-animate.js",
      "bower_components/angular-aria/angular-aria.js",
      "bower_components/angular-messages/angular-messages.js",
      "bower_components/angular-mocks/angular-mocks.js",
      "bower_components/angular-moment/angular-moment.js",
      "bower_components/moment/moment.js",
      "bower_components/angular-material/angular-material.js",

      "app/md-data-table/md-data-table.js",
      "app/md-data-table/scripts/*.js",

      'app/app.js',
      'app/scripts/nutritionController.js',
      '.temp/templates.js',

      'tests/unit/**/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'spec' ],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    client: {
      captureConsole: true,
      mocha: {
        bail: true
      }
    }
  })
}
