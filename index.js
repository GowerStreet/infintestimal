var assert = require("assert"),
    async = require("async"),
    OK = "\033[32m\u2714\033[0m",
    FAIL = "\033[31m\u2718\033[0m";
var arraysEqual__QUERY = (function arraysEqual__QUERY$(expected, actual) {
  /* arrays-equal? infintestimal.sibilant:6:0 */

  return ((expected && "object" === typeof expected && "Array" === expected.constructor.name) && (actual && "object" === typeof actual && "Array" === actual.constructor.name) && (function() {
    try {
      assert.deepEqual(expected, actual);
      return true;
    } catch (e) {
      return false;
    }
  }).call(this));
});
var objectsEqual__QUERY = (function objectsEqual__QUERY$(expected, actual) {
  /* objects-equal? infintestimal.sibilant:13:0 */

  return (("object" === typeof actual && actual !== null && actual.constructor.name !== "Array") && ("object" === typeof expected && expected !== null && expected.constructor.name !== "Array") && (function() {
    try {
      assert.deepEqual(expected, actual);
      return true;
    } catch (e) {
      return false;
    }
  }).call(this));
});
var is = (function is$(expected, actual) {
  /* is infintestimal.sibilant:23:0 */

  return (function() {
    if ((actual && "object" === typeof actual && "Array" === actual.constructor.name)) {
      return (function() {
        if (arraysEqual__QUERY(expected, actual)) {
          return OK;
        } else {
          return (FAIL + "\n  expected " + JSON.stringify(expected) + " but got " + JSON.stringify(actual));
        }
      }).call(this);
    } else if (("object" === typeof actual && actual !== null && actual.constructor.name !== "Array")) {
      return (function() {
        if (objectsEqual__QUERY(expected, actual)) {
          return OK;
        } else {
          return (FAIL + "\n  expected " + JSON.stringify(expected, null, 2) + "\nbut got " + JSON.stringify(actual, null, 2));
        }
      }).call(this);
    } else {
      return (function() {
        if (expected === actual) {
          return OK;
        } else {
          return (FAIL + "\n  expected " + expected + " but got " + actual);
        }
      }).call(this);
    }
  }).call(this);
});
var passed__QUERY = (function passed__QUERY$(x) {
  /* passed? infintestimal.sibilant:39:0 */

  return x.substr(0, 10) === OK;
});
var countPassed = (function countPassed$(acc, x) {
  /* count-passed infintestimal.sibilant:43:0 */

  return (function() {
    if (passed__QUERY(x)) {
      return (1 + acc);
    } else {
      return acc;
    }
  }).call(this);
});
var zip = (function zip$(a, b) {
  /* zip infintestimal.sibilant:48:0 */

  return a.map((function(item, index) {
    /* infintestimal.sibilant:51:9 */

    return [ item, b[index] ];
  }));
});
var wrapIfSync = (function wrapIfSync$(f) {
  /* wrap-if-sync infintestimal.sibilant:53:0 */

  return (function() {
    if (0 === f.length) {
      return (function(cb) {
        /* infintestimal.sibilant:56:4 */

        return cb(null, f());
      });
    } else {
      return (function(cb) {
        /* infintestimal.sibilant:58:4 */

        return f((function(results) {
          /* infintestimal.sibilant:58:15 */

          return cb(null, results);
        }));
      });
    }
  }).call(this);
});
var reporter = (function reporter$(testResult) {
  /* reporter infintestimal.sibilant:60:0 */

  return (function() {
    if (passed__QUERY(testResult[0])) {
      return console.log((testResult[0] + " " + testResult[1]));
    } else {
      return console.log((testResult[0].substr(0, 10) + " " + testResult[1] + testResult[0].substr(10)));
    }
  }).call(this);
});
var testRunner = (function testRunner$(tests) {
  /* test-runner infintestimal.sibilant:67:0 */

  console.log("Running tests... \n");
  var testFns = tests.map((function(x) {
    /* infintestimal.sibilant:69:27 */

    return wrapIfSync(x[1]);
  })),
      testNames = tests.map((function(x) {
    /* infintestimal.sibilant:70:29 */

    return x[0];
  }));
  return async.parallel(testFns, (function(err, results) {
    /* infintestimal.sibilant:71:27 */

    return (function() {
      if (err) {
        return console.log("Error:", err);
      } else {
        zip(results, testNames).map(reporter);
        var succeeded = results.reduce(countPassed, 0),
            failed = (results.length - succeeded);
        return console.log(("\n" + succeeded + " tests passed, " + failed + " failed"));
      }
    }).call(this);
  }));
});
module.exports = {
  "is": is,
  "OK": OK,
  "arraysEqual__QUERY": arraysEqual__QUERY,
  "objectsEqual__QUERY": objectsEqual__QUERY,
  "testRunner": testRunner
};
