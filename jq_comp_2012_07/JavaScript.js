// ============================================================================
// JavaScript
// ============================================================================

// JavaScript is a prototype-based scripting language that is dynamic, weakly
// typed and has first-class functions. It is a multi-paradigm language,
// supporting object-oriented, imperative, and functional programming styles.

// JavaScript uses syntax influenced by that of C. JavaScript copies many names
// and naming conventions from Java. The key design principles within JavaScript
// are taken from the Self and Scheme programming languages








// ============================================================================
// JavaScript Isn't Just in the Browser
// ============================================================================

// JavaScript doesn't just exist in the browser. Many of these examples are
// meant to be run in the Node.js REPL.








// ============================================================================
// Debugging with console
// ============================================================================

// In modern JavaScript environments, the `console` object has a number of
// useful debugging methods.

// Log to the console.
console.log(1, 2, 3); // logs: 1 2 3
console.log({a: 1, b: 2}); // logs: { a: 1, b: 2 }

// Logging can be done printf-style in most implementations, although the output
// might vary.

// Node.js:
console.log("Number: %d, String: %s, Object: %j", 123, "foo", {a: "xyz"});
// logs: Number: 123, String: foo, Object: {"a":"xyz"}

// WebKit Inspector:
console.log("Number: %d, String: %s, Object: %o", 123, "foo", {a: "xyz"});
// logs: Number: 123, String: foo, Object: >Object

// Firefox (with Firebug):
console.log("Number: %d, String: %s, Object: %o", 123, "foo", {a: "xyz"});
// logs: Number: 123, String: foo, Object: Object { a="xyz"}

// Internet Explorer 8+:
console.log("Number: %d, String: %s, Object: %o", 123, "foo", {a: "xyz"});
// logs: LOG: Number: 123, String: foo, Object: [object Object]



// Logging can usually be done with four levels:
console.log("level 1");
console.info("level 2");
console.warn("level 3");
console.error("level 4"); // console.error might throw an exception, too.



// In cases where console.log defaults to displaying an object using an "HTML"
// view, console.dir can be used to display an object using a "Plain Old
// JavaScript" view. Compare these two in Firebug or WebKit Inspector:
console.log(document.body);
console.dir(document.body);








// ============================================================================
// Variables and Identifiers
// ============================================================================

// JavaScript (the language AND the name) is case sensitive.

FOO = 1
foo // undefined



// The scope of a variable is the current function or, for variables declared
// outside a function, the global scope. These are all valid names:

var foo, foo123;  // Identifiers can contain numbers, but can't start with one.
var foo_bar;      // Underscores aren't idiomatic,
var fooBar;       // But camelCased names are. (See the DOM API for proof!)
var FooBar;       // PascalCase is used for constructor functions.
var $foo;         // $ is (supposed to be) reserved for machine-generated names.
var _foo;         // By convention, leading-underscore indicates "private."
var __foo__;      // Double-underscore is usually reserved for internals.



// These reserved words are invalid names, so don't use them:

abstract
boolean break byte
case catch char class const continue
debugger default delete do double
else enum export extends
false final finally float for function
goto
if implements import in instanceof int interface
long
native new null
package private protected public
return
short static super switch synchronized
this throw throws transient true try typeof
var volatile void
while with

// Note that while using a reserved word isn't allowed as a variable name,
// it's acceptable as an object property. But while this is completely valid
// JavaScript, it fails in IE:
var obj = {};
obj.class = "something";

// This works in all browsers... but is awkward.
obj["class"] = function() {};
obj["class"]();



// Variable values are initialized to `undefined` by default.
var foo;
foo // undefined

// But a value can be assigned at the time the variable is declared.
var bar = 1;
bar // 1

// You can declare multiple variables in a single `var` statement, using a
// comma to separate variables.
var a = 1, b = 2, c = 3;

// Although it's usually much more legible (and safer) to do this:
var a = 1;
var b = 2;
var c = 3;

// Why safer? Imagine you formatted your var declarations like this (this is
// a popular format people use) but forgot a comma after one of the lines:
var a = 1,
    b = 2   // <-- missing comma!
    c = 3;

// JavasScript automatically inserts a semicolon after the second line, setting
// the *global* variable c to 3. Whoops!
var a = 1,
    b = 2;
c = 3;








// ============================================================================
// Global
// ============================================================================

// Even though your JavaScript might exist in multiple files, they all share
// the same, global, scope. In this example, assuming file1.js and file2.js are
// loaded into the browser in-order, file2.js overrides the value of the `state`
// variable initially declared in file1.js:

// file1.js
var state = true;
document.addEventListener("click", function() {
  console.log("file1.js", state);
}, false);

// file2.js
var state = false;
document.addEventListener("click", function() {
  console.log("file2.js", state);
}, false);



// We could avoid conflicts like this, but it's more work to maintain tons of
// global variables, no matter how descriptive the names.

// file1.js
var file1State = true;
document.addEventListener("click", function() {
  console.log("file1.js", file1State);
}, false);

// file2.js
var file2State = false;
document.addEventListener("click", function() {
  console.log("file2.js", file2State);
}, false);



// Note that while it's possible to set a variable without using a `var`
// statement, it's considered bad practice, because it doesn't indicate to
// someone maintaining the code where the variable was declared.
foo = 123;
foo // 123

// Also, vars declared without using a `var` statement are implicitly global.
// (JavaScript has function scope, which will be covered a little later on)
function test() {
  bar = 456;
}
test();
bar // 456

// In V8 JavaScript, the global object is called "global". In browser
// JavaScript, it's called "window". All global variables are also accessible
// as properties of the global object.
var foo = 123;
function test() {
  bar = 456;
}
test();
[foo, bar, global.foo, global.bar] // [123, 456, 123, 456]








// ============================================================================
// Does a variable exist?
// ============================================================================

// If `foo` is accessed before being declared or initialized, an exception
// will be thrown.
if (foo) { /* code */ } // ReferenceError: foo is not defined

// You can, however, use the `typeof` operator, which always returns a string.
// The code inside the block won't execute, but at least it won't error.
if (typeof foo !== "undefined") { /* code */ }

// You can also access the variable as a property of the global object. This
// won't error, but it only works for global variables.
if (global.foo !== undefined) { /* code */ }








// ============================================================================
// Blocks
// ============================================================================

// Blocks can be used to group zero or more statements, and are delimited by
// the {} characters.
{
  console.log("hello");
  console.log("world");
}

// Not to be confused with object literals, which are expressions that are also
// delimited by {} characters.
var obj = {a: 1, b: 2};

// Since JavaScript does NOT have block scope, only function scope, this
// doesn't work like you might think.
var x = 1;
{
  var x = 2; // This variable is NOT local to this block!
}
x // 2



// In conditional and control flow statements, blocks are recommended to group
// statements even if only one statement exists, to mitigate errors.
if (false)
  console.log("this won't log");

// Oops.
if (false)
  console.log("this won't log");
  console.log("but this will, because a block wasn't used");

// This is basically what the previous example is doing:
if (false) {
  console.log("this won't log");
}
console.log("but this will, because a block wasn't used");

// If you always use a block, your code is more clear, and you never run into
// this issue.
if (false) {
  console.log("this won't log");
  console.log("neither will this");
}








// ============================================================================
// Functions
// ============================================================================

// "function" declares a function with the specified parameters. Unlike most
// other statements, function requires {}. This is also sometimes called a
// function declaration.
function addTwoNumbers(a, b) {
  return a + b;
}
addTwoNumbers(1, 2) // 3

// "return" specifies the value to be returned by a function. If no value is
// explicitly returned, the function evaluates to `undefined`.
function doNothing() {
  /* nothing */
}
doNothing() // undefined



// This code is repetitive, and thus harder to maintain.
function prettyName(first, last) {
  var capitalizedFirst = first.charAt(0).toUpperCase() + first.substring(1).toLowerCase();
  var capitalizedLast =  last.charAt(0).toUpperCase() + last.substring(1).toLowerCase();
  return capitalizedFirst + " " + capitalizedLast;
}
prettyName("bENjamIN", "alMan") // "Benjamin Alman"



// Creating a function allows us to reuse code, and avoid repetition.
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
}
capitalize("bENjamIN") // "Benjamin"

function prettyName(first, last) {
  return capitalize(first) + " " + capitalize(last);
}
prettyName("bENjamIN", "alMan") // "Benjamin Alman"



// While JavaScript doesn't have block scope, it does have function scope. Like
// variables declared with the `var` keyword, functions declared inside other
// functions are local to the outer function, and can access any other functions
// and variables declared within the outer function.
function prettyName(first, last) {
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
  }
  return capitalize(first) + " " + capitalize(last);
}
prettyName("bENjamIN", "alMan") // "Benjamin Alman"
capitalize // ReferenceError: capitalize is not defined



// Even if a variable has been declared outside a function, once a variable is
// declared inside a function, the outer variable will no longer be accessible.
var value = "global";

function outer() {
  var value = "test"; // This variable is inaccessible inside function `inner`!

  function inner(value) {
    return [global.value, value];
  }

  return inner("inner");
}

outer() // ["global", "inner"]








// ============================================================================
// Control Flow Statements
// ============================================================================

// "if-else" statements execute a statement if a specified condition is true.
// If the condition is false, the optional else statement will be executed.
if (x === 1) {
  console.log("x is 1");
} else if (x === 2) {
  console.log("x is 2");
} else {
  console.log("x is something else");
}

// "else if" is the result of nesting an "if-else" inside of an "else", which
// can be easily illustrated using a block and indentation:
if (x === 1) {
  console.log("x is 1");
} else {
  if (x === 2) {
    console.log("x is 2");
  } else {
    console.log("x is something else");
  }
}

// "switch" statements evaluate an expression, matching the expression's value
// to a case label, executing statements associated with that case.
switch (x) {
  case 1:
    console.log("x is 1");
    break;
  case 2:
    console.log("x is 2");
    break;
  default:
    console.log("x is something else");
}



// "break" terminates the current loop, switch, or label statement, transferring
// program control to the statement following the terminated statement.
var arr = [];
for (var i = 0; i < 10; i++) {
  if (i === 5) {
    break;
  }
  arr.push(i);
}
console.log(arr); // [0, 1, 2, 3, 4]

// "continue" terminates execution of the statements in the current loop
// iteration and continues execution of the loop with the next iteration.
var arr = [];
for (var i = 0; i < 10; i++) {
  if (i % 2 === 0) {
    continue;
  }
  arr.push(i);
}
console.log(arr); // [1, 3, 5, 7, 9]

// "label" provides a statement with an identifier that you can refer to when
// using a break or continue statement. Labels can be any identifier that's not
// a reserved word.
test1: for (var i = 0; i < 3; i++) {
   for (var j = 0; j < 3; j++) {
      if (i === 1 && j === 1) {
         continue test1;
      } else {
         console.log(i, j); // This never logs 1, 1 or 1, 2
      }
   }
}








// ============================================================================
// Looping Statements
// ============================================================================

// "for" loops consist of three optional expressions enclosed in parentheses
// and separated by semicolons: (initialization; condition; final-expression).
for (var i = 0; i < 10; i++) {
  console.log(i);
}

// "for-in" loops iterate over enumerable properties of an object in arbitrary
// order (the order is implementation-dependent and not guaranteed).
var obj = {a: 1, b: 2};
for (var prop in obj) {
  console.log(prop, obj[prop]);
}

// When object properties might be inherited, hasOwnProperty should be used to
// test each object property to ensure that it is actually defined directly on
// the object and not inherited.
for (var prop in obj) {
  if (obj.hasOwnProperty(prop)) {
    console.log(prop, obj[prop]);
  }
}

// "while" loops execute a specified statement as long as the test condition
// evaluates to true. The condition is evaluated before executing the statement.
var node = document.querySelector("a");
while (node) {
  console.log(node);
  node = node.parentNode;
}

// "do-while" loops execute a specified statement as long as the test condition
// evaluates to true. The condition is evaluated after executing the statement,
// which always results in the statement being executed once.
var node = document.querySelector("a");
do {
  console.log(node);
  node = node.parentNode;
} while (node);








// ============================================================================
// Error Handling and Debugging Statements
// ============================================================================

// "try-catch" marks a block of statements to try, and specifies a response
// should an exception be thrown.
try {
  nonexistentFunction();
} catch (e) {
  console.log(e.name);    // "ReferenceError"
  console.log(e.message); // "nonexistentFunction is not defined"
}

// "throw" throws a user-defined exception.
throw new Error("this string will be the error .message property");
throw "An exception with this string value will be thrown";
throw 123;



// Custom Exceptions can be a lot of work to define:
function CustomError(message) {
   this.message = message;
   this.name = "CustomError";
}
CustomError.prototype = new Error();
// Just to throw this exception:
throw new CustomError("This is my exception message");

// But often, all you need to do is this:
throw {name: "CustomError", message: "This is my exception message"};



// Exceptions can be re-thrown, if necessary.
try {
  someFunctionThatThrows();
} catch (e) {
  if (e.name === 'ErrorIWantToHandle') {
    handleError(e);
  } else {
    throw e;
  }
}



// The finally clause can be used to execute code after both the try and catch,
// regardless of whether an exception is thrown (server-side JavaScript allows
// you to access files).
openFile();
try {
  writeFile(data);
} catch (e) {
  handleError(e);
} finally {
  closeFile(); // This always runs, whether there was an error or not.
}



// "debugger" invokes any available debugging functionality. If no debugging
// functionality is available, this statement has no effect.
debugger;








// ============================================================================
// Primitive Types
// ============================================================================

// There are five primitive types: undefined, null, boolean, string, number.
// Everything else is an object. Note that when using `new` with a constructor
// function, an object (not a primitive) will always be returned.

typeof 9000                       // "number"
typeof Number(9000)               // "number"
typeof new Number(9000)           // "object"

typeof "hello world"              // "string"
typeof String("hello world")      // "string"
typeof new String("hello world")  // "object"

typeof true                       // "boolean"
typeof Boolean(true)              // "boolean"
typeof new Boolean(true)          // "object"



// If primitives aren't objects, how can this work?

"hello world".length              // 11

// Because JavaScript coerces between primitives and objects automatically. The
// "wrapper object" only exists for a short time (unless you do something like
// this abd store the result in a variable):
String.prototype.getAsObject = function() {
  return this;
};

typeof "a"                        // "string"
typeof "a".getAsObject()          // "object"

// Of course, you can manually coerce them back.

typeof String("a".getAsObject())  // "string"
typeof ("a".getAsObject() + "")   // "string"








// ============================================================================
// Strings
// ============================================================================

// These are all valid strings.
'foo'
"bar"
'\u0041'
"this is on the first line\nand this the second"

// This is not.
"hello
world" // SyntaxError: Unexpected token ILLEGAL

// Although strings can be split over multiple lines with a training backslash,
// it's not commonly used.
"hello \
world"

// The backslash character is used in strings as an escape character.
"foo\nbar"  // foo<linebreak>bar
"foo\tbar"  // foo<tab>bar
"foo\"bar"  // foo<doublequote>bar
"foo\\bar"  // foo<backslash>bar

// Strings have lengths.
"testing".length // 7

// And methods.
"Hello World".indexOf("W")  // 6
"Hello World".toLowerCase() // "hello world"
"Hello World".split(" ")    // ["Hello", "World"]
"Hello World".charAt(0)     // "H"
"Hello World".substring(6)  // "World"

// Strings aren't mutable, but they can be concatenated.
var test = "Hello World";

test + "!!!" // "Hello World!!!"
test // "Hello World" (unchanged)

test = test + "!!!";
test // "Hello World!!!"



// You can coerce non-strings into strings:
String(123)       // "123"
String(true)      // "true"
String(false)     // "false"
String([1, 2, 3]) // "1,2,3"
String([])        // ""
String({a: 1})    // "[object Object]"
String(String)    // "function String() { [native code] }"








// ============================================================================
// Numbers
// ============================================================================

// In Javascript, there's only one type of number, and it's a 64-bit float.

// These are all the same number.
1234
1234.0
1.234e3

// Beware of rounding issues.
0.0001 + 0.0002 // 0.00030000000000000003

// Scaling fractional numbers can prevent these rounding issues.
((10000 * 0.0001) + (10000 * 0.0002)) / 10000 // 0.0003



// Beware of NaN and computational errors.
var result = "five" - "four";
result // NaN

Math.sqrt(-1) // NaN

// If you want to test for NaN, use the global isNaN function.
isNaN(result) // true



// `Infinity` is a number.
1 / 0 // Infinity



// You can coerce non-numbers into numbers:
Number("12")  // 12
Number("012") // 12
Number("1.2") // 1.2
Number("1e3") // 1000
Number("1xy") // NaN
Number("")    // 0
Number(false) // 0
Number(true)  // 1
Number([])    // 0

// You can parse strings into integers:
parseInt("12")      // 12
parseInt("012")     // 10 (string with leading 0 interpreted as octal)
parseInt("012", 10) // 12 (force parseInt to use base-10)
parseInt("345", 2)  // NaN (no part of the string can be parsed as base-2)
parseInt("1.2", 10) // 1
parseInt("1e3", 10) // 1
parseInt("1xy", 10) // 1

// Or non-integers:
parseFloat("3.14")        // 3.14
parseFloat("314e-2")      // 3.14
parseFloat("0.0314E+2")   // 3.14
parseFloat("3.14foobar")  // 3.14



// There are also many static Math methods:
Math.abs(-5)          // 5
Math.min(1, 2, 3)     // 1
Math.max(1, 2, 3)     // 3
Math.sin(Math.PI / 2) // 1
Math.cos(Math.PI)     // -1
Math.pow(5, 2)        // 25
Math.random()         // 0 <= num < 1
Math.round(Math.PI)   // 3
Math.floor(Math.PI)   // 3
Math.ceil(Math.PI)    // 4








// ============================================================================
// Booleans
// ============================================================================

true // true
false // false

true === !false // true

if (true) { /* this code will execute */ }
if (!false) { /* this code will execute */ }



// You can coerce non-booleans into booleans:
Boolean("")         // false
Boolean(0)          // false
Boolean(null)       // false
Boolean(NaN)        // false
Boolean(undefined)  // false
Boolean(false)      // false
Boolean("foo")      // true
Boolean(1)          // true
Boolean({a: 1})     // true
Boolean([1, 2, 3])  // true
Boolean([])         // true
Boolean(Boolean)    // true








// ============================================================================
// Null & Undefined
// ============================================================================

// Think of undefined as the absence of any value, while null is the explicit
// presence of a non-value.

// Variable values are initialized to `undefined` by default.
var foo;
foo // undefined

// So are object properties.
var obj = {};
obj.foo // undefined

// Functions return `undefined` by default.
function doNothing() {}
doNothing() // undefined

// So does the `void` operator.
void 0 // undefined



// Variables can contain values or references to objects.
foo = 123;
foo // 123

// And variables can be explicitly set to `null`.
foo = null;
foo // null

// Note that undefined can be overwritten!
function whoops(val) {
  if (undefined = val) { /* Do something */ }
}
whoops(123);
undefined // 123

// If you don't feel comfortable assuming the value of `undefined`, you could
// always declare a variable with no value and test against that.
var undef;
undef // undefined



// If you don't care about the distinction between null and undefined, you can
// compare your value == null, because null == undefined.
if (val == null) {
  // code executes if val is either null or undefined.
}

// An alternative (unless undefined has been overwritten, of course):
if (val === null || val === undefined) {
  // code executes if val is either null or undefined.
}

// Note that null and undefined are, indeed, two different values.
null === undefined // false

// Regardless of the typeof operator incorrectly reporting null as an object,
// it is indeed a primitive. This is an unfortunate flaw in the language.
typeof null // "object"








// ============================================================================
// Objects
// ============================================================================

// Everything that's not a primitive is an object.

// You can create a new object using the "new" keyword and the Object
// constructor function.
var obj = new Object();

// But using the object literal syntax is faster than using the constructor
// function (because of scope chain resolution), and it's less to type.
var obj = {};

// Objects are passed and compared by reference, while primitives are compared
// by their value.
var obj1 = {foo: 123};
var obj2 = {foo: 123};

obj1 === obj2               // false (obj1 and obj2 are two different objects)
obj1["foo"] === obj2["foo"] // true (both numbers have the same value)



// You can initialize properties at the time an object is created. Note that
// properties defined in an object literal need to be quoted if they contain
// special characters.
var obj = {foo: 123, 'bar': 456, "I can't wait!!": 789};



// Object propery names are always strings. You can access them via the "square
// bracket" syntax:
obj["I can't wait!!"]  // 789

var key = "foo";
obj[key]               // 123

// Or via "dot" syntax, if the name doesn't contain special characters:
obj.bar                // 456



// What does "object property names are always strings" mean?
var obj = {};
function test() { return 123; }
obj[test()] = 456;
obj[test] = 789;
// obj2 now looks like this:
{
  "123": 456,
  "function test() { return 123; }": 789
}

obj[obj] = 999;
// obj2 now looks like this:
{
  "123": 456,
  "function test() { return 123; }": 789,
  "[object Object]": 999
}








// ============================================================================
// Object Prototypes
// ============================================================================

// While you can define properties directly on objects...
var obj = {};
obj.foo = 123;
obj.hasOwnProperty("foo")         // true

// Objects inherit properties from their prototype.
obj.toString()                    // "[object Object]"
obj.hasOwnProperty("toString")    // false
typeof Object.prototype.toString  // "function"
Object.prototype.hasOwnProperty("toString") // true

// You can define properties on the object prototype, even after the object
// has been created... BUT DON'T DO THIS!
obj.bar                           // undefined
Object.prototype.bar = 456;
obj.bar                           // 456

// Why not? Because once the Object prototype is modified, EVERY for-in loop
// over ANY instance of ANY OBJECT will be "tainted".
var prop;
for (prop in obj) {
  console.log(prop, obj[prop]);
}
// logs: "foo" 123
// logs: "bar" 456

var date = new Date();
for (prop in date) {
  console.log(prop, date[prop]);
}
// logs: "bar" 456

// The way around this is to use .hasOwnProperty, but it makes looping slower.
for (prop in obj) {
  if (obj.hasOwnProperty(prop)) {
    console.log(prop, obj[prop]);
  }
}
// logs: "foo" 123



// You can test to see if a property is defined on an object.
"foo" in obj   // true
"bar" in obj   // true

// And you can delete properties from objects. Delete returns false if the
// property exists but cannot be deleted.
obj.foo = null;
"foo" in obj   // true

delete obj.foo // true
"foo" in obj   // false

delete obj.bar // true
"bar" in obj   // true

delete Object.prototype.bar // true
"bar" in obj   // false








// ============================================================================
// Objects as Namespaces
// ============================================================================

// The number of variables and functions declared in the global scope should
// be minimized whenever possible. This aids in not only reducing conflicts and
// maintenance costs, but allows the creation of more terse APIs.
var _yummyFood = "cookie";
function getYummyFood() {
  return _yummyFood;
}
function setYummyFood(value) {
  _yummyFood = value;
}

// Too many globals!
_yummyFood            // "cookie"
getYummyFood()        // "cookie"
setYummyFood("cake");
getYummyFood()        // "cake"



// Why not organize your code as properties under an object? You can do this
// easily by using an object literal:
var yummyFood = {
  _name: "cookie",
  get: function() {
    return yummyFood._name;
  },
  set: function(value) {
    yummyFood._name = value;
  }
};

// Effectively, `yummyFood` becomes a singleton / namespace.
yummyFood._name         // "cookie"
yummyFood.get()         // "cookie"
yummyFood.set("cake");
yummyFood.get()         // "cake"

_name                   // ReferenceError: _name is not defined
get                     // ReferenceError: get is not defined
set                     // ReferenceError: set is not defined



// You can also create a `thing` object and then add properties one-at-a-time,
// like this:
var yummyFood = {};
yummyFood._name = "cookie";
yummyFood.get = function() {
  return yummyFood._name;
};
yummyFood.set = function(value) {
  yummyFood._name = value;
};








// ============================================================================
// Self-aware Objects
// ============================================================================

// You can organize your code into namespaces, and utilize the `this` value
// inside of your function properties.

var yummyFood = {
  _name: "cookie",
  get: function() {
    return this._name;
  },
  set: function(value) {
    this._name = value;
  }
};

yummyFood._name         // "cookie"
yummyFood.get()         // "cookie"
yummyFood.set("cake")   // "cake"
yummyFood.get()         // "cake"



// When functions are called as properties of an object, the `this` value inside
// the function refers to that object.

   yummyFood.get()
// ^^^^^^^^^ the `this` value inside of the `yummyFood.get` function.

// So, what's the downside?

var _name = "brussels sprouts";
var getYummyFood = yummyFood.get;

// Because the function wasn't called as a property of an object, the `this`
// value inside the function refers to the global object, so `this._name` is
// the global variable `_name`. Whoops!

getYummyFood();         // "brussels sprouts"



// TODO: explain
var _name = "brussels sprouts";
function foo() {
  var _name = "inaccessible";
  var getYummyFood = yummyFood.get;
  return getYummyFood();
}
foo() // "brussels sprouts"



// This probably isn't the solution you were hoping for.
var getYuckyFood = yummyFood.get;

// We'll see some solutions to this problem once we've talked a little more
// about functions.








// ============================================================================
// Arrays
// ============================================================================

// Like every other type, you can create a new array using the "new" keyword
// and the Array constructor function.
var arr = new Array("bill", "alice", "doug");

// But (like every other type) using a literal is faster than the constructor
// function (because of scope chain resolution), and it's less to type.
var arr = ["bill", "alice", "doug"];



// Many methods mutate the array.

arr.push("claire")  // 4 (the array's new length)
arr                 // ["bill", "alice", "doug", "claire"]
arr.sort()          // ["alice", "bill", "claire", "doug"]
arr.shift()         // "alice"
arr.pop()           // "doug"
arr                 // ["bill", "claire"]

// Some methods don't mutate the array.

arr.concat("fred", "gwen")  // ["bill", "claire", "fred", "gwen"]
arr                         // ["bill", "claire"]

// Arrays, being objects, are passed and compared by reference.
var arr1 = ["happy", "birthday"];
var arr2 = ["happy", "birthday"];

arr1 === arr2       // false (arr1 and arr2 are two different objects)
arr1[0] === arr2[0] // true (both strings have the same value)



// Note: if you pass a single number argument into the Array constructor
// function, an array of that length (with each item set to undefined) is
// returned! Because arrays in JavaScript are not statically typed, there is no
// benefit to pre-allocating an array like this:
var arr = new Array(50);



// Although a quick helper that repeats a string N times could be coded like:
function repeat(str, n) {
  return Array(n + 1).join(str);
}
repeat("hello", 3) // "hellohellohello"



// And by creating it as a function property of String.prototype, every string
// will inherit this method:
String.prototype.repeat = function(n) {
  return Array(n + 1).join(this);
};
"hello".repeat(3) // "hellohellohello"








// ============================================================================
// New Array Methods
// ============================================================================

// These methods require modern environments (IE9 or newer).

var arr = ["a", "b", "c", 4, 5];

// The first index of the specified item in the array or -1 if not found.
arr.indexOf("c") // 2

// The last index of the specified item in the array or -1 if not found.
arr.lastIndexOf("c") // 2



// Iteration methods:

var arr = ["a", "b", "c", 4, 5];

// Return true if every item in this array satisfies the function.
arr.every(function(val) { return typeof val === "string"; }) // false

// Return true if at least one item in this array satisfies the function.
arr.some(function(val) { return typeof val === "string"; }) // true

// Call a function for each element in the array.
arr.forEach(function(val) { console.log(val); }) // logs: "a" "b" "c" 4 5

// Because a reference to the array is passed in as the third argument, you can
// actually modify the array like so:
arr.forEach(function(val, index, arr) {
  arr[index] = val + 1;
});
arr // ["a1", "b1", "c1", 5, 6]



var arr = ["a", "b", "c", 4, 5];

// Create a new array containing all the items of this array for which the
// callback returns true.
arr.filter(function(val) { return val !== "c"; }) // ["a", "b", 4, 5]

// Filter an array to contain only truthy items:
[true, false, 1, 0, "foo", "", null].filter(Boolean); // [true, 1, "foo"]



var arr = ["a", "b", "c", 4, 5];

// Create a new array from the result of the callback, for each item.
arr.map(function(val) { return val + 1; }) // ["a1", "b1", "c1", 5, 6]

// Why does this fail?
[1.23, 4.56, 7.89].map(parseInt) // [1, NaN, NaN]

// If you take a closer look, you'll see that all of these array iteration
// methods accept not only the value, but also an index and array argument.
[1.23, 4.56, 7.89].forEach(function(val, index, arr) {
  console.log(arguments);
});
// logs:
// { '0': 1.23, '1': 0, '2': [ 1.23, 4.56, 7.89 ] }
// { '0': 4.56, '1': 1, '2': [ 1.23, 4.56, 7.89 ] }
// { '0': 7.89, '1': 2, '2': [ 1.23, 4.56, 7.89 ] }

// Because the second argument to parseInt is the base, and it should always
// be base 10 (and NOT the array index while iteration), you should do:
[1.23, 4.56, 7.89].map(function(val) { return parseInt(val, 10); }) // [1, 4, 7]



var arr = ["a", "b", "c", 4, 5];

// You can also apply a function simultaneously against two values of the array
// to reduce it to a single value. Left-to-right:
arr.reduce(function(prev, current) { return prev + current; }) // "abc45"

// And right-to-left:
arr.reduceRight(function(prev, current) { return prev + current; }) // "9cba"








// ============================================================================
// Functions
// ============================================================================








// ============================================================================
// Functions are Objects
// ============================================================================

// Functions declared using the "function" statement (aka function declaration)
// must be named. Functions are also objects, and as such, have properties.
function foo(a, b, c) {
  return a + b + c;
}
foo.length  // 3 (the number of arguments the function accepts)
foo.name    // "foo"

// You can add your own arbitrary properties onto a function.
foo.foo = 123;

// Functions created as expressions can be anonymous (or unnamed). Anonymous
// function expressions are often used when passing "callbacks" into other
// functions.
var bar = function(a, b, c) {
  return a + b + c;
};
bar.length  // 3
bar.name    // ""

// Function expressions don't need to be anonymous. The name of a named
// function expression can be useful for debugging and recursion.
var baz = function moo(a, b, c) {};
baz.length  // 3
baz.name    // "moo"



// Note that the name of a named function expression is only available inside
// of the function expression. Except in IE (which is a known bug).

// A good use-case for naming a function expression is when unbinding an event
// handler by reference. Instead of creating a `handler` function in the local
// scope like this:
function handler(e) {
  console.log("I was clicked.");
  document.removeEventListener("click", handler, false); // Unbind
}
document.addEventListener("click", handler, false); // Bind
typeof handler // "function"

// You can name the function expression as it's being passed in, thus avoiding
// unnecessary contamination of the local scope.
document.addEventListener("click", function handler(e) { // Bind
  console.log("I was clicked.");
  document.removeEventListener("click", handler, false); // Unbind
}, false);
typeof handler // "undefined"



// You can also use the Function constructor to create a function via strings,
// but this is very seldom used. When it is, it's often for machine-generating
// functions from string templates.
var test = new Function("a", "b", "c", "return a + b + c;");
test(1, 2, 3) // 6








// ============================================================================
// Function arguments and the `arguments` object
// ============================================================================

// JavaScript initializes any argument whose value has been omitted to
// `undefined` and ignores any extra arguments for which a named argument has
// not been specified.
function test(a, b, c) {
  return [a, b, c];
}

test()              // [undefined, undefined, undefined]
test(1, 2)          // [1, 2, undefined]
test(1, 2, 3, 4, 5) // [1, 2, 3]

// The `arguments` object is an array-like object inside of every function that
// has some useful properties. It's not accessible outside of a function.

// Iterate over all arguments using the .length property and [idx].
function logEachArgument(a, b, c) {
  for (var i = 0; i < arguments.length; i++) {
    console.log(arguments[i]);
  }
}
logEachArgument(1, 2, 3, 4, 5);
// logs: 1 2 3 4 5


// JavaScript doesn't support method overloading, but you can implement the
// same logic by using conditionals and the arguments object.
var _value;
function getOrSet(value) {
  if (arguments.length === 0) {
    return _value;
  } else {
    _value = value;
  }
}



// The arguments.callee property is a reference to the currently executing
// function, but you should use named function expressions instead. The
// arguments.caller property has been deprecated and replaced with the
// Function.caller property, which refers to the calling function.

function foo() {
  return [arguments.callee === foo, foo.caller];
}

function bar() {
  return foo();
}

foo() // [true, null]
bar() // [true, [function: bar]]



// You can use the `arguments` object to simplify your function's signature.
// For example, which of these would you rather use?
function addArrayOfNumbers(arr) {
  var result = 0;
  for (var i = 0; i < arr.length; i++) {
    result += arr[i];
  }
  return result;
}

addArrayOfNumbers([1, 2, 3]) // 6

function addNumbers() {
  var result = 0;
  for (var i = 0; i < arguments.length; i++) {
    result += arguments[i];
  }
  return result;
}

addNumbers(1, 2, 3) // 6



// In this example, since the items-to-be-added are always numbers, if you
// wanted to give your users a more flexible API, you could combine the two:
function addNumbers(arg) {
  var arr = typeof arg === "number" ? arguments : arg;
  var result = 0;
  for (var i = 0; i < arr.length; i++) {
    result += arr[i];
  }
  return result;
}

addNumbers(1, 2, 3)   // 6
addNumbers([1, 2, 3]) // 6

// Just be careful, because the arguments object will be modified when an
// argument is reassigned!
function whoops(arg) {
  arg = 9000;
  return arguments[0] + arguments[1];
}

whoops(1, 2) // 9002



// Even though the arguments object is only an array-like object, Array methods
// can be called on it... using call invocation (more on that in a bit).
function commaList() {
  // return arguments.join(", ");
  return [].join.call(arguments, ", ");
}
commaList("a", "b", "c") // "a, b, c"








// ============================================================================
// Scoping and Hoisting
// ============================================================================

// Variable hosting.
var foo = 1;
function bar() {
  if (!foo) {
    var foo = 10;
  }
  return foo;
}

bar() // What does this return?

// What's really happening:
var foo = 1;
function bar() {
  var foo; // Variable declarations (not assignments) are hoisted!
  if (!foo) {
    foo = 10;
  }
  return foo;
}

bar() // 10



// Function declaration hoisting.
var foo = 1;
function bar() {
  foo = 10;
  return;
  function foo() {}
}

bar();
foo // What is this value?

// What's really happening:
var foo = 1;
function bar() {
  function foo() {} // Function declarations are hoisted!
  foo = 10;
  return;
}

bar();
foo // 1



// Where does function declaration hoisting matter?

// this evaluates state too often:
function whoops(state) {
  function getValue() {
    if (state) {
      return "you get this, no matter what";
    } else {
      return "you expect this";
    }
  }
  return getValue();
}

// Optimized:
function whoops(state) {
  if (state) {
    function getValue() {
      return "you expect this";
    }
  } else {
    function getValue() {
      return "you get this, no matter what";
    }
  }
  return getValue();
}
whoops(false) // "you get this, no matter what"
whoops(true) // "you get this, no matter what"

// This is what's really happening:
function whoops(state) {
  // Both function declarations get hoisted...
  function getValue() {
    return "you expect this";
  }
  // And the latter overrides the former.
  function getValue() {
    return "you get this, no matter what";
  }
  // This if-else does nothing.
  if (state) {
  } else {
  }
  // The wrong value is returned.
  return getValue();
}

// How do we fix this? Don't use function declaration inside blocks! Use
// function expressions instead!
function fixed(state) {
  var getValue;
  if (state) {
    getValue = function() {
      return "state was truthy";
    };
  } else {
    getValue = function() {
      return "state was falsy";
    };
  }
  return getValue();
}
fixed(false) // "state was falsy"
fixed(true) // "state was truthy"

// Not awesome (hard to read).
function fixed(state) {
  var getValue = state ? function() {
    return "state was truthy";
  } : function() {
    return "state was falsy";
  };
  return getValue();
}








// ============================================================================
// First-Class Functions
// ============================================================================

// Functions can take functions as arguments as well as return them.

// A function passed as an argument is commonly refered to as a "callback."
function passValueToCallback(value, callback) {
  return callback(value);
}
passValueToCallback(1, function(n) { return n + 2; }) // 3



// Callbacks can be used when iterating, given a "forEach" function like this.
function forEach(arr, callback) {
  for (var i = 0; i < arr.length; i++) {
    callback(arr[i], i);
  }
}
forEach(["a", "b", "c"], function(item, index) {
  console.log(item, index);
});
// logs:
// "a" 0
// "b" 1
// "c" 2



// A callback can be used to create a "factory" of sorts.
function makeLouder(callback) {
  return function(value) {
    return callback(value) + "!!!";
  };
};

var loudAbs = makeLouder(Math.abs);
loudAbs(9000)  // "9000!!!"
loudAbs(-9000) // "9000!!!"

// You could do this too.
makeLouder(Math.ceil)(8999.999) // "9000!!!"








// ============================================================================
// Overriding `this` with call and apply
// ============================================================================

var yummyFood = {
  _name: "cookie",
  get: function() {
    return this._name;
  },
  set: function(value) {
    this._name = value;
  }
};

// As we saw before, this works.
yummyFood.get() // "cookie"

// But this doesn't work.
var _name = "brussels sprouts";
var getYummyFood = yummyFood.get;
getYummyFood() // "brussels sprouts"



// We can manually set the `this` value inside a function like so.
getYummyFood.call(yummyFood) // "cookie"

var otherFood = {_name: "cheez whiz"};
yummyFood.get.call(otherFood) // "cheez whiz"
yummyFood.set.call(otherFood, "velveeta");

// This works, but it modifies `otherFood`, which may be unacceptable.
otherFood.get = yummyFood.get;
otherFood.set = yummyFood.set;
otherFood.get() // "velveeta"



// Unlike .call, .apply accepts an array of arguments. A common use-case is
// to override (monkey patch) an existing function:
var obj = {prop: 1};
obj.add = function(a, b) {
  return this.prop + a + b;
};
obj.add(2, 3) // 6

// Override obj.add with our own code, while still executing the original:
var origAdd = obj.add;
obj.add = function(a, b) {
  console.log("add called with arguments", arguments);
  return origAdd.call(this, a, b);
};
obj.add(2, 3) // 6 (but logs to the console first)

// Or in a more generic way:
var origAdd = obj.add;
obj.add = function() {
  console.log("add called with arguments", arguments);
  return origAdd.apply(this, arguments);
};
obj.add(2, 3) // 6 (but logs to the console first)

// Revert it.
obj.add = origAdd;
origAdd = null;








// ============================================================================
// Overriding `this` Permanently with bind
// ============================================================================

// You can use .bind to permantly lock in the `this` value and even to
// partially apply arguments.
var _name = "brussels sprout";
var yummyFood = {
  _name: "cookie",
  give: function(giver, receiver) {
    return giver + " gives " + receiver + " a " + this._name;
  }
};
yummyFood.give("Bob", "Joe") // "Bob gives Joe a cookie"

// We already know how this is going to work out.
var giveSprouts = yummyFood.give;
giveSprouts("Bob", "Beth") // "Bob gives Beth a brussels sprout"

// Alternatives...
giveSprouts.call(yummyFood, "Bob", "Beth") // "Bob gives Beth a cookie"
giveSprouts.apply(yummyFood, ["Bob", "Beth"]) // "Bob gives Beth a cookie"

// Inside `giveCookie`, `this` is permanently set to `yummyFood`.
var giveCookie = yummyFood.give.bind(yummyFood);
giveCookie("Bob", "Jen") // "Bob gives Jen a cookie"

// Even if I do this...
giveCookie.call(global, "Bob", "Jen") // "Bob gives Jen a cookie"

// Inside `giveCookie`, `this` is permanently set to `yummyFood` and the giver
// argument is permanently set to "Bob".
var bobGivesCookie = yummyFood.give.bind(yummyFood, "Bob");
bobGivesCookie("Roy") // "Bob gives Roy a cookie"



// Unfortunately .bind isn't supported in every browser, but it's not difficult
// to create a helper function that, given a function returns a new function
// with a particular `this` value locked-in.
function bind(fn, context) {
  return function() {
    return fn.apply(context, arguments);
  };
}



// This version of bind not only locks in the `this` value, but also partially
// applies arguments. See this article for more information:
// http://msdn.microsoft.com/en-us/scriptjunkie/gg575560
var slice = [].slice;
function bind(fn, context) {
  var args = slice.call(arguments, 2);
  return function() {
    return fn.apply(context, args.concat(slice.call(arguments)));
  };
}



// This is a reasonable shim (aka polyfill) for Function#bind:
var slice = [].slice;
if (!Function.prototype.bind) {
  Function.prototype.bind = function(context) {
    var fn = this;
    var args = slice.call(arguments, 1);
    return function() {
      return fn.apply(context, args.concat(slice.call(arguments)));
    };
  };
}



// You can do fairly advanced things with bind. For example, instead of having
// to call .bind, .call or .apply on functions, the following functions accept
// a function as their first argument:
var bind = Function.prototype.call.bind(Function.prototype.bind);
var call = bind(Function.prototype.call, Function.prototype.call);
var apply = bind(Function.prototype.call, Function.prototype.apply);

bind(fn, context [, args...]);    // vs. fn.bind(context [, args...])
call(fn, context [, args...]);    // vs. fn.call(context [, args...])
apply(fn, context [, argsArray]); // vs. fn.apply(context [, argsArray])

// Or if you like your code smaller (and completely unreadable):
var _=Date.call,bind=_.bind(_.bind),call=bind(_,_),apply=bind(_,_.apply);








// ============================================================================
// Immediately Invoked Function Expressions (IIFE)
// ============================================================================

// Function Declaration.
function foo(a) { console.log("foo " + a); }
foo(1) // "foo 1"

// Function Expression.
var bar = function(a) { console.log("bar " + a); };
bar(2) // "bar 2"

// Without the parens, the IIFE is broken.
function(a) { console.log("oops " + a); }(3) // SyntaxError: Unexpected token (

// But with the parens, the IIFE works.
(function(a) { console.log("awesome " + a); }(4)) // "awesome 4"



// How is this useful? How about per-file scope?
(function() { // First line of file1.js

  var state = true;
  document.addEventListener("click", function() {
    console.log("file1.js", state);
  }, false);

}()); // Last line of file1.js

(function() { // First line of file2.js

  var state = false;
  document.addEventListener("click", function() {
    console.log("file2.js", state);
  }, false);

}()); // Last line of file2.js








// ============================================================================
// Closure
// ============================================================================

function makeCounter() {
  // This variable is local to the makeCounter function, and can be accessed
  // by any function defined inside of makeCounter.
  var i = 0;
  // The function returned here is said to "close over" variable `i`. When run
  // it will increment `i` and return the incremented value, even if it is run
  // from outside the makeCounter function.
  return function() {
    return ++i;
  };
}

// Invoking makeCounter returns a function.
var counter = makeCounter();
// Invoke that function.
counter() // 1
counter() // 2

// An entirely new execution of makeCounter, with its own internal `i`.
var counter2 = makeCounter();
counter2()  // 1
counter2()  // 2

// You can't access `i` from outside makeCounter!
counter.i   // undefined
i           // ReferenceError: i is not defined



// Assigning functions in a loop is a common use-case for closures.

// This doesn't work like you might think, because the value of the `i` that is
// logged is the counter `i`, and when links are clicked (after the loop has
// finished executing) the value of `i` is the total number of elements.
var elems = document.getElementsByTagName("a");

for (var i = 0; i < elems.length; i++) {
  elems[i].addEventListener("click", function(e) {
    e.preventDefault();
    console.log("I am link #" + i);
  }, false);
}

// This works, because `i` is passed into the IIFE and made available as the
// variable `lockedInValue`. That variable's value inside the IIFE is always
// the value of `i` at that point in the loop.
var elems = document.getElementsByTagName("a");

for (var i = 0; i < elems.length; i++) {
  (function(lockedInValue) {
    elems[i].addEventListener("click", function(e) {
      e.preventDefault();
      console.log("I am link #" + lockedInValue);
    }, false);
  }(i));
}

// You could also use an IIFE to encompass (and return) only the click handler
// function, and not the entire `addEventListener` call.
var elems = document.getElementsByTagName("a");

for (var i = 0; i < elems.length; i++) {
  elems[i].addEventListener("click", (function(lockedInValue) {
    return function(e) {
      e.preventDefault();
      console.log("I am link #" + lockedInValue);
    };
  }(i)), false);
}



// When using an iterator function, because the callback passed to the iterator
// function has its own local scope, the extra closure is unnecessary.
function forEach(arr, callback) {
  for (var i = 0; i < arr.length; i++) {
    callback(arr[i], i);
  }
}

forEach(document.getElementsByTagName("a"), function(elem, index) {
  elem.addEventListener("click", function(e) {
    e.preventDefault();
    console.log("I am link #" + index);
  }, false);
});








// ============================================================================
// The Module Pattern
// ============================================================================

// Instead of returning a function, return an object.
function makeYummyFood() {
  var _name = "cookie";
  return {
    get: function() {
      return _name;
    },
    set: function(value) {
      _name = value;
    }
  };
}

// Invoking makeYummyFood returns an object with properties.
var yummyFood = makeYummyFood();
// In this case, these properties are functions, and can be invoked.
yummyFood.get() // "cookie"
yummyFood.set("cake");
yummyFood.get() // "cake"
yummyFood._name // undefined

// An entirely new execution of makeYummyFood, with its own internal `_name`.
var otherYummyFood = makeYummyFood();
otherYummyFood.get() // "cookie"
otherYummyFood.set("ice cream");
otherYummyFood.get() // "ice cream"
otherYummyFood._name // undefined



// Combining this pattern with an IIFE yields the Module Pattern.
var yummyFood = (function() {
  var name = "cookie";
  return {
    get: function() {
      return name;
    },
    set: function(value) {
      name = value;
    }
  };
}());

// Here, yummyFood is a singleton object with properties AND privacy.
yummyFood.get() // "cookie"
yummyFood.set("cake");
yummyFood.get() // "cake"

// You can't access `name`!
yummyFood.name  // undefined
name            // ReferenceError: name is not defined



// Note that because `name` only exists in the closure, you can't create
// "priveleged" methods after-the-fact.
yummyFood.addFrosting = function() {
  name += " with delicious frosting";
};

yummyFood.addFrosting() // ReferenceError: name is not defined



// While this would work, it only does so because explicit get and set methods
// were defined for the internal `_name` variable.
yummyFood.addFrosting = function() {
  this.set(this.get() + " with delicious frosting");
};








// ============================================================================
// Method chaining
// ============================================================================

// Both methods return string values.
var module = {
  foo: function() {
    return "foo";
  },
  bar: function() {
    return "bar";
  }
};

module.foo()  // Returns "foo".
module.bar()  // Returns "bar".



// How can we make our interface chainable? By returning `this`! Keep in mind
// that you can only return one thing from a function. If you create a chainable
// interface, you can't ALSO return the string values. It's one or the other.
var module = {
  foo: function() {
    console.log("foo");
    return this;
  },
  bar: function() {
    console.log("bar");
    return this;
  }
};

module.foo().bar() // Returns `module`, but logs "foo" and "bar".








// ============================================================================
// Dates
// ============================================================================

// Dates don't have a literal syntax, but can be created using `new` plus the
// Date constructor function.

// If you supply no arguments, a Date object is created for today's date and
// time, according to local time.
var d = new Date();

// Date objects can be coerced to strings:
String(d) // "Sat Dec 25 2010 17:30:00 GMT-0500 (EST)"

// Date objects, when coerced to number, reflect the number of milliseconds
// since January 1, 1970 00:00:00 UTC (Unix Epoch).
Number(d) // 1293316200000

// You can use this numeric coercion to your advantage when calculating elapsed
// time.
var start = new Date();
// (wait one second)
var elapsed = new Date() - start;
elapsed // 1000



// When creating a new Date object, milliseconds-since-epoch can be passed in:
var d = new Date(1293316200000);
// Or a date string:
var d = new Date("Sat Dec 25 2010 17:30:00 GMT-0500 (EST)");
// Or function arguments (note that month is 0-based):
var d = new Date(2010, 11, 25, 17, 30, 0);



// There are many methods available on Date objects.
d.getYear()     // 110 (deprecated, don't use)
d.getFullYear() // 2010
d.getMonth()    // 11 (month is 0-based, 0-11)
d.getDate()     // 25
d.getDay()      // 6 (day of the week, 0-6)
d.getHours()    // 17
d.getMinutes()  // 30
d.getSeconds()  // 0








// ============================================================================
// Regular Expressions
// ============================================================================

// Regular Expressions are written as /pattern/modifiers, where "pattern" is
// the regular expression itself, and "modifiers" are a series of characters
// indicating various options. The "modifiers" part is optional.

var re = /hello/;
re.test("Hello world")  // false
re.test("I said hello") // true

// The /i flag makes the RegExp case-insenstive.
var re = /hello/i;
re.test("Hello world")  // true
re.test("I said hello") // true



// RegExps can be used with .match to return an array of matches.
"this is a test".match(/x/)  // null
"this is a test".match(/s/)  // ["s"]
"this is a test".match(/s/g) // ["s", "s", "s"]

// The . character will match any character except for line breaks.
"this is a test".match(/t.../)            // ["this"]
// The global flag returns all matches.
"this is a test".match(/t.../g)           // ["this", "test"]
// Match "t" followed by 1 or more of any of these characters: ehist
"this is a test".match(/t[ehist]+/g)      // ["this", "test"]
// The \w shorthand matches word characters. Shorthand for: [A-Za-z0-9_].
"this is a test".match(/t[\w]+/g)         // ["this", "test"]
// The [a-z] character class specifies a range of characters to match.
"this is a test".match(/t[a-z]+/g)        // ["this", "test"]
// Match a vowel followed by 0 or more word characters.
"this is a test".match(/[aeiou][\w]*/g)   // ["is", "is", "a", "est"]
// Match a vowel preceded by a word break, followed by 0 or more word chars.
"this is a test".match(/\b[aeiou][\w]*/g) // ["is", "a"]
// The ^ character matches the beginning of the string.
"this is a test".match(/^t.../g)          // ["this"]
// The $ character matches the end of the string.
"this is a test".match(/t...$/g)          // ["test"]
// The | character is used to say "or."
"this is a test".match(/t(his|est)/g)     // ["this", "test"]



// When replacing, the /g "global" modifier can be used to "replace all."
"this is a test".replace(/s/, "*")  // "thi* is a test"
"this is a test".replace(/s/g, "*") // "thi* i* a te*t"

// Replace all occurrences of "t" plus 3 characters with "foo".
"this is a test".replace(/t.../g, "foo")    // "foo is a foo"
// Parens can be used to capture, while $n can be used to refer to the capture.
"this is a test".replace(/(t...)/g, "'$1'") // "'this' is a 'test'"
"this is a test".replace(/(t)(...)/g, "$1-$2") // "t-his is a t-est"

// Functions can also be passed to .replace for more complicated replacements.
var result = "this is a test".replace(/(t)(...)/g, function(_, a, b) {
  return a.toUpperCase() + b;
});
result // "This is a Test"



// Be careful, and use the dot sparingly! While this works...
var re = /^(\d\d).(\d\d).(\d\d\d\d)$/;
"12/25/2010".match(re) // ["12/25/2010", "12", "25", "2010"]
"12-25-2010".match(re) // ["12/25/2010", "12", "25", "2010"]
// This also "works."
"1234567890".match(re) // ["1234567890", "12", "45", "7890"]

// A better RegExp might be one that's a little more strict...
var re = /^(\d\d)[- \/](\d\d)[- \/](\d\d\d\d)$/;
re.test("12/25/2010") // true
re.test("12-25-2010") // true
re.test("12 25 2010") // true
re.test("1234567890") // false
// But it's still not perfect.
re.test("99/99/9999") // true

// This RegExp is a LOT more strict...
var re = /^(0[1-9]|1[012])[- \/](0[1-9]|[12][0-9]|3[01])[- \/](19|20)\d\d$/;
re.test("12/25/2010") // true
re.test("12-25-2010") // true
re.test("12 25 2010") // true
re.test("1234567890") // false
re.test("99/99/9999") // false
// But even it isn't perfect.
re.test("02/31/2010") // true

// For more JavaScript RegExp info:
// http://blog.stevenlevithan.com/



var re1 = /\b[aeiou][\w]*/g
var re2 = new RegExp("\\b[aeiou][\\w]*", "g");
re1 === re2 // false
String(re1) === String(re2) // true








// ============================================================================
// Coercion and Comparison
// ============================================================================








// ============================================================================
// Type Coercion
// ============================================================================

// You can coerce types explicitly by passing a value into a constructor
// function.
String(123)   // "123"
Number("123") // 123
Boolean(123)  // true



// When something is coerced to a number, an internal toNumber method is
// called.
toNumber(Undefined) // return NaN
toNumber(Null)      // return 0
toNumber(Boolean)   // return 1 if true, 0 if false.
toNumber(Number)    // return the input number.
toNumber(String)    // return Number(string)
toNumber(Object)    // return toNumber(toPrimitive(object, hint Number))

// When something is coerced to a primitive, an internal toPrimitive method is
// called.
toPrimitive(Object) // If valueOf returns a primitive, return it. Otherwise if
                    // toString returns a primitive return it. Otherwise throw
                    // an error.
toPrimitive(other)  // return the input argument.



// When something is coerced to a string, its .toString() method is called.
// Objects return a relatively useless string. Arrays are just joined on ",".
// Most other things are just stringified.
function add(a, b) { return a + b; }
var obj = {a: 1, b: 2};
var arr = [1, 2, 3];

add.toString()  // "function add(a, b) { return a + b; }"
obj.toString()  // "[object Object]"
arr.toString()  // "1,2,3"
String(add)     // "function add(a, b) { return a + b; }"
String(obj)     // "[object Object]"
String(arr)     // "1,2,3"



// Many of JavaScript's operators perform type coercion. For example, because
// the + operator does both addition and concatenation, it will coerce its
// operands to either numbers or strings, depending on the operand types.
"1" + 2       // "12"
- "1"         // -1
+ "1"         // 1
+ "a"         // NaN
+new Date()   // 1292604183838
1 + true      // 2

function foo() { alert("hi!"); }
foo + ""      // "function foo() { alert("hi!"); }"

!!"abc"       // true

1 == true     // true (because true gets coerced to 1)








// ============================================================================
// The == and === Operators
// ============================================================================

// "The Strict Equality Comparison Algorithm"
// How does the === operator work? Given x === y:

// Type(x)          Values                                Result
// Type(x) different from Type(y)...                      false
// Undefined or Null                                      true
// Number           x same value as y (but not NaN)       true
// String           x and y are identical characters      true
// Boolean          x and y are both true or both false   true
// Object           x and y reference same object         true
// Otherwise...                                           false



// "The Abstract Equality Comparison Algorithm"
// How does the == operator work? Given x == y:

// Type(x)              Type(y)               Result
// If x and y are the same type...            Follow === operator rules.
// Null                 Undefined             true
// Undefined            Null                  true
// Number               String                x == toNumber(y)
// String               Number                toNumber(y) == x
// Boolean              (any)                 toNumber(x) == y
// (any)                Boolean               x == toNumber(y)
// String or Number     Object                x == toPrimitive(y)
// Object               String or Number      toPrimitive(x) == y
// Otherwise...                               false








// ============================================================================
// Truthy and Falsy
// ============================================================================

// In addition to the proper Boolean value false, JavaScript has five "falsy"
// values: 0, "", null, undefined, NaN. These values are equivalent to false in
// most scenarios, but they are NOT false.
var a = 0;
var b = "";
var c = null;
var d = undefined;
var e = NaN;
// Actually false.
var f = false;

// Passing a falsy value into an if statement works the same as passing false,
// because falsy values get coerced to false.
if (a) { /* This code will NOT execute */ }
if (b) { /* This code will NOT execute */ }

// Negate a falsy value by using the ! (logical NOT) operator.
if (!c) { /* This code will execute */ }
if (!d) { /* This code will execute */ }

// Test to see if a value is actually false by using the === operator.
if (e === false) { /* This code will NOT execute */ }
if (f === false) { /* This code will execute */ }



// Note that while all five falsy values can stand in for false in an if
// statement, not all of them are == each other.

// == returns true when comparing false, 0, ""
false == 0        // true
0 == ""           // true
"" == false       // true

// == returns true when coparing null and undefined
null == undefined // true

// NaN isn't == anything.
NaN == NaN        // false



// Every value that's not falsy (or false) is truthy.
var g = -3;
var h = "hello world";
var i = [];
var j = [1, 2, 3];
var k = {a: 1, b: 2};
var l = function() {};
var m = /^hello/i;
// And of course, true is true.
var n = true;

if (g) { /* This code will execute */ }
if (h) { /* This code will execute */ }
// etc.



// Unlike === and !==, the == and != operators coerce their operands. As such,
// be VERY careful when using them.
function acceptStringOrFalse(val) {
  // There's a big difference between == and ===.
  if (val == false) {
    return "false was passed.";
  } else {
    return "the string '" + val + "' was passed.";
  }
}
acceptStringOrFalse(false)  // "false was passed."
acceptStringOrFalse("test") // "the string 'test' was passed."
acceptStringOrFalse("")     // "false was passed." (oops!)



// Because the internal toNumber() function is called on boolean operands of
// the == operator, true gets coerced to 1 and false gets coerced to 0.
1 == true   // true
0 == false  // true

// And because an empty array has no items, its value when coerced to a string
// is "" (empty string), and when then further coerced to a number, is 0.
var empty = [];
empty.toString() // ""
toNumber(empty.toString()) // 0 (internal function)

// As a result...
if (empty) { /* While this code will execute... */ }
if (empty == true) { /* This code will not, because 0 == false */ }

// Even though a number or string might be truthy, when compared to true using
// the == operator, it won't evaluate to true.
var value = 5;
if (value) { /* While this code will execute... */ }
if (value == true) { /* This code will not, because 5 != 1 */ }



// Summary: When you're looking for a truthy or falsy value, pass the value
// into your if statement, negating with ! if necessary. When you're looking
// specifically for true or false, use === or !==. Finally, use == or != only
// when you NEED type coercion, like when comparing null and undefined.

// 






// ============================================================================
// The && and || Operators
// ============================================================================

// The && (logical AND) and || (logical OR) operators work with not only
// boolean operands, but also truthy and falsy operands.

if (a && b) { /* Executes if both `a` and `b` values are truthy */ }
if (a || b) { /* Executes if either `a` and `b` values are truthy */ }



// Because the && operator short-circuits, it can also be used to replace
// simple "if" statements. Consider this scenario. While obj.prop is undefined,
// attempting to access obj.subobj.prop will throw an exception, because you
// can't access properties of null and undefined.
var obj = {};
obj.prop        // undefined
obj.subobj.prop // TypeError: Cannot read property 'prop' of undefined

// One way around this is to explicitly test that obj.subobj exists before
// accessing obj.subobj.prop. In this case, we know that obj.subobj will either
// be an object (truthy) or undefined (falsy).
var result;
if (obj.subobj) {
  result = obj.subobj.prop;
}

// But this can be written more tersely, because the && operator doesn't just
// return true or false, it returns its actual operand values. If the left
// operand is falsy, its value is returned, otherwise the right operand's value
// is returned.
var result = obj.subobj && obj.subobj.prop;



// The || operator can be used in a similar way. Because it does a logical OR,
// it's useful for handling default values. Where this might explode:
function getFooPropOrExplode(obj) {
  return obj.foo;
}
getFooPropOrExplode({foo: 123}) // 123
getFooPropOrExplode({})         // undefined
getFooPropOrExplode()           // ERROR

// This fails gracefully.
function getFooPropOrFailGracefully(obj) {
  obj = obj || {};
  return obj.foo;
}
getFooPropOrFailGracefully({foo: 123}) // 123
getFooPropOrFailGracefully({})         // undefined
getFooPropOrFailGracefully()           // undefined



// Because the || operator considers both truthy and falsy values, care needs
// to be exercised when a value can be both falsy and valid (0 or "").
function joinArray(arr, separator) {
  return arr.join(separator || " - ");
}
joinArray([1, 2, 3])        // "1 - 2 - 3"
joinArray([1, 2, 3], ", ")  // "1, 2, 3"
joinArray([1, 2, 3], "")    // "1 - 2 - 3" (whoops!)

// This is a little smarter.
function joinArray(arr, separator) {
  // if (typeof separator === "undefined") {
  // if (separator === undefined) {
  // if (arguments.length === 1) {
  if (separator == null) {
    separator = " - ";
  }
  return arr.join(separator);
}
joinArray([1, 2, 3])        // "1 - 2 - 3"
joinArray([1, 2, 3], null)  // "1 - 2 - 3"
joinArray([1, 2, 3], ", ")  // "1, 2, 3"
joinArray([1, 2, 3], "")    // "123"



// Also, for what it's worth, instead of doing this:
obj = obj || {};

// Some people prefer to do this:
obj || (obj = {});

// I personally prefer this:
if (!obj) { obj = {}; }








// ============================================================================
// The typeof Operator
// ============================================================================

typeof 1                    // "number"
typeof "amazing"            // "string"
typeof true                 // "boolean"

typeof {}                   // "object"
typeof []                   // "object" (unfortunately)
typeof new Number(1)        // "object" (new + Contructor returns an object)
typeof new String("yo!")    // "object" (new + Contructor returns an object)
typeof new Boolean(true)    // "object" (new + Contructor returns an object)
typeof new Date("1/1/1999") // "object" (new + Contructor returns an object)

typeof Date("1/1/1999")     // "string" (didn't use the new keyword)

typeof function() {}        // "function"
typeof /^foo$/i             // "function" (in some browsers)

typeof undefined            // "undefined"
typeof null                 // "object" ?!

typeof NaN                  // "number" ?!







// ============================================================================
// NaN and isNaN
// ============================================================================

// Because NaN isn't equal to itself...
NaN == NaN // false

// You test for NaN with the global isNaN() function.
isNaN(NaN) // true

// But note that isNaN doesn't test to see if a value is actually not a number.
// It tests to see that the given value can't be coerced into a valid number.
isNaN("hello") // true
isNaN("3")     // false



// Because typeof NaN is "number", if you want to test that a value is really
// NaN, do this.
function isReallyNaN(value) {
  return isNaN(value) && typeof value === "number";
}

isReallyNaN(NaN)     // true
isReallyNaN("hello") // false
isReallyNaN("3")     // false








// ============================================================================
// The instanceof Operator
// ============================================================================

// The instanceof operator tests the presence of Constructor.prototype in
// object's prototype chain.
object instanceof Constructor

// Constructor functions used for primitive types return primitives unless
// the new keyword is used.

1                         instanceof Number   // false (primitive)
"amazing"                 instanceof String   // false (primitive)
true                      instanceof Boolean  // false (primitive)
Number(1)                 instanceof Number   // false (primitive)
String("amazing")         instanceof String   // false (primitive)
Boolean(true)             instanceof Boolean  // false (primitive)
new Number(1)             instanceof Number   // true (object)
new String("amazing")     instanceof String   // true (object)
new Boolean(true)         instanceof Boolean  // true (object)

// Constructor functions for other built-in types return objects, regardless of
// whether the new keyword is used.

var obj = {};           // sample object
var fn = function() {}; // sample function

obj                       instanceof Object   // true
[]                        instanceof Array    // true
fn                        instanceof Function // true
/^bar$/i                  instanceof RegExp   // true
Object()                  instanceof Object   // true
Array(1, 2, 3)            instanceof Array    // true
Function("return 1")      instanceof Function // true
RegExp("^bar$", "i")      instanceof RegExp   // true
new Object()              instanceof Object   // true
new Array(1, 2, 3)        instanceof Array    // true
new Function("return 1")  instanceof Function // true
new RegExp("^bar$", "i")  instanceof RegExp   // true

// If Date is called without the new keyword, it returns a string, not a Date
// object.

Date("1/1/1999")          instanceof Date     // false
new Date("1/1/1999")      instanceof Date     // true

// And, for what it's worth, everything that was a instanceof a type is also
// instanceof Object, because all types inherit from Object (the base type).

obj                       instanceof Object   // true
[]                        instanceof Object   // true
fn                        instanceof Object   // true
/^bar$/i                  instanceof Object   // true
Array(1, 2, 3)            instanceof Object   // true
Function("return 1")      instanceof Object   // true
RegExp("^bar$", "i")      instanceof Object   // true
Object()                  instanceof Object   // true
new Number(1)             instanceof Object   // true
new String("amazing")     instanceof Object   // true
new Boolean(true)         instanceof Object   // true
new Date("1/1/1999")      instanceof Object   // true
new Array(1, 2, 3)        instanceof Object   // true
new Function("return 1")  instanceof Object   // true
new RegExp("^bar$", "i")  instanceof Object   // true








// ============================================================================
// Smarter Type Checking
// ============================================================================

// The built-in Object type has a .toString method on its prototype, so all
// objects get that method automatically.
var obj = {};
obj.toString() // "[object Object]"

// While all other built-in types have their own .toString method that returns
// a meaningful value:
var arr = [1,2,3];
arr.toString() // "1,2,3"

// The Object .toString method can be run using call invocation, thus changing
// this `this` value inside the function.
var toString = Object.prototype.toString;

toString.call(1)                // "[object Number]"
toString.call(Number(1))        // "[object Number]"
toString.call(new Number(1))    // "[object Number]"

toString.call("a")              // "[object String]"
toString.call(String("a"))      // "[object String]"
toString.call(new String("a"))  // "[object String]"



// Knowing this, a basic type-checking function can be created.
function type(value) {
  var types = {
    "[object Number]":    "number",
    "[object String]":    "string",
    "[object Boolean]":   "boolean",
    "[object Function]":  "function",
    "[object Array]":     "array",
    "[object Date]":      "date",
    "[object RegExp]":    "regexp",
    "[object Object]":    "object"
  };
  if (value === null) {
    return "null";
  } else if (value == null) { // only == null if undefined here
    return "undefined";
  }
  return types[ Object.prototype.toString.call(value) ] || "object";
}

type(1)               // "number"
type(Number(1))       // "number"
type(new Number(1))   // "number"

type("a")             // "string"
type(String("a"))     // "string"
type(new String("a")) // "string"



// A few additional thoughts...

// We can get the Object .toString method directly from Object.prototype.
var toString = Object.prototype.toString;
// Or we can get it from an object. Even though this approach incurs the
// slight overhead of creating a new object, it avoids scope resolution of the
// global "Object" construnctor function.
var toString = {}.toString;



// Here's a version of this I came up with a while back.
// https://gist.github.com/1131946
(function(global) {
  // Maintain a map of already-encountered types for super-fast lookups. This
  // serves the dual purpose of being an object from which to use the function
  // Object.prototype.toString for retrieving an object's [[Class]].
  var types = {};

  // Return a useful value based on a passed object's [[Class]] (when possible).
  Object.toType = function(obj) {
    var key;
    // If the object is null, return "Null" (IE <= 8)
    return obj === null ? "Null"
      // If the object is undefined, return "Undefined" (IE <= 8)
      : obj == null ? "Undefined"
      // If the object is the global object, return "Global"
      : obj === global ? "Global"
      // Otherwise return the XXXXX part of the full [object XXXXX] value, from
      // cache if possible.
      : types[key = types.toString.call(obj)] || (types[key] = key.slice(8, -1));
  };
}(this));








// ============================================================================
// Other Operators
// ============================================================================








// ============================================================================
// Conditional Operator
// ============================================================================

// This:
var x;
if (condition) {
  x = valueIfTruthy;
} else {
  x = valueIfFalsy;
}

// Can be written as this, using the conditional (aka ternary) operator:
var x = condition ? valueIfTruthy : valueIfFalsy;

// Useful for really short conditions and expressions, like pluralizing words.
console.log("I have " + n + " thing" + (n === 1 ? "" : "s"));



// Not as useful for larger conditions and expressions, becuase it can make
// code much harder to read (and maintain).
var func = condition ? function() {
  console.log("condition was truthy");
} : function() {
  console.log("condition was falsy");
};

// This is a little more code, but it's also a little easier to read.
var func;
if (condition) {
  func = function() {
    console.log("condition was truthy");
  }
} else {
  func = function() {
    console.log("condition was falsy");
  }
}








// ============================================================================
// Bitwise Operators
// ============================================================================

var a = 9;  // Binary 1001
var b = 13; // Binary 1101

a & b       // 9   (1001 AND 1101 = 1001)
a | b       // 13  (1001 OR 1101 = 1101)
a ^ b       // 4   (1001 XOR 1101 = 0100)
~a          // -10 (NOT 1001 = 11111111111111111111111111110110 (32-bits!))
a << 2      // 36  (1001 left shift 2 = 100100)
a >> 2      // 2   (1001 right shift 2) = 10)
-a >>> 2    // 1073741821 (zero-fill right shift)



// Bitwise operators can be used when using flags as options.
var test = {
  FLAG: {
    FOO: 1,
    BAR: 2,
    BAZ: 4
  },
  parseFlags: function(flags) {
    var result = [];
    if (flags & this.FLAG.FOO) {
      result.push("FOO");
    }
    if (flags & this.FLAG.BAR) {
      result.push("BAR");
    }
    if (flags & this.FLAG.BAZ) {
      result.push("BAZ");
    }
    return result;
  }
};

test.parseFlags()                               // []
test.parseFlags(test.FLAG.FOO)                  // ["FOO"]
test.parseFlags(test.FLAG.FOO | test.FLAG.BAZ)  // ["FOO", "BAZ"]



// Passing an options map is a much more common approach.
var test = {
  test: parseOptions(options) {
    if (!options) {
      options = {};
    }
    var result = [];
    if (options.foo) {
      result.push("foo");
    }
    if (options.bar) {
      result.push("bar");
    }
    if (options.baz) {
      result.push("baz");
    }
    return result;
  }
};

test.parseOptions()                       // []
test.parseOptions({foo: true})            // ["foo"]
test.parseOptions({foo: true, baz: true}) // ["foo", "baz"]








// ============================================================================
// Increment, Decrement, Assignment
// ============================================================================

// When post-incrementing / -decrementing a variable, its value is updated even
// though the value used in the current expression is left unchanged.
var a = 1;
var b = a++;
a // 2
b // 1

// When pre-incrementing / -decrementing a variable, its value is updated and
// the value used in the current expression is updated as well.
var a = 1;
var b = ++a;
a // 2
b // 2



// There are a lot of assignment operators.

// These do the same thing:
a = a + 1;
a += 1;
a++;

// And these:
a = a - 1;
a -= 1;
a--;

// A lot.
a *= b;
a = a * b;

a /= b;
a = a / b;

a %= b;
a = a % b;

a <<= b;
a = a << b;

a >>= b;
a = a >> b;

a >>>= b;
a = a >>> b;

a &= b;
a = a & b;

a ^= b;
a = a ^ b;

a |= b;
a = a | b;



// The modulus operator divides and returns the remainder.
for (var i = 0; i < 20; i++) {
  if (i % 3 === 0) {
    console.log(i);
  }
}
// logs: 0 3 6 9 12 15 18








// ============================================================================
// The void Operator
// ============================================================================

// The void operator evaluates the given expression and then returns undefined.
void 0        // undefined
void 1 + 2    // NaN (because undefined + 2 -> NaN)
void (1 + 2)  // undefined (properly grouped)








// ============================================================================
// The grouping and comma Operators
// ============================================================================

// The grouping operator (), not to be confused with function invocation parens
// () is used to help establish expression evaluation precedence.

// Because * has a higher precedence than +:
1 + 2 * 3 // 7

// This expression is evaluated as if it was grouped like this:
1 + (2 * 3) // 7

// The grouping operator can be used to exert more control over precedence:
(1 + 2) * 3 // 9



// The comma operator , (not to be confused with the comma separator used in
// array and object definitions, between function arguments, etc) can be used
// to specify multiple expressions where only one is expected. While all
// expressions will be evaluated, only the last expression's value is returned.

// In a for loop.
for (var a = 1, b = 5; b > 0; a++, b--) {
  console.log(a, b);
}
// logs:
// 1 5
// 2 4
// 3 3
// 4 2
// 5 1



// In a while loop.
var node = document.querySelector("a");

// Using the comma operator, you could write this:
do {
  console.log(node);
  node = node.parentNode;
} while (node);

// Like this:
while (console.log(node), node = node.parentNode);



// What is this doing?
var a, b = (1, 2);

// Let's make it a little more readable.
var a;
var b = (1, 2); // both 1 and 2 are evaluated, but 2 is returned.

a // undefined
b // 2








// ============================================================================
// Operator Precedence
// ============================================================================

// 1.  member             . []
//     new                new
// 2.  function call      ()
// 3.  increment          ++
//     decrement          --
// 4.  logical-not        !
//     bitwise-not        ~
//     unary +            +
//     unary -            -
//     typeof             typeof
//     void               void
//     delete             delete
// 5.  multiply           *
//     divide             /
//     modulus            %
// 6.  add                +
//     subtract           -
// 7.  bitwise-shift      << >> >>>
// 8.  relational         < <= > >=
//     in                 in
//     instanceof         instanceof
// 9.  equality           == != === !==
// 10. bitwise-and        &
// 11. bitwise-xor        ^
// 12. bitwise-or         |
// 13. logical and        &&
// 14. logical or         ||
// 15. conditional        ?:
// 16. assignment         = += -= *= /= %= <<= >>= >>>= &= ^= |=
// 17. comma              ,








// ============================================================================
// Eval
// ============================================================================

// Usually, eval is used incorrectly.
var obj = {prop: 123};
var key = "prop";
eval("obj." + key)  // 123 (BAD)
obj[key]            // 123 (good)

function foo() { return 456; }
eval("foo();")      // 456 (BAD)
foo()               // 456 (good)

// Sometimes, eval can be incredibly convenient.
var arr = [1, 2, 3, 4, 5];
eval(arr.join("+")) // 15



// When used normally, eval evaluates in the scope of the caller.
var value = "outer";
function test() {
  var value = "inner";
  return eval("value");
}
test() // "inner"

// But eval can be executed in the global scope as well by calling it via a
// differently-named variable.
var value = "outer";
function test() {
  var value = "inner";
  var evil = eval;
  return evil("value");
}
test() // "outer"

// Eval can also be executed in the global scope by calling it indirectly,
// which can be done using the comma and grouping operators together.
var value = "outer";
function test() {
  var value = "inner";
  return (0, eval)("value");
}
test() // "outer"








// ============================================================================
// Timers
// ============================================================================

var timeoutId = setTimeout(fn, delay);
var intervalId = setInterval(fn, delay);

// Execute some code (approximately) every 100ms. Since JavaScript is single
// threaded, asynchronous events are queued until they can be executed.
setInterval(function() {
  // What happens if the code takes more than 100ms to run?
}, 100);

// Execute some code ONCE (approximately) 100ms from now.
setTimeout(function() {
  // Some code.
}, 100);



// Execute some code in 100ms, then 100ms after that, and 100ms after that.
// How is this different from setInterval?
setTimeout(function loopy() {
  // Some code.
  setTimeout(loopy, 100);
}, 100);

// Using an IIFE, without a delay for the initial code execution.
(function loopy() {
  // Some code.
  setTimeout(loopy, 100);
})();



// You can also pass a string, instead of a function, as the first argument to
// setTimeout or setInterval, but it works like eval() and should generally be
// avoided.

var _name = "Whoops";
var obj = {
  _name: "Ben",
  logName: function() {
    console.log(this._name);
  }
};

// Why doesn't this work? Because `this` inside of obj.logName will be the
// global object when it's invoked.
setTimeout(obj.logName, 1000); // logs "Whoops" in 1 second.

// Aomeone who don't really understand JavaScript might do this.
setTimeout("obj.logName();", 1000); // logs "Ben" in 1 second.

// When they should instead be either doing this...
setTimeout(function() {
  obj.logName();
}, 1000); // logs "Ben" in 1 second.

// Or this (in environments that support it).
setTimeout(obj.logName.bind(obj), 1000); // logs "Ben" in 1 second.








// ============================================================================
// Automatic Semicolon Insertion
// ============================================================================

// JavaScript uses semicolons as end-of-statement markers, but they're often
// not required. This works as you'd expect:
var x = 1
var y = 2

// JavaScript will sometimes insert semicolons for you, most notably after a
// return statement if the return value is not on the same line.

// This:
return
{
  prop: 123;
}

// Becomes this:
return;
{
  prop: 123;
};

// JavaScript will sometimes not insert semicolons for you, resulting in
// confusing behavior.

// This:
var a = b
(c + d).toString();

// Becomes this:
var a = b(c + d).toString();

// And this:
var obj = {"foo": [7, 8, 9]}
["foo"].forEach(function(val) {
  console.log(val, obj)
})
// Logs this:
// 7 undefined
// 8 undefined
// 9 undefined

// When semicolons are used, this logs as you'd expect:
var obj = {"foo": [7, 8, 9]};
["foo"].forEach(function(val) {
  console.log(val, obj);
});
// "foo" { foo: [ 7, 8, 9 ] }



// So what's going on?

// This:
var obj = {"foo": [7, 8, 9]}
["foo"].forEach(function(val) {
  console.log(val, obj)
})

// Becomes this:
var obj = {"foo": [7, 8, 9]}["foo"].forEach(function(val) {
  console.log(val, obj)
})

// And because of this:
{"foo": [7, 8, 9]}["foo"] // [7, 8, 9]

// It's really behaving as if we did this:
var obj;
obj = [7, 8, 9].forEach(function(val) {
  console.log(val, obj)
})








// ============================================================================
// JSON: JavaScript Object Notation
// ============================================================================

// JSON was designed as a data interchange format, which happens to have a
// syntax that is a subset of JavaScript.

// This is a JSON String (like what you'd get back from an AJAX request).
var jsonString = '{"str": "foo", "num": 123, "arr": [1, 2], "obj": {"a": 1}}';

// This is an Object literal.
var objectLiteral = {"str": "foo", "num": 123, "arr": [1, 2], "obj": {"a": 1}};

// This is how you deserialize that JSON String into an Object.
var myObject = JSON.parse(jsonString);

myObject.str === "foo" // true
myObject.num === 123   // true

// And this is how you serialize an Object into a JSON String.
var anotherJsonString = JSON.stringify(myObject);

anotherJsonString === jsonString // false

// Why? When JSON serializes an object into a string, it doesn't add
// insignificant whitespace...
anotherJsonString // '{"str":"foo","num":123,"arr":[1,2],"obj":{"a":1}}'
jsonString // '{"str": "foo", "num": 123, "arr": [1, 2], "obj": {"a": 1}}'

// ...unless you tell it to (this feature is implementation-dependent).
JSON.stringify(myObject, null, 2)
// '{
//   "str": "foo",
//   "num": 123,
//   "arr": [
//     1,
//     2
//   ],
//   "obj": {
//     "a": 1
//   }
// }'








// ============================================================================
// Instances and Inheritance
// ============================================================================








// ============================================================================
// Creating objects with the Module Pattern
// ============================================================================

function makePerson(first, last) {
  // The `first` and `last` arguments are "private" properties.

  // "Static" property.
  makePerson.population++;

  return {
    // "Public" properties and methods.
    first: first,
    last: last,
    getName: function() {
      return this.first + " " + this.last;
    },
    toString: function() {
      return this.getName();
    },
    // "Priveleged" method.
    getBirthName: function() {
      return first + " " + last;
    }
  };
}

// Initialize this "static" property.
makePerson.population = 0;



// Create a new instance.
var ben = makePerson("Ben", "Alman");
makePerson.population       // 1
ben.getName()               // "Ben Alman"
ben + ", do your chores!"   // "Ben Alman, do your chores!"
ben.first = "Rico";
ben.last = "Suave";
ben.getName()               // "Rico Suave"
ben + " is so handsome!"    // "Rico Suave is so handsome!"
ben.getBirthName()          // "Ben Alman"



// So what are the downsides? It can be somewhat slow to create new methods
// and properties on each new "instance." Also, each of those methods is a
// separate object in memory.

// The `instanceof` operator won't work:
ben instanceof makePerson   // false

// And it's impossible to add or change "priveleged" methods after-the-fact:
ben.getBirthName = function() {
  return last + ", " + first;
};

ben.getBirthName()          // ReferenceError: last is not defined








// ============================================================================
// Creating objects with Constructors and Prototypes
// ============================================================================

function Person(first, last) {
  // The `first` and `last` arguments are "private" properties.

  // "Static" property.
  Person.population++;

  // "Public" properties that need to be initialized in the constructor.
  this.first = first;
  this.last = last;

  // "Priveleged" method.
  this.getBirthName = function() {
    return first + " " + last;
  };
}

// Initialize this "static" property.
Person.population = 0;

// Public methods. All objects of type Person inherit all prototyped properties.
Person.prototype.getName = function() {
  return this.first + " " + this.last;
};

Person.prototype.toString = Person.prototype.getName;



// Create a new instance.
var ben = new Person("Ben", "Alman");
Person.population           // 1
ben.getName()               // "Ben Alman"
ben + ", do your chores!"   // "Ben Alman, do your chores!"
ben.first = "Rico";
ben.last = "Suave";
ben.getName()               // "Rico Suave"
ben + " is so handsome!"    // "Rico Suave is so handsome!"
ben.getBirthName()          // "Ben Alman"

// The `instanceof` operator works:
ben instanceof Person       // true



// So what are the downsides? Prototypal inheritance is confusing. Also, it's
// still impossible to add or change "priveleged" methods after-the-fact:
ben.getBirthName = function() {
  return last + ", " + first;
};

ben.getBirthName()          // ReferenceError: last is not defined








// ============================================================================
// The `new` keyword.
// ============================================================================

// If you forget the `new` keyword when invoking a constructor function,
// everything breaks.
function Person(first, last) {
  this.first = first;
  this.last = last;
}

var bob = Person("Bob", "Smith");
bob       // undefined
bob.first // TypeError: Cannot read property 'first' of undefined
first     // "Bob"
last      // "Smith"



// You can add some code to the top of your constructor function to handle
// this scenario.
function Person(first, last) {
  if ( !(this instanceof Person) ) {
    return new Person(first, last);
  }
  this.first = first;
  this.last = last;
}

Person.prototype.toString = function() {
  return this.first + " " + this.last;
};

var ben = new Person("Ben", "Alman");
ben + "!" // "Ben Alman!"

var bob = Person("Bob", "Smith");
bob + "?" // "Bob Smith?"








// ============================================================================
// Basic Prototypal Inheritance
// ============================================================================

// Base type.
function Person(first, last) {
  this.first = first;
  this.last = last;
}

// Prototype method that all Person objects will inherit.
Person.prototype.toString = function() {
  return this.first + " " + this.last;
};

// Create a Person object.
var person = new Person("Ben", "Alman");
"Hello, " + person // "Hello, Ben Alman"



// This type extends the base type.
function Employee(first, last, id) {
  this.first = first;
  this.last = last;
  this.id = id;
}

// Prototypes are initialized as empty object. Properties can be added to them,
// and they can also be explicitly set to refer to a different object:
Employee.prototype = new Person();

// This .toString method overrides the Person.prototype.toString method.
Employee.prototype.toString = function() {
  return this.first + " " + this.last + " [ID:" + this.id + "]";
};

// Create an Employee object.
var employee = new Employee("Bob", "Smith", 123);
"Hello, " + employee // "Hello, Bob Smith [ID:123]"








// ============================================================================
// Accessing the "Super" Constructor Function
// ============================================================================

// Base type.
function Person(first, last) {
  this.first = first;
  this.last = last;
}

// Prototype method that all Person objects will inherit.
Person.prototype.toString = function() {
  return this.first + " " + this.last;
};

// Create a Person object.
var person = new Person("Ben", "Alman");
"Hello, " + person // "Hello, Ben Alman"



// This type extends the base type.
function Employee(first, last, id) {
  // this.first = first;
  // this.last = last;
  Employee._super.call(this, first, last);
  this.id = id;
}

// Employee inherits from Person.
Employee.prototype = new Person();
// If you need a convenient reference to the "super" constructor, you'll have
// to store it yourself.
Employee._super = Person;

// This .toString method overrides the Person.prototype.toString method.
Employee.prototype.toString = function() {
  return this.first + " " + this.last + " [ID:" + this.id + "]";
};

// Create an Employee object.
var employee = new Employee("Bob", "Smith", 123);
"Hello, " + employee // "Hello, Bob Smith [ID:123]"








// ============================================================================
// Accessing "Super" Methods
// ============================================================================

// Base type.
function Person(first, last) {
  this.first = first;
  this.last = last;
}

// Prototype method that all Person objects will inherit.
Person.prototype.toString = function() {
  return this.first + " " + this.last;
};

// Create a Person object.
var person = new Person("Ben", "Alman");
"Hello, " + person // "Hello, Ben Alman"



// This type extends the base type.
function Employee(first, last, id) {
  Employee._super.call(this, first, last);
  this.id = id;
}

// Employee inherits from Person.
Employee.prototype = new Person();
// The base type's constructor function.
Employee._super = Person;
// Create a property on the prototype referring to the base type's prototype.
Employee.prototype._super = Person.prototype;

// This .toString method overrides the Person.prototype.toString method.
Employee.prototype.toString = function() {
  // return this.first + " " + this.last + " [ID:" + this.id + "]";
  return this._super.toString.call(this) + " [ID:" + this.id + "]";
};

// Create an Employee object.
var employee = new Employee("Bob", "Smith", 123);
"Hello, " + employee // "Hello, Bob Smith [ID:123]"








// ============================================================================
// Accessing this Type's Constructor Function
// ============================================================================

// Base type.
function Mammal(name) {
  this.name = name;
}

// A few prototyped methods.
Mammal.prototype.toString = function() {
  return "Mammal " + this.name;
};

Mammal.prototype.giveBirth = function() {
  // The constructor function is hard-coded.
  return new Mammal("Baby " + this.name);
};

var rabbit = new Mammal("Hazel");
"rabbit is " + rabbit           // "rabbit is Mammal Hazel"
rabbit.constructor              // Mammal



// This type extends the base type.
function Cat(name) {
  this.name = name;
}

// Cat inherits from Mammal.
Cat.prototype = new Mammal();

Cat.prototype.toString = function() {
  return "Cat " + this.name;
};

var pet = new Cat("Zsa Zsa");
"pet is " + pet                 // "pet is Cat Zsa Zsa"
pet.constructor                 // Mammal

var kitten = pet.giveBirth();
"kitten is " + kitten           // "kitten is Mammal Baby Zsa Zsa"



// Prototyped methods can be made more inheritance-friendly with the
// .constructor proptery.
Mammal.prototype.giveBirth = function() {
  // return new Mammal("Baby " + this.name);
  return new this.constructor("Baby " + this.name);
};

// Note that by default, the .constructor property references the base type's
// constructor function. As such, it needs to be explicitly set!
Cat.prototype.constructor = Cat;

var kitten2 = pet.giveBirth();
pet.constructor                 // Cat
kitten2.constructor             // Cat
"kitten is " + kitten2          // "kitten is Cat Baby Fluffy"








// ============================================================================
// Constructor Function Side-Effects
// ============================================================================

// Base type.
function Person(first, last) {
  this.first = first;
  this.last = last;
  Person.population++;
}
// Create a "static" property.
Person.population = 0;

// Create an instance, increasing the world's population by one.
var person = new Person("Ben", "Alman");
Person.population // 1



// Sub-type.
function Employee(first, last, id) {
  Employee._super.call(this, first, last);
  this.id = id;
}

// All the usual stuff... right?
Employee.prototype = new Person();
Employee._super = Person;
Employee.prototype._super = Person.prototype;

// Create an instance, increasing the world's population by one.
var employee = new Employee("Bob", "Smith", 123);
Person.population // 3 (what happened?)



// Let's try this again.

// Base type.
function Person(first, last) {
  this.first = first;
  this.last = last;
  Person.population++;
}
// Create a "static" property.
Person.population = 0;

// Create an instance, increasing the world's population by one.
var person = new Person("Ben", "Alman");
Person.population // 1



// Sub-type.
function Employee(first, last, id) {
  Employee._super.call(this, first, last);
  this.id = id;
}

// Create a Dummy constructor function to be invoked.
function Dummy() {}
// Dummy objects should inherit from the Person prototype.
Dummy.prototype = Person.prototype;
// Create a new Dummy, NOT a new Person!
Employee.prototype = new Dummy();
// The "usual suspects".
Employee._super = Person;
Employee.prototype._super = Person.prototype;

// Create an instance, increasing the world's population by one.
var employee = new Employee("Bob", "Smith", 123);
Person.population // 2








// ============================================================================
// Prototypal Inheritance with a Little Help
// ============================================================================

function extend(sub, base) {
  // A dummy constructor function.
  function F() {}
  // Whose prototype is the base prototype.
  F.prototype = base.prototype;
  // Create a new dummy object. This prevents unwanted base-constructor-related
  // side effects from occurring.
  sub.prototype = new F();
  // A convenient reference to the "super" constructor.
  sub._super = base;
  // Create a property on the prototype referring to the base type's prototype.
  sub.prototype._super = base.prototype;
  // Set the .constructor property to something useful.
  sub.prototype.constructor = sub;
}



function Person(first, last) {
  this.first = first;
  this.last = last;
  Person.population++;
}

// Create a "static" property.
Person.population = 0;

// Prototype method that all Person objects will inherit.
Person.prototype.toString = function() {
  return this.first + " " + this.last;
};

// Create an instance, increasing the world's population by one.
var person = new Person("Ben", "Alman");
Person.population   // 1
"Hello, " + person  // "Hello, Ben Alman"



// Sub-type.
function Employee(first, last, id) {
  Employee._super.call(this, first, last);
  this.id = id;
}

// Employee extends Person.
extend(Employee, Person);

// This .toString method overrides the Person.prototype.toString method.
Employee.prototype.toString = function() {
  // return this.first + " " + this.last + " [ID:" + this.id + "]";
  return this._super.toString.call(this) + " [ID:" + this.id + "]";
};

// Create an instance, increasing the world's population by one.
var employee = new Employee("Bob", "Smith", 123);
Person.population     // 2
"Hello, " + employee  // "Hello, Bob Smith [ID:123]"








// ============================================================================
// dojo.declare
// ============================================================================

// Create a new class named "mynamespace.myClass"
dojo.declare("Bocoup.Person", null, {
  constructor: function(first, last) {
    this.first = first;
    this.last = last;
    Bocoup.Person.population++;
  },
  toString: function() {
    return this.first + " " + this.last;
  }
});

// Initialize "static" property.
Bocoup.Person.population = 0;

var person = new Bocoup.Person("Ben", "Alman");
Bocoup.Person.population  // 1
"Hello, " + person        // "Hello, Ben Alman"

dojo.declare("Bocoup.Employee", Bocoup.Person, {
  constructor: function(first, last, id) {
    this.id = id;
  },
  toString: function() {
    return this.inherited(arguments) + " [ID:" + this.id + "]";
  }
});

var employee = new Bocoup.Employee("Bob", "Smith", 123);
Bocoup.Person.population  // 2
"Hello, " + employee      // "Hello, Bob Smith [ID:123]"








// ============================================================================
// __proto__ and Object.create
// ============================================================================

// The __proto__ property can be used to get and set the prototype of an object
// but it's non-standard and deprecated.

var base = {a: 1};

var sub = {b: 2};
sub.a // undefined
sub.b // 2

sub.__proto__ = base;
sub.a // 1
sub.b // 2



// The official way to set the prototype of an object is Object.create(), but
// it's not yet universally supported, you can't use it to get a prototype, and
// you can't use it to set the prototype of an object that already exists.

// Create an object with null as prototype.
var obj = Object.create(null);

// These two are equivalent:
obj = {};
obj = Object.create(Object.prototype);

// As are these, unless the Foo constructor contained intialization code:
function Foo() {}
obj = new Foo();
obj = Object.create(Foo.prototype);



// Object.create accepts a second "property descriptors" argument as well, but
// by default, properties added this way aren't writable, enumerable or
// configurable:
var base = {a: 123};
var sub = Object.create(base, {b: {value: 456}});

sub.b = 789;
sub.b // 456

// This logs "a".
for (var prop in sub) {
  console.log(prop);
}

delete sub.b // false (can't be deleted)

// You can explicitly override the default behavior.
var base = {a: 123};
var sub = Object.create(base, {
  b: {value: 456, writable: true, enumerable: true, configurable: true}
});

sub.b = 789;
sub.b // 789

// This logs both "b" and "a".
for (var prop in sub) {
  console.log(prop);
}

delete sub.b // false



// Here's a basic polyfill that only handles the first argument to
// Object.create.
if (!Object.create) {
  Object.create = function(obj) {
    // A dummy constructor function.
    function F() {}
    // Whose prototype is obj.
    F.prototype = obj;
    // Return a new object inheriting from this prototype.
    return new F();
  };
}








// ============================================================================
// Browser JavaScript
// ============================================================================








// ============================================================================
// The window Object
// ============================================================================

// In browsers, the top-level object is called `window` (not global).
window === this // true
window === (function() { return this; }()) // true

var foo = 123;
window.foo // 123



// A few built-in properties of the global window object.

window.document     // The DOM document loaded in the window.
window.navigator    // The navigator object.
window.screen       // The screen object.
window.location     // The location object.
window.history      // The history object.

window.self         // The window object.
window.parent       // The parent of the current window or subframe.
window.top          // The topmost window in the window hierarchy.
window.frames       // An array of sub-frames in the current window.
window.window       // The window object.

// "frame breaking"
if (self !== top) {
  top.location.href = location.href;
}

window.innerWidth   // Width of the content area, including scrollbar.
window.innerHeight  // Height of the content area, including scrollbar.
window.outerWidth   // Width of the outside of the browser window.
window.outerHeight  // Width of the outside of the browser window.

window.name         // Get/set the name of the window.
window.status       // Get/set the text of the statusbar at the bottom.

// Note that window[n] is a shortcut for window.frames[n].
window[0] === window.frames[0] // true



// Methods of the global window object.

window.addEventListener    // Register an event handler.
window.removeEventListener // Remove an event handler.

window.alert               // Display an alert (Ok) dialog.
window.confirm             // Display a confirmation (Ok / Cancel) dialog.
window.prompt              // Display a dialog in which the user can enter text.

window.back                // Move back one entry in the window history.
window.forward             // Move forward one entry in the window history.

window.open                // Open a new window.
window.close               // Close the current window.
window.moveBy              // Move the current window by a specified amount.
window.moveTo              // Move the current window to the specified position.
window.resizeBy            // Resize the current window by a specified amount.
window.resizeTo            // Resize the current window to the specified size.

window.scrollTo            // Scroll the window to a specified position.
window.scrollBy            // Scroll the window by a specified amount.

window.escape              // Encode a string.
window.unescape            // Unencode a string.
window.encodeURI
window.encodeURIComponent
window.decodeURI
window.decodeURIComponent

window.focus               // Set focus on the current window.
window.blur                // Set focus away from the current window.

window.getComputedStyle    // Get computed style for the specified element.

window.postMessage         // Send a string of data from one window to another.

window.setTimeout          // Execute a function after a N millisecond delay.
window.setInterval         // Execute a function every N milliseconds.
window.clearTimeout        // Cancel an execution scheduled with setTimeout.
window.clearInterval       // Cancel an execution scheduled with setInterval.



// Event handlers for the global window object.

window.onabort             // For handling abort events on the window.
window.onbeforeunload      // For handling before-unload events on the window.
window.onblur              // For handling blur events on the window.
window.onchange            // For handling change events on the window.
window.onclick             // For handling click events on the window.
window.onclose             // For handling handling the window close event.
window.oncontextmenu       // For handling right-click events on the window.
window.ondragdrop          // For handling drag and drop events on the window.
window.onerror             // For handling errors raised on the window.
window.onfocus             // For handling focus events on the window.
window.onhashchange        // For handling hash change events on the window.
window.onkeydown           // For handling keydown events on the window.
window.onkeypress          // For handling keypress events on the window.
window.onkeyup             // For handling keyup events on the window.
window.onload              // For handling window loading.
window.onmousedown         // For handling mousedown events on the window.
window.onmousemove         // For handling mousemove events on the window.
window.onmouseout          // For handling mouseout events on the window.
window.onmouseover         // For handling mouseover events on the window.
window.onmouseup           // For handling mouseup events on the window.
window.onpaint             // For handling paint events on the window.
window.onpopstate          // For handling history change events.
window.onreset             // For handling reset events on the window.
window.onresize            // For handling window resizing.
window.onscroll            // For handling window scrolling.
window.onselect            // For handling window selection.
window.onsubmit            // For handling submits on window forms.
window.onunload            // For handling unload events on the window.

for (var prop in kitchenSink) { window[prop] = kitchenSink[prop]; } // (joke)








// ============================================================================
// The window.navigator Object
// ============================================================================

// This object has are many properties, but the one most commonly used is:
navigator.userAgent

// IE 9
"Mozilla/5.0 (Windows; U; MSIE 9.0; Windows NT 9.0; en-US))"
// IE 8
"Mozilla/5.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0; WOW64; " +
  "Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR " +
  "3.0.30729; .NET CLR 1.0.3705; .NET CLR 1.1.4322)"
// IE 7
"Mozilla/4.0(compatible; MSIE 7.0b; Windows NT 6.0)"
// Firefox 6
"Mozilla/5.0 (X11; Linux i686; rv:6.0) Gecko/20100101 Firefox/6.0"
// Chrome 15
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/535.2 (KHTML, " +
  "like Gecko) Chrome/15.0.874.102 Safari/535.2"








// ============================================================================
// The window.screen Object
// ============================================================================

screen.availWidth  // Available horizontal space.
screen.availHeight // Available vertical space (minus OS toolbars).
screen.availLeft   // The first available pixel from the left of the screen.
screen.availTop    // The first available pixel from the top of the screen.

screen.width       // The width of the screen.
screen.height      // The height of the screen.

// FF specific?
screen.left        // Left position of this screen relative to the main screen.
screen.top         // Top position of this screen relative to the main screen.

screen.colorDepth  // The color depth of the screen.
screen.pixelDepth  // The bit depth of the screen.








// ============================================================================
// The window.location Object
// ============================================================================

// Properties of the window.location object.

location.href     // The entire URL.
location.host     // The host name and port number.
location.hostname // The host name, without the port number.
location.pathname // The path (relative to the host).
location.port     // The port number of the URL.
location.protocol // The protocol of the URL.
location.search   // Everything after (and including) ? (not including hash).
location.hash     // Everything after (and including) #

// Methods of the window.location object.

location.assign(url)    // Load the document at the specified url.
location.reload(force)  // Reload the current document.
location.replace(url)   // Replace the current location (replaces history too).
location.toString()     // String representation of the current location.



// Change the current window location to a new page:
location.href = "http://test.com:8000/page.html?a=1&b=2#something";

location.href     // "http://test.com:8000/page.html?a=1&b=2#something"
location.host     // "test.com:8000"
location.hostname // "test.com"
location.pathname // "/page.html"
location.port     // "8000"
location.protocol // "http:"
location.search   // "?a=1&b=2"
location.hash     // "#something"

function parseQueryString(qs) {
  if (arguments.length === 0) {
    qs = location.search;
  }
  var obj = {};
  qs = qs.replace(/^\?/, "");
  qs.split("&").forEach(function(pair) {
    var parts = pair.split("=");
    obj[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
  });
  return obj;
}
parseQueryString("?a=1%3D2&b=&c=3") // { a: '1=2', b: '', c: '3' }
parseQueryString() // get it out of location.search




// Using "progressive enhancement" and the hashchange event, it's possible to
// "AJAXify" a website.

// When any link in the document is clicked, do this:
document.addEventListener("click", function(e) {
  // The clicked element.
  var elem = e.target;
  // Abort if a non-link was clicked.
  if (!/^a$/i.test(elem.nodeName)) { return; }
  // The element's href property.
  var url = elem.getAttribute("href");

  if (url.charAt(0) === "/") {
    // URL begins with "/" so it must be internal. Update the fragment.
    location.hash = "#" + url;
    // Prevent the default action.
    e.preventDefault();
  }
}, false);

// When the fragment is changed, do this:
var loadContent = function() {
  // Get the URL from the fragment.
  var url = location.hash.replace(/^#/, "");
  // If there's actually a page to load...
  if (url) {
    // Simulate loading content via XHR.
    console.log("Load HTML content from " + url + " via XHR.");
  }
}
// Actually bind the event handler.
window.addEventListener("hashchange", loadContent, false);
// Run now, in case the page was loaded with a fragment.
loadContent();








// ============================================================================
// Browser History
// ============================================================================

// The window.history Object has a number of methods:

history.back()    // Go to the previous page in session history.
history.go(-1)    // Go to the previous page in session history.

history.forward() // Go to the next page in session history.
history.go(1)     // Go to the next page in session history.

// New HTML5 methods:

// Add a new state in session history.
history.pushState(state, title, url)
// Replace the current state in session history.
history.replaceState(state, title, url)




// Using "progressive enhancement" and history.pushState, it's possible to
// "AJAXify" a website.

// When any link in the document is clicked, do this:
document.addEventListener("click", function(e) {
  // The clicked element.
  var elem = e.target;
  // Abort if a non-link was clicked.
  if (!/^a$/i.test(elem.nodeName)) { return; }
  // The element's href property.
  var url = elem.getAttribute("href");

  if (url.charAt(0) === "/") {
    // URL begins with "/" so it must be internal. Push a new history state.
    history.pushState(null, null, url);
    // Actually load content.
    loadContent();
    // Prevent the default action.
    e.preventDefault();
  }
}, false);

var lastPage = location.pathname;
var loadContent = function() {
  // Get the URL from the fragment.
  var url = location.pathname;
  // If the page has actually changed...
  if (url !== lastPage) {
    lastPage = url;
    // Simulate loading content via XHR.
    console.log("Load HTML content from " + url + " via XHR.");
  }
};

// When the history state has changed, do this:
window.addEventListener("popstate", loadContent, false);








// ============================================================================
// The Document Object Model (DOM)
// ============================================================================








// ============================================================================
// What is the DOM?
// ============================================================================

// The DOM is an API for HTML and XML documents. The DOM is a fully object-
// oriented representation of the web page, and it can be modified with a
// scripting language such as JavaScript.
var paragraphs = document.getElementsByTagName("p");
paragraphs.length       // 4
paragraphs[0].nodeName  // "P"

// The DOM is not a programming language. While the previous example was
// written in JavaScript, it only uses the DOM to access the document and its
// elements. DOM access, as implemented in Python, might look like this:
//
// import xml.dom.minidom as m
// doc = m.parse("C:\\Projects\\Py\\file.xml");
// p_list = doc.getElementsByTagName("para");

// The W3C DOM standard forms the basis of the DOM implemented in most modern
// browsers. Many browsers offer extensions beyond the W3C standard, so be
// careful when using them, as they might not exist in all browsers.
//
// Given this form: <form action=""><input name="foo"></form>
document.forms[0].foo;          // Non-standard.
document.forms[0].elements.foo; // Standard.








// ============================================================================
// DOM Data Types
// ============================================================================

document      // The object containing all the elements (and other properties).
element       // A node of type "element".
attribute     // A node of type "attribute".
nodeList      // An array of elements, accessed by index.
namedNodeMap  // Like an array, but nodes are accessed by name (or index).








// ============================================================================
// The Document
// ============================================================================

// The document is contained by the window object and may contain any number of
// elements.

// The document object also contains many properties.

document.characterSet     // The character set being used.
document.compatMode       // Rendered in Quirks or Strict mode?
document.defaultView      // A reference to the window object.
document.dir              // Gets/sets directionality (rtl/ltr).
document.doctype          // The Document Type Definition (DTD).
document.documentElement  // The Element that is a direct child of document.
document.documentURI      // The document location.

document.body             // The BODY node of the current document.
document.cookie           // A semicolon-separated list of cookies.
document.domain           // The domain of the current document.
document.referrer         // The URI of the page that linked to this page.
document.title            // The title of the current document.

document.anchors          // A list of all of the anchors in the document.
document.applets          // A list of applets in the document.
document.embeds           // A list of object elements in the document.
document.forms            // A list of the forms in the current document.
document.images           // A list of the images in the current document.
document.links            // A list of all the hyperlinks in the document.
document.plugins          // A list of the available plugins.
document.styleSheets      // A list of the stylesheets in the document.

// New in HTML5
document.activeElement    // The currently focused element



// The document object also contains many methods.

document.getElementById         // Returns an object reference (or null).
document.getElementsByTagName   // Returns a list of elements.
document.getElementsByClassName // Returns a list of elements.
document.querySelector          // Returns an element matching a selector.
document.querySelectorAll       // Returns a list of matching elements.

document.createElement          // Creates a new element.
document.createTextNode         // Creates a text node.
document.createComment          // Creates a new comment node and returns it.
document.createAttribute        // Creates a new attribute node and returns it.
document.createTreeWalker       // Creates a treeWalker object.
document.createDocumentFragment // Creates a new document fragment.
document.createRange            // Creates a Range object.

document.hasFocus               // Returns true if a descendant is focused.
document.getSelection           // Returns a Selection object (selected text).

document.createEvent            // Creates an event.
document.addEventListener       // Adds an event listener to the document.
document.removeEventListener    // Removes an event listener from the document

document.close                  // Closes a document stream for writing.
document.open                   // Opens a document stream for writing.
document.write                  // Writes text to a document.
document.writeln                // Write a line of text to a document.








// ============================================================================
// Getting Elements
// ============================================================================

// Individual elements can be selected from the DOM by their id value. If no
// matching element is found, null is returned.
var list = document.getElementById("first-list");
if (list) {
  // This code only executes if an element was found.
  list.innerHTML = "<li>I am a list item!</li>";
}

// Elements can also be selected by their tag name.
var paragraphs = document.getElementsByTagName("p");
for (var i = 0; i < paragraphs.length; i++) {
  paragraphs[i].innerHTML = "I am paragraph " + i + " on the page";
}

// Or className property (class attribute). Note that this doesn't work in IE8
// or earlier!
var elems = document.getElementsByClassName("sample-class");
for (var i = 0; i < elems.length; i++) {
  console.log(elems[i].className);
}

// With the new querySelector and querySelectorAll methods, selector strings
// can be used to select elements.
var links = document.querySelectorAll("a[href^='https://']");
for (var i = 0; i < links.length; i++) {
  console.log(links[i].href);
}

// Without querySelectorAll:
var links = [].slice.call(document.getElementsByTagName("a"));
links = links.filter(function(elem) {
  return /^https:\/\//.test(elem.getAttribute("href"))
});
for (var i = 0; i < links.length; i++) {
  console.log(links[i].href);
}









// ============================================================================
// NodeLists: Live and Static
// ============================================================================

// The getElementsByTagName and getElementsByClassName methods return a live
// NodeList, which will auto-update as elements are added to (or removed from)
// the DOM.
var divs = document.getElementsByTagName("div");
var i = 0;

// Infinite loop!
while(i < divs.length) {
  document.body.appendChild(document.createElement("div"));
  i++;
}

// The querySelectorAll method returns a static NodeList, by design.
var paragraphs = document.querySelectorAll("p");
paragraphs.length // 4
document.body.appendChild(document.createElement("p"));
paragraphs.length // 4

// When performance matters, live NodeLists are faster than static NodeLists
// because of the way live NodeLists get cached internally. But if you want a
// "snapshot" of elements, use querySelectorAll.








// ============================================================================
// Nodes
// ============================================================================

// A number of DOM types inherit from Node. Nodes contains many properties.

Node.nodeName         // The node's name (#document for document).
Node.tagName          // Like nodeName, but not as good. Don't use it.
Node.nodeType         // A node type constant (9 for document).
Node.nodeValue        // The node's value (null for document).

Node.attributes       // A collection of attributes.

Node.childNodes       // A collection of child nodes.
Node.children         // A collection of child element nodes.

Node.firstChild       // The first child of a node.
Node.lastChild        // The last child of a node.
Node.nextSibling      // The next sibling of a node (or null if none).
Node.previousSibling  // The previous sibling of a node (or null if none).
Node.parentNode       // The parent of the specified node in the DOM tree.

Node.ownerDocument    // The top-level document object for this node.
Node.textContent      // The text content.



// As well as methods.

Node.appendChild      // Append a child node to a parent node.
Node.cloneNode        // Return a duplicate of the current node.
Node.insertBefore     // Inserts a node before another node.
Node.removeChild      // Removes a child node from the DOM, returning the node.
Node.replaceChild     // Replaces one child of the specified node with another.

Node.contains         // Is a node a descendent of a given node?
Node.hasAttributes    // Does the current node have any attributes?
Node.hasChildNodes    // Does the current node have any child nodes?
Node.isEqualNode      // Are two nodes are equal?

Node.normalize        // Merges adjacent textNodes into single textNodes.

Node.isSupported      // Test to see if a feature is implemented in the DOM.



// nodeType Values that matter:

Node.ELEMENT_NODE   === 1 // true
Node.ATTRIBUTE_NODE === 2 // true
Node.TEXT_NODE      === 3 // true
Node.COMMENT_NODE   === 8 // true
Node.DOCUMENT_NODE  === 9 // true








// ============================================================================
// Elements
// ============================================================================

// Elements contains many properties.

element.classList       // A list of the class names of the element.
element.className       // Get/set the class of the element (attribute class).
element.id              // Get/set element identifier (attribute id).
element.name            // Get/set the name attribute.
element.title           // Get/set the "hover tooltip" text.
element.style           // Reference to the element's style object.
element.dir             // Set text directionality (ltr or rtl).
element.lang            // Get/set base language of attributes / text content.
element.tabIndex        // Get/set the tab order of the current element.
element.dataset         // Read and write custom HTML data- attributes.
element.contentEditable // Enable or disable the element's editable status.

element.innerHTML       // Get/set HTML describing the element's descendants.

element.offsetParent    // Reference to the nearest positioned ancestor element.
element.offsetHeight    // The height of an element, relative to the layout.
element.offsetWidth     // The width of an element, relative to the layout.
element.offsetLeft      // Distance from element's left to its offsetParent's.
element.offsetTop       // Distance from element's top to its offsetParent's.

element.clientWidth     // Inner width of an element in pixels.
element.clientHeight    // Inner height of an element in pixels.

element.scrollWidth     // Width of the scroll view of an element.
element.scrollHeight    // Height of the scroll view of an element.
element.scrollLeft      // Get/set the left scroll position.
element.scrollTop       // Get/set the top scroll position.



// As well as methods.

element.getElementById         // Returns an object reference (or null).
element.getElementsByTagName   // Returns a list of elements.
element.getElementsByClassName // Returns a list of elements.
element.querySelector          // Returns an element matching a selector.
element.querySelectorAll       // Returns a list of matching elements.

element.addEventListener       // Adds an event listener to the element.
element.removeEventListener    // Removes an event listener from the element
element.dispatchEvent          // Dispatch an event to this element.

element.blur                   // Remove keyboard focus from this element.
element.focus                  // Give keyboard focus to this element.

element.click                  // Simulate a click on the current element.

element.getAttribute           // Get the given attribute's value.
element.setAttribute           // Set the given attribute's value.
element.removeAttribute        // Remove the given attribute.



// Also, certain specific element types have extra properties.

formElement.elements      // A list of all the elements inside a form.
selectElement.options     // A list of all the option elements inside a form.
tableElement.rows         // A list of all the tr elements inside a table.
tableElement.tBodies      // A list of all the tbody elements inside a table.
tableRowElement.cells     // A list of all the td elements inside a tr.








// ============================================================================
// Creating Elements
// ============================================================================

// Create a new P element in memory.
var paragraph = document.createElement("p");
// Create a new text node.
var content = document.createTextNode("Hello world");
// Append the text node to the paragraph.
paragraph.appendChild(content);
// Get all the paragraphs in the DOM.
var paragraphs = document.getElementsByTagName("p");
// Insert the new paragraph before the first paragraph.
paragraphs[0].parentNode.insertBefore(paragraph, paragraphs[0]);



// Using DOM methods, how would you append this to the body?
// <p>This <b>is</b> a <i>test</i>.</p>

var elem;
// Create a new P element in memory.
var paragraph = document.createElement("p");
// Append a text node.
paragraph.appendChild(document.createTextNode("This "));
// Create a new B element in memory.
elem = document.createElement("b");
// Append a text node.
elem.appendChild(document.createTextNode("is"));
// Append the B element to the P element.
paragraph.appendChild(elem);
// Append another text node.
paragraph.appendChild(document.createTextNode(" a "));
// Create a new I element in memory.
elem = document.createElement("i");
// Append a text node.
elem.appendChild(document.createTextNode("test"));
// Append the I element to the P element.
paragraph.appendChild(elem);
// Append one last text node.
paragraph.appendChild(document.createTextNode("."));
// Append the P to the body.
document.body.appendChild(paragraph);



// Or you could just do this:

// Create a new P element in memory.
var paragraph = document.createElement("p");
// Set the P element's innerHTML.
paragraph.innerHTML = "This <b>is</b> a <i>test</i>.";
// Append the P to the body.
document.body.appendChild(paragraph);



// Compare that to:

// Create a new P element in memory.
var paragraph = document.createElement("p");
// Set the P element's textContent (unescaped).
paragraph.textContent = "This <b>is</b> a <i>test</i>.";
// Append the P to the body.
document.body.appendChild(paragraph);



// Properties you care about:

element.innerHTML     // Get/set HTML describing the element's descendants.
element.innerText     // Get/set content of visible non-SCRIPT/STYLE elements.
element.textContent   // Get/set text content of all elements (note: IE 9+).








// ============================================================================
// DocumentFragments
// ============================================================================

// A DocumentFragment is a minimal document object that has no parent, used as
// a temporary container for HTML.

// How might you append an arbitrary array of listitems to an existing list?

// Find all lists in the DOM.
var lists = document.getElementsByTagName("ul");

// An array of items to be added, as listitems, to each list.
var items = ["first", "second", "third"];

var elem;
// For each list...
for (var i = 0; i < lists.length; i++) {
  // For each item...
  for (var j = 0; j < items.length; j++) {
    // Create an LI.
    elem = document.createElement("li");
    // Append a textNode to the LI.
    elem.appendChild(document.createTextNode(items[j]));
    // Append the LI to
    lists[i].appendChild(elem);
  }
}



// Using DocumentFragment, performance is increased significantly.

// Find all lists in the DOM.
var lists = document.getElementsByTagName("ul");

// An array of items to be added, as listitems, to each list.
var items = ["first", "second", "third"];

// Create a DocumentFragment.
var fragment = document.createDocumentFragment();

var elem;
// For each item...
for (var i = 0; i < items.length; i++) {
  // Create an LI.
  elem = document.createElement("li");
  // Append a textNode to the LI.
  elem.appendChild(document.createTextNode(items[i]));
  // Append the LI to the fragment.
  fragment.appendChild(elem);
}

// For each list...
for (var i = 0; i < lists.length; i++) {
  // Clone fragment and append it to the DOM.
  lists[i].appendChild(fragment.cloneNode(true));
}



// Instead of documentFragment... container element:
while (container.firstChild) {
  parent.appendChild(container.firstChild);
}

var tmp;
while (tmp = container.firstChild) {
  parent.appendChild(tmp);
}






// ============================================================================
// Manipulating the DOM
// ============================================================================

// How might we temporarily detach a node from the DOM?

// Find the node in the DOM.
var node = document.getElementById("test-element");
// Get its parent node.
var parent = node.parentNode;
// Get its next sibling.
var next = node.nextSibling;
// Detach the node from the DOM.
parent.removeChild(node);
// Execute some code on the detached node.
superExpensiveModifications(node);
// Reattach the node to the DOM (in the right place).
parent.insertBefore(node, next);



// How might we sort some elements in the DOM?

// Create a DOM structure.
var list = document.createElement("ul");
list.innerHTML = "<li>superhuge</li><li>tiny</li><li>medium</li>";
// Get some elements (NodeList)
var elems = list.childNodes;
// Get an Array of elements.
var arr = [].slice.call(elems);
// Sort that array by text length.
arr.sort(function(a, b) {
  return a.textContent.length - b.textContent.length;
});
// Iterate over all (sorted) elements in-order.
for (var i = 0; i < arr.length; i++) {
  // Append each element to the parent element.
  list.appendChild(arr[i]);
}








// ============================================================================
// Traversing the DOM
// ============================================================================

Node.childNodes       // A collection of child nodes.
Node.children         // A collection of child element nodes.

Node.firstChild       // The first child of a node.
Node.lastChild        // The last child of a node.
Node.nextSibling      // The next sibling of a node (or null if none).
Node.previousSibling  // The previous sibling of a node (or null if none).
Node.parentNode       // The parent of the specified node in the DOM tree.



// Using Node properties, how might we implement a DOM walker?

function walk(startNode, callback) {
  var node = startNode;
  var skip;
  do {
    if (!skip && callback(node) === false) {
      return;
    }

    if (!skip && node.firstChild) {
      node = node.firstChild;
    } else if (node.nextSibling) {
      node = node.nextSibling;
      skip = false;
    } else {
      node = node.parentNode;
      skip = true;
    }
  } while (node && node !== startNode);
}

var div = document.createElement("div");
div.innerHTML = "<a><b><c><d></d></c><e><f></f><g></g></e></b><h></h><i>" +
  "<j></j><k><l></l><m><n><o></o></n></m></k><p></p></i><q></q></a><r>" +
  "<s></s></r><t></t>";

var i = 0;
walk(div, function(node) {
  console.log(i, node);
  if (++i > 100) { return false; }
});








// ============================================================================
// Traversing the DOM with TreeWalker
// ============================================================================

var div = document.createElement("div");
div.innerHTML = "<a><b><c><d></d></c><e><f></f><g></g></e></b><h></h><i>" +
  "<j></j><k id=1><l></l><m><n><o></o></n></m></k><p></p></i><q></q></a><r>" +
  "<s></s></r><t></t>";

// TreeWalker works in IE9+ (and everything else).
var treeWalker = document.createTreeWalker(div, NodeFilter.SHOW_ALL, {
  acceptNode: function(node) {
    return node.id ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
  }
});

while (treeWalker.nextNode()) {
  console.log(treeWalker.currentNode);
}








// ============================================================================
// Events
// ============================================================================








// ============================================================================
// Registering Event Handlers
// ============================================================================

// There are three ways to register events on a DOM element.

// 1. HTML attribute (don't do this).

// <button onclick="alert('Hello world!')">



// 2. DOM element properties.

// Get an element.
var elem = document.querySelector("a");

// Create a click event handler.
elem.onclick = function(e) {
  // Prevent the default action.
  e.preventDefault();
  // Do something!
  console.log("My href is " + this.href);
};

// How can we add a second event handler? (this is less than ideal)
elem._onclick = elem.onclick;

// Create a second click event handler.
elem.onclick = function(e) {
  console.log("This logs before");
  elem._onclick(e);
  console.log("This logs after");
};



// 3. element.addEventListener

// Get an element.
var elem = document.querySelector("a");

// Create a click event handler.
elem.addEventListener("click", function(e) {
  // Prevent the default action.
  e.preventDefault();
  // Do something!
  console.log("My href is " + this.href);
}, false);

// Create a click event handler.
elem.addEventListener("click", function(e) {
  // Do something!
  console.log("This logs after");
}, false);



// 3a. In Internet Explorer < 9, you need to do things this way:

// Get an element.
var elem = document.getElementsByTagName("a")[0];

// Create a click event handler.
elem.attachEvent("onclick", function() {
  // Prevent the default action.
  window.event.returnValue = false;
  // Do something!
  console.log("My href is " + this.href);
});

// Create a click event handler.
elem.attachEvent("onclick", function() {
  // Do something!
  console.log("This might log before OR after");
});



// Some basic cross-browser DOM event handler code.
if (elem.addEventListener) {
  elem.addEventListener("click", handler, false);
} else if (elem.attachEvent) {
  elem.attachEvent("onclick", handler);
}

// The same kind of code needs to be used for cross-browser event removal:
if (elem.removeEventListener) {
  elem.removeEventListener("click", handler, false);
} else if (elem.detachEvent) {
  elem.detachEvent("onclick", handler);
}








// ============================================================================
// The Event Object
// ============================================================================

// Properties.

event.bubbles           // Does the event bubble up through the DOM? (bool)
event.cancelable        // Is the event cancelable? (bool)
event.currentTarget     // The currently registered target for the event.
event.defaultPrevented  // Has event.preventDefault() been called? (bool)
event.detail            // Detail about the event, depending on the type.
event.eventPhase        // Which phase of the event flow is being processed.
event.target            // The target on which the event was dispatched.
event.timeStamp         // The time that the event was created.
event.type              // The name of the event (case-insensitive).
event.isTrusted         // Was this event generated by the user agent? (bool)



// Some event-type-specific properties.

event.altKey      // Is the "alt" key pressed? (bool)
event.ctrlKey     // Is the "ctrl" key pressed? (bool)
event.shiftKey    // Is the "shift" key pressed? (bool)
event.keyCode     // A numeric code corresponding to the pressed key.
event.button      // The mouse button being pressed.
event.clientX     // The mouse X coordinate relative to the screen.
event.clientY     // The mouse Y coordinate relative to the screen.
event.pageX       // The mouse X coordinate relative to the document.
event.pageY       // The mouse Y coordinate relative to the document.
event.key         // The storage key changed.
event.newValue    // The new value of the key.
event.oldValue    // The old value of the key.
event.storageArea // The storage object that was affected.



// Methods.

event.preventDefault    // Cancels the event (if it is cancelable).
event.stopPropagation   // Stops the propagation of this event in the DOM.
event.stopImmediatePropagation // Stops propagation of the event immediately.








// ============================================================================
// Event Bubbling (and Capturing)
// ============================================================================

// Select every element on the page.
var elems = document.querySelectorAll("*");

// Add a click event handler to every single element.
for (var i = 0; i < elems.length; i++) {
  // "Capture" phase.
  elems[i].addEventListener("click", function(e) {
    // Prevent the default action (links, forms).
    e.preventDefault();
    // Log the current element.
    console.log("capture", this);
  }, true);

  // "Bubble" phase.
  elems[i].addEventListener("click", function(e) {
    // Prevent the default action (links, forms).
    e.preventDefault();
    // Log the current element.
    console.log("bubble", this);
  }, false);
}








// ============================================================================
// Event Delegation
// ============================================================================

// Instead of binding an event handler to every single element on the page...
document.addEventListener("click", function(e) {
  // Prevent the default action (links, forms).
  e.preventDefault();
  // Log the current element.
  console.log(e.target);
}, false);



// Or we could bind a single mouseover and mouseout event handler on document.
document.addEventListener("mouseover", function(e) {
  e.target.style.outline = "2px solid green";
}, false);

document.addEventListener("mouseout", function(e) {
  e.target.style.outline = null;
}, false);



// Instead of binding an event handler to every single link on the page...
document.addEventListener("click", function(e) {
  // The clicked element.
  var elem = e.target;
  // Abort if a non-link was clicked.
  if (!/^a$/i.test(elem.nodeName)) { return; }
  // The element's href property.
  var url = elem.getAttribute("href");
  // Log something useful.
  console.log("Link " + url + " was clicked.");
  // Prevent the default action.
  e.preventDefault();
}, false);








// ============================================================================
// Creating Custom Events
// ============================================================================

// Create an event
var event = document.createEvent("Event");
// Set the event's type.
event.initEvent("FOO", true, true);

// Select an element.
var elem = document.querySelector("a");

// Bind an event handler.
elem.addEventListener("FOO", function(e) {
  console.log(e.type + " event fired on " + this.nodeName + " element");
}, false);

// Bind a delegated event handler.
document.addEventListener("FOO", function(e) {
  console.log(e.type + " event fired on " + e.target.nodeName + " element");
}, false);

// Dispatch the event on the element.
elem.dispatchEvent(event);








// ============================================================================
//
// ============================================================================





