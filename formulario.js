var         $form       = $('#formulario'),
			$titulo     = $('#titulo'),
			$url        = $('#link'),
			$primerPost = $('.item').first(),
			$lista      = $('#contenido, aside'), 
			ss          = sessionStorage,
			ls          = localStorage;

if (ls.getItem('autosave')) {     /*para que funcione se tiene que inicializar autosave en localstorage en 1*/
	$titulo.val(ss.getItem('titulo'));
	$url.val(ss.getItem('url'));
}

var id = setInterval(function(){ //solo funciona en un server local
	ss.setItem('titulo', $titulo.val());
	ss.setItem('url', $url.val());
}, 1000);
 
function mostrarOcultarFormulario(){
	$form.slideToggle(); //slideToggle muestra y oculta un elemento
	$lista.slideToggle();
	return false;
}

function agregarPost(e){
	e.preventDefault();
	var titulo = $titulo.val(),//val es para obtener el valor de un input
		url = $url.val();
		clone = $primerPost.clone();//clone hace una copia exacta de lo que se quiere clonar
		
		clone.find('.titulo_item a')
			 .text(titulo)
			 .attr('href',url)
			 
		clone.hide()
		$lista.prepend(clone)
		//debugger; -- detiene la ejecucion de el script para depurar
		mostrarOcultarFormulario();
		//limpiamos los controles de formulario
		$titulo.val('');
		$url.val('');	
		clone.fadeIn()//slideDow - efecto
}
/*function grabarInformacion(e){
	e.preventDefault();
	var titulo = $titulo.val(),
		url    = $url.val(),
		ls     = localStorage,
		ss     = sessionStorage;

	ls.setItem('titulo',titulo);
	ls.setItem('url', url);

	ss.setItem('titulo',titulo);
	ss.setItem('url', url);
	mostrarOcultarFormulario();
		$titulo.val("");
		$url.val("");	
}*/


$('#publicar_nav a').click(mostrarOcultarFormulario);
$('#formulario').on("submit",agregarPost/*grabarInformacion*/);