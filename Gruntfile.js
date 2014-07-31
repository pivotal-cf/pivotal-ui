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
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
};
