module.exports = function(grunt) {
	grunt.initConfig({
		sass: {
			dist: {
				files: {
					'dist/css/main.css': 'src/css/main.scss',
					'dist/css/main_dark.css': 'src/css/main_dark.scss'
				}
			},
			styleguide: {
				files: {
					'dist/css/styleguide.css': 'src/css/styleguide.scss'
				}
			}
		},
		watch: {
			styleguide: {
				files: [
					'src/css/*.scss',
					'src/css/*.hbs',
					'src/css/*.md',
					'src/directives/**/*.tpl.html',
					'src/directives/**/*.js',
					'src/js/app.js'
				],
				tasks: ['sass:styleguide', 'sass:dist', 'ngtemplates', 'shell', 'cssmin']
			},
			watchAll: {
				files: ['src/js/**', 'src/css/**.scss', 'src/directives/**', 'kss-template/**'],
				tasks: ['sass:styleguide', 'sass:dist', 'ngtemplates', 'shell', 'cssmin']
			},
			test: {
				files: ['src/directives/**/*.spec.js'],
				tasks: ['uglify', 'karma:continuous']
			}
		},
		cssmin: {
			options: {
				shorthandCompacting: false,
				roundingPrecision: -1
			},
			target: {
				files: {
					'dist/css/main.min.css': 'dist/css/main.css',
					'dist/css/main_dark.min.css': 'dist/css/main_dark.css'
				}
			}
		},
		shell: {
			options: {
				stderr: false
			},
			target: {
				command: 'npm run kss'
			}
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
		ngtemplates: {
			'styleguide.templates': {
				cwd: 'src/',
				src: ['directives/**/*.tpl.html'],
				dest: 'dist/js/templates.js',
				options: {
					standalone: true
				}
			}
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
					'node_modules/moment/min/moment-with-locales.min.js',
					'node_modules/angular-moment/angular-moment.min.js',
					'vendor/angular-bootstrap-persian-datepicker-master/persiandate.js',
					'vendor/angular-bootstrap-persian-datepicker-master/persian-datepicker-tpls.js',
					'vendor/ui-bootstrap-custom-build/datepicker.directive.ext.js',
					'vendor/ui-bootstrap-custom-build/timepicker.directive.ext.js',
					'node_modules/d3/d3.min.js',
					'node_modules/c3/c3.min.js',
					'node_modules/c3-angular/c3-angular.min.js',
					'vendor/ui-grid/uigrid.disable-animation.directive.js',
					'vendor/ui-grid/ui-grid.fix.js'
				],
				dest: 'dist/dependencies.min.js'
			},
			distCss: {
				src: [
					'node_modules/angular-ui-tree/dist/angular-ui-tree.min.css',
					'node_modules/angular-material/angular-material.min.css',
					'node_modules/angular-resizable/angular-resizable.min.css',
					'node_modules/angular-ui-grid/ui-grid.min.css',
					'node_modules/c3/c3.min.css',
					'node_modules/@mdi/font/css/materialdesignicons.min.css',
					'dist/css/styleguide.css',
					'dist/css/main.min.css'
				],
				dest: 'dist/dependencies.min.css'
			}
		},
		uglify: {
			'dist/js/wfmdirectives.min.js': ['src/directives/**/*.js', '!src/directives/**/*.spec.js'],
			'dist/main.min.js': 'src/js/*.js'
		},
		copy: {
			locales: {
				files: [
					// includes files within path
					{
						expand: true,
						cwd: './node_modules/angular-i18n/',
						src: ['angular-locale_*.js'],
						dest: 'dist/node_modules/angular-i18n/'
					}
				]
			},
			fonts: {
				files: [
					// includes files within path
					{
						expand: true,
						cwd: 'node_modules/@mdi/font/fonts/',
						src: ['**'],
						dest: 'dist/fonts/'
					}
				]
			},
			uigrid: {
				files: [
					// includes files within path
					{
						expand: true,
						cwd: 'fonts',
						flatten: true,
						src: [
							'../node_modules/angular-ui-grid/ui-grid.woff',
							'../node_modules/angular-ui-grid/ui-grid.ttf'
						],
						dest: 'dist/',
						filter: 'isFile'
					}
				]
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
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-angular-templates');

	// Default task(s).
	grunt.registerTask('default', ['dist', 'watch:styleguide']);
	grunt.registerTask('test', ['karma:styleguide']);
	grunt.registerTask('devTest', ['karma:continuous', 'watch:test']);
	grunt.registerTask('dist', [
		'ngtemplates',
		'sass:styleguide',
		'sass:dist',
		'shell',
		'cssmin',
		'concat',
		'uglify',
		'copy'
	]); // this task is kind of package
};
