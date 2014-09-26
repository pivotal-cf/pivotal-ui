module.exports = function(grunt) {
  grunt.initConfig({
    release: {
      bump: {
        commitMessage: 'Released v%VERSION%'
      }
    }
  });

  grunt.loadNpmTasks('grunt-semantic-release');
};
