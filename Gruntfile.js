module.exports = function(grunt) {
  // Load Grunt tasks declared in the package.json file
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  var jsSrc = [
        'lib/jquery/jquery.js',
        'bower_components/intl-tel-input/build/js/intlTelInput.js',
        'lib/intl-tel-input/utils.js',
        'lib/modernizr/modernizr.js',
        'lib/handlebars/handlebars.js',
        'lib/swag/swag.js',
        'lib/underscore/underscore.js',
        'lib/bootstrap/bootstrap.js',
        'lib/bootstrap-jasny/jasny-bootstrap.js',
        'lib/he/he.js',
        'lib/backbone/backbone.js',
        'lib/backbone.wreqr/backbone.wreqr.js',
        'lib/backbone.babysitter/backbone.babysitter.js',
        'lib/backbone.supermodel/backbone.supermodel.js',
        'bower_components/marionette/lib/core/backbone.marionette.js',
        'lib/backbone.marionette.handlebars/backbone.marionette.handlebars.js',
        'lib/backbone.analytics/backbone.analytics.js',
        'lib/microplugin/microplugin.js',
        'lib/sifter/sifter.js',
        'lib/selectize/selectize.js',
        'lib/moment/moment.js',
        'lib/moment-timezone/moment-timezone-with-data-2010-2020.js',
        'lib/placeholders/build/placeholders.js',
        'lib/messenger/messenger.js',
        'lib/messenger/messenger-theme-future.js',
        'lib/pickadate/picker.js',
        'bower_components/pickadate/lib/picker.date.js',
        'bower_components/pickadate/lib/picker.time.js',
        'lib/backbone.modal/backbone.modal-bundled.js',
        'lib/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.js',
        'bower_components/switchery/dist/switchery.js',
        'lib/seiyria-bootstrap-slider/bootstrap-slider.js',
        'lib/jquery.cookie/jquery.cookie.js',
        'lib/jquery.dfp.js/jquery.dfp.js',
        'lib/card/card.js',
        'lib/bootcards/bootcards.js',
        'lib/bootstrap-select/bootstrap-select.js',
        'lib/jquery.payment/jquery.payment.js'
      ],
      cssSrc = [
        'lib/bootstrap/bootstrap.css',
        'lib/bootstrap-jasny/jasny-bootstrap.css',
        'lib/font-awesome/font-awesome.css',
        'lib/selectize/selectize.css',
        'lib/messenger/messenger.css',
        'lib/messenger/messenger-theme-future.css',
        'lib/messenger/messenger-theme-air.css',
        'lib/messenger/messenger-theme-flat.css',
        'bower_components/bootcards/dist/css/bootcards-desktop.css',
        'lib/backbone.modal/backbone.modal.css',
        'bower_components/pickadate/lib/themes/default.css',
        'bower_components/pickadate/lib/themes/default.date.css',
        'bower_components/pickadate/lib/themes/default.time.css',
        'lib/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.css',
        'bower_components/switchery/dist/switchery.css',
        'lib/seiyria-bootstrap-slider/bootstrap-slider.css',
        'lib/card/card.css',
        'lib/bootstrap-select/bootstrap-select.css',
        'lib/intl-tel-input/intlTelInput.css',
        'assets/css/custom.css'
      ];
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bower: {
      install: {
        options: {
          targetDir: './lib',
          layout: 'byType',
          install: true,
          verbose: false,
          cleanTargetDir: true,
          cleanBowerDir: false
        }
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'assets/js/**/*.js'],
      server: ['server.js', 'routes/index.js']
    },
    uglify: {
      options: {
        beautify: false,
        mangle: true
      },
      vendors: {
        files: {
          'public/js/vendors.min.js': jsSrc
        }
      },
      app: {
        files: {
          'public/js/app.min.js': [
            'assets/js/**/*.js'
          ]
        }
      }
    },
    cssmin: {
      combine: {
        files: {
          'public/css/app.css': cssSrc
        }
      }
    },
    concat: {
      options: {
        stripBanners: true,
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */',
      },
      css: {
        src: cssSrc,
        dest: 'public/css/app.css',
      },
      app: {
        src: [
          'assets/js/**/*.js'
        ],
        dest: 'public/js/app.min.js',
      },
      jsDev: {
        src: jsSrc,
        dest: 'public/js/vendors.min.js',
      },
    },
    copy: {
      main: {
        files: [
          {
            expand: true,
            flatten: true,
            src: [
              'lib/bootstrap/*.svg',
              'lib/bootstrap/*.eot',
              'lib/bootstrap/*.ttf',
              'lib/bootstrap/*.woff',
              'lib/font-awesome/*.svg',
              'lib/font-awesome/*.eot',
              'lib/font-awesome/*.ttf',
              'lib/font-awesome/*.woff',
              'lib/bootcards/*.svg',
              'lib/bootcards/*.eot',
              'lib/bootcards/*.ttf',
              'lib/bootcards/*.woff'
            ],
            dest: 'public/fonts/',
            filter: 'isFile'
          },
          {
            expand: true,
            flatten: true,
            src: [
              'assets/images/*.*'
            ],
            dest: 'public/images/',
            filter: 'isFile'
          },
          {
            expand: true,
            flatten: true,
            src: [
              'lib/intl-tel-input/*.png'
            ],
            dest: 'public/images/',
            filter: 'isFile'
          },
          {
            expand: true,
            flatten: true,
            src: [
              'lib/font-awesome/*.css'
            ],
            dest: 'public/css/',
            filter: 'isFile'
          }

        ]
      }
    },
    handlebars: {
      compile: {
        options: {
          namespace: "Templates",
          processName: function(filePath) { // input:  templates/_header.hbs
            var pieces = filePath.split("/");
            return pieces[pieces.length - 1].split(".")[0]; // output: _header.hbs
          },
          compilerOptions: {
            knownHelpers: {
              "ul": true
            }
          }
        },
        files: {
          "public/js/templates.js": ["assets/templates/*.html"]
        }
      }
    },
    watch: {
      grunt: {
        files: ['Gruntfile.js'],
        tasks: ['build', 'express:dev', 'watch'],
        options: {
          spawn: true,
        },
      },
      scripts: {
        files: ['assets/js/**/*.js'],
        tasks: ['jshint:all', 'concat:app'],
        options: {
          spawn: true,
        },
      },
      express: {
        files: ['server.js', 'routes/index.js', 'io-routes/index.js'],
        tasks: ['jshint:server', 'express:dev'],
        options: {
          nospawn: true //Without this option specified express won't be reloaded
        }
      },
      css: {
        files: ['assets/css/*.css'],
        tasks: ['concat:css'],
        options: {
          spawn: true,
        },
      },
      templates: {
        files: ['assets/templates/*.html'],
        tasks: ['handlebars'],
        options: {
          spawn: true,
        },
      },
      data: {
        files: ['assets/data/*.json'],
        tasks: ['json:data'],
        options: {
          spawn: true,
        },
      }
    },
    express: {
      options: {
        debug: true
        // Override defaults here
      },
      dev: {
        options: {
          script: 'server.js'
        }
      }
    },
    'node-inspector': {
      default: {}
    },
    json: {
      data: {
        options: {
          namespace: 'Data',
          includePath: true,
          processName: function(filename) {
            var _name = filename.split("/"),
                len = _name.length-1,
                name = _name[len].split(".")[0];
            return name.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
          }
        },
        src: ['assets/data/**/*.json'],
        dest: 'public/js/json.js'
      }
    },
    open : {
      dev : {
        path: 'http://127.0.0.1:3001'
      }
    }
  });

  grunt.registerTask('build', [
    'bower:install',
    'jshint:server',
    'jshint:all',
    'uglify',
    'cssmin',
    'copy',
    'handlebars',
    'json:data'
  ]);

  grunt.registerTask('build-dev', [
    'bower:install',
    'jshint:server',
    'jshint:all',
    'concat',
    'copy',
    'handlebars',
    'json:data'
  ]);

  grunt.event.on('watch', function(action, filepath, target) {
    grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
  });

  grunt.registerTask('server', [ 'build-dev', 'open:dev', 'express:dev', 'watch' ]);

  // Default task(s).
  grunt.registerTask('default', ['build']);

};
