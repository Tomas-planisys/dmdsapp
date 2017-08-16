var x;
var y;
var z;
var a;
var b;
var c;
var cookie;
var d;
var e;
var f;
var language;
var myPag;
var campanasPerPage=6;

var contEnvMost=1;

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



function gotoStats3(id,nombre) {
    localStorage.envioId=id;
        localStorage.envioName=nombre;
    location.replace('./statsE.html');
        }
    
function gotoInfo3(id,nombre) {
    localStorage.envioId=id;
        localStorage.envioName=nombre;
    location.replace('./infoE1.html');
        }


//////////////////START////////////////////////////
function deviceReadyM() {
    $("#stats").removeClass("hidden");
    $("#envios").removeClass("hidden");
    
    $body = $("body");
        $(document).on({
        ajaxStart: function() { $body.addClass("loading"); },
        ajaxStop: function() { $body.removeClass("loading"); }
        });

    loadWizzard();
    myPag=2;

    
    x=localStorage.getItem("token");
    c=localStorage.getItem("userEmail");
    permissions=localStorage.getItem("permissions");
    language=localStorage.getItem("language");
    
    a=localStorage.getItem("idDmDsSel");
    z=localStorage.getItem("idGroupSel");
    
    
    b=localStorage.getItem("campanaId");
    d=localStorage.getItem("nameDmDsSel");
    e=localStorage.getItem("nameGroupSel");
    f=localStorage.getItem("campanaName");





    $('#userName').html(c);
//    $('#h2p2').html("<br />Lista de envios de: '"+f+"'");
    $('#h2p2').html("Campaña: "+f);

      startEnvios();
    listenerEnvios();
//      enviosMostrados();

      window.onpopstate = function(event) {
        if(event && event.state) {
        location.reload();
        }
      }
      
}
////////FIN DEL DOCUMENT READY/////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
/////LISTENERS CUANDO XA CUANDO YA SE MOSTRARON LOS ENVIOS////////////////////
function enviosMostrados() {

  document.getElementById("logo").addEventListener("click", function(){
      history.pushState({urlPath:'./index.html'},"page 5",'./index.html');
      location.replace('./index.html');
  });
  
  document.getElementById("perfil").addEventListener("click", function(){
      history.pushState({urlPath:'./perfil.html'},"page 5",'./perfil.html');
      location.replace('./perfil.html');
  });

  document.getElementById("butWizard").addEventListener("click", function(){
       history.pushState({urlPath:'http://mobile1.planisys.net/wiz/'},"page 5",'http://mobile1.planisys.net/wiz/');
      location.replace('http://mobile1.planisys.net/wiz/');
  });

//////////////////LOGout////////////////////////////
document.getElementById("logout2").addEventListener("click", function(){
    if (typeof x !== 'undefined') {
    var xhr = new XMLHttpRequest();
    var url = "http://dmds-users-dev.planisys.net/api/v1/logout/";
    xhr.open("POST", url, true);
    console.log("Deslogueado correctamente.");
    history.pushState({urlPath:'./index.html'},"page 5",'./index.html');
    location.replace('./index.html');
}
});
}
function listenerEnvios(){
        

    
    $('#anavCampanas').click(function(e) {
      location.replace('./campanas.html');
        });
    $('#goBack').click(function(e) {
    location.replace('./envios.html');
        });

}

/////////////////////////////////////////////////////////////////////////////
/////////START D LOS METODOS PARA MOSTRAR LOS ENVIOS/////////////////////////
/////////////////////////////////////////////////////////////////////////////
var ajx
function startEnvios(){

    var obj={'userEmail': c,'token': x,'language':language,'numReg':6,'Orderby':'id','orderDir':'asc','start':0,'pagina':0};
    wiz.processPerfil(obj);

    var data={'start' : wiz.Perfil[0].info.start, 'length' : wiz.Perfil[0].info.numReg,'order_by' : wiz.Perfil[0].info.Orderby,"order_dir":wiz.Perfil[0].info.orderDir};
    ajx = wiz.postInfo('envios/'+a+'/'+z+'/'+b,data,wiz.processEnvios);
}


function changeNumRegEnv(){

    var e = document.getElementById("numRegEnv");
    var tt = e.options[e.selectedIndex].value;
    wiz.Perfil[0].info.numReg=tt;

    var data={'start' : wiz.Perfil[0].info.start, 'length' : wiz.Perfil[0].info.numReg,'order_by' : wiz.Perfil[0].info.Orderby,"order_dir":wiz.Perfil[0].info.orderDir};
    ajx = wiz.postInfo('envios/'+a+'/'+z+'/'+b,data,wiz.processEnvios);
}

function changeOrderEnv(){

    var e = document.getElementById("orderByEnv");
    var tt = e.options[e.selectedIndex].value;
    wiz.Perfil[0].info.Orderby=tt;
    var xx=$('#checkboxEnv').checked;
    if(xx){
        wiz.Perfil[0].info.orderDir='asc';
    }else{
        wiz.Perfil[0].info.orderDir='desc';
    }

    var data={'start' : wiz.Perfil[0].info.start, 'length' : wiz.Perfil[0].info.numReg,'order_by' : wiz.Perfil[0].info.Orderby,"order_dir":wiz.Perfil[0].info.orderDir};
    ajx = wiz.postInfo('envios/'+a+'/'+z+'/'+b,data,wiz.processEnvios);
}

function searchEnvios(){

    var str = $('.input-searchbox').val();

     
    for(i=0;i<=wiz.envios.length;i++){
            envios.shift();
        }
//    alert(str);
    var data={'search':str,'start' : wiz.Perfil[0].info.start, 'length' : wiz.Perfil[0].info.numReg,'order_by' : wiz.Perfil[0].info.Orderby,"order_dir":wiz.Perfil[0].info.orderDir};
    ajx = wiz.postInfo('envios/'+a+'/'+z+'/'+b,data,wiz.processEnvios);
}






function cargarMasE(){
    var ajx;
    var aux=contEnvMost*6;
    if(aux<=totalEnvios){
        console.log(aux);
    var obj={'userEmail': b,'token': x,'language':language,'numReg':6,'Orderby':'id','orderDir':'asc','start':aux,'pagina':0};
    wiz.processPerfil(obj);

    var data={'start' : wiz.Perfil[0].info.start, 'length' : wiz.Perfil[0].info.numReg,'order_by' : wiz.Perfil[0].info.Orderby,"order_dir":wiz.Perfil[0].info.orderDir};
    ajx = wiz.postInfo('envios/'+a+'/'+z+'/'+b,data,wiz.processEnvios);
    contEnvMost++;
    }else{
        document.getElementById('butCarMasE').setAttribute('disabled', true);
    }
}

function printEnvios(pag){
	if(typeof pag === "undefined"){
        pag = 0;
    console.log(wiz.envios);
 for(i=0;i<=wiz.envios.length-1;i++){
            envios.push(wiz.envios[i]);
        }
    if(wiz.envios.length==0){
        envios.push({info:{envio:{nombre:"El envío seleccionado no tiene correos."},id:0}})
        document.getElementById('butCarMasE').setAttribute('disabled', true);
    }
	}
//    else{
//        wiz.Perfil[0].info.pagina=pag;
//        var start=wiz.Perfil[0].info.pagina*wiz.Perfil[0].info.numReg;
//        var data={'start' : start, 'length' : wiz.Perfil[0].info.numReg, 'order_by' : wiz.Perfil[0].info.Orderby,"order_dir":wiz.Perfil[0].info.orderDir};
//        ajx = wiz.postInfo('envios/'+a+'/'+z+'/'+b,data,wiz.processEnvios);
//    }

    if(totalEnvios<=6){
        document.getElementById('butCarMasE').setAttribute('disabled', true);
    }
}


///////////////WIZARD////////////////
function loadWizzard(){
//	var str = readCookie('wizzard_save');
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

function printPerfil(){
    console.log(wiz.Perfil);
}