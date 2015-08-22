module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: [
        'Gruntfile.js',
        'package.json',
        'bower.json',
        'server.js',
        'public/app/**/*.js',
        'public/languages/**/*.json',
        'app/**/*.js'
      ],
      options: {
        undef: true,
        // unused: true,
        curly: true,
        latedef: true,
        browser: true,
        devel: true,
        globals: {
          module: true,
          angular: true,
          moment: true,
          markdown: true,
          jsPDF: true,
          jwt_decode: true,
          ga: true,
          require: true,
          process: true,
          __dirname: true,
          exports: true,
          res: true,
          Promise: true,
          Raphael: true
        }
      }
    },
    clean: ['dist/'],
    copy: {
      dist: {
        expand: true,
        cwd: 'public/',
        src: [
          'assets/maps/**/*.json',
          'assets/maps/**/*.js',
          'assets/languages/**/*.json',
          'assets/libs/**/*.js',
          'assets/libs/**/*.css',
          'assets/libs/**/*.map',
          'app/**/*.html'
        ],
        dest: 'dist/'
      },
      fonts: {
        expand: true,
        flatten: true,
        cwd: 'public/',
        src: [
          'assets/libs/**/*.svg',
          'assets/libs/**/*.woff',
          'assets/libs/**/*.woff2',
          'assets/libs/**/*.eot',
          'assets/libs/**/*.ttf',
        ],
        dest: 'dist/assets/fonts/'
      }
    },
    concat: {
      js: {
        options: {
          separator: ';'
        },
        src: [
          'public/assets/libs/angular/angular.min.js',
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
          'public/assets/libs/raphael/raphael-min.js',
          'public/assets/libs/jwt-decode/build/jwt-decode.min.js',
          'public/app/app-module.js',
          'public/app/*.js',
          'public/app/**/*.js'
        ],
        dest: 'dist/assets/js/<%= pkg.name %>.js'
      },
      css: {
        options: {
          separator: ' '
        },
        src: [
          'public/assets/libs/bootstrap/dist/css/bootstrap.min.css',
          'public/assets/libs/components-font-awesome/css/font-awesome.min.css',
          'public/app/app-style.css',
          'public/app/**/*.css'
        ],
        dest: 'dist/assets/css/<%= pkg.name %>.css'
      },
      cssImport: {
        options: {
          process: function(src, filepath) {
            return "@import url(http://fonts.googleapis.com/css?family=Ubuntu:400,500,700);"+src.replace('@import url(http://fonts.googleapis.com/css?family=Ubuntu:400,500,700);', '');
          }
        },
        files: {
          '<%= concat.css.dest %>': ['<%= concat.css.dest %>']
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
        mangle: false
      },
      dist: {
        files: {
          'dist/assets/js/<%= pkg.name %>.min.js': ['<%= concat.js.dest %>']
        }
      }
    },
    cssmin: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/assets/css/<%= pkg.name %>.min.css': ['<%= concat.css.dest %>']
        }
      }
    },
    imagemin: {
      dynamic: {
        options: {
          optimizationLevel: 4,
        },
        files: [{
          expand: true,
          cwd: 'public/assets/images/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'dist/assets/images/'
        }]
      }
    },
    processhtml: {
      dist: {
        files: {
          'dist/index.html': ['public/index.html']
        }
      }
    },
    pagespeed: {
      options: {
        nokey: true
      },
      desktop: {
        options: {
          url: "http://ianlamb.com",
          locale: "en_CA",
          strategy: "desktop",
          threshold: 80
        }
      },
      mobile: {
        options: {
          url: "http://ianlamb.com",
          locale: "en_CA",
          strategy: "mobile",
          threshold: 60
        }
      }
    },
    watch: {
      all: {
        files: [
          'public/app/**/*.html',
          'public/app/**/*.js',
          'public/app/**/*.css',
          'public/assets/languages/**/*.json',
          'public/assets/images/**/*.jpg',
          'public/assets/images/**/*.png',
          'public/assets/images/**/*.gif'
        ],
        options: {
          livereload: true,
        },
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-pagespeed');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('default', ['jshint', 'copy', 'concat', 'uglify', 'cssmin', 'processhtml']);
  grunt.registerTask('full', ['jshint', 'clean', 'copy', 'concat', 'uglify', 'cssmin', 'imagemin', 'processhtml']);

};
