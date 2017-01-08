module.exports = (config) => {
  config.set({

    basePath: '',

    frameworks: ['mocha', 'browserify'],

    files: [
      'test/**/*.js',
    ],

    // list of files to exclude
    exclude: [
    ],

    browserify: {
      debug: true,
      extensions: ['.js'],
      transform: [
        require('babelify').configure({
          plugins: ['babel-plugin-espower'],
        }),
      ],
      configure: (bundle) => {
        bundle.on('prebundle', () => {
          bundle.external('react/addons');
          bundle.external('react/lib/ReactContext');
          bundle.external('react/lib/ExecutionEnvironment');
        });
      },
    },

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/**/*.js': ['browserify'],
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
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Nightmare'],

    nightmareOptions: {
      width: '800px',
      height: '600px',
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,
  });
};
