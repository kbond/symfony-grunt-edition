module.exports = function (grunt) {
    // read in assets from configuration
    var assets = grunt.file.readJSON('app/config/assets.json');

    // prefix assets with 'web/'
    var loadAssets = function(config) {
        var ret = {};
        var dest = 'web/' + config.prod;
        var files = [];

        config.dev.forEach(function(val) {
            files.push('web/' + val);
        });

        ret[dest] = files;

        return ret;
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        modernizr: {
            devFile: "remote",
            outputFile: "web/_static/js/modernizr.js",
            files: ["web/js/*", "web/css/*"]
        },

        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                'web/js/*'
            ]
        },

        uglify: {
            options: {
                report: 'min',
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                files: loadAssets(assets.js)
            }
        },

        cssmin: {
            options: {
                report: 'min',
                root: 'web',
                target: 'web',
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                files: loadAssets(assets.css)
            }
        },

        clean: ['web/_static/*']
    });

    grunt.loadNpmTasks("grunt-modernizr");
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['clean', 'jshint', 'uglify', 'cssmin', 'modernizr']);
};
