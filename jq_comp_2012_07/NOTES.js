(1) When involing a method of an object where the "." and the () are in the same expr: this is the object

(2) else, this is "the global object" or window

(3) .call, .apply, and .bind can override so this refrence the local variable it was meant to 



if you decalre a variable within (line 1542 in JavaScript.js) a function var will ALWAYS be placed tot he top of a function when they are defined.

functions are ALWAYS hoisted to the top of whatever function they are declared in(in the order in which they were defined) line 1609

function foo is a declaration

var getValue = function() {} is NOT a declaration and immune to function hoisting

wrap files in (function() {
                  //code
              }());  // this creates scope, functions give us scop in javascript, this will immediatly invoke a the function
              
              
              
for example : (function() {return: this}()); this function immediatly invokes

check for type of var or object SUPER USEFUL line 2823

var base = {a: 1};

var sub = Object.create(base);

sub.b = 2

sub.a 
//returns 1

to check for truthyness with jquery objects use el.length

$.attr will return the attr as is written in the HTML (../images/what.jpg)
$>prop will return the property as it was executed (http://www.pan.com/images/what.jpg)


$("submit").attr("disabled", "disabled") //will disable the submit 
$("submit").removeAttr("disabled")
$("submit").prop("disabled", true)
$("submit").prop("disabled", false)


always remove IDS after cloning!


.data will set state on an object


// hi!

$("div").find("span").html("hello");
$("div span").html("hello");


$("li").each(function(index, elem) {
  // this === elem
  $(this).prepend("<b>" + index + "</b> ");
});

$("li").each(function(index, elem) {
  // this === elem

  function prependStuff() {
    // this === window
    $(elem).prepend("<b>" + index + "</b> ");
  }

  prependStuff();
});


// Global counter.
var counter = 0;
$("a").click(function() {
  counter++;
  console.log(counter, $(this).attr("href"));
  return false;
});

// Per-element counter.
$("a").each(function() {
  var elem = $(this);
  var counter = 0;
  elem.click(function() {
    counter++;
    console.log(counter, elem.attr("href"));
    return false;
  });
});

// The "I GOTTA DO SOMETHING" pattern
$(".widget").each(function() {
  var widget = $(this);
  // my code
  widget.filter(':first-child').doSomething();
});


$("li").html(); // "This is the very <a href="#first" id="a">first</a> list item"
$("li:first").html(); // "This is the very <a href="#first" id="a">first</a> list item"
$("li").first().html(); // "This is the very <a href="#first" id="a">first</a> list item"

var results = [];
$("li").each(function() {
  results.push( $(this).html() );
});


// not really great
$("tr").css({
  color: "red",
  backgroundColor: "black",
  border: "1px solid green"
});

// better

/* CSS */
.ugly {
  color: red;
  background-color: black;
  border: 1px solid green;
}
/* JS */
$("tr").addClass("ugly");

// best
/* CSS */
table.ugly tr {
  color: red;
  background-color: black;
  border: 1px solid green;
}
/* JS */
$("table").addClass("ugly");

<div class="ugly">
  <table>
    <tbody>
      <tr><td>...</td></tr>
    </tbody>
  </table>
</div>

var elems = $("div");
$(elems).html("foo bar"); // inefficient
$($("div")).html("foo bar"); // (same as this, really)
elems.html("foo bar"); // correct

// REMOVE IDS AFTER CLONING!!!!!
$("#foo").clone().appendTo("body"); // BAAAAD
$("#foo").clone().removeAttr("id").appendTo("body"); // better

$("a:first-child, p:first-child, li:first-child").addClass("selected");
$("a, p, li").filter(":first-child").addClass("selected");


$("p a").hover(function() {
  $(this).toggleClass("hover");
});

$("p a").hover(function() {
  $(this).parent().toggleClass("hover");
});

$("p a").hover(function() {
  $(this).parent().parent().toggleClass("hover");
});

$("p a").hover(function() {
  $(this).closest("p").toggleClass("hover");
});


$("ul")
  .find("li")
    .addClass("selected")
    .end()
  .addClass("active");

var uls = $("ul");
uls.find("li").addClass("selected");
uls.addClass("active");


// "for each selected tr, run this code"
$("tr").each(function() {
  console.log(this);
});

// "for each selected tr's tds, run this code"
$("tr").each(function() {
  $(this).children().each(function() {
    console.log(this);
  });
});





var arr = [1,2,3,11,22,33];
arr.sort(); // [1, 11, 2, 22, 3, 33]
arr.sort(function(a, b) {
  return a - b;
});
arr // [1, 2, 3, 11, 22, 33]

var arr = [{prop: 11}, {prop: 3}, {prop: 1}];
arr.sort(); // [{prop: 11}, {prop: 3}, {prop: 1}]
arr.sort(function(a, b) {
  return a.prop - b.prop;
});
arr // [{prop: 1}, {prop: 3}, {prop: 11}]




<script src="http://code.jquery.com/jquery-1.7.2<% if ($production) { print '.min'; }%>.js"></script>


$("img").one( "click", function() {
  var alt = $(this).attr( "alt" );
  console.log( alt + " only logs the first time!" );
});

// unbind per-element
$("img").on("click", function handler(e) {
  var elem = $(this);
  var alt = elem.attr( "alt" );
  console.log( alt + " only logs the first time!" );
  elem.off(e.type, handler);
});

// unbind across all elements
var elems = $("img");
elems.on("click", function handler(e) {
  var elem = $(this);
  var alt = elem.attr( "alt" );
  console.log( alt + " only logs the first time!" );
  elems.off(e.type, handler);
});


// the solution
$("img").bind( "mouseenter mouseleave", function( e ) {
  // Toggle the class, based on the event type.
  $(this).toggleClass( "hover", e.type === "mouseenter" );
});

$("img").bind( "mouseenter mouseleave", function( e ) {
  // Toggle the class, based on the event type.
  $(this)["toggleClass"]( "hover", e.type === "mouseenter" );
});

// TOO CLEVER for my own good
$("img").bind( "mouseenter mouseleave", function( e ) {
  // Toggle the class, based on the event type.
  $(this)[e.type === "mouseenter" ? "addClass" : "removeClass"]( "hover" );
});

// I'm TOO LAZY to do this
$("img").bind( "mouseenter mouseleave", function( e ) {
  // Toggle the class, based on the event type.
  if (e.type === "mouseenter") {
    $(this).addClass( "hover" );
  } else {
    $(this).removeClass( "hover" );
  }
});


$("li").bind( "mouseover mouseout", function( e ) {
  // Toggle the "hover" class on the li.
  $(this).toggleClass( "hover", e.type === "mouseover" );
});

$(document).bind( "mouseover mouseout", function( e ) {
  // Toggle the "hover" class on the li.
  $(e.target).toggleClass( "hover", e.type === "mouseover" );
});

$(document).bind( "mouseover mouseout", function( e ) {
  // Toggle the "hover" class on the li.
  var target = $(e.target);
  if (target.is("li")) {
    target.toggleClass( "hover", e.type === "mouseover" );
  }
});

$(document).bind( "mouseover mouseout", function( e ) {
  // Toggle the "hover" class on the li.
  $(e.target).closest("li").toggleClass( "hover", e.type === "mouseover" );
});

$(document).delegate( "li", "mouseover mouseout", function( e ) {
  // Toggle the "hover" class on the li.
  $(this).toggleClass( "hover", e.type === "mouseover" );
});

$(document).on( "mouseover mouseout", "li", function( e ) {
  // Toggle the "hover" class on the li.
  $(this).toggleClass( "hover", e.type === "mouseover" );
});

$("form").delegate("input", "focusin", function(e) {
  console.log("focus", this.name);
});


$.get("/templates/foo", function(templates) {
  $.get("/userdata/123", function(userdata) {
    doSomething(templates, userdata);
  });
});


var templates, userdata;
var reqCount = 2;
function allDone() {
  reqCount--;
  if (reqCount === 0) {
    doSomething(templates, userdata);
  }
}
$.get("/templates/foo", function(t) {
  templates = t;
  allDone();
});
$.get("/userdata/123", function(u) {
  userdata = u;
  allDone();
});

var templateCache = {};
function getTemplates(id) {
  var dfd;
  if (templateCache[id]) {
    return templateCache[id];
  } else {
    dfd = $.Deferred();
    $.get("/templates/" + id).done(function(data) {
      templateCache[id] = data;
      dfd.resolve(data);
    });
    return dfd.promise();
  }
}

var templatesReq = getTemplates("foo");
var userdataReq = $.get("/userdata/123");

templatesReq.done(function() {
  console.log("got all templates!!");
});

$.when(templatesReq, userdataReq).then(function(templates, userdata) {
  doSomething(templates, userdata);
});



var userdataReq = $.get("/userdata/123", function(userdata) {
  console.log(userdata);
});

userdataReq.success(function(userdata) {
  console.log(userdata);
});


              
