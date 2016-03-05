module.exports = function(grunt) {

    require('time-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        shell: {
            jekyllBuild: {
                command: 'jekyll build'
            },

            jekyllServe: {
                command: 'jekyll serve'
            }
        },

        express: {
            all: {
                options: {
                    port: 4000,
                    hostname: '0.0.0.0',
                    bases: ['_site'],
                    livereload: true
                }
            }
        },

        postcss: {
          options: {
            processors: [
              require('autoprefixer-core')({browsers: ['last 2 versions', '> 5%']})
            ]
          },

          dist: {
            src: '_site/css/styles.css',
            dest: '_site/css/styles.css'
          }
        },

        watch: {
            css: {
                files: [
                    '_sass/*.scss',
                    '_sass/**/*.scss',
                    'css/*.scss'
                ],
                tasks: ['shell:jekyllBuild', 'uglify', 'postcss']
            },

            js: {
                files: [
                    '_js/*.js'
                ],
                tasks: ['shell:jekyllBuild', 'uglify', 'postcss']
            },

            svg: {
                files: [
                    '_svgs/*.svg'
                ],
                tasks: ['svgstore', 'shell:jekyllBuild', 'uglify', 'postcss']
            },

            jekyll: {
                files: [
                    '**/*.html',
                    '**/*.md',
                    '_posts/*.md',
                    '_config.yml',
                    '*.html',
                    '*.md'
                ],
                tasks: ['shell:jekyllBuild', 'uglify', 'postcss']
            },

            options: {
                livereload: true
            }
        },

        uglify: {
            main: {
                files: {
                    '_site/main.js': '_js/*.js'
                }
            }
        },

        svgstore: {
            options: {
                prefix : '', // This will prefix each <g> ID
                includeTitleElement : false,
            },
            default : {
                files: {
                    '_includes/svg-defs.html': ['_svgs/*.svg'],
                }
            }
        },

        buildcontrol: {
            options: {
                dir: '_site',
                commit: true,
                push: true,
                message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
            },
            pages: {
                options: {
                    remote: 'https://github.com/JasonEtco/portfolio-jekyll.git',
                    branch: 'gh-pages'
                }
            }
        },

        prompt: {
            target: {
              options: {
                questions: [
                  {
                    config: 'postName', // arbitrary name or config for any other grunt task
                    type: 'input', // list, checkbox, confirm, input, password
                    message: 'Name of Post', // Question to ask the user, function needs to return a string,
                    default: 'Post Name' // default value if nothing is entered
                  }
                ]
              }
            },
          },

    });

    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-build-control');
    grunt.loadNpmTasks('grunt-svgstore');

    grunt.registerTask('default', ['svgstore', 'shell:jekyllBuild', 'uglify', 'postcss', 'express', 'watch']);
    grunt.registerTask('deploy',  ['svgstore', 'shell:jekyllBuild', 'uglify', 'postcss', 'buildcontrol:pages']);

    grunt.registerTask('test',
    [
        'prompt',
        'mochacli'
    ]);

    grunt.task.registerTask('post', 'Create new jekyll posts from templates.', function() {
      var name = grunt.option('name'),
          category = grunt.option('cat'),
          date = new Date(),
          today = grunt.template.date(date, 'yyyy-mm-dd'),
          template,
          formatedName,
          data,
          content;

      if (name) {
        formatedName = name.replace(/[^a-z0-9]|\s+|\r?\n|\r/gmi, '-').toLowerCase();
        category = category ? category : 'blog';
        data = {
          name: name,
        };
        template = grunt.file.read('_post-template-' + category + '.md');
        content = grunt.template.process(template, {
          data: data
        });
        grunt.file.write('_posts/' + today + '-' + formatedName + '.md', content);
      }
      else {
        grunt.fail.warn('Name Required: `grunt post --name "My Post Name"`');
      }
    });
};