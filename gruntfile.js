module.exports = function(grunt) {

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
    // require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        notify_hooks: {
            options: {
                enabled: true,
                max_jshint_notifications: 5,
                title: "Off-Piste Designs" // Change this to your project
            }
        },
        //- Concat JS into single files
        concat: {
            css : {
                src: [
                'src/css/main.css'
                ],
                dest : 'test/css/main-concat.css'
            },
        },
        // Prefix the CSS
        autoprefixer: {
            options: {
                browsers: ["last 2 versions", "> 5%", "ie 8", "ie 7"]
            },
            your_target: {
                options: {
                    flatten: true
                },
                src: 'test/css/main-concat.css',
                dest: 'test/css/main.css'
            },
        },
        // Minify CSS
        cssmin: {
            minify: {
                expand: true,
                cwd: 'test/css/',
                src: ['main.css'],
                dest: 'dist/css/',
                ext: '.css'
            },
        },
        htmlmin: {                                     // Task
            dist: {                                      // Target
              options: {                                 // Target options
                removeComments: true,
                collapseWhitespace: true
              },
              files: {                                   // Dictionary of files
                'dist/index.html': 'src/index.html', // 'destination': 'source'
              }
            }
        },
        imageoptim: {
            myTask: {
                src: 'src/assets/images'
            }
        },
        sync: {
            main: {
                files: [{
                    cwd: 'src',
                    src: [
                        'fonts/**',
                        'font/**',
                        'assets/**',
                        'js/**',
                        'css/**'
                    ],
                    dest: 'dist'
                    }],
                verbose: true
            }
        },
        //- Notify when task is complete
        notify: {
            app_change: {
                options: {
                    title: 'Javascript',
                    message: 'Concatenatated and minifed successfully',
                }
            },
            css_complete: {
                options: {
                    title: 'SASS -> CSS',
                    message: 'Compiled, prefixed, and moved successfully',
                }
            }
        },
        //- Sass
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'dist/css/main.css': 'src/css/index.scss'
                }
            }
        },
        //- Watchers
        watch: {
            grunt: {
                files: ['gruntfile.js'],
                tasks: ['default'],
            },
            css: {
                files: ['src/css/*.css'],
                tasks: ['notify:css_complete', 'default'],
            }
        }
    });
    //- REGISTER ALL OUR GRUNT TASKS
    grunt.task.run('notify_hooks');
    grunt.registerTask('default', ['concat', 'autoprefixer', 'cssmin', 'htmlmin', 'sync', 'sass', 'watch']);
    grunt.registerTask('app_change', ['concat:app', 'uglify:app', 'uglify:main']);
    grunt.registerTask('concat_change', ['uglify:app']);
    grunt.registerTask('css_prefixed', ['autoprefixer']);
    grunt.registerTask('css_min', ['cssmin']);
    grunt.registerTask('sync_files', ['sync']);
    grunt.registerTask('imageoptimize', ['imageoptim']);
};
