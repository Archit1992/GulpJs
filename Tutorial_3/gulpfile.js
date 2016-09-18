var gulp = require('gulp');

//var jshint = require(‘gulp-jshint’);

var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var header = require('gulp-header');


gulp.task('scripts', function() {
   var headerValue = 'Evaluated by gulp.n';
   return gulp.src('js/*.js')
   	  .pipe(header('/** File Header **/')) // I wouldn't use this since uglify will strip out comments anyways. This was the problem though. It was loading the header in two spots and it was just dumping in raw text, not a comment which wasn't valid javascript so uglify was complaining. Also, take a look at how I handle errors here for situations when you are getting weird "Unhandled 'error' event" type messages. Node (and by extension gulp since gulp runs on node) will not automatically dump uncaught exceptions to the console log. You have to manually tell it what to do when an error is encountered otherwise it will just swallow it and spit out a generic "something bad happened" message which is less than helpful.
      .pipe(concat('js/combine.js').on('error', function(error){
      	console.log(error)
      }))
      .pipe(gulp.dest('app/dist'))
      .pipe(rename('output.js').on('error', function(error){
      	console.log(error)
      }))
      .pipe(uglify().on('error', function(error){
      	console.log(error)
      }))
      .pipe(gulp.dest('app/dist'));
});