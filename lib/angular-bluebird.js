var Promise = require('bluebird')

var mod = angular.module('angular-bluebird', [])

mod.factory('$bluebird', function() {
  function defer() {
    var resolve, reject
    var promise = new Promise(function(_resolve, _reject) {
      resolve = _resolve        
      reject = _reject
    })

    return {
      resolve: resolve,
      reject: reject,
      promise: promise
    }
  }

  return {
    defer: defer
  }
})

//thank you http://stackoverflow.com/questions/23984471/how-do-i-use-bluebird-with-angular
function trackDigests(app) {
  app.run(["$rootScope",function ($rootScope) {
    Promise.setScheduler(function (cb) {
      $rootScope.$evalAsync(cb)
    })
  }])
}

//for exporting
mod.bluebird = require('bluebird') //if needed to use elsewhere
mod.trackDigests = trackDigests

module.exports = mod
