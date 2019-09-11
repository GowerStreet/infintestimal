# Infintestimal

A minimal predicate-based testing library for Sibilant

## Rationale

Most JavaScript testing libraries are written around the idea that when a test fails, it throws. As to why this might be considered a bad idea, have a look at Joel Spolsky's blog post ['on exceptions'](http://www.joelonsoftware.com/2003/10/13/13/).

If you agree with this viewpoint, you might think it would be nice to have a testing library where a test is basically just a function that returns true or false, and a test suite is just a list of tests, and a test runner is a function that just maps over this list transforming test functions into output.

This is what Infintestimal does. It is written in Sibilant, a LISP that is a very shallow transformation to readable JavaScript, but the code is useable from plain old JS, like so [example-test.js](example-test.js):

```javascript
var {is, testRunner} = require('@gowerstreet/infintestimal')

var exampleSuite = [["This is a test that passes",
                     () => is(1, 1) ],
                    ["This is a test that fails",
                     () => is(1, 2) ],
                    ["We can compare arrays",
                     () => {let result = [1, 2]
                            return is([1, 2], result)} ],
                    ["We can also compare objects",
                     function named (){let result = { a: 1, b: 2 }
                                       return is({ b: 2, a: 1 }, result)} ],
                    ["Comparisons that fail show the expected and actual",
                     () => is({ a: 1, b: 2 }, { a: 1, b: 1 }) ],
                    ["We can test async functions",
                     (done) => setTimeout(() => done(is(1,1)), 1000) ]]

testRunner(exampleSuite)
```

The first line imports the `is` and `testRunner` functions from the infintestimal library.

The next line creates a test suite, an array of test tuples. Each test tuple has a name and a thunk (a function with no parameters) that returns the result of calling `is` which is the equivalent of `assert.equal(expected, actual)` for values and `assert.deepEqual(expected, actual)` for arrays and objects.

Finally the call to `testRunner` with the suite of tests (which are just data) runs the tests and prints the results.

As you can see from the last example, testing an async function just requires that you pass a callback function to your test function, and then call it with the results of evaluating `is` on your expected and actuals.

Running this with `node example-test.js` produces the following output:

```
Running tests...

This is a test that passes ✔
This is a test that fails ✘
  expected 1 but got 2
We can compare arrays ✔
We can also compare objects ✔
Comparisons that fail show the expected and actual ✘
  expected {
  "a": 1,
  "b": 2
}
but got {
  "a": 1,
  "b": 1
}
✔ We can test async functions
4 tests passed, 2 failed
```
