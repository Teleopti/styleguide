module.exports = function (grunt) {

    grunt.initConfig({
        sass: {
            dist: {
                files: {
                    'css/main.css': 'css/main.scss',
                    'css/main_dark.css': 'css/main_dark.scss'
                },
            },
            styleguide: {
                files: {
                    'css/styleguide.css': 'css/styleguide.scss',
                },
            },
        },
        watch: {
            styleguide: {
                files: ['css/*.scss', 'css/*.hbs', 'css/*.md', 'directives/**/*.js', 'app.js'],
                tasks: ['sass:styleguide', 'sass:dist', 'ngtemplates', 'shell', 'cssmin'],
            },
            watchAll: {
                files: ['js/**', 'css/**.scss', 'directives/**', 'kss-template/**'],
                tasks: ['sass:styleguide', 'sass:dist', 'ngtemplates', 'shell', 'cssmin']
            },
            test: {
                files: ['directives/**/*.spec.js'],
                tasks: ['uglify', 'karma:continuous']
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1,
            },
            target: {
                files: {
                    'styleguide/dist/main.min.css': 'css/main.css',
                    'styleguide/dist/main_dark.min.css': 'css/main_dark.css'
                },
            },
        },
        shell: {
            options: {
                stderr: false,
            },
            target: {
                command: 'npm run-script kss',
            },
        },
        karma: {
            styleguide: {
                configFile: 'karma.conf.js'
            },
            continuous: {
                configFile: 'karma.conf.js',
                singleRun: false
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc' //http://jshint.com/docs/options/

            },
            all: ['Gruntfile.js', 'directives/**/*.js', 'app.js'],
        },
        jscs: {
            src: ['Gruntfile.js', 'directives/**/*.js', 'app.js'],
            options: {
                config: '.jscsrc',
            },
        },
        ngtemplates: {
            'styleguide.templates': {
                src: ['directives/**/*.tpl.html'],
                dest: 'styleguide/dist/templates.js',
                options: {
                    standalone: true
                }
            }
        },
        sasslint: {
            options: {
                configFile: 'config/.sass-lint.yml',
            },
            target: ['location/*.scss']
        },
        concat: {
            distJs: {
                src: [
                    'node_modules/angular/angular.min.js',
                    'node_modules/angular-i18n/angular-locale_en-us.js',
                    'node_modules/angular-ui-tree/dist/angular-ui-tree.min.js',
                    'node_modules/angular-animate/angular-animate.min.js',
                    'node_modules/angular-route/angular-route.min.js',
                    'node_modules/angular-aria/angular-aria.min.js',
                    'node_modules/angular-sanitize/angular-sanitize.min.js',
                    'node_modules/angular-resizable/angular-resizable.min.js',
                    'node_modules/angular-ui-grid/ui-grid.min.js',
                    'node_modules/angular-material/angular-material.min.js',
                    'node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js',
                    'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
                    'node_modules/angular-translate/dist/angular-translate.min.js',
                    'node_modules/angular-dynamic-locale/dist/tmhDynamicLocale.js',
                    'node_modules/angular-moment/angular-moment.min.js',
                    'node_modules/moment/min/moment-with-locales.min.js',
                    'vendor/angular-bootstrap-persian-datepicker-master/persiandate.js',
                    'vendor/angular-bootstrap-persian-datepicker-master/persian-datepicker-tpls.js',
                    'vendor/ui-bootstrap-custom-build/datepicker.directive.ext.js',
                    'vendor/ui-bootstrap-custom-build/timepicker.directive.ext.js',
                    'vendor/d3/d3.min.js',
                    'vendor/c3/c3.min.js',
                    'vendor/c3/c3-angular.min.js',
                    'vendor/ui-grid/uigrid.disable-animation.directive.js'
                ],
                dest: 'styleguide/dist/dependencies.min.js'
            },
            distCss: {
                src: [
                    'vendor/fonts.css',
                    'node_modules/angular-ui-tree/dist/angular-ui-tree.min.css',
                    'node_modules/angular-material/angular-material.min.css',
                    'node_modules/angular-resizable/angular-resizable.min.css',
                    'node_modules/angular-ui-grid/ui-grid.min.css',
                    'vendor/c3/c3.min.css',
                    'vendor/mdi/css/materialdesignicons.min.css',
                    'css/styleguide.css',
                    'css/main.min.css'
                ],
                dest: 'styleguide/dist/dependencies.min.css'
            }

        },
        uglify: {
            'styleguide/dist/wfmdirectives.min.js':
            [
                'directives/**/*.js', '!directives/**/*.spec.js'
            ],
            'styleguide/dist/main.min.js': 'js/*.js'
        },
        copy: {
            sass: {
                files: [
                    // includes files within path
                    {
                        expand: true,
                        cwd: './css/',
                        src: ['*.scss'],
                        dest: 'styleguide/sass/'
                    },
                ]
            },
            fonts: {
                files: [
                    // includes files within path
                    {
                        expand: true,
                        cwd: 'vendor/mdi/fonts/',
                        src: ['**'],
                        dest: 'styleguide/fonts/'
                    },
                ],
            },
            uigrid: {
                files: [
                    // includes files within path
                    {
                        expand: true,
                        cwd: 'fonts',
                        flatten: true,
                        src: ['../node_modules/angular-ui-grid/ui-grid.woff',
                            '../node_modules/angular-ui-grid/ui-grid.ttf'
                        ],
                        dest: 'styleguide/dist/',
                        filter: 'isFile'
                    },
                ],
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jscs');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-angular-templates');

    // Default task(s).
    grunt.registerTask('default', ['dist', 'watch:styleguide']);
    grunt.registerTask('test', ['karma:styleguide']);
    grunt.registerTask('devTest', ['karma:continuous','watch:test']);
    grunt.registerTask('dist', ['jscs', 'ngtemplates', 'sass:styleguide', 'sass:dist', 'shell', 'cssmin', 'concat', 'uglify', 'copy']); // this task is kind of package
};
