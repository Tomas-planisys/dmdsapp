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
    $("#infoE1").removeClass("hidden");
    
    
    
    
    
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
    $('#h2p7').html("<br />Campaña: '"+campName+"'");
    $('#h2p8').html("<br />Envio: '"+envName+"'");
    
    
    
    $body = $("body");
        $(document).on({
        ajaxStart: function() { $body.addClass("loading"); },
//        ajaxStop: function() {  }
        });
    
    
    
//    console.log("Tu token es: "+x);
    startEnvios();
//    startInfoEnvio();
    
//    $('#frame').html('<html><header></header><body>Hello world</body></html>');
    
    
    $('#goBack').click(function(e) {
    location.replace('./envios.html');
        });

}

var ajx;
var page='infoE1';
function startEnvios(){

    var obj={'userEmail': c,'token': x,'language':language,'numReg':6,'Orderby':'id','orderDir':'asc','start':0,'pagina':0};
    wiz.processPerfil(obj);

//    var data={'start' : wiz.Perfil[0].info.start, 'length' : wiz.Perfil[0].info.numReg,'order_by' : wiz.Perfil[0].info.Orderby,"order_dir":wiz.Perfil[0].info.orderDir};
    var data;
    ajx = wiz.getInfo('envio/'+envId+'/'+a,data,wiz.processinfoE1);
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

function  startInfoEnvio(datas){
    window.frames[0].location = 'data:text/html;'+datas;
    
}
function cambiarFrame(data){
    console.log(data);
    $("#frame").attr("src", "data:text/html,"+data);
}