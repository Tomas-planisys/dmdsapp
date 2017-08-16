//var superAdmin=true;
var language;
var myPag;
var userEmail;
var urlP;

var pregSec;
var resSec;
var idAuth;
var tokenAuth;
var pswAuth;
var pswRAuth;

var usrAuxMeu;
var pswAuxMeu;

var a,b,c,d,e,f,x,y,z;
var permissions,language;


var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
//        deviceReadyM();
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
//        this.receivedEvent('deviceready');
        deviceReadyM();
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

//////////////////START////////////////////////////
function deviceReadyM() {
//    console.log(localStorage.getItem("nuevo")==null);
    
    StatusBar.backgroundColorByName("blue");
    $("#campanas").removeClass("hidden");
    
    
    
    $body = $("body");
        $(document).on({
        ajaxStart: function() { $body.addClass("loading"); },
        ajaxStop: function() { $body.removeClass("loading"); }
        });
    
        
    inicioCampanas();
     listenerCampanas();
    myPag=0;
//        language=getCookie('language');
        if(language==undefined){
            language='es';
        }

//        myScript(language,myPag);

        urlP=document.URL;


//console.log(languages.es[1].welcome);

        loadWizzard();


     

        window.onpopstate = function(event) {
            if(event && event.state) {
                location.reload();
            }
        }


}
/////////////////////////////////////
///////FINAL DEL DOCUMENT READY//////
/////////////////////////////////////


///////////////WIZARD////////////////
function loadWizzard(){
	var str;
	if(str != undefined && str.length>2){
		var js = JSON.parse(str);
		wiz = new WizzardDMDS(js);
	} else{
		wiz = new WizzardDMDS();
	}
	if(typeof afterLoad !== "undefined") afterLoad();
	afterLoad = undefined;
    //console.log("afterloadwizard");
}
function afterLoad() {
    // code to execute
//    console.log('Se cargaron las cookies.');
}

function listenerCampanas(){
            $('#aDashboard').click(function(e) {
        location.replace('./dashboard.html');
        e.preventDefault();
    });


//////////CODIGO MIO ///////////
$('#goBack').click(function(e) {
    location.replace('./index.html');
        });
$('#searcher').click(function(e) {
    location.replace('./searcher.html');
        });
    }