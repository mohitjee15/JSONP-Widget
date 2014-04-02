(function() {

// Localize jQuery variable
var jQuery;

/******** Load jQuery if not present *********/
if (window.jQuery === undefined || window.jQuery.fn.jquery !== '1.4.2') {
    var script_tag = document.createElement('script');
    script_tag.setAttribute("type","text/javascript");
    script_tag.setAttribute("src",
        "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
    if (script_tag.readyState) {
      script_tag.onreadystatechange = function () { // For old versions of IE
          if (this.readyState == 'complete' || this.readyState == 'loaded') {
              scriptLoadHandler();
          }
      };
    } else { // Other browsers
      script_tag.onload = scriptLoadHandler;
    }
    // Try to find the head, otherwise default to the documentElement
    (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
} else {
    // The jQuery version on the window is the one we want to use
    jQuery = window.jQuery;
    main();
}


/******** Called once jQuery has loaded ******/
function scriptLoadHandler() {
    // Restore $ and window.jQuery to their previous values and store the
    // new jQuery in our local jQuery variable
    jQuery = window.jQuery.noConflict(true);

  



    // Call our main function
    main(); 
}

/******** Our main function ********/
function main() { 
    jQuery(document).ready(function($) { 

          var css_link = $("<link>", { 
            rel: "stylesheet", 
            type: "text/css", 
            href: "http://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css" 
            });

            css_link.appendTo('head');



        $.ajax({
                    url: 'http://local.simplewidget.com/contacts.json',
                    dataType: 'jsonp',
                    success: function(dataWeGotViaJsonp){
                     // $("#widget_data").html(dataWeGotViaJsonp);

                      //create a table
                      var html  = '<h4>All Contacts</h4><table class="table">';



                      html  +=  '<th>id</th><th>Name</th><th>Age</th><th>Mobile</th>';
                        $(dataWeGotViaJsonp).each(function(index){

                          console.log(this);
                           html  += '<tr>';
                          for(var i in this){
                              console.log(i);
                               html += '<td>'+this[i]+'</td>';
                          }
                           html  += '</tr>';
                        });

                         html  += '</table>';


                        $("#widget_data").html(html);
                        $("#widget_data").addClass("container well");


                        //console.log($("#widget_data"));
                    }
                })
    });
}




})(); // We call our anonymous function immediately