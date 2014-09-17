module.exports = function(grunt) {
  grunt.initConfig({
    concat: {
      options: {
        separator: ';'
      },
      production_js: {
        src: [
          'src/modernizr/modernizr.min.js',
          'src/jquery/jquery.js',
          'src/bootstrap/javascript/tooltip.js',
          'src/bootstrap/javascript/popover.js',
          'src/bootstrap/javascript/alert.js',
          'src/bootstrap/javascript/affix.js',
          'src/bootstrap/javascript/button.js',
          'src/bootstrap/javascript/carousel.js',
          'src/bootstrap/javascript/collapse.js',
          'src/bootstrap/javascript/dropdown.js',
          'src/bootstrap/javascript/modal.js',
          'src/bootstrap/javascript/scrollspy.js',
          'src/bootstrap/javascript/tab.js',
          'src/bootstrap/javascript/transition.js',
          'src/syntax-highlighting/prism.js',
          'src/pivotal-ui/javascripts/*.js'
        ],
        dest: 'dist/pivotal-ui/pivotal-ui.js'
      }
    },
    compass: {
      dist: {
        options: {
          config: 'config/compass.rb',
          specify: ['src/pivotal-ui/pivotal-ui.scss', 'src/style_guide/style_guide.css.scss']
        }
      }
    },
    hologram: {
      generate: {
        options: {
          config: 'hologram_config.yml'
        }
      }
    },
    watch: {
      sass: {
        files: ['src/**/*.scss', 'src/**/*.js', 'doc_assets/**/*', 'src/style_guide/*.html'],
        tasks: ['default']
      },
      livereload: {
        options: { livereload: true },
        files: ['dist/**/*']
      }
    },
    clean: ["build", "dist"],
    copy: {
      main: {
        files: [
          {
            expand: true, src: ['src/style_guide/*.js', 'src/style_guide/github.css'],
            dest: 'dist/style_guide', filter: 'isFile', flatten: true
          },
          {
            expand: true, src: ['src/style_guide/*.html'],
            dest: 'dist/', filter: 'isFile', flatten: true
          },
          {
            expand: true, src: ['src/syntax-highlighting/*'],
            dest: 'dist/syntax-highlighting/', filter: 'isFile', flatten: true
          },
          {
            expand: true, src: ['src/nginx.conf','src/Staticfile'],
            dest: 'dist/', filter: 'isFile', flatten: true
          },
          {
            expand: true, src: ['font-awesome/**/*', 'source-sans-pro/**/*', 'images/**/*'], cwd: 'src/',
            dest: 'dist/', filter: 'isFile', flatten: false
          }
        ]
      },
      to_pws: {
        files: [
          {
            expand: true,
            cwd: 'dist/',
            src: ['**', '!nginx.conf', '!variables.css.scss', '!Staticfile'],
            dest: '../pws-marketing-2/vendor',
            filter: 'isFile',
            flatten: false
          },
          {
            expand: true,
            cwd: 'src/pivotal-ui/components/',
            src: ['variables.css.scss'],
            dest: '../pws-marketing-2/_sass/',
            filter: 'isFile',
            rename: function(dest, src) {
              return dest + '_pui_variables.scss';            }
          }
        ]
      }
    }
  });


  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-hologram');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['concat','compass','copy:main','hologram', 'copy:to_pws']);
};
