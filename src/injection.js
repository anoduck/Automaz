
 
var script = document.createElement("script");
  script.src = "https://code.jquery.com/jquery-3.2.1.min.js";
    script.onload = script.onreadystatechange = function() {
      $(document).ready(function() {
 
        autoJQ = jQuery.noConflict( true );
        //alert(autoJQ);
      });
    };
    document.body.appendChild(script);
 
/*


window.onload = function() {
    var script = document.createElement("script");
  script.src = "https://code.jquery.com/jquery-3.2.1.min.js";
    script.onload = script.onreadystatechange = function() {
      $(document).ready(function() {
        $("#lst-ib").val("Hello, World!");
      });
    };
    document.body.appendChild(script);
};

function addJQueryScript() {
  var script = document.createElement("script");
  script.src = "https://code.jquery.com/jquery-3.2.1.min.js";
  script.onload = script.onreadystatechange = function() {
    $(document).ready(() => {
      $("#lst-ib").val("Hello, World!");
    });
  };
  document.body.appendChild(script);
}


let scriptAddInterval = setInterval(() => {
  if (document.readyState === "complete") {
    addJQueryScript();
    clearInterval(scriptAddInterval);
  }
});

*/
 