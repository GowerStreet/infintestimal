var {is, testRunner} = require("./index.js")

var exampleSuite = [["This is a test that passes",
                     () => is(1, 1) ],
                    ["This is a test that fails",
                     () => (is(1, 2)) ],
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
