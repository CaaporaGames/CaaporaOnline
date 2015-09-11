"use strict"

module.exports = (grunt) ->
  grunt.loadNpmTasks "grunt-bower-task"
  grunt.loadNpmTasks "grunt-contrib-connect"
  grunt.loadNpmTasks "grunt-contrib-copy"
  grunt.loadNpmTasks "grunt-contrib-watch"
  grunt.loadNpmTasks "grunt-exec"
  grunt.loadNpmTasks "grunt-contrib-connect"
  grunt.loadNpmTasks "grunt-contrib-watch"

  grunt.initConfig

    watch: 
        options: 
            livereload: true
        
        js: 
            files: "js/*.js"
            tasks: ["uglify", "jshint"]
 
        sass: 
            files: "sass/*.{scss,sass}",
            tasks: "sass"
        
        html: 
            files: "/*.html"

    connect:
        server:
            options:
                port: 9000
                base: "."
                hostname: "*"
                livereload: true
                open: true

    copy:
      requirejs:
        files: [{
          expand: true
          cwd: "bower_components/requirejs/"
          src: "require.js"
          dest: "vendor/js/"
        }]
      jquery:
        files: [{
          expand: true
          cwd: "bower_components/jquery/dist/"
          src: "jquery.min.js"
          dest: "vendor/js/"
        }]
      easystar:
        files: [{
          expand: true
          cwd: "bower_components/easystarjs/bin/"
          src: "easystar-0.2.1.min.js"
          dest: "vendor/js/"
        }]
      phaser:
        files: [{
          expand: true
          cwd: "bower_components/phaser/build/"
          src: "phaser.js"
          dest: "vendor/js/"
        }]
      phaser_tiled:
        files: [{
          expand: true
          cwd: "bower_components/phaser-tiled/dist/"
          src: "phaser-tiled.js"
          dest: "vendor/js/"
        }]
      phaser_debug:
        files: [{
          expand: true
          cwd: "bower_components/phaser-debug/dist/"
          src: "phaser-debug.js"
          dest: "vendor/js/"
        }]  
      phaser_plugin_isometric:
        files: [{
          expand: true
          cwd: "bower_components/phaser-plugin-isometric/dist/"
          src: "phaser-plugin-isometric.js"
          dest: "vendor/js/"
        }]

  grunt.registerTask "build", [
    "copy"
    "connect"
    "watch"

  ]

  grunt.registerTask "default", [
    "build"
  ]



