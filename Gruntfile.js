module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'Source/jquery.ImageMapResize.js',
        dest: 'Build/jquery.ImageMapResize-<%= pkg.version %>.min.js'
      }
    },
	copy: {
		main:{
			src: 'Source/jquery.ImageMapResize.js',
			dest: 'Build/jquery.ImageMapResize-<%= pkg.version %>.js'
		}
	}
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Load the plugin that provides the copy task.
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'copy']);

};