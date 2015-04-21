module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['Gruntfile.js', 'public/js/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    copy: {
      dist: {
        expand: true,
        cwd: './',
        src: ['app/**/*'],
        dest: 'dist/'
      }
    },
    concat: {
      options: {
        separator: ';'
      },
      js: {
        src: ['dist/js/**/*.js'],
        dest: 'dist/js/<%= pkg.name %>.js'
      },
      css: {
        src: ['dist/css/**/*.css'],
        dest: 'dist/css/<%= pkg.name %>.css'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/js/<%= pkg.name %>.min.js': ['<%= concat.js.dest %>']
        }
      }
    },
    uncss: {
      dist: {
        files: {
          'dist/css/<%= pkg.name %>.css': ['dist/index.html', 'dist/views/**/*.html']
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
          cwd: 'dist/images/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'dist/images/'
        }]
      }
    },
    processhtml: {
      dist: {
        files: {
          'dist/index.html': ['dist/index.html']
        }
      }
    },
    watch: {
      js: {
        files: ['<%= concat.js.src %>'],
        tasks: ['concat', 'uglify']
      },
      css: {
        files: ['<%= concat.css.src %>'],
        tasks: ['concat', 'cssmin']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-uncss');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('test', []);

  grunt.registerTask('default', ['copy', 'concat', 'uglify', 'cssmin', 'imagemin', 'processhtml']);

};
