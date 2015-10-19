require('babel/register');

// Обязательная обёртка
module.exports = function(grunt) {

    grunt.initConfig({
      //pkg: grunt.file.readJSON('package.json'),
      execute: {
        target: {
            src: ['babel-node --stage 0 ./bin/www']
        }
      },
      express: {
            dev: {
                options: {
                    script: 'babel-node --stage 0 ./bin/www'
                }
            }
      },
      open: {
          server: {
              path: 'http://localhost:3000/',
              app: (function(){
                  var browsers = {
                      linux: 'google-chrome',
                      win32: 'chrome',
                      other: 'Google Chrome'
                  };
                  var platform = process.platform;
                  return browsers[platform] ? browsers[platform] : browsers.other;
              })()
          }
      },
      less: {
          dev: {
              options: {
                  sourceMap: true,
                  sourceMapFileInline: true,
                  outputSourceFiles: true,
                  sourceMapRootpath: '/'
              },
              files: {
                  'public/css/index.css': 'less/main.less' // destination file and source file
              }
          },
          build: {
              options: {
                  compress: true,
                  yuicompress: true,
                  optimization: 2
              },
              files: {
                  'public/css/index.css': 'less/main.less' // destination file and source file
              }
          }
      },
      watch: {
          options: {
              nospawn: true,
              interrupt: false,
              debounceDelay: 250,
              livereload: true
          },
          styles: {
              files: ['less/*.less'],
              tasks: ['less:dev']
          },
          js: {
              files: [
                  'client/**/*.{js,jsx}',
                  'server/**/*.{js,jsx}',
                  'shared/**/*.{js,jsx}'
              ],
              tasks: 'browserify:dev'
          },
          files: '**/*.jsx',
          scripts: { // triggers live reload
              files: 'public/js/bundle.js'
          }
      },
      browserify: {
          dev: {
              options: {
                  watch: true, // use watchify for better performance
                  browserifyOptions: {
                      debug: true
                  }
              },
              files: {
                  'public/js/bundle.js': 'client/app.js'
              }
          },
          build: {
              files: {
                  'public/js/bundle.js': 'client/app.js'
              }
          }
      },
      uglify: {
          build: {
              options: {
                  sourceMap: true,
                  sourceMapName: 'public/js/sourcemap.map',
                  compress: {}
              },
              files: {
                  'public/js/bundle.min.js': ['public/js/bundle.js']
              }
          }
      }
    });

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.registerTask('build', [
        'browserify:dev',
        'less:dev',
        'execute'
    ]);
    grunt.registerTask('dev', [
        'build',
        'open',
        'watch'
    ]);
    grunt.registerTask('prod', [
        'browserify:build',
        'uglify:build',
        'less:dev'
    ]);

};
