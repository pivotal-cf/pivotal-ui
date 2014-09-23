module.exports = function(grunt) {
  grunt.initConfig({
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
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['concat','compass','copy:main','hologram', 'copy:to_pws']);
};
