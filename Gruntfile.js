module.exports = function(grunt) {
  grunt.initConfig({
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: [
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
          'src/bootstrap/javascript/transition.js'
        ],
        dest: 'build/pivotal-ui/pivotal-ui.js'
      }
    },
    compass: {
      dist: {
        options: {
          config: 'config/compass.rb',
          specify: 'src/pivotal-ui/pivotal-ui.scss'
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
        files: ['src/**/*.scss'],
        tasks: ['default']
      },
      livereload: {
        options: { livereload: true },
        files: ['styleguide/**/*']
      }
    },
    clean: ["build", "styleguide"]
  });


  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-hologram');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['clean','concat','compass','hologram']);
};
