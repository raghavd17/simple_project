/*global module:false*/
var mozjpeg = require('imagemin-mozjpeg');
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
          stripBanners: true,
          separator: ';'
        },
        basicjs: {
          src: ['script/main.js', 'script/custom.js'],
          dest: 'js/main.js',
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
            'js/main.min.js': ['script/main.js']
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
          beforeconcat: ['script/*.js', 'js/*.js'],
          afterconcat: ['js/*.js']
        }
    },
    qunit: {
      files: ['*.html']
    },
    sass: { // Task
      dev: { // Target
        options: { // Target options
          style: 'expanded'
          // style: 'compressed'
        },
        files: { // Dictionary of files
          'css/main.css': 'scss/main.scss', // 'destination': 'source'
        }
      },
      production: { // Target
        options: { // Target options
          // style: 'expanded'
          style: 'compressed'
        },
        files: { // Dictionary of files
          'css/main.min.css': 'scss/main.scss', // 'destination': 'source'
        }
      }
    },
    watch: {
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: ['jshint:gruntfile'],
        tasks: ['concat', 'uglify', 'sass'],
      },
      src: {
        files: ['script/*.js', 'js/*.js', 'sources/scss/*.scss', '!lib/dontwatch.js'],
        tasks: ['default'],
      }
      // test: {
      //   files: '<%= jshint.test.src %>',
      //   tasks: ['jshint:test', 'qunit'],
      // },
    },
    iconfont: {
      options: {
        fontName: "my-font-name"
      },
      your_target: {
        src: 'svg_icons/*.svg',
        dest: 'font/'
      }
    },
    imagemin: { // Task
      static: { // Target
        options: { // Target options
          optimizationLevel: 3,
          svgoPlugins: [{
            removeViewBox: false
          }],
          use: [mozjpeg()]
        },
        files: { // Dictionary of files
        'img/': 'img-src/*.{png,jpg,gif}', // 'destination': 'source'
        }
      },
      dynamic: { // Another target
        files: [{
          expand: true, // Enable dynamic expansion
          cwd: 'img-src/', // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif}'], // Actual patterns to match
          dest: 'img/' // Destination path prefix
        }]
      }
    }
  });

// These plugins provide necessary tasks.
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-qunit');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-iconfont');
grunt.loadNpmTasks('grunt-contrib-imagemin');

// Default task.
grunt.registerTask('default', ['watch', 'iconfont', 'sass', 'jshint', 'qunit', 'concat', 'uglify', 'imagemin']);

};
