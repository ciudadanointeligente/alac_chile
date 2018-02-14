$( document ).ready(function() {
    console.log( "ready!: "+getCookie("lang") );



    var arrLang= {
      'en': {
        'Hola': 'Good day',
        'alac': 'What is alac?',
        'como': 'How does it work?',
        'buzon': 'Denunciation mailbox',
        'articulos': 'Educational articles',
        'preguntas': 'Frequent questions',
        'usuarios':'Users',
        'nuevo usuario': 'New user',
        'crear articulo': 'Create article'
      },
      'es': {
        'Hola': 'Buen día',
        'alac': '¿Qué es alac?',
        'como': '¿Cómo funciona?',
        'buzon': 'Buzón de denuncia',
        'articulos': 'Artículos educativos',
        'preguntas': 'Preguntas frecuentes',
        'usuarios':'Usuarios',
        'nuevo usuario': 'Nuevo usuario',
        'crear articulo': 'crear artículo'
      },
      'ht': {
        'Hola': 'Bonjour',
        'alac': "Qu'est ce que c'est alac?",
        'como': 'Comment ça marche?',
        'buzon': 'Denonciation boîte aux lettres',
        'articulos': 'Articles éducatifs',
        'preguntas': 'Questions fréquentes',
        'usuarios':'Users en creole',
        'nuevo usuario': 'neu usareo en creole',
        'crear articulo': 'crear articulo en croale'
      },
      'pt': {
        'Hola': 'OI!',
        'alac': 'O que é alac?',
        'como': 'Como funciona?',
        'buzon': 'Caixa de correio de denúncia',
        'articulos': 'Artigos educativos',
        'preguntas': 'Perguntas frequentes',
        'usuarios':'Users en portugues',
        'nuevo usuario': 'neu usario en portugues',
        'crear articulo': 'crear articulo en portugues'
      }
    };
    function getCookie(name) {
      var value = "; " + document.cookie;
      var parts = value.split("; " + name + "=");
      if (parts.length == 2) return parts.pop().split(";").shift();
    };
    var L = getCookie("lenguaje");
    if (L == undefined || L==null ) {
        document.cookie = "lenguaje=es";
    };

    $('.lang').each(function(index,element){
      console.log( "ready!: "+getCookie("lenguaje") );
      $(this).text(arrLang[getCookie("lenguaje")][$(this).attr('key')]);
    });

    $('.translate').click(function(event) {
      var lang= $(this).attr('id');
      var langPreferent = "lenguaje="+lang;
      document.cookie = langPreferent;
      console.log(getCookie("lenguaje"));
      $('.lang').each(function(index, element){
        $(this).text(arrLang[lang][$(this).attr('key')]);
      });
      event.preventDefault();
    });
});
