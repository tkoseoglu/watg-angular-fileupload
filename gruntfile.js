/**
 * Created by Kemal on 02/05/16.
 */
module.exports = function (grunt) {
   grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      ngconstant: {
         // Options for all targets
         options: {
            space: " ",
            dest: "src/app/core/app.const.js",
            name: "watgFileuploadModule.const"
         },
         // Environment targets
         dev: {
            constants: {
               "CONST_FILEUPLOAD_TEMPLATE_URL": "src/app/directives/templates/watgFileuploadTemplate.html"
            }
         },
         dist: {
            constants: {
               "CONST_FILEUPLOAD_TEMPLATE_URL": "app/directives/templates/watgFileuploadTemplate.html"
            }
         }
      },
      connect: {
         dev: {
            options: {
               port: 9023,
               livereload: true,
               debug: true,
               target: 'http://localhost:9023/index.html', // target url to open
               open: true
            }
         },
         test: {
            options: {
               port: 9023,
               keepalive: false
            }
         }
      },
      jshint: {
         beforeconcat: ["gruntfile.js", "app/**/*.js"]
      },
      concat: {
         dev: {
            src: ["src/app/app.js", "src/app/core/*.js", "src/app/directives/*.js", "src/app/tests/*.js"],
            dest: "dev/js/watg-angular-fileupload.js"
         },
         dist: {
            src: ['src/app/appdist.js', 'src/app/core/app.const.js', 'src/app/directives/watgFileuploadDirective.js'],
            dest: 'dist/js/watg-angular-fileupload.js'
         },
         vendor: {
            src: [
               'bower_components/jquery/jquery.js',
               'bower_components/jquery-ui/jquery-ui.js',
               'node_modules/bootstrap/dist/js/bootstrap.js',

               'node_modules/angular/angular.js',
               'node_modules/angular-route/angular-route.js',
               'node_modules/angular-sanitize/angular-sanitize.js'
            ],
            dest: 'dev/js/vendor.js'
         },
         vendorDist: {
            src: [
               'bower_components/jquery/jquery.min.js',
               'bower_components/jquery-ui/jquery-ui.min.js',
               'node_modules/bootstrap/dist/js/bootstrap.min.js',

               'node_modules/angular/angular.min.js',
               'node_modules/angular-route/angular-route.min.js',
               'node_modules/angular-sanitize/angular-sanitize.min.js'
            ],
            dest: 'dev/js/vendor.min.js'
         }
      },
      uglify: {
         options: {
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
            mangle: false
         },
         dev: {
            files: {
               'dev/js/watg-angular-fileupload.min.js': ['dev/js/watg-angular-fileupload.js']
            }
         },
         dist: {
            files: {
               'dist/js/watg-angular-fileupload.min.js': ['dist/js/watg-angular-fileupload.js']
            }
         }
      },
      concat_css: {
         dev: {
            src: ["src/assets/watg-angular-fileupload.css"],
            dest: "dev/css/watg-angular-fileupload.css"
         },
         dist: {
            src: ["src/assets/watg-angular-fileupload.css"],
            dest: "dist/css/watg-angular-fileupload.css"
         }
      },
      cssmin: {
         options: {
            keepSpecialComments: 0
         },
         dev: {
            files: {
               'dev/css/watg-angular-fileupload.min.css': ['dev/css/watg-angular-fileupload.css']
            }
         },
         dist: {
            files: {
               'dist/css/watg-angular-fileupload.min.css': ['dist/css/watg-angular-fileupload.css']
            }
         },
         vendor: {
            files: {
               'dev/css/vendor.css': [
                  'node_modules/bootstrap/dist/css/bootstrap.css',
                  'node_modules/font-awesome/css/font-awesome.css',
                  'bower_components/jquery-ui/themes/base/jquery-ui.css',
               ]
            }
         }
      },
      watch: {
         files: ["src/app/app.js", "src/app/core/*.js", "src/app/**/*.js", "src/assets/*.css"],
         tasks: ['concat:dev', 'uglify:dev', 'concat_css:dev', 'cssmin:dev']
      },
      // watch: {
      //     appJs: {
      //         files: ["src/ap/app.js", "src/app/core/*.js", "src/app/**/*.js"],
      //         tasks: ["concat:dev", "uglify:dev"]
      //     },          
      //     appLess: {
      //         files: ["src/assets/*.css"],
      //         tasks: ['concat_css:dev', 'cssmin:dev']
      //     },
      //     options: {
      //         livereload: 35729
      //     }
      // },
      copy: {
         dev: {
            files: [{
               expand: true,
               src: ['bower_components/fontawesome/fonts/*', 'bower_components/bootstrap/fonts/*'],
               dest: 'dev/fonts/',
               filter: 'isFile',
               flatten: true
            },
            {
               expand: true,
               src: ['bower_components/jquery-ui/themes/base/images/*', "src/assets/images/*"],
               dest: 'dev/css/images/',
               filter: 'isFile',
               flatten: true
            }
            ]
         },
         dist: {
            files: [{
               expand: true,
               src: ["src/assets/images/*"],
               dest: 'dist/css/images/',
               filter: 'isFile',
               flatten: true
            }]
         }
      },
      html2js: {
         options: {
            base: 'src',
            module: 'watgFileuploadModule.templates',
            singleModule: true,
            useStrict: true,
            htmlmin: {
               collapseBooleanAttributes: true,
               collapseWhitespace: true,
               removeAttributeQuotes: true,
               removeComments: true,
               removeEmptyAttributes: true,
               removeRedundantAttributes: true,
               removeScriptTypeAttributes: true,
               removeStyleLinkTypeAttributes: true
            }
         },
         dev: {
            src: ['src/app/directives/templates/*.html'],
            dest: 'dev/js/watg-angular-fileupload.tpl.js'
         },
         dist: {
            src: ['src/app/directives/templates/*.html'],
            dest: 'dist/js/watg-angular-fileupload.tpl.js'
         }
      }
   });
   grunt.loadNpmTasks('grunt-ng-constant');
   grunt.loadNpmTasks('grunt-contrib-connect');
   grunt.loadNpmTasks('grunt-concat-css');
   grunt.loadNpmTasks('grunt-contrib-concat');
   grunt.loadNpmTasks('grunt-contrib-copy');
   grunt.loadNpmTasks('grunt-contrib-cssmin');
   grunt.loadNpmTasks('grunt-contrib-uglify');
   grunt.loadNpmTasks('grunt-contrib-watch');
   grunt.loadNpmTasks("grunt-contrib-jshint");
   grunt.loadNpmTasks('grunt-html2js');
   grunt.registerTask('dev', ['ngconstant:dev', "jshint", 'concat:dev', 'uglify:dev', 'concat_css:dev', 'cssmin:dev', 'copy', 'connect:dev', 'html2js:dev', 'watch']); //, 'watch'
   grunt.registerTask('dist', ['ngconstant:dist', 'concat:dist', "jshint", 'uglify:dist', 'concat_css:dist', 'cssmin:dist', 'copy:dist', 'html2js:dist']);
};