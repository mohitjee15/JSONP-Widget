(function() {

// Localize jQuery variable
var jQuery;
var $;
var JSONPdata;

var container_id  = "zd-widget";


var loaded_js_array = new Array();
var loaded_css_array = new Array();

/******** Load jQuery if not present *********/
if (window.jQuery === undefined || window.jQuery.fn.jquery !== '1.4.4') {
    var script_tag = document.createElement('script');
    script_tag.setAttribute("type","text/javascript");
    script_tag.setAttribute("src",
        "http://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js");
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
    jQuery = $  =window.jQuery;
    console.log(window.jQuery);
    console.log(window.$);
    main();
}


/******** Called once jQuery has loaded ******/
function scriptLoadHandler() {
    // Restore $ and window.jQuery to their previous values and store the
    // new jQuery in our local jQuery variable

    if(!typeof(window.$)){
      window.$  = window.jQuery;
    }
    jQuery = $  = window.jQuery;
    // Call our main function
    main(); 
}

/******** Our main function ********/
function main() { 

    $(document).ready(function() { 

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

                        //console.log(dataWeGotViaJsonp);

                        JSONPdata = dataWeGotViaJsonp;
                        

                        loadCSS(dataWeGotViaJsonp['widget_data']['pie']['css']);

                        //console.log(buildPieChart);

                        var formatted_data = formatDataPieChart(dataWeGotViaJsonp['data']);

                        loadJS(dataWeGotViaJsonp['widget_data']['pie']['js'],container_id,formatted_data,buildPieChart);
                        
                        

                        //buildPieChart($,container_id,formatted_data);
                    }
                })
    });
}


function formatDataBarGraph(){

}

function formatDataPieChart(raw_data){

  var return_array  = new Array();

  for (var key in raw_data) {
    if (raw_data.hasOwnProperty(key)) {
      var key_value_array = new Array();

      key_value_array.push(key);

      key_value_array.push(raw_data[key]*1); //convert to number from string

      return_array.push(key_value_array);
    }
  }

  //console.log(return_array);
  return return_array;

}


function buildBarGraph(container_id, data_to_be_used){

}


function buildPieChart(container_id, data_to_be_used){

  //console.log([data_to_be_used]);
  console.log(container_id);
  console.log(data_to_be_used);

     
    var plot1 = $.jqplot(container_id, [data_to_be_used], {
        gridPadding: {top:0, bottom:38, left:0, right:0},
        seriesDefaults:{
            renderer:$.jqplot.PieRenderer, 
            trendline:{ show:false }, 
            rendererOptions: { padding: 8, showDataLabels: true }
        },
        legend:{
            show:true, 
            placement: 'outside', 
            rendererOptions: {
                numberRows: 1
            }, 
            location:'s',
            marginTop: '15px'
        }       
    });
  
}

function loadJS(js_array,container_id,formatted_data,chartFunction){

    if (!js_array || !js_array.length) {
          buildPieChart(container_id,formatted_data);
      }
      else{
        var addr  = js_array.shift()
        $.getScript(addr, function () {
            loadJS(js_array,container_id,formatted_data,chartFunction);
            loaded_js_array.push(addr);
        });

      }
      
}

function loadCSS(css_array){
  //console.log(css_array);
  jQuery(document).ready(function($) { 
      $(css_array).each(function(){
        //console.log(this);
        if($.inArray(this,css_array) < 0){
          var css_link = $("<link>", { 
            rel: "stylesheet", 
            type: "text/css", 
            href: this
            });

            css_link.appendTo('head');

            //console.log(this);

            loaded_css_array.push(this);

        }
      });
  });
}




})(); // We call our anonymous function immediately