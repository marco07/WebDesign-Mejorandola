var $form = $('#formulario'),
			$titulo = $('#titulo'),
			$url = $('#link');
			$primerPost = $('.item').first();
			$lista = $('#contenido'); 
 
function mostrarOcultarFormulario(){
	$form.slideToggle(); //slideToggle muestra y oculta un elemento
	return false;
}

function agregarPost(){
	var titulo = $titulo.val(),//val es para obtener el valor de un input
		url = $url.val();
		clone = $primerPost.clone();//clone hace una copia exacta de lo que se quiere clonar
		clone.find('.titulo_item a')
			 .text(titulo)
			 .attr('href',url)
			 clone.hide()
		$lista.prepend(clone)

		clone.slideDown()
		//debugger; -- detiene la ejecucion de el script para depurar
}

$('#publicar_nav a').click(mostrarOcultarFormulario);
$('#formulario').on("submit",agregarPost);