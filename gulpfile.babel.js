// generated on 2015-07-31 using generator-gulp-webapp 1.0.3
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import del from 'del';
import {stream as wiredep} from 'wiredep';
import assemble from 'assemble';
import scsslint from 'gulp-scss-lint';
import requirejs from 'requirejs';
import compression from 'compression';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

gulp.task('requirejs-assets', () => {
  return gulp.src(
    ['app/scripts/**/*', 'app/blocks/**/*.js']
    , { base: 'app/' }
  )
  .pipe(gulp.dest('.tmp'));
});

gulp.task("requirejs", ['requirejs-assets', 'bower-vendor'], function (done) {

  requirejs.optimize({
    "appDir": ".tmp/scripts/",
    "baseUrl": "./",
    "dir": "dist/scripts/",
    "mainConfigFile": "app/scripts/main.js",
    "generateSourceMaps": false,
    "modules": [
      {
        "name": 'app/bootstrap',
        "include": [
          'common-deps'
        ]
      }
    ],
    "optimize": "uglify2",
    // for source maps
    "preserveLicenseComments": false,
    "wrapShim": false
  }, function () {
    done();
  }, done);
});


gulp.task('scss-lint', () => {
  gulp.src('app/styles/**/*.scss')
  .pipe(scsslint({
    'bundleExec': true,
    'maxBuffer': 10000000,
    'config': '.scss-lint.yml'
  }))
  .pipe(scsslint.failReporter());
});

gulp.task('assemble', () => {
  assemble.partials('app/blocks/**/*.hbs');
  assemble.partials('app/partials/*.hbs');
  assemble.pages('app/pages/*.hbs');
  assemble.layouts('app/layouts/*.hbs');
  assemble.src('app/pages/*.hbs')
  .pipe($.rename( function(path) {
    path.extname = '.html';
  }))
  .pipe(assemble.dest('.tmp'));
});

gulp.task('styles', () => {
  return gulp.src('app/styles/**/*.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['last 1 version']}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(reload({stream: true}));
});

function lint(files, options) {
  return () => {
    return gulp.src(files)
      .pipe(reload({stream: true, once: true}))
      .pipe($.eslint(options))
      .pipe($.eslint.format())
      .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
  };
}

const lintOptions = {
  configFile: '.eslintrc',
  reset: true
};


const testLintOptions = {
  env: {
    mocha: true
  }
};

gulp.task('lint', lint('app/scripts/**/*.js', lintOptions));
gulp.task('lint:test', lint('test/spec/**/*.js', testLintOptions));

gulp.task('html', ['assemble', 'styles'], () => {
  const assets = $.useref.assets({searchPath: ['.tmp', 'app', '.']});

  return gulp.src('.tmp/*.html')
    .pipe(assets)
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.minifyCss({compatibility: '*'})))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', () => {
  return gulp.src('app/images/**/*')
    .pipe($.if($.if.isFile, $.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    }))
    .on('error', function (err) {
      console.log(err);
      this.end();
    })))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', () => {
  return gulp.src(require('main-bower-files')({
    filter: '**/*.{eot,svg,ttf,woff,woff2}'
  }).concat('app/fonts/**/*'))
    .pipe(gulp.dest('.tmp/fonts'))
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('bower-vendor', () => {
  return gulp.src(require('main-bower-files')({
    base: '/bower_components',
    filter: '**/*.{js,css,png,gif}'
  }))
    .pipe(gulp.dest('.tmp/scripts/vendor'));
});

gulp.task('extras', () => {
  return gulp.src([
    'app/*.*',
    '!app/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('serve', ['styles', 'fonts', 'assemble', 'bower-vendor'], () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['.tmp', 'app'],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch([
    '.tmp/*.html',
    'app/scripts/**/*.js',
    'app/images/**/*',
    '.tmp/styles/*.css',
    '.tmp/fonts/**/*'
  ]).on('change', reload);

  gulp.watch([
    'app/styles/**/*.scss',
    'app/blocks/**/*.scss'
    ],
    ['styles']);
  gulp.watch('app/fonts/**/*', ['fonts']);
  gulp.watch([
    'app/layouts/*',
    'app/partials/*',
    'app/blocks/**/*.hbs',
    'app/pages/*'
  ],
  ['assemble']);
  gulp.watch('bower.json', ['wiredep', 'fonts', 'bower-vendor']);
});

gulp.task('serve:dist', () => {
  browserSync.init({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    },
    middleware: compression()
  });
});

gulp.task('serve:test', () => {
  browserSync({
    notify: false,
    port: 9000,
    ui: false,
    server: {
      baseDir: 'test',
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch('test/spec/**/*.js').on('change', reload);
  gulp.watch('test/spec/**/*.js', ['lint:test']);
});

// inject bower components
gulp.task('wiredep', () => {
  gulp.src('app/styles/*.scss')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)+/
    }))
    .pipe(gulp.dest('app/styles'));

  gulp.src('.tmp/*.html')
    .pipe(wiredep({
      exclude: ['bootstrap-sass'],
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('build', ['lint', 'scss-lint', 'requirejs', 'html', 'images', 'fonts', 'extras'], () => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], () => {
  gulp.start('build');
});
