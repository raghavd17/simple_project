/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['lib/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    concat: {
      options: {
      separator: ';',
      },
      basicjs: {
        src: ['script/main.js'],
        dest: 'js/basic.js',
      },
      // extrasJs: {
      //   src: ['script/main.js', 'script/custom.js'],
      //   dest: 'js/with_custom.js',
      // },
    },
    uglify: {
    my_target: {
      options: {
        beautify: true
      },
      files: {
        // 'js/output.min.js': ['script/main.js','script/custom.js']
        'js/output.min.js': ['script/main.js']
      }
    },
  },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['script/*.js', 'js/*.js']
      }
    },
    qunit: {
      files: ['*.html']
    },
    sass: {                              // Task
      dist: {                            // Target
        options: {                       // Target options
          // style: 'expanded',
          style: 'compressed'
        },
        files: {                         // Dictionary of files
          // src: ['scss/vendor.scss', 'scss/vendor1.scss'], // 'source'
          // dest: 'css/main.css', // 'destination'
          'css/main.css': 'scss/main.scss',       // 'destination': 'source'
        }
      }
    },
      watch: {
        gruntfile: {
          files: 'Gruntfile.js',
          // tasks: ['jshint:gruntfile'],
          tasks: ['concat', 'uglify'],
        },
        src: {
          files: ['script/*.js', 'sources/scss/*.scss', '!lib/dontwatch.js'],
          tasks: ['default'],
        },
        test: {
          files: '<%= jshint.test.src %>',
          tasks: ['jshint:test', 'qunit'],
        },
      },
      iconfont: {
        options: {
        fontName: "my-font-name"
        },
        your_target: {
        src: 'svg_icons/*.svg', dest: 'font/'
        }
      },
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-iconfont');

  // Default task.
  grunt.registerTask('default', ['watch', 'iconfont','sass','jshint', 'qunit', 'concat', 'uglify']);

};
