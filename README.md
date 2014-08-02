angular-bluebird
================

An AngularJS service for Bluebird promise library.

**NOTE:** Right now it's very experimental.


Why?
----

Because [Bluebird](https://github.com/petkaantonov/bluebird/) is probably one of the best promise libraries around. Also, it IS the fastest.


Usage
-----

    npm install --save angular-bluebird


Example
-------

This library assumes that you use [Browserify](https://github.com/substack/node-browserify)


**app.js**:

```js
var ngBluebird = require('angular-bluebird')

var app = angular.module('app', ['angular-bluebird'])
ngBluebird.trackDigests(app) //thank you http://stackoverflow.com/questions/23984471/how-do-i-use-bluebird-with-angular

// ....
```

**some-ctrl.js**:

```js
function SomeCtrl($scope, $window, $timeout, $bluebird) {
  function asyncAskQuestion(question) {
    var deferred = $bluebird.defer()

    $timeout(function() { //simulate async
      var result = $window.prompt(question)
      if (typeof result == 'string') { //OK Pressed
        deferred.resolve({okPresssed: true, answer: result})
      } else { //'Canceled Pressed'
        deferred.reject({okPressed: false})
      }
    }, 250)

    return deferred.promise
  }

  $scope.askQuestion = function() {
    var promise = asyncAskQuestion("Who is your favorite Teenage Mutant Ninja Turtle?")
    promise.then(function(result) { //success (i.e. resolve)
      $window.alert('Cowabunga! Your favorite turtle is ' + result.answer)
    }, function(result) { //failure (i.e. reject)
      $window.alert("You don't like the Ninja Turtles? What is wrong with you?")
    })
  }
} 
```


License
-------

MIT
