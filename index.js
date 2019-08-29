var assert = require("assert"),
    OK = "\033[32m\u2714\033[0m",
    FAIL = "\033[31m\u2718\033[0m";
var arraysEqual__QUERY = (function arraysEqual__QUERY$(expected, actual) {
  /* arrays-equal? infintestimal.sibilant:5:0 */

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
  /* objects-equal? infintestimal.sibilant:12:0 */

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
  /* is infintestimal.sibilant:22:0 */

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
  /* count-passed infintestimal.sibilant:38:0 */

  return (function() {
    if (x[1].substr(0, 10) === OK) {
      return (1 + acc);
    } else {
      return acc;
    }
  }).call(this);
});
var testRunner = (function testRunner$(tests) {
  /* test-runner infintestimal.sibilant:44:0 */

  console.log("Running tests... \n");
  var results = tests.map((function(t) {
    /* infintestimal.sibilant:47:21 */
  
    return [ t[0], t[1]() ];
  }));
  results.forEach((function(r) {
    /* infintestimal.sibilant:48:2 */
  
    return console.log(r[0], r[1]);
  }));
  var succeeded = results.reduce(countPassed, 0),
      failed = (results.length - succeeded);
  return console.log(("\n" + succeeded + " tests passed, " + failed + " failed"));
});
module.exports = {
  "is": is,
  "OK": OK,
  "arraysEqual__QUERY": arraysEqual__QUERY,
  "objectsEqual__QUERY": objectsEqual__QUERY,
  "testRunner": testRunner
};
