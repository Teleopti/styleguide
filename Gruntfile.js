module.exports = function (grunt) {

	grunt.initConfig({
		sass: {
			dist: {
				files: {
					'css/main.css': 'css/main.scss'
				}
			},
			styleguide: {
				files: {
					'css/styleguide.css': 'css/styleguide.scss'
				}
			}
		},
		watch: {
			styleguide: {
				files: ['css/*.scss', 'css/*.hbs'],
				tasks: ['sass:styleguide','sass:dist','shell', 'cssmin']
			}
		},
		cssmin: {
			options: {
				shorthandCompacting: false,
				roundingPrecision: -1
			},
			target: {
				files: {
					'css/main.min.css': 'css/main.css'
				}
			}
		},
		shell: {
			options: {
				stderr: false
			},
			target: {
				command: 'kss-node css styleguide css\styleguide.md --template kss-template'
			}
		}
	});

	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	// Default task(s).
	grunt.registerTask('default', ['watch:styleguide']); 
	grunt.registerTask('dist', ['sass:styleguide','sass:dist', 'shell', 'cssmin']); // this task is kind of package
};