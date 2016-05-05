module.exports = function (grunt) {
'use strict';

  // load plugins
  require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

  grunt.loadNpmTasks('grunt-karma'); //unit tests
  grunt.loadNpmTasks('grunt-protractor-runner'); //e2e tests


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
        separator: '\n\n'
      },
      build: {
        files: {
          'dist/md-data-table.js': ['app/md-data-table/**/*.js', '.temp/templates.js']
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
            return 'templates.' + moduleName.split('/').pop();
          },
          useStrict: true
        },
        files: {
          '.temp/templates.js': 'app/md-data-table/**/*.html'
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
      build: 'app/md-data-table/**/*.js',
      app: ['app/app.js', 'app/scripts/**/*.js']
    },


    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
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
          'dist/md-data-table.css': 'app/md-data-table/styles/md-data-table.less'
        }
      }
    },

    protractor: {
      options: {
        configFile: "protractor.conf.js", // Default config file
        keepAlive: false, // If false, the grunt process stops when the test fails.
        noColor: false, // If true, protractor will not use colors in its output.
        args: {
          // Arguments passed to the command
        }
      },
      auto: {   // Grunt requires at least one target to run so you can simply put 'all: {}' here too.
        keepAlive: true
      },
      singlerun:{}
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
        files: 'app/md-data-table/**/*.less',
        tasks: ['less:build', 'autoprefixer:build']
      },
      buildScripts: {
        files: 'app/md-data-table/**/*.js',
        tasks: ['jshint:build', 'concat:build']
      },
      buildTemplates: {
        files: 'app/md-data-table/**/*.html',
        tasks: ['html2js:build', 'concat:build']
      },
      gruntfile: {
        files: 'Gruntfile.js'
      },
      index: {
        files: 'app/index.html'
      }
    }
  });

  grunt.registerTask('default', function() {

    // buld the md-data-table module
    grunt.task.run('build');

    // start the app
    grunt.task.run('serve');
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

  grunt.registerTask('test:unit', [
    'html2js', // we have to convert all those .html files to .js ones!
    'jshint',
    'karma'
  ]);

  grunt.registerTask('test:e2e', [
    'html2js',
    'connect:test',
    'protractor:singlerun',
  ]);

};
