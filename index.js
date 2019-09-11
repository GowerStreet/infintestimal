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
var countPassed = (function countPassed$(acc, x) {
  /* count-passed infintestimal.sibilant:39:0 */

  return (function() {
    if (x.substr(0, 10) === OK) {
      return (1 + acc);
    } else {
      return acc;
    }
  }).call(this);
});
var zip = (function zip$(a, b) {
  /* zip infintestimal.sibilant:44:0 */

  return a.map((function(item, index) {
    /* infintestimal.sibilant:47:9 */

    return [ item, b[index] ];
  }));
});
var wrapIfSync = (function wrapIfSync$(f) {
  /* wrap-if-sync infintestimal.sibilant:49:0 */

  return (function() {
    if (0 === f.length) {
      return (function(cb) {
        /* infintestimal.sibilant:52:4 */

        return cb(null, f());
      });
    } else {
      return (function(cb) {
        /* infintestimal.sibilant:54:4 */

        return f((function(results) {
          /* infintestimal.sibilant:54:15 */

          return cb(null, results);
        }));
      });
    }
  }).call(this);
});
var testRunner = (function testRunner$(tests) {
  /* test-runner infintestimal.sibilant:57:0 */

  console.log("Running tests... \n");
  var testFns = tests.map((function(x) {
    /* infintestimal.sibilant:59:27 */

    return wrapIfSync(x[1]);
  })),
      testNames = tests.map((function(x) {
    /* infintestimal.sibilant:60:29 */

    return x[0];
  }));
  return async.parallel(testFns, (function(err, results) {
    /* infintestimal.sibilant:61:27 */

    return (function() {
      if (err) {
        return console.log("Error:", err);
      } else {
        zip(results, testNames).map((function(x) {
          /* infintestimal.sibilant:68:21 */

          return (x[0] + " " + x[1]);
        })).map((function(x) {
          /* infintestimal.sibilant:69:21 */

          return console.log(x);
        }));
        var succeeded = results.reduce(countPassed, 0),
            failed = (results.length - succeeded);
        console.log("first result", results[0]);
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
