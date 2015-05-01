module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['Gruntfile.js', 'public/js/**/*.js'],
      options: {
        undef: true,
        // unused: true,
        curly: true,
        latedef: true,
        browser: true,
        devel: true,
        globals: {
          $: true,
          jQuery: true,
          module: true,
          angular: true,
          moment: true,
          markdown: true,
          jsPDF: true
        }
      }
    },
    copy: {
      dist: {
        expand: true,
        cwd: 'public/',
        src: [
          'favicon.png',
          'data/*.json',
          'data/**/*.js',
          'libs/**/*.js',
          'libs/**/*.css',
          'libs/**/*.map',
          'libs/**/*.svg',
          'libs/**/*.woff',
          'libs/**/*.eot',
          'libs/**/*.ttf',
          'views/**/*.html'
        ],
        dest: 'dist/'
      },
      fonts: {
        expand: true,
        flatten: true,
        cwd: 'public/',
        src: [
          'libs/**/*.svg',
          'libs/**/*.woff',
          'libs/**/*.eot',
          'libs/**/*.ttf',
        ],
        dest: 'dist/fonts/'
      }
    },
    concat: {
      options: {
        separator: ';'
      },
      js: {
        src: [
          'public/libs/angular/angular.min.js',
          'public/libs/angular-ui-router/release/angular-ui-router.min.js',
          'public/libs/angular-animate/angular-animate.min.js',
          'public/libs/angular-sanitize/angular-sanitize.min.js',
          'public/libs/ngInfiniteScroll/build/ng-infinite-scroll.min.js',
          'public/libs/jspdf/dist/jspdf.min.js',
          'public/libs/markdown/lib/markdown.js',
          'public/libs/moment/min/moment.min.js',
          'public/libs/angular-bootstrap/ui-bootstrap.min.js',
          'public/libs/angular-bootstrap/ui-bootstrap-tpls.min.js',
          'public/libs/bootstrap/dist/js/bootstrap.min.js',
          'public/libs/jvectormap/jquery.jvectormap.min.js',
          'public/js/**/*.js'
        ],
        dest: 'dist/js/<%= pkg.name %>.js'
      },
      css: {
        src: [
          'public/css/**/*.css'
        ],
        dest: 'dist/css/<%= pkg.name %>.css'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
        mangle: false
      },
      dist: {
        files: {
          'dist/js/<%= pkg.name %>.min.js': ['<%= concat.js.dest %>']
        }
      }
    },
    cssmin: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        options: {
          ignore: []
        },
        files: {
          'dist/css/<%= pkg.name %>.min.css': ['<%= concat.css.dest %>']
        }
      }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'public/images/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'dist/images/'
        }]
      }
    },
    processhtml: {
      dist: {
        files: {
          'dist/index.html': ['public/index.html']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-processhtml');

  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('default', ['jshint', 'copy', 'concat', 'uglify', 'cssmin', 'processhtml']);
  grunt.registerTask('full', ['jshint', 'copy', 'concat', 'uglify', 'cssmin', 'imagemin', 'processhtml']);

};
