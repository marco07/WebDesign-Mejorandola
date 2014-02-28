var base_url = "http://query.yahooapis.com/v1/public/yql?";

function obtenerGeoInformacion(lat, lon){
	var query = "Select * from geo.placefinder where text='"+lat+", "+lon+"'";
		query += "and gflags='R'";
		query = encodeURIComponent(query);

		var opciones = { 
			url : base_url + "q=" + query,
			dataType : 'jsonp',
			jsonpCallback: 'geocallback',
			data: {
				format: 'json'
			}
		
		}

		$.ajax(opciones);

}

function geocallback(datos){
	var info   = datos.query.results.Result;
	var pais   = info.country;
	var ciudad = info.city;
	var barrio = info.neigborhood;
	var woeid  = info.woeid; //volor unico que captura yahoo para obtener el clima


	var tmp = '<p><strong>'+barrio+'</strong><br>'+ciudad+','+pais+' ('+woeid+')</p>';
	$('#geo').prepend(tmp);

	obtenerClima(woeid);
}	
function obtenerClima(woeid){
		var query = "Select * from weather.forecast where woeid='"+woeid+"'";
		query+= " AND u='c'";
		query = encodeURIComponent(query);

		var opciones = { 
			url : base_url + "q=" + query,
			dataType : 'jsonp',
			jsonpCallback: 'climacallback',
			data: {
				format: 'json'
			}
		
		}

		$.ajax(opciones);
}
function climacallback(datos){
	var clima = datos.query.results.channel;
	var temp = clima.item.condition.temp;
	var code = clima.item.condition.code;
	var unit = clima.units.temperature;
	var img  = new Image();
	img.src  ="http://l.yimg.com/a/i/us/we/52/"+code+".gif";
	$('#clima')
		.html('<strong>'+temp+'</strong>'+unit+'º')
		.prepend(img);
		
}

function loadLogos(){
	$.get('ajax.html.html',function(html){
		$('footer').append(html);
	});
}

function loadUser(){
	$.get('ajax_json.json', function(datos){
		var avatar = new Image();
		avatar.src=datos.avatar;
		avatar.title = datos.nombre+" "+datos.apellido;
		$('#avatar').append(avatar);
	});
}