const gulp = require("gulp");
const htmltidy = require("gulp-htmltidy");
const autoprefixer = require("gulp-autoprefixer");
const csslint = require("gulp-csslint");
const babel = require("gulp-babel");
const jshint = require("gulp-jshint");

function html() {
  return gulp.src("src/index.html").pipe(htmltidy()).pipe(gulp.dest("build"));
}
gulp.task("html", html);

function css() {
  return gulp
    .src("src/style.css")
    .pipe(csslint())
    .pipe(csslint.formatter("compact"))
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(gulp.dest("build"));
}
gulp.task("css", css);

function js() {
  return gulp
    .src("src/main.js")
    .pipe(jshint())
    .pipe(jshint.reporter("default"))
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(gulp.dest("build"));
}
gulp.task("js", js);

gulp.task("watch", () => {
  gulp.watch("src/*.html", html);
  gulp.watch("src/*.css", css);
  gulp.watch("src/*.js", js);
});

gulp.task("default", gulp.series("html", "css", "js"));
