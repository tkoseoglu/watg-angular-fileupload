/**
 * Created by Kemal on 02/05/16.
 */
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
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
            app: {
                src: ["src/app/app.js", "src/app/core/*.js", "src/app/directives/*.js", "src/app/tests/*.js"],
                dest: "dev/js/watg-angular-fileupload.js"
            },
            appDist: {
                src: ['src/app/appdist.js', 'src/app/directives/watgFileuploadDirective.js'],
                dest: 'dist/js/watg-angular-fileupload.js'
            },
            vendor: {
                src: [
                    'bower_components/jquery/jquery.js',
                    'bower_components/jquery-ui/jquery-ui.js',
                    'bower_components/bootstrap/dist/js/bootstrap.js',
                    'bower_components/angular/angular.js',
                    'bower_components/angular-route/angular-route.js',
                    'bower_components/angular-sanitize/angular-sanitize.js'
                ],
                dest: 'dev/js/vendor.js'
            },
            vendorDist: {
                src: [
                    'bower_components/jquery/jquery.min.js',
                    'bower_components/jquery-ui/jquery-ui.min.js',
                    'bower_components/bootstrap/dist/js/bootstrap.min.js',
                    'bower_components/angular/angular.min.js',
                    'bower_components/angular-route/angular-route.min.js',
                    'bower_components/angular-sanitize/angular-sanitize.min.js'
                ],
                dest: 'dev/js/vendor.min.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                mangle: false
            },
            app: {
                files: {
                    'dev/js/watg-angular-fileupload.min.js': ['dev/js/watg-angular-fileupload.js']
                }
            },
            appDist: {
                files: {
                    'dist/js/watg-angular-fileupload.min.js': ['dist/js/watg-angular-fileupload.js']
                }
            }
        },
        concat_css: {
            assets: {
                src: ["src/assets/watg-angular-fileupload.css"],
                dest: "dev/css/watg-angular-fileupload.css"
            },
            assetsDist: {
                src: ["src/assets/watg-angular-fileupload.css"],
                dest: "dist/css/watg-angular-fileupload.css"
            }
        },
        cssmin: {
            options: {
                keepSpecialComments: 0
            },
            assets: {
                files: {
                    'dev/css/watg-angular-fileupload.min.css': ['dev/css/watg-angular-fileupload.css']
                }
            },
            assetsDist: {
                files: {
                    'dist/css/watg-angular-fileupload.min.css': ['dist/css/watg-angular-fileupload.css']
                }
            },
            vendor: {
                files: {
                    'dev/css/vendor.css': [
                        'bower_components/bootstrap/dist/css/bootstrap.css',
                        'bower_components/font-awesome/css/font-awesome.css',
                        'bower_components/jquery-ui/themes/base/jquery-ui.css'
                    ]
                }
            }
        },
        watch: {
            files: ["src/app/app.js", "src/app/core/*.js", "src/app/**/*.js", "src/assets/*.css"],
            tasks: ['concat:app', 'uglify', 'concat_css', 'cssmin:assets']
        },
        copy: {
            dev: {
                files: [
                    {
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
                files: [
                    {
                        expand: true,
                        src: ["src/assets/images/*"],
                        dest: 'dist/css/images/',
                        filter: 'isFile',
                        flatten: true
                    }
                ]
            }
        },
        html2js: {
            options: {
                base: 'src',
                module: 'watgFileupoad.templates',
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
            dist: {
                src: ['src/app/directives/templates/*.html'],
                dest: 'dist/js/watg-angular-fileupload.tpl.js'
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-concat-css');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks('grunt-html2js');
    grunt.registerTask('dev', ["jshint", 'concat', 'uglify', 'concat_css', 'cssmin', 'copy', 'connect:dev', 'watch']); //, 'watch'
    grunt.registerTask('dist', ['concat:appDist', 'uglify:appDist', 'concat_css:assetsDist', 'cssmin:assetsDist', 'copy:dist', 'html2js:dist']);
};
