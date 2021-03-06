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


var page='envioStats';
var campId, campName;
var envId, envName;
//////////////////START////////////////////////////
function deviceReadyM() {
    $("#statsE").removeClass("hidden");
    
    
    
    loadWizzard();

    
    
    x=localStorage.getItem("token");
    b=localStorage.getItem("userEmail");
    permissions=localStorage.getItem("permissions");
    language=localStorage.getItem("language");
    

      z=28;
      a=14;
      y='Default';
      c='PLANISYS Production';
        
    localStorage.idDmDsSel = a;
    localStorage.nameDmDsSel = c;
    localStorage.idGroupSel = z;
    localStorage.nameGroupSel = y;
    campId = localStorage.campanaId;
    campName = localStorage.campanaName;
    envId = localStorage.envioId;
    envName = localStorage.envioName;
    


    
//    console.log(b);
    $('#userName').html(b);
    $('#h2p7').html("<br />Nombre de Campaña: '"+campName+"'");
    $('#h2p8').html("<br />Nombre de Envio: '"+envName+"'");
    
    
    
    $body = $("body");
        $(document).on({
        ajaxStart: function() { $body.addClass("loading"); },
//        ajaxStop: function() {  }
        });
    
    
    
//    console.log("Tu token es: "+x);
    startEnvios();
    
    

}

var ajx
function startEnvios(){

    var obj={'userEmail': c,'token': x,'language':language,'numReg':6,'Orderby':'id','orderDir':'asc','start':0,'pagina':0};
    wiz.processPerfil(obj);

    var data={'start' : wiz.Perfil[0].info.start, 'length' : wiz.Perfil[0].info.numReg,'order_by' : wiz.Perfil[0].info.Orderby,"order_dir":wiz.Perfil[0].info.orderDir};
    ajx = wiz.postInfo('envios/'+a+'/'+z+'/'+campId,data,wiz.processEnvios);
}


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






function inicioStatsEnv(){
    
    for(i=0;i<wiz.envios.length;i++){
        if(wiz.envios[i].info.id==envId){
    console.log(wiz.envios[i].info);
   
//    console.log(JSON.stringify(wiz.enviosTot.info.totalEnvios));
    console.log(JSON.stringify(wiz.enviosTot[0].info));
    $('#totEma').html(wiz.envios[i].info.ev_envio);
    $('#apTot').html(wiz.envios[i].info.ev_vista);
    $('#apTotP').html((wiz.envios[i].info.ev_vista/wiz.envios[i].info.ev_envio*100).toFixed(2)+'%');
    $('#apUni').html(wiz.envios[i].info.ev_vista_unica);
    $('#apUniP').html((wiz.envios[i].info.ev_vista_unica/wiz.envios[i].info.ev_envio*100).toFixed(2)+'%');
    $('#clTot').html(wiz.envios[i].info.ev_click);
    $('#clTotP').html((wiz.envios[i].info.ev_click/wiz.envios[i].info.ev_vista).toFixed(2)+'%');
    $('#clUni').html(wiz.envios[i].info.ev_click_unico);
    $('#clUniP').html((wiz.envios[i].info.ev_click_unico/wiz.envios[i].info.ev_vista).toFixed(2)+'%');
    $('#reTot').html(wiz.envios[i].info.ev_rebote);
    $('#reTotP').html((wiz.envios[i].info.ev_rebote/wiz.envios[i].info.ev_envio*100).toFixed(2)+'%');
    $('#reUni').html(wiz.envios[i].info.ev_rebote_hard);
    $('#reUniP').html((wiz.envios[i].info.ev_rebote_hard/wiz.envios[i].info.ev_envio*100).toFixed(2)+'%');
    $('#desTot').html(wiz.envios[i].info.ev_desuscripcion);
    $('#desTotP').html((wiz.envios[i].info.ev_desuscripcion/wiz.envios[i].info.ev_envio*100).toFixed(2)+'%');
         }
    }
    $body.removeClass("loading");
}
//////////////////START////////////////////////////

    
    
    $('#goBack').click(function(e) {
    location.replace('./envios.html');
        });
$('#btnInfo').click(function(e) {
    location.replace('./infoE1.html');
        });