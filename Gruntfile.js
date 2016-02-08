module.exports = function(grunt) {

    grunt.initConfig({
        sass: {
            dist: {
                files: {
                    'css/main.css': 'css/main.scss',
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
                files: ['css/*.scss', 'css/*.hbs', 'css/*.md'],
                tasks: ['sass:styleguide', 'sass:dist', 'shell', 'cssmin'],
            },
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1,
            },
            target: {
                files: {
                    'css/main.min.css': 'css/main.css',
                },
            },
        },
        shell: {
            options: {
                stderr: false,
            },
            target: {
                command: 'kss-node css styleguide css\styleguide.md --template kss-template',
            },
        },
        karma: {
            styleguide: {
                configFile: 'karma.conf.js',
            },
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc' //http://jshint.com/docs/options/
            },
            all: ['Gruntfile.js', 'js/**/*.js', 'app.js'],
        },
        jscs: {
            src: ['Gruntfile.js', 'js/**/*.js', 'app.js'],
            options: {
                config: '.jscsrc',
            },
        },
				sasslint: {
        options: {
            configFile: 'config/.sass-lint.yml',
        },
        target: ['location/*.scss']
    }
    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jscs');

    // Default task(s).
    grunt.registerTask('default', ['dist', 'watch:styleguide']);
    grunt.registerTask('test', ['karma:styleguide']);
    grunt.registerTask('dist', ['sass:styleguide', 'sass:dist', 'shell', 'cssmin']); // this task is kind of package
    grunt.registerTask('check', ['jshint', 'jscs']);
};
