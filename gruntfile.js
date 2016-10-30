module.exports = function(grunt) {
  grunt.initConfig({
    watch: {
      scripts: {
        files: [
          'sass/style.sass',
          'js/script.js',
          'css/style.css'
        ],
        tasks: ['sass',
                'uglify',
                'postcss'
        ],
        options: {
            spawn: false,
        },
      }
    },

    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'css/style.css': 'sass/style.sass' 
        }
      }
    },

    uglify: {
      my_target: {
        files: {
          'js/script.min.js': 'js/script.js'
        }
      }
    },

    browserSync: {
      bsFiles: {
        src: [
          'css/style.min.css',
          'pages/index.html',
          'js/script.min.js'
        ]
      },
      options: {
        watchTask: true,
        server: ['./css', './pages', './js', './owfont']
      }
    },
    
    postcss: {
      options: {
        map: true,

        processors: [
          require('cssnano')({zindex: false})
        ]
      },
      dist: {
        src: 'css/style.css',
        dest: 'css/style.min.css'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-postcss');

  grunt.registerTask('default', ['uglify', 'sass', 'postcss', 'browserSync', 'watch']);
};