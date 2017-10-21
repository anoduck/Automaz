

/// Injection for JQuery
var script = document.createElement("script");
script.src = "https://code.jquery.com/jquery-3.2.1.min.js";
script.onload = script.onreadystatechange = function() {
  $(document).ready(function() {

    autoJQ = jQuery.noConflict( true );
        //alert(autoJQ);
      });
};
document.body.appendChild(script);




// Inject the hover highlight experience
let overlay = document.createElement("div");
overlay.id = 'mouseover_overlay';
document.body.appendChild(overlay);
document.addEventListener('mouseover', e => {
  if(window.elementHighlighterEnabled)
  {
    let elem = e.target;
    let rect = elem.getBoundingClientRect();
    overlay.style.top = rect.top +'px';
    overlay.style.left = rect.left +'px';
    overlay.style.width = rect.width +'px';
    overlay.style.height = rect.height +'px';

  }
});

document.addEventListener('click', e => {
  if(window.elementHighlighterEnabled)
  {
    overlay.style.top = '0px';
    overlay.style.left = '0px';
    overlay.style.width ='0px';
    overlay.style.height = '0px';
    window.elementHighlighterEnabled = false;

    let elem = e.target;    
    window.elementHighlighted(elem);
  }
});



var css = document.createElement("style");
css.type = "text/css";
css.innerHTML = `
#mouseover_overlay {
  position: fixed;
  z-index: 999999999999999;
  left: 0;
  top: 0;
  width: 0;
  height: 0;
  background: rgba(0, 100, 255, 0.3);
  pointer-events: none;
  transition: 0.2s; /* Just for fun */
}
`;
document.body.appendChild(css);




    




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
