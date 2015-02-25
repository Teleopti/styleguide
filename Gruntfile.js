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
					'css/styleguide.css': 'css/_styleguide.scss'
				}
			}
		},
		watch: {
			styleguide: {
				files: ['css/*.scss'],
				tasks: ['sass:dist','sass:styleguide','shell']
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

	// Default task(s).
	grunt.registerTask('default', ['watch:styleguide']); 
	grunt.registerTask('dist', ['sass:dist','sass:styleguide', 'shell']); // this task is kind of package
};