module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		concat: {
			dist: {
				src: [
					'assets/scripts/_source/jquery.*.js',
					'assets/scripts/_source/*.js'
				],
				dest: 'assets/scripts/combined.js'
			}
		},

		uglify: {
			build: {
				src: 'assets/scripts/combined.js',
				dest: 'assets/scripts/combined.min.js'
			}
		},

		imagemin: {
			images: {
				files: [{
					expand: true,
					cwd: 'assets/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'assets/'
				}],
				options: {
					cache: false,
					progressive: true
				}
			}
		},

		exec: {
			favicon: 'convert _favicon.svg -bordercolor white -border 0 \\( -clone 0 -resize 16x16 \\) \\( -clone 0 -resize 32x32 \\) \\( -clone 0 -resize 48x48 \\) \\( -clone 0 -resize 64x64 \\) -delete 0 -alpha off -colors 256 favicon.ico'
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-exec');

	grunt.registerTask('default', ['concat', 'uglify']);
	grunt.registerTask('images', ['imagemin:images']);
	grunt.registerTask('favicon', ['exec:favicon']);
};