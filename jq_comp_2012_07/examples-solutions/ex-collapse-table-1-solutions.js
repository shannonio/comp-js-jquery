$(function(){

  // POSSIBLE SOLUTION

  $("table").delegate( "th a", "click", function( e ) {
    var rows = $(this).closest("tr").nextUntil("tr:has(th)");
    rows.toggle();
    $(this).text( rows.is(":visible") ? "collapse" : "expand" )
    return false;
  });

  $("<a href='#'/>").appendTo("table th").click();

  // POSSIBLE SOLUTION

  $("<a href='#'/>").appendTo("table th").click(function(){
    $(this).text( $(this).closest("tr").nextUntil("tr:has(th)").toggle().is(":visible") ? "collapse" : "expand" )
    return false;
  }).click();

  // POSSIBLE SOLUTION

  $("<a href='#'/>").appendTo("table th").click(function(){
    var rows = $(this).closest("tr").nextUntil("tr:has(th)");
    rows.toggle();
    $(this).text( rows.is(":visible") ? "collapse" : "expand" )
    return false;
  }).click();

  // POSSIBLE SOLUTION

  $("table th").each(function(){
    var header = $(this);
    // get next table rows until a row that contains a header
    var rows = header.parent().nextUntil("tr:has(th)");
    // create link + append
    var a = $("<a href='#'/>").appendTo(header);

    // bind link click handler
    a.click(function( e ){
      // prevent default action
      e.preventDefault();
      // toggle the next tr(s) visiblity
      rows.toggle();
      // update the link text based on row visibility
      a.text( rows.is(":visible") ? "collapse" : "expand" );
    }).click();
  });

});