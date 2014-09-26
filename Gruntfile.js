module.exports = function (grunt) {
	grunt.initConfig ({
		pkg : grunt.file.readJSON('package.json'),

		sass: {
			compile: {
				files: [{
					expand : true,
					cwd: 'public/scss',
					src: ['*.scss'],
					dest: 'public/css',
					ext : '.css'
				}]
			}
		},
		jshint: {
			server : {
				files: {
					src: ['srv/**/*.js']
				}
			},
			client : {
				files : {
					src: ['public/js/**/*.js']
				}
			}
		
		},

		watch : {
			css: {
				files: ['public/scss/*.scss'],
				tasks : ['sass']
			},
			options: {
				livereload:true
			},
			server: {
				files: ['srv/**/*.js'],
				tasks: ['jshint:server']
			},
			client: {
				files: ['public/js/**/*.js'],
				tasks : ['jshint:client']
			}
		}

	})
}