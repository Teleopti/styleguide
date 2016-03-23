 module.exports = function(grunt) {

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
                 tasks: ['dist'],
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
                     'css/main_dark.min.css': 'css/main_dark.css'
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
                 dest: 'dist/templates.js',
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
         uglify: {
             dist: {
                 files: {
                     'dist/wfmdirectives.min.js': ['directives/**/*.js', '!directives/**/*.spec.js']
                 }
             },

             dev: {
                 files: {
                     'dist/wfmdirectives.min.js': ['directives/**/*.js', '!directives/**/*.spec.js']
                 }
             }
         }
     });

     grunt.loadNpmTasks('grunt-sass');
     grunt.loadNpmTasks('grunt-contrib-watch');
     grunt.loadNpmTasks('grunt-shell');
     grunt.loadNpmTasks('grunt-contrib-cssmin');
     grunt.loadNpmTasks('grunt-karma');
     grunt.loadNpmTasks('grunt-contrib-jshint');
     grunt.loadNpmTasks('grunt-jscs');
     grunt.loadNpmTasks('grunt-contrib-uglify');
     grunt.loadNpmTasks('grunt-angular-templates');

     // Default task(s).
     grunt.registerTask('default', ['dist', 'watch:styleguide']);
     grunt.registerTask('test', ['karma:styleguide']);
     grunt.registerTask('dist', ['jscs', 'jshint', 'ngtemplates', 'sass:styleguide', 'sass:dist', 'shell', 'cssmin', 'uglify']); // this task is kind of package
 };
