module.exports = function (grunt) {
'use strict';

  function banner() {
    return '/*\n' +
      ' * Angular Material Data Table\n' +
      ' * https://github.com/daniel-nagy/md-data-table\n' +
      ' * @license MIT\n' +
      ' * v' + getVersion() + '\n' +
      ' */\n' +
      '(function (window, angular, undefined) {\n\'use strict\';\n\n';
  }

  function getVersion() {
    return grunt.file.readJSON('./bower.json').version;
  }

  // load plugins
  require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

  grunt.loadNpmTasks('grunt-karma'); //unit tests
  grunt.loadNpmTasks('grunt-protractor-runner'); //e2e tests
  grunt.loadNpmTasks('grunt-notify');


  grunt.initConfig({

    config: {
      livereload: 35729
    },

    // Add vendor prefixes
    autoprefixer: {
      options: {
        browsers: ['last 2 versions']
      },
      app: {
        files: {
          'app/app.css': 'app/app.css'
        }
      },
      build: {
        files: {
          'dist/md-data-table.css': 'dist/md-data-table.css'
        }
      }
    },

    // remove generated files
    clean: {
      app: 'app/app.css',
      build: '.temp',
      dist: 'dist'
    },

    // condense javascript into a single file
    concat: {
      options: {
        banner: banner(),
        footer: '\n\n})(window, angular);',
        process: function (src) {
          return src.replace(/^'use strict';\s*/, '');
        },
        separator: '\n\n'
      },
      build: {
        files: {
          'dist/md-data-table.js': ['.temp/templates.js', 'src/**/*.js']
        }
      }
    },

    // static web server
    connect: {
      app: {
        options: {
          port: 8000,
          // hostname: '127.0.0.1',
          hostname: '0.0.0.0',
          livereload: '<%= config.livereload %>',
          base: ['bower_components', 'dist', 'app']
        }
      },
      test: {
        options: {
          port: 8001,
          // hostname: '127.0.0.1',
          hostname: '0.0.0.0',
          base: ['bower_components', 'dist', 'app']
        }
      }
    },


    // minify css files
    cssmin: {
      build: {
        files: {
          'dist/md-data-table.min.css': 'dist/md-data-table.css'
        }
      }
    },

    // convert templates to javascript and load them into
    // the template cache
    html2js: {
      build: {
        options: {
          base: 'app/md-data-table',
          module: 'md.table.templates',
          quoteChar: '\'',
          rename: function(moduleName) {
            return moduleName.split('/').pop();
          }
        },
        files: {
          '.temp/templates.js': ['src/templates/*.html', 'src/icons/*.svg']
        }
      }
    },

    // report bad javascript syntax, uses jshint-stylish for
    // more readable logging to the console
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish'),
        force: true
      },
      build: 'src/**/*.js',
      app: ['app/app.js', 'app/scripts/**/*.js']
    },


    karma: {
      options: {
        configFile: 'karma.conf.js'
      },
      watch: {
        singleRun: false,
        autoWatch: true
      },
      unit:{  }
    },

    // compile less
    less: {
      app: {
        files: {
          'app/app.css': 'app/styles/app.less'
        }
      },
      build: {
        files: {
          'dist/md-data-table.css': 'src/styles/md-table.less'
        }
      }
    },

    protractor: {
      options: {
        configFile: "protractor.conf.js", // Default config file
        keepAlive: true,
      },
      watch: {
        options: {
          args: {
            params: {
               baseUrl: 'http://localhost:8000',
            }
          }
        }
      },
      singleRun: {
        options: {
          keepAlive: false,
          args: {
            params: {
               baseUrl: 'http://localhost:8001',
            }
          }
        }
      }
    },
    // minify javascript files
    uglify: {
      build: {
        files: {
          'dist/md-data-table.min.js': 'dist/md-data-table.js'
        }
      }
    },

    // perform tasks on file change
    watch: {
      options: {
        livereload: '<%= config.livereload %>'
      },
      appLess: {
        files: 'app/styles/**/*.less',
        tasks: ['less:app', 'autoprefixer:app']
      },
      appScripts: {
        files: ['app/app.js', 'app/scripts/**/*.js'],
        tasks: 'jshint:app'
      },
      appTemplates: {
        files: 'app/templates/**/*.html'
      },
      buildLess: {
        files: 'src/**/*.less',
        tasks: ['less:build', 'autoprefixer:build']
      },
      buildScripts: {
        files: 'src/**/*.js',
        tasks: ['jshint:build', 'concat:build']
      },
      buildTemplates: {
        files: 'src/**/*.html',
        tasks: ['html2js:build', 'concat:build']
      },
      gruntfile: {
        files: 'Gruntfile.js'
      },
      e2e: {
        files: 'tests/e2e/**/*.js',
        tasks: ['protractor:watch']
      },
      karma: {
        files: 'tests/unit/**/*.js',
        tasks: ['karma:unit']
      },
      index: {
        files: 'app/index.html'
      }
    }
  });


  grunt.registerTask('default', function () {
    // buld the md-data-table module
    grunt.task.run('build');

    // start the app
    // grunt.task.run('serve');

    // serve, test and watch for changes
    grunt.task.run([
      'connect:app',
      'karma:unit',
      'protractor:watch',
      'watch'
    ]);

  });

  grunt.registerTask('build', [
    'jshint:build',
    'less:build',
    'autoprefixer:build',
    'cssmin:build',
    'html2js:build',
    'concat:build',
    'uglify:build'
  ]);

  grunt.registerTask('serve', [
    'jshint:app',
    'less:app',
    'autoprefixer:app',
    'connect:app',
    'watch'
  ]);




  // run a single time
  grunt.registerTask('test:unit', [
    'html2js', // we have to convert all those .html files to .js ones!
    'karma:unit'
  ]);

  // run a single time
  grunt.registerTask('test:e2e', [
    'html2js',
    'connect:test',
    'protractor:singleRun',
  ]);

  // run both unit and e2e tests once
  grunt.registerTask('test', function(){
    grunt.task.run('test:unit');
    grunt.task.run('test:e2e');
  });


};
