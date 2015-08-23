// Karma configuration
// Generated on Sat Aug 22 2015 20:30:14 GMT-0400 (Eastern Daylight Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai'],


    // list of files / patterns to load in the browser
    files: [
      'public/assets/libs/angular/angular.min.js',
      'public/assets/libs/angular-mocks/angular-mocks.js',
      'public/assets/libs/angular-ui-router/release/angular-ui-router.min.js',
      'public/assets/libs/angular-animate/angular-animate.min.js',
      'public/assets/libs/angular-sanitize/angular-sanitize.min.js',
      'public/assets/libs/angular-cookies/angular-cookies.min.js',
      'public/assets/libs/angular-localization/angular-localization.min.js',
      'public/assets/libs/ngInfiniteScroll/build/ng-infinite-scroll.min.js',
      'public/assets/libs/jspdf/dist/jspdf.min.js',
      'public/assets/libs/markdown/lib/markdown.js',
      'public/assets/libs/moment/min/moment.min.js',
      'public/assets/libs/angular-bootstrap/ui-bootstrap.min.js',
      'public/assets/libs/angular-bootstrap/ui-bootstrap-tpls.min.js',
      'public/assets/libs/jwt-decode/build/jwt-decode.min.js',
      'public/app/app-module.js',
      'public/app/**/*.js',
      'public/test/**/*.js'
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
    reporters: ['progress'],


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
    singleRun: false
  })
}
